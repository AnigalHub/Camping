<template>
  <div class="client">
    <v-container>
      <Title :title="title"/>
      <div class="content">
        <v-card elevation="2" class="wrapper_content pa-6">
          <v-form v-model="valid" @submit.prevent="saveForm">
            <v-expansion-panels v-model="openedPanel" multiple>
              <v-expansion-panel class="custom-panel" v-for="(person, index) in persons" :key="index">
                <v-expansion-panel-title>
                  <div class="panel-title">
                    <strong>Отдыхающий №{{ index + 1 }}</strong>
                    <v-btn icon="mdi-delete" variant="text" size="small" class="action delete-btn"
                      @click.stop="removePerson(index)" />
                  </div>
                </v-expansion-panel-title>
                <v-expansion-panel-text class="custom-text">
                  <!-- Личные данные -->
                  <h3 class="form-subtitle">Личные данные</h3>
                  <div class="grid-inputs">
                    <v-text-field v-model="person.surname" label="Фамилия" variant="outlined" density="comfortable"
                      rounded="lg" clearable />
                    <v-text-field v-model="person.name" label="Имя" variant="outlined" density="comfortable"
                      rounded="lg" clearable />
                    <v-text-field v-model="person.patronymic" label="Отчество" variant="outlined" density="comfortable"
                      rounded="lg" clearable />
                    <v-menu v-model="person.dateMenu" :close-on-content-click="false" transition="scale-transition"
                      offset-y>
                      <template #activator="{ props }">
                        <v-text-field v-model="person.date" v-bind="props" label="Дата рождения" variant="outlined"
                          density="comfortable" rounded="lg" prepend-inner-icon="mdi-calendar" clearable readonly />
                      </template>
                      <v-date-picker v-model="person.dateInternal" locale="ru" hide-header
                        @update:model-value="val => onDateSelect(val, index, 'date')" />
                    </v-menu>
                    <v-text-field v-model="person.phone" label="Телефон" variant="outlined" density="comfortable"
                      rounded="lg" clearable v-maska="'+7 (###) ###-##-##'" />
                  </div>
                  <hr />
                  <!-- Документы -->
                  <h3 class="form-subtitle">Документы</h3>
                  <v-radio-group v-model="person.selectedDoc" class="docs-radio" row>
                    <v-radio label="Паспорт" value="passport" class="radio-small" />
                    <v-radio label="Свидетельство о рождении" value="birth" class="radio-large" />
                    <v-radio label="Иное" value="other" class="radio-small" />
                  </v-radio-group>
                  <!-- Паспорт -->
                  <div v-if="person.selectedDoc === 'passport'">
                    <div class="grid-inputs">
                      <v-text-field v-model="person.passport.seriesDocument" label="Серия" variant="outlined"
                        density="comfortable" rounded="lg" clearable />
                      <v-text-field v-model="person.passport.numberDocument" label="Номер" variant="outlined"
                        density="comfortable" rounded="lg" clearable />
                      <v-menu v-model="person.passport.dateMenu" :close-on-content-click="false"
                        transition="scale-transition" offset-y>
                        <template #activator="{ props }">
                          <v-text-field v-model="person.passport.dateDocument" v-bind="props" label="Дата выдачи"
                            readonly variant="outlined" density="comfortable" prepend-inner-icon="mdi-calendar"
                            rounded="lg" clearable />
                        </template>
                        <v-date-picker v-model="person.passport.dateInternal" locale="ru" hide-header
                          @update:model-value="val => onDocDateSelect(val, index, 'passport')" />
                      </v-menu>
                      <v-text-field v-model="person.passport.codeDocument" label="Код подразделения" variant="outlined"
                        density="comfortable" rounded="lg" clearable />
                      <v-text-field v-model="person.passport.cityDocument" label="Место рождения" variant="outlined"
                        density="comfortable" rounded="lg" clearable />
                    </div>
                    <v-text-field v-model="person.passport.issuedDocument" label="Кем выдан" variant="outlined"
                      density="comfortable" rounded="lg" clearable />
                  </div>
                  <!-- Свидетельство о рождении -->
                  <div v-if="person.selectedDoc === 'birth'">
                    <div class="grid-inputs">
                      <v-text-field v-model="person.birth.seriesDocument" label="Серия" variant="outlined"
                        density="comfortable" rounded="lg" clearable />
                      <v-text-field v-model="person.birth.numberDocument" label="Номер" variant="outlined"
                        density="comfortable" rounded="lg" clearable />
                      <v-menu v-model="person.birth.dateMenu" :close-on-content-click="false"
                        transition="scale-transition" offset-y>
                        <template #activator="{ props }">
                          <v-text-field v-model="person.birth.dateDocument" v-bind="props" label="Дата выдачи" readonly
                            variant="outlined" density="comfortable" prepend-inner-icon="mdi-calendar" rounded="lg"
                            clearable />
                        </template>
                        <v-date-picker v-model="person.birth.dateInternal" locale="ru" hide-header
                          @update:model-value="val => onDocDateSelect(val, index, 'birth')" />
                      </v-menu>
                      <v-text-field v-model="person.birth.actNumberDocument" label="Номер акта о рождении"
                        variant="outlined" density="comfortable" rounded="lg" clearable />
                      <v-text-field v-model="person.birth.cityDocument" label="Место рождения" variant="outlined"
                        density="comfortable" rounded="lg" clearable />
                    </div>
                    <v-text-field v-model="person.birth.issuedDocument" label="Место государственной регистрации"
                      variant="outlined" density="comfortable" rounded="lg" clearable />
                  </div>
                  <!-- Иное -->
                  <div v-if="person.selectedDoc === 'other'">
                    <v-text-field v-model="person.other.typeDocument" label="Название документа" variant="outlined"
                      density="comfortable" rounded="lg" clearable />
                    <v-textarea v-model="person.other.dataDocument" label="Данные документа" variant="outlined"
                      density="comfortable" rounded="lg" clearable />
                  </div>
                  <hr />
                  <!-- Даты проживания -->
                  <h3 class="form-subtitle">Даты проживания</h3>
                  <div class="grid-inputs">
                    <v-menu v-model="person.startDateMenu" :close-on-content-click="false" transition="scale-transition"
                      offset-y>
                      <template #activator="{ props }">
                        <v-text-field v-model="person.startDate" v-bind="props" label="Дата въезда" variant="outlined"
                          density="comfortable" rounded="lg" prepend-inner-icon="mdi-calendar" clearable readonly />
                      </template>
                      <v-date-picker v-model="person.startDateInternal" locale="ru" hide-header
                        @update:model-value="val => onDateSelect(val, index, 'startDate')" />
                    </v-menu>
                    <v-menu v-model="person.endDateMenu" :close-on-content-click="false" transition="scale-transition"
                      offset-y>
                      <template #activator="{ props }">
                        <v-text-field v-model="person.endDate" v-bind="props" label="Дата выезда" variant="outlined"
                          density="comfortable" rounded="lg" prepend-inner-icon="mdi-calendar" clearable readonly />
                      </template>
                      <v-date-picker v-model="person.endDateInternal" locale="ru" hide-header
                        @update:model-value="val => onDateSelect(val, index, 'endDate')" />
                    </v-menu>
                  </div>
                  <hr />
                  <!-- Дополнительные данные -->
                  <h3 class="form-subtitle">Дополнительные данные</h3>
                  <div class="grid-inputs">
                    <v-select 
                      v-model="person.tentType" 
                      :items="tentTypes" 
                      item-title="title" 
                      item-value="value"
                      label="Глэмпинг" 
                      variant="outlined" 
                      density="comfortable" 
                      rounded="lg"
                      @update:model-value="val => onTentTypeChange(person, val)"
                    />
                    <v-select
                      v-model="person.object"
                      :items="availableObjects(person)"
                      item-title="label"
                      item-value="number"
                      label="Поляна"
                      variant="outlined"
                      density="comfortable"
                      rounded="lg"
                    />
                  </div>
                  <div class="grid-inputs">
                    <div>
                      <div class="d-flex align-center rent">
                        <Switch v-model="person.isAnimals" :tumbler="person.isAnimals" :disable="false" :form="true" />
                        <v-label class="me-2" @click="person.isAnimals = !person.isAnimals">Животные:</v-label>
                      </div>
                      <v-text-field v-model="person.animals" :disabled="!person.isAnimals"
                        :class="{ 'input-disable': !person.isAnimals }" label="Количество животных" variant="outlined"
                        density="comfortable" rounded="lg" clearable v-maska="'#########'" type="number"/>
                    </div>
                    <div>
                      <div class="d-flex align-center rent">
                        <Switch v-model="person.isCars" :tumbler="person.isCars" :disable="false" :form="true" />
                        <v-label class="me-2" @click="person.isCars = !person.isCars">Транспорт:</v-label>
                      </div>
                      <v-text-field v-model="person.cars" label="Номер транспорта" :disabled="!person.isCars" variant="outlined"
                      density="comfortable" rounded="lg" clearable v-maska="carMask" />
                    </div>
                  </div>
                  <hr />
                  <h3 class="form-subtitle result">Стоимость: </h3><span>0</span>
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
            <!-- <div class="result_block">
              <h3 class="form-subtitle result">Итоговая стоимость: </h3><span>0</span>
            </div> -->
               <div class="actions">
                <v-btn class="btn-page" variant="outlined" @click="addPerson">
                  Добавить отдыхающего
                </v-btn>
                <v-btn class="btn-page" :disabled="!isChanged" type="submit">
                  Сохранить
                </v-btn>
              </div>
          </v-form>
        </v-card>
      </div>
    </v-container>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import Switch from "@/components/Switch/Switch.vue";
import glampingData from './../../../public/data/glamping.json';
import places from './../../../public/data/places.json';

defineOptions({ name: "AddClients" });

const title = "Регистрация отдыхающих";
const valid = ref(false);
const openedPanel = ref([0]);
const persons = reactive([createPerson()]);
const price = ref(null);

const tentTypes = [
  { title: "Без аренды", value: "own" },
  { title: "Стандарт", value: "standard" },
  { title: "Семейная", value: "family" },
  { title: "Премиум", value: "premium" },
];

const carMask = {
  mask: value => {
    if (!value) return 'A###AA###'
    const first = value[0]
    if (/[А-ЯЁ]/i.test(first))  return 'A###AA###'
    if (/\d/.test(first)) return '####AA##'
    return 'A###AA###'
  },
  tokens: {
    A: { pattern: /[А-ЯЁ]/i, transform: v => v.toUpperCase() },
    '#': { pattern: /\d/ }
  }
}
function onTentTypeChange(person, val) {
  person.tentType = val;
  // Если поляна недоступна — сброс
  if (!availableObjects(person).some(p => p.number === person.object)) {
    person.object = null;
  }
}

function availableObjects(person) {
  const type = person.tentType;
  const sortedPlaces = [...places].sort((a, b) => a.number - b.number);

  // Без аренды — все поляны доступны
  if (type === "own") {
    return sortedPlaces.map(p => ({
      number: p.number,
      label: `${p.number}. ${p.name}`
    }));
  }

  const today = new Date();
  return sortedPlaces
    .filter(place => {
      const totalTents = place[type] || 0;
      if (!totalTents) return false;

      // Считаем занятые палатки данного типа на этой поляне
      const occupied = persons.reduce((sum, client) => {
        if (!client.startDate || !client.endDate) return sum;
        const start = parseDate(client.startDate);
        const end = parseDate(client.endDate);
        // Проверяем пересечение дат проживания
        const overlap = !(end < today || start > today);
        if (overlap && client.tentType === type && client.object === place.number) {
          return sum + 1;
        }
        return sum;
      }, 0);
      return totalTents - occupied > 0;
    })
    .map(p => ({
      number: p.number,
      label: `${p.number}. ${p.name}`
    }));
}

function createPerson() {
  const emptyDoc = { seriesDocument: "", numberDocument: "", issuedDocument: "", cityDocument: "", dateDocument: "", dateInternal: null, dateMenu: false };
  return {
    surname: "", name: "", patronymic: "", date: "", phone: "", object: null,
    isCars: false, cars: "",
    isAnimals: false, animals: null,
    tentType: "own",
    startDate: null, endDate: null, price: null,
    dateMenu: false, startDateMenu: false, endDateMenu: false,
    dateInternal: null, startDateInternal: null, endDateInternal: null,
    selectedDoc: "passport",
    passport: { ...emptyDoc, codeDocument: "" },
    birth: { ...emptyDoc, actNumberDocument: "" },
    other: { typeDocument: "", dataDocument: "" },
  };
}

const addPerson = () => {
  persons.push(createPerson());
  openedPanel.value = [persons.length - 1];
};

const removePerson = (index) => {
  if (persons.length > 1) persons.splice(index, 1);
  openedPanel.value = [0];
};

const formatDate = (val) => {
  const d = new Date(val);
  return `${String(d.getDate()).padStart(2, "0")}.${String(d.getMonth() + 1).padStart(2, "0")}.${d.getFullYear()}`;
};

const parseDate = (str) => {
  if (!str) return null;
  const [dd, mm, yyyy] = str.split(".");
  return new Date(`${yyyy}-${mm}-${dd}`);
};

const onDateSelect = (val, index, field) => {
  const p = persons[index];
  p[field] = formatDate(val);
  if (field.endsWith("DateMenu")) return;
  if (field === "startDate" && p.endDate && new Date(val) > parseDate(p.endDate)) [p.startDate, p.endDate] = [p.endDate, p.startDate];
  if (field === "endDate" && p.startDate && new Date(val) < parseDate(p.startDate)) [p.startDate, p.endDate] = [p.endDate, p.startDate];
  if (field === "date") p.dateMenu = false;
  if (field === "startDate") p.startDateMenu = false;
  if (field === "endDate") p.endDateMenu = false;
};

const onDocDateSelect = (val, index, docType) => {
  const doc = persons[index][docType];
  doc.date = formatDate(val);
  doc.dateMenu = false;
};

const isChanged = computed(() =>
  persons.some(p => p.surname || p.name || p.patronymic || p.date || p.phone || p.object ||
    (p.isCars && p.cars) || (p.isAnimals && p.animals) || 
    p.startDate || p.endDate || p.price
  )
);

const saveForm = () => console.log(JSON.parse(JSON.stringify(persons)));
</script>

<style>
.v-field--disabled {
  background-color: rgba(204, 204, 204, .2);
}

.v-selection-control-group {
  flex-direction: row;
  margin-bottom: 20px;
}

@media (max-width: 610px) {
  .v-selection-control-group {
    flex-direction: column;
  }
}

.client .v-expansion-panel-text__wrapper {
  padding: 0 15px !important;
}

.v-expansion-panel-title {
  padding: 8px 16px !important;
  background: #edeef050;
}

.v-expansion-panel--active:not(:first-child) {
  margin-top: 0 !important;
}
</style>

<style scoped>
@import "./../../../public/form.css";


.content {
  margin-top: 20px;
  padding: 20px 10px;
  height: 76.5vh;
}

.wrapper_content {
  overflow: auto;
  height: 74vh;
}

.result_block {
  padding: 10px 15px;
  border: 1.5px solid #4a90e2;
  margin: 5px auto 20px;
  width: 60%;
  border-radius: 12px;
}
.docs-radio {
  display: flex;
  flex-direction: row;
  gap: 10px; /* расстояние между радио */
  margin-top: -15px;
  margin-bottom: -10px;
}

.docs-radio .v-radio {
  flex: none; /* не растягиваем */
  display: inline-flex;
  align-items: center;
  padding: 0 15px 0 0;
}

.docs-radio .v-radio .v-label,
.docs-radio .v-radio .v-input--selection-controls__ripple {
  white-space: nowrap;
}

.result {
  float: left;
  margin-right: 5px;
}

.result_block .result:first-of-type {
  margin-top: 10px;
}

span {
  color: #2d9ac5 !important;
  font-family: var(--font-family) !important;
  font-size: 2rem;
  margin: 7px auto 0;
  display: block;
  font-weight: 500;
}

.grid-boolean {
  grid-template-columns: repeat(2, 1fr);
}

.grid-inputs {
  grid-template-columns: repeat(3, 1fr);
}

@media (max-width: 992px) {
  .grid-inputs {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 1150px) {

  .content,
  .wrapper_content {
    height: auto;
  }
}

@media (max-width: 600px) {
  .result_block {
    padding: 5px 10px;
  }

  .result_block {
    width: 100%;
  }

  .content {
    padding: 10px 0;
  }

  .grid-inputs,
  .grid-boolean {
    grid-template-columns: 1fr;
  }
}

.rent {
  height: 60px;
  margin-top: -20px;
}

.rent .v-switch {
  margin-right: 10px;
}

.actions {
  display: flex;
  justify-content: flex-start;
  gap: 16px;
  margin-top: 10px;
  margin-bottom: 15px;
}

.btn-page{
  width: auto;
  margin: -10px 0;
}
</style>