<template>
  <h2 v-html="title"></h2>

  <v-form>
    <v-row dense>
      <v-col v-for="(label, key) in filteredObject" :key="key" :cols="12" 
        :md="isWideField(key) ? 12 : 4">
        <v-text-field v-if="isISODate(model[key])" v-model="model[key]" type="date" variant="outlined"
          :label="label" rounded="lg" class="small-margin" :disabled="disable" />
        <v-text-field v-else-if="maskForField(key)" v-model="model[key]" :label="label" variant="outlined" rounded="lg"
          class="small-margin" :disabled="disable" v-mask="maskForField(key)" @input="onInput(key)" />
        <v-text-field v-else v-model="model[key]" :label="label" variant="outlined" rounded="lg" class="small-margin"
          :disabled="disable" />
      </v-col>
    </v-row>
  </v-form>
  <div class="btn-wrapper">
    <div class="btn-block">
      <v-btn v-if="name === 'edit'" class="btn-page" @click="emit('close')">Сохранить</v-btn>
      <div v-if="name === 'delete'" class="btn-delete">
        <v-btn class="btn-page" @click="emit('close')">Да</v-btn>
        <v-btn class="btn-page" @click="emit('close')">Нет</v-btn>
      </div>
      <v-btn v-if="name === 'documents'" class="btn-page" @click="emit('close')">Ок</v-btn>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed, watch } from "vue";

const props = defineProps({
  name: { type: String, default: "" },
  object: { type: Object, default: () => ({}) },
  disable: { type: Boolean, default: false },
});

const emit = defineEmits(["close"]);

/* -------------------- ПЕРЕВОД ИМЕН ПОЛЕЙ -------------------- */

const fieldMappingsDisable = {
  surname: "Фамилия",
  name: "Имя",
  patronymic: "Отчество",
  date: "Дата рождения",
  seriesDocument: "Серия",
  numberDocument: "Номер",
  codeDocument: "Код подразделения",
  dateDocument: "Дата выдачи",
  cityDocument: "Место жительства",
  issuedDocument: "Кем выдан",
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
/* -------------------- ФИЛЬТРАЦИЯ -------------------- */

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

/* -------------------- ЛОКАЛЬНАЯ МОДЕЛЬ -------------------- */
const model = reactive({});

for (const key in props.object) {
  const value = props.object[key];

  if (["date", "dateDocument", "startDate", "endDate"].includes(key)) {
    // преобразуем ISO → DD.MM.YYYY
    if (isISODate(value)) {
      const [y, m, d] = value.substring(0, 10).split("-");
      model[key] = `${d}.${m}.${y}`;
    } else {
      model[key] = value;
    }
  } else if (isISODate(value)) {
    model[key] = value.substring(0, 10);
  } else {
    model[key] = value;
  }
}

/* -------------------- СИНХРОНИЗАЦИЯ -------------------- */

watch(
  () => model,
  (val) => {
    for (const key in val) {
      if (["date", "dateDocument", "startDate", "endDate"].includes(key)) {
        const v = val[key];
        if (v && /^\d{2}\.\d{2}\.\d{4}$/.test(v)) {
          const [d, m, y] = v.split(".");
          props.object[key] = `${y}-${m}-${d}T00:00:00`;
        }
        continue;
      }

      if (isISODate(props.object[key])) {
        props.object[key] = val[key] ? val[key] + "T00:00:00" : null;
      } else {
        props.object[key] = val[key];
      }
    }
  },
  { deep: true }
);

/* -------------------- МАСКИ -------------------- */

function maskForField(key) {
  switch (key) {
    case "phone":
      return "+7 (###) ###-##-##";
    case "seriesDocument":
      return "####";
    case "numberDocument":
      return "######";
    case "codeDocument":
      return "###-###";
    case "price":
      return "################";
    case "object":
    case "animals":
      return "############";
    case "cars":
      return ["####SS##", "S###SS###"];
    case "startDate":
    case "endDate":
      return "##.##.####";
    default:
      return null;
  }
}


function onInput(key) {
  if (key === "cars" && model[key]) {
    model[key] = model[key].toUpperCase();
  }
}

/* -------------------- Проверка ISO -------------------- */

function isISODate(value) {
  return (
    typeof value === "string" &&
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(value)
  );
}

/* -------------------- Широкие поля -------------------- */

function isWideField(key) {
  return key === "issuedDocument" ;
}
</script>

<style>
.v-field--disabled {
  opacity: 0.65 !important;
}
</style>

<style scoped>
.v-form {
  height: max-content;
  padding: 0 0 20px 0;
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
  align-items: center;
  gap: 15px;
}

.btn-delete .v-btn {
  flex: 1;
  max-width: 47%;
}

@media (max-width: 960px) {
  .btn-block {
    width: 70%;
  }
}

@media (max-width: 500px) {
  .v-form {
    margin-top: 0.2px;
  }
}

@media (max-width: 1100px) {
  .btn-block {
    width: 100%;
  }
}
</style>
