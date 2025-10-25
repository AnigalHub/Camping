<template>
  <h2 v-html="title"></h2>
  <v-form style="height: max-content; padding: 0 0 20px 0 ;">
    <v-row dense>
      <v-col :md="key === 'issuedDocument' || key === 'cityDocument' ? 12 : 4" v-for="(label, key) in filteredObject"
        :key="key">
        <v-text-field 
          v-if="isISODate(object[key])"  
          :variant="disable ? 'plain' : 'outlined'" 
          :label="label" 
          :value="formatDate(object[key])" 
          type="date"
          class="small-margin" 
          :disabled="disable"/>
        <v-text-field 
          v-else 
          :label="label"
          :variant="disable ? 'plain' : 'outlined'"  
          :active="true" 
          :value="object[key]" 
          class="small-margin"  
          :disabled="disable" 
        />
      </v-col>
    </v-row>
  </v-form>
  <v-btn v-if="name === 'edit'" class="btn_page">Сохранить</v-btn>
  <div v-if="name === 'delete'" class="btn_delete">
    <v-btn class="btn_page">Да</v-btn>
    <v-btn class="btn_page">Нет</v-btn>
  </div>
  
</template>

<script setup>
import { computed } from 'vue';
/**
 * Vue-компонент Информация
 */

const props = defineProps({
  name: {
    type: String,
    default: '',
  },
  object: {
    type: Object,
    default: () => ({}),
  },
  disable:{
    type: Boolean,
    default: false,
  }
});

// Маппинг ключей на отображаемые названия
const fieldMappingsDisable = {
  surname: 'Фамилия',
  name: 'Имя',
  patronymic: 'Отчество',
  date: 'Дата рождения',
  seriesDocument: 'Серия',
  numberDocument: 'Номер',
  codeDocument: 'Код подразделения',
  dateDocument: 'Дата выдачи',
  issuedDocument: 'Кем выдан',
  cityDocument: 'Место жительства',
};
const fieldMappings = {
  phone: 'Телефон',
  startDate: 'Дата въезда',
  endDate: 'Дата выезда',
  house: 'Аренда домика',
  object: 'Поляна',
  cars: 'Транспорт',
  animals: 'Животные',
  price: 'Стоимость',
};

const names = [
  {value:'documents', name: 'Документы'},
  {value:'edit', name: 'Изменение данных'},
  {value:'delete', name: 'Удалить запись ?'},
]

const title = computed(() => {
  return names.find(el => el.value === props.name)?.name;
});

// Отфильтровать только те поля, которые есть в маппинге
const filteredObject = computed(() => {
  // Если выключен disable, объединяем оба маппинга, иначе только fieldMappingsDisable
  const mapping = props.name === 'documents'
    ? fieldMappingsDisable
    : { ...fieldMappingsDisable, ...fieldMappings };

  // Фильтруем ключи, которые есть в объекте
  return Object.keys(mapping).reduce((acc, key) => {
    if (props.object.hasOwnProperty(key)) {
      acc[key] = mapping[key];
    }
    return acc;
  }, {});
});

function isISODate(value) {
  return (
    typeof value === 'string' &&
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?([+-]\d{2}:\d{2}|Z)?$/.test(value)
  );
}

function formatDate(isoString) {
  return isoString ? isoString.substr(0, 10) : '';
}
</script>

<style scoped>
h2 {
  text-align: center;
  margin-top: -8%;
  margin-bottom: 5%;
  color: var(--color-h1);
  -webkit-text-stroke: var(--text-stroke-h1);
  font-family: var(--font-family);
  font-weight: 200;
  font-size: 1.4rem !important;
}

.small-margin {
  margin-bottom: -20px;
}

.v-field__input {
  padding-top: 15px !important;
}

.btn_delete{
  display: flex;
}
.btn_delete .v-btn:first-child{
  margin-right: 15px;
}

.btn_delete .v-btn{
  width: 47%;
}

</style>
