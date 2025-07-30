<template>
  <div>
    <h2 v-html="title"></h2>
    <v-form>
      <!-- Личные данные -->
      <div v-if="name !== 'documents'">
        <h3 class="form-subtitle">Личные данные</h3>
        <div class="grid-inputs">
          <v-text-field v-model="object.surname" label="Фамилия" :disabled="disable" variant="outlined"
            density="comfortable" rounded="lg" clearable />
          <v-text-field v-model="object.name" label="Имя" :disabled="disable" variant="outlined" density="comfortable"
            rounded="lg" clearable />
          <v-text-field v-model="object.patronymic" label="Отчество" :disabled="disable" variant="outlined"
            density="comfortable" rounded="lg" clearable />
          <!-- Дата рождения -->
          <v-menu v-model="object.dateMenu" :close-on-content-click="false" transition="scale-transition" offset-y>
            <template #activator="{ props }">
              <v-text-field v-model="object.date" v-bind="props" label="Дата рождения" readonly variant="outlined"
                density="comfortable" rounded="lg" prepend-inner-icon="mdi-calendar" :disabled="disable" clearable />
            </template>
            <v-date-picker v-model="object.dateInternal" locale="ru" hide-header
              @update:model-value="val => onDateSelect(val, 'date')" />
          </v-menu>
          <v-text-field v-model="object.phone" label="Телефон" variant="outlined" density="comfortable" rounded="lg"
            clearable :disabled="disable" v-maska="'+7 (###) ###-##-##'" />
        </div>
        <hr />
      </div>
      <!-- Документы -->
      <h3 v-if="name !== 'documents'" class="form-subtitle">Документы</h3>
      <v-radio-group v-if="name === 'edit'" v-model="object.selectedDoc" class="docs-radio" row>
        <v-radio label="Паспорт" value="passport" class="radio-small" />
        <v-radio label="Свидетельство о рождении" value="birth" class="radio-large" />
        <v-radio label="Иное" value="other" class="radio-small" />
      </v-radio-group>
      <!-- Паспорт -->
      <div v-if="object.selectedDoc === 'passport'">
        <div class="grid-inputs">
          <v-text-field v-model="object.passport.seriesDocument" label="Серия" v-maska="'####'" variant="outlined"
            density="comfortable" rounded="lg" clearable :disabled="disable" />
          <v-text-field v-model="object.passport.numberDocument" label="Номер" v-maska="'######'" variant="outlined"
            density="comfortable" rounded="lg" clearable :disabled="disable" />
          <!-- Дата выдачи документа -->
          <v-menu v-model="object.dateMenuDocument" :close-on-content-click="false" transition="scale-transition"
            offset-y>
            <template #activator="{ props }">
              <v-text-field v-model="object.passport.dateDocument" v-bind="props" label="Дата выдачи" readonly
                variant="outlined" prepend-inner-icon="mdi-calendar" density="comfortable" rounded="lg" clearable
                :disabled="disable" />
            </template>
            <v-date-picker v-model="object.dateDocumentInternal" locale="ru" hide-header
              @update:model-value="onPassportDateSelect" />
          </v-menu>
          <v-text-field v-model="object.passport.codeDocument" label="Код подразделения" v-maska="'###-###'"
            variant="outlined" density="comfortable" rounded="lg" clearable :disabled="disable" />
          <v-text-field v-model="object.passport.cityDocument" label="Место рождения" variant="outlined"
            density="comfortable" rounded="lg" clearable :disabled="disable" />
        </div>
        <v-text-field v-model="object.passport.issuedDocument" label="Кем выдан" variant="outlined"
          density="comfortable" rounded="lg" clearable :disabled="disable" />
      </div>
      <!-- Свидетельство о рождении -->
      <div v-if="object.selectedDoc === 'birth'">
        <div class="grid-inputs">
          <v-text-field v-model="object.birth.seriesDocument" label="Серия" variant="outlined" density="comfortable"
            rounded="lg" clearable :disabled="disable" />
          <v-text-field v-model="object.birth.numberDocument" label="Номер" variant="outlined" density="comfortable"
            rounded="lg" clearable :disabled="disable" />
          <v-menu v-model="object.birth.dateMenu" :close-on-content-click="false" transition="scale-transition"
            offset-y>
            <template #activator="{ props }">
              <v-text-field v-model="object.birth.dateDocument" v-bind="props" label="Дата выдачи" readonly
                variant="outlined" density="comfortable" prepend-inner-icon="mdi-calendar" rounded="lg" clearable
                :disabled="disable" />
            </template>
            <v-date-picker v-model="object.birth.dateInternal" locale="ru" hide-header
              @update:model-value="onBirthDateSelect" />
          </v-menu>
          <v-text-field v-model="object.birth.actNumberDocument" label="Номер акта о рождении" variant="outlined"
            density="comfortable" rounded="lg" clearable :disabled="disable" />
          <v-text-field v-model="object.birth.cityDocument" label="Место рождения" variant="outlined"
            density="comfortable" rounded="lg" clearable :disabled="disable" />
        </div>
        <v-text-field v-model="object.birth.issuedDocument" label="Место государственной регистрации" variant="outlined"
          density="comfortable" rounded="lg" clearable :disabled="disable" />
      </div>
      <!-- Иное -->
      <div v-if="object.selectedDoc === 'other'">
        <v-text-field v-model="object.other.typeDocument" label="Название документа" variant="outlined"
          density="comfortable" rounded="lg" clearable />
        <v-textarea v-model="object.other.dataDocument" label="Данные документа" variant="outlined"
          density="comfortable" rounded="lg" clearable />
      </div>
      <!-- Даты проживания -->
      <div v-if="name !== 'documents'">
        <hr />
        <h3 class="form-subtitle">Даты проживания</h3>
        <div class="grid-inputs">
          <!-- Дата въезда -->
          <v-menu v-model="object.startDateMenu" :close-on-content-click="false" transition="scale-transition" offset-y>
            <template #activator="{ props }">
              <v-text-field v-model="object.startDate" v-bind="props" label="Дата въезда" readonly variant="outlined"
                density="comfortable" rounded="lg" :disabled="disable" prepend-inner-icon="mdi-calendar" clearable />
            </template>
            <v-date-picker v-model="object.startDateInternal" locale="ru" hide-header
              @update:model-value="val => onDateSelect(val, 'startDate')" />
          </v-menu>
          <!-- Дата выезда -->
          <v-menu v-model="object.endDateMenu" :close-on-content-click="false" transition="scale-transition" offset-y>
            <template #activator="{ props }">
              <v-text-field v-model="object.endDate" v-bind="props" label="Дата выезда" readonly variant="outlined"
                density="comfortable" rounded="lg" :disabled="disable" prepend-inner-icon="mdi-calendar" clearable />
            </template>
            <v-date-picker v-model="object.endDateInternal" locale="ru" hide-header
              @update:model-value="val => onDateSelect(val, 'endDate')" />
          </v-menu>
        </div>
        <hr />
        <!-- Дополнительные данные -->
        <h3 class="form-subtitle">Дополнительные данные</h3>
        <div class="grid-inputs">
          <v-text-field v-model="object.object" label="Поляна" variant="outlined" density="comfortable" rounded="lg"
            clearable v-maska="'#########'" />

          <v-select v-model="object.tentType" :items="tentTypes" item-title="title" item-value="value" label="Палатка"
            variant="outlined" density="comfortable" rounded="lg" />
        </div>
        <div class="grid-inputs">
          <div>
            <div class="d-flex align-center rent">
              <Switch v-model="object.isAnimals" :tumbler="object.isAnimals" :disable="false" :form="true" />
              <v-label class="me-2" @click="object.isAnimals = !object.isAnimals">Животные:</v-label>
            </div>
            <v-text-field v-model="object.animals" :disabled="!object.isAnimals"
              :class="{ 'input-disable': !object.isAnimals }" label="Количество животных" variant="outlined"
              density="comfortable" rounded="lg" clearable v-maska="'#########'" />
          </div>
          <div>
            <div class="d-flex align-center rent">
              <Switch v-model="object.isCars" :tumbler="object.isCars" :disable="false" :form="true" />
              <v-label class="me-2" @click="object.isCars = !object.isCars">Транспорт:</v-label>
            </div>
            <v-text-field v-model="object.cars" label="Номер транспорта" :disabled="!object.isCars" variant="outlined"
              density="comfortable" rounded="lg" clearable v-maska="carMask" />
          </div>
        </div>
        <hr />
        <h3 class="form-subtitle result">Стоимость: </h3><span>{{ object.price?.toLocaleString("ru-RU") }}</span>
      </div>
    </v-form>
    <!-- Кнопки -->
    <div class="btn-wrapper">
      <div class="btn-block">
        <v-btn v-if="name === 'edit'" class="btn-page" @click="$emit('submit', object)">Сохранить</v-btn>
        <div v-if="name === 'delete'" class="btn-delete">
          <v-btn class="btn-page" @click="emit('close')">Да</v-btn>
          <v-btn class="btn-page" @click="emit('close')">Нет</v-btn>
        </div>
        <v-btn v-if="name === 'documents'" class="btn-page" @click="emit('close')">Ок</v-btn>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, watch } from "vue";

const props = defineProps({
  name: String,
  object: Object,
  disable: {
    type: Boolean,
    default: false,
  }
});

const emit = defineEmits(["close", "submit"]);

const carMask = {
  mask: value => {
    if (!value) return 'A###AA###'
    const first = value[0]
    if (/[А-ЯЁ]/i.test(first)) return 'A###AA###'
    if (/\d/.test(first)) return '####AA##'
    return 'A###AA###'
  },
  tokens: {
    A: { pattern: /[А-ЯЁ]/i, transform: v => v.toUpperCase() },
    '#': { pattern: /\d/ }
  }
}

// ==== Форматирование dd.mm.yyyy ====
function formatDate(val) {
  if (!val) return "";
  let d;

  if (val instanceof Date) d = val;
  else if (typeof val === "string" && /^\d{4}-\d{2}-\d{2}/.test(val)) d = new Date(val);
  else if (typeof val === "string" && /^\d{2}\.\d{2}\.\d{4}$/.test(val)) return val;
  else return "";

  return `${String(d.getDate()).padStart(2, "0")}.${String(d.getMonth() + 1).padStart(2, "0")}.${d.getFullYear()}`;
}

// ==== Парсинг dd.mm.yyyy -> Date ====
function parseDate(val) {
  if (!val) return null;
  if (val instanceof Date) return val;

  if (typeof val === "string") {
    if (/^\d{2}\.\d{2}\.\d{4}$/.test(val)) {
      const [dd, mm, yyyy] = val.split(".");
      return new Date(`${yyyy}-${mm}-${dd}`);
    }
    if (/^\d{4}-\d{2}-\d{2}/.test(val)) return new Date(val);
  }
  return null;
}

// ==== ИНИЦИАЛИЗАЦИЯ ДАТ ВНЕШНЕГО ОБЪЕКТА ====
["date", "dateDocument", "startDate", "endDate"].forEach(field => {
  const original = props.object[field];
  props.object[field + "Internal"] = parseDate(original);
  props.object[field] = formatDate(original);
});

// ==== ИНИЦИАЛИЗАЦИЯ ДАТ ПАСПОРТА ====
props.object.passport.dateInternal = parseDate(props.object.passport.dateDocument);
props.object.passport.dateDocument = formatDate(props.object.passport.dateDocument);

// ==== ИНИЦИАЛИЗАЦИЯ ДАТ СВИДЕТЕЛЬСТВА О РОЖДЕНИИ ====
props.object.birth.dateInternal = parseDate(props.object.birth.dateDocument);
props.object.birth.dateDocument = formatDate(props.object.birth.dateDocument);

// ==== ОБРАБОТЧИКИ ====
function onDateSelect(val, field) {
  props.object[field + "Internal"] = val;
  props.object[field] = formatDate(val);
}

function onPassportDateSelect(val) {
  props.object.passport.dateInternal = val;
  props.object.passport.dateDocument = formatDate(val);
}

function onBirthDateSelect(val) {
  props.object.birth.dateInternal = val;
  props.object.birth.dateDocument = formatDate(val);
}

// ==== WATCH — ОБНОВЛЕНИЕ ПРИ РУЧНОМ ВВОДЕ ====
["date", "dateDocument", "startDate", "endDate"].forEach(field => {
  watch(() => props.object[field], val => {
    props.object[field + "Internal"] = parseDate(val);
  });
});

watch(() => props.object.passport.dateDocument, val => {
  props.object.passport.dateInternal = parseDate(val);
});

watch(() => props.object.birth.dateDocument, val => {
  props.object.birth.dateInternal = parseDate(val);
});

const tentTypes = [
  { title: "Своя", value: "own" },
  { title: "Стандарт", value: "standard" },
  { title: "Семейная", value: "family" },
  { title: "Премиум", value: "premium" },
];

// ==== Заголовок ====
const title = computed(() => {
  if (props.name === "documents") return "Документы";
  if (props.name === "edit") return "Изменение данных";
  if (props.name === "delete") return "Удалить запись ?";
  return "";
});
</script>



<style>
.v-field--disabled {
  opacity: 0.65 !important;
  background: #a1a1a30d;
}

.v-selection-control-group {
  flex-direction: row;
  margin-top: -15px;
  margin-bottom: -10px;
}

@media (max-width: 610px) {
  .v-selection-control-group {
    flex-direction: column;
  }
}
</style>

<style scoped>
@import "./../../../public/form.css";

.rent {
  height: 60px;
}

.rent .v-switch {
  margin-right: 10px;
}

.result_block {
  padding: 10px 15px;
  border: 1.5px solid #4a90e2;
  margin: 5px auto 20px;
  width: 60%;
  border-radius: 12px;
}

.docs-radio .radio-small {
  flex: 1;
}

.docs-radio .radio-large {
  flex: 2;
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

.grid-inputs {
  grid-template-columns: repeat(3, 1fr);
}

.grid-boolean {
  grid-template-columns: repeat(2, 1fr);
}

@media (max-width: 992px) {
  .grid-inputs {
    grid-template-columns: repeat(2, 1fr);
  }
}

.v-form {
  padding: 0 0 0 5px !important;
}

h2 {
  text-align: center;
  margin-top: -5%;
  margin-bottom: 5%;
  color: var(--color-title-modal);
  -webkit-text-stroke: var(--text-stroke-title-modal);
  font-family: var(--font-family);
  font-weight: 200;
  font-size: 1.4rem !important;
  border-bottom: var(--border-bottom-title-modal);
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

.v-col:has(.v-field--disabled) {
  padding-top: 0px !important;
  padding-bottom: 0px !important;
}

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
  margin-bottom: -10px;
}

.v-field__input {
  padding-top: 12px !important;
  padding-bottom: 4px !important;
  font-size: 0.93rem;
  line-height: 1.1;
}

.btn-page {
  margin: 20px auto 0;
}

.btn-wrapper {
  border-top: var(--border-bottom-content-modal);
  margin: 15px auto 10px;
}

.btn-block {
  width: 50%;
  margin: 0 auto 10px;
}

.btn-delete {
  display: flex;
  justify-content: center;
  gap: 15px;
}

.btn-delete .v-btn {
  flex: 1;
}

@media (max-width: 600px) {
  .result_block {
    padding: 5px 10px;
    width: 100%;
  }

  .grid-inputs,
  .grid-boolean {
    grid-template-columns: 1fr;
  }
}
</style>
