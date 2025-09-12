<template>
  <h2 v-html="title"></h2>
  <v-form>
    <v-row dense>
      <v-col
        v-for="(label, key) in filteredObject"
        :key="key"
        :cols="12"
        :sm="key === 'issuedDocument' || key === 'cityDocument' ? 12 : 6"
        :md="key === 'issuedDocument' || key === 'cityDocument' ? 12 : 4"
      >
        <v-text-field
          v-if="isISODate(object[key])"
          :variant="disable ? 'plain' : 'outlined'"
          :label="label"
          :value="formatDate(object[key])"
          type="date"
          rounded="lg"
          class="small-margin"
          :disabled="disable"
        />
        <v-text-field
          v-else
          :variant="disable ? 'plain' : 'outlined'"
          :label="label"
          :value="object[key]"
          :active="true"
          rounded="lg"
          class="small-margin"
          :disabled="disable"
        />
      </v-col>
    </v-row>
  </v-form>

  <div class="btn_wrapper">
    <div class="btn_block">
      <v-btn v-if="name === 'edit'" class="btn_page">Сохранить</v-btn>
      <div v-if="name === 'delete'" class="btn_delete">
        <v-btn class="btn_page">Да</v-btn>
        <v-btn class="btn_page">Нет</v-btn>
      </div>
      <v-btn v-if="name === 'documents'" class="btn_page">Ок</v-btn>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  name: { type: String, default: "" },
  object: { type: Object, default: () => ({}) },
  disable: { type: Boolean, default: false },
});

const fieldMappingsDisable = {
  surname: "Фамилия",
  name: "Имя",
  patronymic: "Отчество",
  date: "Дата рождения",
  seriesDocument: "Серия",
  numberDocument: "Номер",
  codeDocument: "Код подразделения",
  dateDocument: "Дата выдачи",
  issuedDocument: "Кем выдан",
  cityDocument: "Место жительства",
};
const fieldMappings = {
  phone: "Телефон",
  startDate: "Дата въезда",
  endDate: "Дата выезда",
  house: "Аренда домика",
  object: "Поляна",
  cars: "Транспорт",
  animals: "Животные",
  price: "Стоимость",
};

const names = [
  { value: "documents", name: "Документы" },
  { value: "edit", name: "Изменение данных" },
  { value: "delete", name: "Удалить запись ?" },
];

const title = computed(() => {
  return names.find((el) => el.value === props.name)?.name;
});

const filteredObject = computed(() => {
  const mapping =
    props.name === "documents"
      ? fieldMappingsDisable
      : { ...fieldMappingsDisable, ...fieldMappings };

  return Object.keys(mapping).reduce((acc, key) => {
    if (props.object.hasOwnProperty(key)) acc[key] = mapping[key];
    return acc;
  }, {});
});

function isISODate(value) {
  return (
    typeof value === "string" &&
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?([+-]\d{2}:\d{2}|Z)?$/.test(
      value
    )
  );
}

function formatDate(isoString) {
  return isoString ? isoString.substr(0, 10) : "";
}
</script>

<style scoped>
.v-form{
  height: max-content;
  padding: 0 0 20px 0;
}

h2 {
  text-align: center;
  margin-top: -11%;
  margin-bottom: 5%;
  color: var(--color-h1);
  -webkit-text-stroke: var(--text-stroke-h1);
  font-family: var(--font-family);
  font-weight: 200;
  font-size: 1.4rem !important;
  border-bottom: 1px solid #ccc;
}

.v-row {
  margin-top: -8px;
  margin-bottom: -8px;
}

.v-col {
  padding-top: 6px !important;
  padding-bottom: 6px !important;
  transition: all 0.25s ease;
}

/* ✳️ Если внутри .v-col находятся disabled-поля — делаем их плотнее */
.v-col:has(.v-field--disabled) {
  padding-top: 0px !important;
  padding-bottom: 0px !important;
}

/* Для самих полей тоже уменьшаем внутренние отступы */
.v-field--disabled .v-field__input {
  padding-top: 0px !important;
  padding-bottom: 0px !important;
  font-size: 0.9rem;
}

.v-col,
.v-field__input {
  transition: all 0.25s ease;
}

.small-margin {
  margin-bottom: -20px;
}

.v-field__input {
  padding-top: 12px !important;
  padding-bottom: 4px !important;
  font-size: 0.93rem;
  line-height: 1.1;
}

.v-field--variant-outlined:hover {
  box-shadow: 0 0 0 2px rgba(93, 146, 76, 0.1);
}

.btn_page {
  display: block;
  margin: 20px auto 0 auto;
  padding: 8px 22px;
  border-radius: 8px;
  background: linear-gradient(135deg, #4d672c, #6d9247);
  color: #fff;
  font-weight: 500;
  font-size: 0.95rem;
  text-transform: none;
  transition: all 0.25s ease;
  box-shadow: 0 2px 6px rgba(77, 103, 44, 0.25);
}

.btn_wrapper {
  border-top: 1px solid #ccc;
  margin: 15px auto 10px;
}
.btn_block {
  width: 50%;
  margin: 0 auto 10px;
}

.btn_delete {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
}
.btn_delete .v-btn {
  flex: 1;
  max-width: 47%;
  padding: 8px 0;
  border-radius: 8px;
  font-weight: 500;
  font-size: 0.95rem;
  text-transform: none;
  transition: all 0.25s ease;
}

/* Кнопка "Да" — зелёная */
.btn_delete .v-btn:first-child {
  background: linear-gradient(135deg, #4d672c, #6d9247);
  color: #fff;
  box-shadow: 0 2px 6px rgba(77, 103, 44, 0.25);
}

/* Кнопка "Нет" — нейтральная */
.btn_delete .v-btn:last-child {
  background: #f4f4f4;
  color: #2f2f2f;
  border: 1px solid #d6d6d6;
}

/* --- Адаптив --- */
@media (max-width: 960px) {
  .btn_block {
    width: 70%;
  }
}
@media (max-width: 500px) {

  .v-form{
  margin-top:.2px;
}
}

@media (max-width: 1100px) {
  .v-form {
    max-height: 55vh !important;
    overflow: auto;
  }
  .btn_block {
    width: 100%;
  }



  
}
</style>
