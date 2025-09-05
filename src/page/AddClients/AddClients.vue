<template>
  <div class="page client">
    <v-container>
      <Title :title="title" :icon="'mdi-account-plus-outline'" />
      <div class="content">
        <v-card elevation="2" style="overflow: auto; height: 65vh;" class="wrapper_content pa-6">
          <v-form v-model="valid" @submit.prevent="saveForm">
            <v-expansion-panels v-model="openedPanel" multiple>
              <v-expansion-panel class="custom-panel" v-for="(person, index) in persons" :key="index">
                <v-expansion-panel-title v-slot="{ }">
                  <div class="panel-title">
                    <strong>Отдыхающий №{{ index + 1 }}</strong>
                    <v-btn icon="mdi-delete" variant="text" size="small" class="action delete-btn"
                      @click.stop="removePerson(index)" />
                  </div>
                </v-expansion-panel-title>
                <v-expansion-panel-text class="custom-text">
                  <!-- Личные данные -->
                  <h3 class="form-subtitle">Личные данные</h3>
                  <div class="grid-fields">
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
                      rounded="lg" clearable v-mask="'+7 (###) ###-##-##'" />
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
                    <div class="grid-fields">
                      <v-text-field v-model="person.passport.series" label="Серия" variant="outlined"
                        density="comfortable" rounded="lg" clearable />
                      <v-text-field v-model="person.passport.number" label="Номер" variant="outlined"
                        density="comfortable" rounded="lg" clearable />
                      <v-menu v-model="person.passport.dateMenu" :close-on-content-click="false"
                        transition="scale-transition" offset-y>
                        <template #activator="{ props }">
                          <v-text-field v-model="person.passport.date" v-bind="props" label="Дата выдачи" readonly
                            variant="outlined" density="comfortable" rounded="lg" clearable />
                        </template>
                        <v-date-picker v-model="person.passport.dateInternal" locale="ru" hide-header
                          @update:model-value="val => onDocDateSelect(val, index, 'passport')" />
                      </v-menu>
                      <v-text-field v-model="person.passport.code" label="Код подразделения" variant="outlined"
                        density="comfortable" rounded="lg" clearable />
                      <v-text-field v-model="person.passport.issuedDocument" label="Кем выдан" variant="outlined"
                        density="comfortable" rounded="lg" clearable />
                    </div>
                    <v-text-field v-model="person.passport.cityDocument" label="Место рождения" variant="outlined"
                      density="comfortable" rounded="lg" clearable />
                  </div>
                  <!-- Свидетельство о рождении -->
                  <div v-if="person.selectedDoc === 'birth'">
                    <div class="grid-fields">
                      <v-text-field v-model="person.birth.series" label="Серия" variant="outlined" density="comfortable"
                        rounded="lg" clearable />
                      <v-text-field v-model="person.birth.number" label="Номер" variant="outlined" density="comfortable"
                        rounded="lg" clearable />
                      <v-menu v-model="person.birth.dateMenu" :close-on-content-click="false"
                        transition="scale-transition" offset-y>
                        <template #activator="{ props }">
                          <v-text-field v-model="person.birth.date" v-bind="props" label="Дата выдачи" readonly
                            variant="outlined" density="comfortable" rounded="lg" clearable />
                        </template>
                        <v-date-picker v-model="person.birth.dateInternal" locale="ru" hide-header
                          @update:model-value="val => onDocDateSelect(val, index, 'birth')" />
                      </v-menu>
                      <v-text-field v-model="person.birth.actNumber" label="Номер акта о рождении" variant="outlined"
                        density="comfortable" rounded="lg" clearable />
                      <v-text-field v-model="person.passport.cityDocument" label="Место рождения" variant="outlined"
                        density="comfortable" rounded="lg" clearable />
                    </div>
                    <v-text-field v-model="person.passport.issuedDocument" label="Место государственной регистрации"
                      variant="outlined" density="comfortable" rounded="lg" clearable />
                  </div>
                  <!-- Иное -->
                  <div v-if="person.selectedDoc === 'other'">
                    <v-text-field v-model="person.other.type" label="Название документа" variant="outlined"
                      density="comfortable" rounded="lg" clearable />
                    <v-textarea v-model="person.other.data" label="Данные документа" variant="outlined"
                      density="comfortable" rounded="lg" clearable />
                  </div>
                  <hr />
                  <!-- Дополнительные данные -->
                  <h3 class="form-subtitle">Дополнительные данные</h3>
                  <div class="grid-fields">
                    <v-text-field v-model="person.object" label="Номер поляны" variant="outlined" density="comfortable"
                      rounded="lg" clearable v-mask="'#########'" />
                  </div>
                  <div class="grid-fields">
                    <div>
                      <div class="d-flex align-center rent">
                        <v-label class="me-2" @click="person.car = !person.car">Транспорт:</v-label>
                        <Switch v-model="person.car" :tumbler="person.car" :disable="false" :form="true" />
                        <v-text-field v-if="person.car" v-model="person.cars" :disabled="!person.car"
                          :class="{ 'input-disable': !person.car }" label="Номер транспорта" variant="outlined"
                          density="comfortable" rounded="lg" clearable v-mask="'#########'" />
                      </div>
                    </div>
                    <div>
                      <div class="d-flex align-center rent">
                        <v-label class="me-2" @click="person.animal = !person.animal">Животные:</v-label>
                        <Switch v-model="person.animal" :tumbler="person.animal" :disable="false" :form="true" />
                        <v-text-field v-if="person.animal" v-model="person.animals" :disabled="!person.animal"
                          :class="{ 'input-disable': !person.animal }" label="Количество животных" variant="outlined"
                          density="comfortable" rounded="lg" clearable v-mask="'#########'" />
                      </div>
                    </div>
                    <div>
                      <div class="d-flex align-center rent">
                        <v-label @click="person.house = !person.house" class="me-2">Аренда домика:</v-label>
                        <Switch v-model="person.house" :tumbler="person.house" :disable="false" :form="true" />
                        <v-text-field v-if="person.house" v-model="person.home" :disabled="!person.house"
                          :class="{ 'input-disable': !person.house }" label="Номер домика" variant="outlined"
                          density="comfortable" rounded="lg" clearable v-mask="'#########'" />
                      </div>
                    </div>
                  </div>
                  <hr />
                  <!-- Даты проживания -->
                  <h3 class="form-subtitle">Даты проживания</h3>
                  <div class="grid-fields">
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
                  <h3 class="form-subtitle result">Итоговая стоимость: </h3><span>0</span>
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
            <div
              style="padding: 10px 15px; border: 1.5px solid #4a90e2;margin: 5px auto 20px; width: 60%; border-radius: 10px;">
              <h3 class="form-subtitle result">Итоговая стоимость за всех отдыхающих: </h3><span>0</span>
            </div>
            <div class="add-object-btn">
              <v-btn class="btn-page" @click="addPerson">Добавить отдыхающего</v-btn>
            </div>
            <div class="add-object-btn">
              <v-btn class="btn-page" :disabled="!isChanged" :class="{ 'btn-disabled': !isChanged }">
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

defineOptions({ name: "AddClients" });

const title = "Регистрация отдыхающих";
const valid = ref(false);
const openedPanel = ref([0]);
const persons = reactive([createPerson()]);
const price = ref(null);

function createPerson() {
  const emptyDoc = { series: "", number: "", issuedDocument: "", cityDocument: "", date: "", dateInternal: null, dateMenu: false };
  return {
    surname: "", name: "", patronymic: "", date: "", phone: "", object: null,
    car: false, cars: null, animal: false, animals: null, house: false, home: null,
    startDate: null, endDate: null, price: null,
    dateMenu: false, startDateMenu: false, endDateMenu: false,
    dateInternal: null, startDateInternal: null, endDateInternal: null,
    selectedDoc: "passport",
    passport: { ...emptyDoc, code: "" },
    birth: { ...emptyDoc, actNumber: "" },
    other: { type: "", data: "" },
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
    (p.car && p.cars) || (p.animal && p.animals) || (p.house && p.home) ||
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
  flex-direction: row !important;
}
</style>

<style scoped>
.v-field--disabled {
  background-color: rgba(204, 204, 204, .2);
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

.v-picker.v-sheet {
  margin-top: -3.5%;
  border-radius: 15px !important;
}

.content {
  margin-top: 20px;
  padding: 20px 10px;
  background: linear-gradient(to top, rgba(255, 255, 255, .7), rgba(255, 255, 255, .8)) !important;
  box-shadow: inset 0 0 10px rgba(255, 255, 255, .3), 2px 2px 8px rgba(17, 44, 18, .1) !important;
  border-radius: 15px !important;
  height: 78vh;
}

.form-subtitle {
  margin: 10px 0 25px;
  padding-left: 4px;
  font-family: "Poiret One", sans-serif;
  font-size: 1.45rem;
  font-weight: 600;
  letter-spacing: .7px;
  background: linear-gradient(90deg, #3f4a52, #7b6f5e, #3f4a52);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shimmer 7s infinite linear;
  position: relative;
}

.result {
  float: left;
  margin-right: 5px;
}

span {
  color: #2d9ac5 !important;
  font-family: "El Messiri", sans-serif !important;
  font-size: 2rem;
  margin: 7px auto 0;
  display: block;
  font-weight: 500;
}

.form-subtitle::after {
  content: "";
  position: absolute;
  bottom: -6px;
  left: 0;
  width: 70px;
  height: 3px;
  border-radius: 3px;
  background: #2d9ac5;
  opacity: .9;
}

@keyframes shimmer {
  0% {
    background-position: -160px 0;
  }

  100% {
    background-position: 160px 0;
  }
}

hr {
  border: none;
  border-bottom: 1px solid rgba(70, 120, 170, .45);
}

.btn-page {
  background: #547c8f;
  color: #fff;
  font-weight: 800;
  font-family: "El Messiri", sans-serif;
  width: 60%;
  display: block;
  margin: 10px auto 0;
  border-radius: 12px;
  transition: .3s;
}

.btn-disabled {
  background: #393939 !important;
  cursor: not-allowed !important;
}

.grid-fields {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0 16px;
}

@media (max-width: 992px) {
  .grid-fields {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .grid-fields {
    grid-template-columns: 1fr;
  }
}

.v-expansion-panels,
.v-expansion-panel {
  box-shadow: none !important;
  background: transparent !important;
}

.custom-panel {
  border: 1.5px solid rgba(70, 120, 170, .35);
  border-radius: 18px;
  margin-bottom: 18px;
  background: linear-gradient(180deg, #fff, #f7f9fc);
  transition: .25s ease;
  overflow: hidden;
  position: relative;
}

.custom-panel:hover {
  border-color: #4a90e2;
  background: linear-gradient(180deg, #fff, #f4f8ff);
}

.custom-title {
  font-weight: 600;
  font-size: 1.15rem;
  padding: 10px 12px;
  color: #39424e;
  font-family: "El Messiri", sans-serif;
}

.custom-text {
  padding: 0 10px;
  background: #fafafa;
  border-top: 1px solid rgba(0, 0, 0, .06);
  border-radius: 0 0 14px 14px;
  animation: fadeIn .3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-4px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.delete-btn {
  opacity: .8;
  transition: .2s;
  margin-left: 10px;
  margin-top: -2.5px;
  border: 1.5px solid rgba(70, 120, 170, .35);
  color: rgba(70, 120, 170, .8);
  border-radius: 10px;
}

.delete-btn:hover {
  opacity: 1;
  background-color: #f7f2f1;
  color: #c0392b;
  border-color: #c0392b;
  transform: scale(1.15);
}

.rent {
  height: 60px;
}

.rent .v-switch {
  margin-right: 10px;
}

.panel-title {
  width: 100%;
  display: flex;
  align-items: center;
}

.panel-title .action {
  margin-left: auto;
  margin-right: 20px;
}

.client .v-expansion-panel-text__wrapper {
  padding: 8px 16px 16px !important;
}
</style>