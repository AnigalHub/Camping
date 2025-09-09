<template>
  <div class="page">
    <v-container>
      <Title :title="title" :icon="'mdi-account-plus-outline'" />
      <div class="content">
        <!-- <v-row dense align="stretch"> -->
        <!-- <v-col cols="9" style="overflow: auto; height: 65vh;" class="wrapper_content"> -->
        <v-card elevation="2" style="overflow: auto; height: 65vh;" class="wrapper_content pa-6">
          <v-form v-model="valid" @submit.prevent="saveForm">
            <!-- Блок с аккордеонами -->
            <v-expansion-panels v-model="openedPanel" multiple>
              <v-expansion-panel class="custom-panel" v-for="(person, index) in persons" :key="index">
                <v-expansion-panel-title class="custom-title d-flex justify-space-between align-center">
                  <strong>Отдыхающий №{{ index + 1 }}</strong>
                  <v-btn icon="mdi-delete" variant="text" size="small" class="delete-btn"
                    @click.stop="removePerson(index)" />
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

                    <!-- Дата рождения -->
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
                        <v-date-picker v-model="person.passport.dateInternal"
                          @update:model-value="val => onDocDateSelect(val, index, 'passport')" />
                      </v-menu>
                    </div>
                    <v-text-field v-model="person.passport.code" label="Код подразделения" variant="outlined"
                      density="comfortable" rounded="lg" clearable />
                    <v-text-field v-model="person.passport.issuedDocument" label="Кем выдан" variant="outlined"
                      density="comfortable" rounded="lg" clearable />
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
                        <v-date-picker v-model="person.birth.dateInternal"
                          @update:model-value="val => onDocDateSelect(val, index, 'birth')" />
                      </v-menu>
                    </div>
                    <v-text-field v-model="person.birth.actNumber" label="Номер акта о рождении" variant="outlined"
                      density="comfortable" rounded="lg" clearable />
                    <v-text-field v-model="person.passport.cityDocument" label="Место рождения" variant="outlined"
                      density="comfortable" rounded="lg" clearable />
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
                      </div>
                      <v-text-field v-model="person.cars" :disabled="!person.car"
                        :class="{ 'input-disable': !person.car }" label="Номер транспорта"
                        :variant="person.car ? 'outlined' : 'regular'" density="comfortable" rounded="lg" clearable
                        v-mask="'#########'" />
                    </div>
                    <div>
                      <div class="d-flex align-center rent">
                        <v-label class="me-2" @click="person.animal = !person.animal">Животные:</v-label>
                        <Switch v-model="person.animal" :tumbler="person.animal" :disable="false" :form="true" />
                      </div>
                      <v-text-field v-model="person.animals" :disabled="!person.animal"
                        :class="{ 'input-disable': !person.animal }" label="Количество животных"
                        :variant="person.animal ? 'outlined' : 'regular'" density="comfortable" rounded="lg" clearable
                        v-mask="'#########'" />
                    </div>
                    <div>
                      <div class="d-flex align-center rent">
                        <v-label @click="person.house = !person.house" class="me-2">Аренда домика:</v-label>
                        <Switch v-model="person.house" :tumbler="person.house" :disable="false" :form="true" />
                      </div>
                      <v-text-field v-model="person.home" :disabled="!person.house"
                        :class="{ 'input-disable': !person.house }" label="Номер домика"
                        :variant="person.house ? 'outlined' : 'regular'" density="comfortable" rounded="lg" clearable
                        v-mask="'#########'" />
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
                  <h3 class="form-subtitle">Итоговая стоимость</h3>
                  <div class="grid-fields">
                    <v-text-field v-model="person.price" label="Стоимость" variant="outlined" density="comfortable"
                      :disabled="true" rounded="lg" clearable v-mask="'#########'" />
                  </div>
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>

            <!-- Кнопка: добавить -->
            <div class="add-object-btn">
              <v-btn class="btn-page" @click="addPerson">Добавить отдыхающего</v-btn>
            </div>

            <div style="display: block;margin: 15px auto 0; width: 60%;">
              <h3 class="form-subtitle">Итоговая стоимость за всех отдыхающих</h3>
            </div>
            <div style="display: block;margin: -5px auto -5px; width: 30%;">
              <v-text-field v-model="price" label="Итоговая стоимость" variant="outlined" density="comfortable"
                :disabled="true" rounded="lg" clearable v-mask="'#########'" />
            </div>

            <!-- Кнопка: сохранить -->
            <div class="add-object-btn">
              <v-btn class="btn-page" :disabled="!isChanged" :class="{ 'btn-disabled': !isChanged }">
                Сохранить
              </v-btn>
            </div>
          </v-form>
        </v-card>
        <!-- </v-col> -->

        <!-- <v-col class="icon-col">
            <div class="icon-wrapper">
              <div class="block-icon">
                <component :is="PersonSvg" color="#61656d" style="padding: 10px" />
              </div>
              <p class="icon-caption">Данные о клиентах</p>
            </div>
          </v-col>
        </v-row> -->
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
const price = null;

function createPerson() {
  return {
    surname: "",
    name: "",
    patronymic: "",
    date: "",
    phone: "",
    object: null,
    car: false,
    cars: null,
    animal: false,
    animals: null,
    house: false,
    home: null,
    startDate: null,
    endDate: null,
    price: null,
    dateMenu: false,
    startDateMenu: false,
    endDateMenu: false,
    dateInternal: null,
    startDateInternal: null,
    endDateInternal: null,

    // Документы
    selectedDoc: "passport",
    passport: { series: "", number: "", code: "", issuedDocument: "", cityDocument: "", date: "", dateInternal: null, dateMenu: false },
    birth: { series: "", number: "", actNumber: "", issuedDocument: "", cityDocument: "", date: "", dateInternal: null, dateMenu: false },
    other: { type: "", data: "" }
  };
}

function addPerson() {
  persons.push(createPerson());
  openedPanel.value = [persons.length - 1];
}

function formatDate(val) {
  const d = new Date(val);
  return `${String(d.getDate()).padStart(2, "0")}.${String(d.getMonth() + 1).padStart(2, "0")}.${d.getFullYear()}`;
}

function parseDate(str) {
  if (!str) return null;
  const [dd, mm, yyyy] = str.split(".");
  return new Date(`${yyyy}-${mm}-${dd}`);
}

function onDateSelect(val, index, field) {
  const p = persons[index];
  p[field] = formatDate(val);

  if (field === "date") p.dateMenu = false;
  if (field === "startDate") p.startDateMenu = false;
  if (field === "endDate") p.endDateMenu = false;

  if (field === "startDate" && p.endDate) {
    if (new Date(val) > parseDate(p.endDate)) [p.startDate, p.endDate] = [p.endDate, p.startDate];
  }
  if (field === "endDate" && p.startDate) {
    if (new Date(val) < parseDate(p.startDate)) [p.startDate, p.endDate] = [p.endDate, p.startDate];
  }
}

function onDocDateSelect(val, index, docType) {
  const p = persons[index];
  const formatted = formatDate(val);
  if (docType === "passport") { p.passport.date = formatted; p.passport.dateMenu = false; }
  else if (docType === "birth") { p.birth.date = formatted; p.birth.dateMenu = false; }
}

const isChanged = computed(() =>
  persons.some(p =>
    p.surname || p.name || p.patronymic || p.date || p.phone || p.object ||
    (p.car && p.cars) || (p.animal && p.animals) || (p.house && p.home) ||
    p.startDate || p.endDate || p.price
  )
);

function removePerson(index) {
  if (persons.length === 1) return;
  persons.splice(index, 1);
  openedPanel.value = [0];
}

function saveForm() {
  console.log(JSON.parse(JSON.stringify(persons)));
}
</script>


<style>
.v-field--disabled {
  background-color: rgba(204, 204, 204, 0.2);
}

.v-selection-control-group {
  flex-direction: row !important;
}
</style>

<style scoped>
.docs-radio .radio-small {
  flex: 1;
  /* обычная ширина */
}

.docs-radio .radio-large {
  flex: 2;
  /* вторая кнопка в два раза шире */
}

/* Чтобы текст не переносился */
.docs-radio .v-radio .v-input--selection-controls__ripple,
.docs-radio .v-radio .v-label {
  white-space: nowrap;
}

.v-picker.v-sheet {
  margin-top: -3.5%;
  border-radius: 15px !important;
}

.rent {
  margin-top: -5px;
  height: 40px;
}

.content {
  margin-top: 20px;
  padding: 30px 10px;
  background: linear-gradient(to top,
      rgba(255, 255, 255, 0.7),
      rgba(255, 255, 255, 0.8)) !important;
  box-shadow: inset 0 0 10px rgba(255, 255, 255, 0.3),
    2px 2px 8px rgba(17, 44, 18, 0.1) !important;
  border-radius: 15px !important;
  height: 78vh;
}

.icon-col {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: -12% !important;
  position: relative;
  overflow: hidden;
}

.icon-col::before {
  content: "";
  position: absolute;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgb(57 131 181 / 50%), transparent 10%);
  filter: blur(40px);
  animation: pulse 6s ease-in-out infinite alternate;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 0.5;
  }

  100% {
    transform: scale(1.2);
    opacity: 0.8;
  }
}

.icon-wrapper {
  text-align: center;
  z-index: 2;
  padding: 30px 10px;
}

.block-icon {
  width: 9rem;
  height: 9rem;
  border-radius: 50%;
  border: 1px solid rgba(180, 180, 180, 0.3);
  background: linear-gradient(180deg, #ffffff, #eff5f7);
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 6px 15px rgba(47, 118, 139, 0.18),
    inset 0 0 10px rgba(255, 255, 255, 0.3);
  transition: all 0.5s ease;
  animation: breathe 5s ease-in-out infinite;
}

.block-icon:hover {
  transform: scale(1.06);
  box-shadow: 0 10px 25px rgba(47, 118, 139, 0.25),
    inset 0 0 15px rgba(255, 255, 255, 0.4);
}

@keyframes breathe {

  0%,
  100% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.08);
  }
}

.icon-caption {
  font-weight: 600;
  width: 100%;
  margin: 1.2rem auto 0;
  font-size: 1.6rem;
  color: #494c54;
  font-family: "Amatic SC", cursive;
  letter-spacing: 1.2px;
  -webkit-text-stroke: .05px #494c54;
}

.form-subtitle {
  margin: 10px 0 30px;
  padding-left: 4px;
  font-family: "Poiret One", sans-serif;
  font-size: 1.45rem;
  font-weight: 600;
  letter-spacing: 0.7px;
  background: linear-gradient(90deg, #3f4a52, #7b6f5e, #3f4a52);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shimmer 7s infinite linear;
  position: relative;
}

.form-subtitle:first-of-type {
  margin-top: 0;
}

@keyframes shimmer {
  0% {
    background-position: -160px 0;
  }

  100% {
    background-position: 160px 0;
  }
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
  opacity: 0.9;
}

hr {
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
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
  transition: 0.3s;
}

.btn-disabled {
  background: #393939 !important;
  border: 1.7px solid #fbf0f09e !important;
  cursor: not-allowed !important;
}

.grid-fields {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
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

/* Убираем тень карточки */
.v-expansion-panels,
.v-expansion-panel {
  box-shadow: none !important;
}

/* Общее оформление панели */
.custom-panel {
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 14px;
  margin-bottom: 14px;
  border-color: #4a90e2;
  background: #fff;
  transition: 0.25s ease;
}

/* Hover эффект */
.custom-panel:hover {
  background: #f8fbff;
}

/* Заголовок */
.custom-title {
  font-weight: 600;
  font-size: 1.15rem;
  padding: 10px 12px;
  color: #39424e;
  font-family: "El Messiri", sans-serif;
}

/* Оформление текста (контента) */
.custom-text {
  padding: 20px 10px 10px;
  background: #fafafa;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 0 0 14px 14px;
  animation: fadeIn 0.3s ease;
}

.v-expansion-panels {
  background: transparent !important;
}

/* Панель */
.custom-panel {
  border: 1.5px solid rgba(70, 120, 170, 0.35);
  border-radius: 18px;
  margin-bottom: 18px;
  background: linear-gradient(180deg, #ffffff, #f7f9fc);
  transition: all 0.25s ease;
  overflow: hidden;
  position: relative;
}

/* При наведении — лёгкая подсветка */
.custom-panel:hover {
  border-color: #4a90e2;
  background: linear-gradient(180deg, #ffffff, #f4f8ff);
}

/* Анимация появления */
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
  opacity: 0.8;
  transition: 0.2s;
  margin-left: 10px;
  margin-top: -2.5px;
  border: 1.5px solid rgba(70, 120, 170, 0.35);
  color: rgba(70, 120, 170, 0.8);
  border-radius: 10px;
}

.delete-btn:hover {
  opacity: 1;
  background-color: #f9f0ee;
  color: #c0392b;
  border: 1.5px solid #c0392b;
  transform: scale(1.15);
}
</style>