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
            clearable :disabled="disable" v-mask="'+7 (###) ###-##-##'" />
        </div>
        <hr />
      </div>
      <!-- Документы -->
      <h3 v-if="name !== 'documents'" class="form-subtitle">Документы</h3>
      <div class="grid-inputs">
        <v-text-field v-model="object.seriesDocument" label="Серия" v-mask="'####'" variant="outlined"
          density="comfortable" rounded="lg" clearable :disabled="disable" />
        <v-text-field v-model="object.numberDocument" label="Номер" v-mask="'######'" variant="outlined"
          density="comfortable" rounded="lg" clearable :disabled="disable" />
        <!-- Дата выдачи документа -->
        <v-menu v-model="object.dateMenuDocument" :close-on-content-click="false" transition="scale-transition"
          offset-y>
          <template #activator="{ props }">
            <v-text-field v-model="object.dateDocument" v-bind="props" label="Дата выдачи" readonly variant="outlined"
              prepend-inner-icon="mdi-calendar" density="comfortable" rounded="lg" clearable :disabled="disable" />
          </template>
          <v-date-picker v-model="object.dateDocumentInternal" locale="ru" hide-header
            @update:model-value="val => onDateSelect(val, 'dateDocument')" />
        </v-menu>
        <v-text-field v-model="object.codeDocument" label="Код подразделения" v-mask="'###-###'" variant="outlined"
          density="comfortable" rounded="lg" clearable :disabled="disable" />
        <v-text-field v-model="object.cityDocument" label="Место рождения" variant="outlined" density="comfortable"
          rounded="lg" clearable :disabled="disable" />
      </div>
      <v-text-field v-model="object.issuedDocument" label="Кем выдан" variant="outlined" density="comfortable"
        rounded="lg" clearable :disabled="disable" />
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

const title = computed(() => {
  if (props.name === "documents") return "Документы";
  if (props.name === "edit") return "Изменение данных";
  if (props.name === "delete") return "Удалить запись ?";
  return "";
});

// Форматирование dd.mm.yyyy
function formatDate(val) {
  if (!val) return "";
  let d;
  if (val instanceof Date) {
    d = val;
  } else if (typeof val === "string" && /^\d{4}-\d{2}-\d{2}/.test(val)) {
    // ISO формат
    d = new Date(val);
  } else if (typeof val === "string" && /^\d{2}\.\d{2}\.\d{4}$/.test(val)) {
    // Уже форматированная дата
    return val;
  } else {
    return "";
  }
  return `${String(d.getDate()).padStart(2, "0")}.${String(d.getMonth() + 1).padStart(2, "0")}.${d.getFullYear()}`;
}

// Парсинг из dd.mm.yyyy или Date
function parseDate(val) {
  if (!val) return null;
  if (val instanceof Date) return val;
  if (typeof val === "string") {
    if (/^\d{2}\.\d{2}\.\d{4}$/.test(val)) {
      const [dd, mm, yyyy] = val.split(".");
      return new Date(`${yyyy}-${mm}-${dd}`);
    } else if (/^\d{4}-\d{2}-\d{2}/.test(val)) {
      return new Date(val);
    }
  }
  return null;
}

// Инициализация внутренних дат
["date", "dateDocument", "startDate", "endDate"].forEach(field => {
  const original = props.object[field];
  props.object[`${field}Internal`] = parseDate(original);
  props.object[field] = formatDate(original);
});

// Обновление даты при выборе
function onDateSelect(val, field) {
  props.object[`${field}Internal`] = val;
  props.object[field] = formatDate(val);
}

// Слежение за изменением даты извне
["date", "dateDocument", "startDate", "endDate"].forEach(field => {
  watch(() => props.object[field], val => {
    props.object[`${field}Internal`] = parseDate(val);
  });
});
</script>

<style>
.v-field--disabled {
  opacity: 0.65 !important;
  background: #a1a1a30d;
}
</style>

<style scoped>
@import "./../../../public/form.css";

.grid-inputs {
  grid-template-columns: repeat(3, 1fr);
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
</style>
