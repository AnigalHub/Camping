<template>
  <div class="page">
    <v-container>
      <Title :title="title" :icon="'mdi-account-plus-outline'" />
      <div class="content">
        <v-row dense align="stretch">
          <v-col cols="9" style="overflow: auto; height: 65vh;">
            <v-card class="pa-6" elevation="2">
              <v-form v-model="valid" @submit.prevent="saveForm">
                <h3 class="form-subtitle">Личные данные</h3>
                <div class="grid-fields">
                  <v-text-field v-model="person.surname" label="Фамилия" variant="outlined" density="comfortable"
                    rounded="lg" clearable />
                  <v-text-field v-model="person.name" label="Имя" variant="outlined" density="comfortable" rounded="lg"
                    clearable />
                  <v-text-field v-model="person.patronymic" label="Отчество" variant="outlined" density="comfortable"
                    rounded="lg" clearable />
                  <v-menu v-model="dateMenu" :close-on-content-click="false" transition="scale-transition" offset-y>
                    <template #activator="{ props }">
                      <v-text-field v-model="person.date" v-bind="props" label="Дата рождения" variant="outlined"
                        density="comfortable" rounded="lg" prepend-inner-icon="mdi-calendar" clearable readonly />
                    </template>
                    <v-date-picker v-model="dateInternal" color="primary" locale="ru" hide-header
                      @update:model-value="updateDate" />
                  </v-menu>
                  <v-text-field v-model="person.phone" label="Телефон" variant="outlined" density="comfortable"
                    rounded="lg" clearable v-mask="'+7 (###) ###-##-##'" />
                </div>
                <hr />
                <h3 class="form-subtitle">Дополнительные данные</h3>
                <div class="grid-fields">
                  <v-text-field v-model="person.cars" label="Номер транспорта" variant="outlined" density="comfortable"
                    rounded="lg" clearable/>
                  <v-text-field v-model="person.animals" label="Количество животных" variant="outlined" density="comfortable" rounded="lg"
                    clearable v-mask="'#########'"/>
                </div>
                <div class="add-object-btn">
                  <v-btn class="btn-page" :disabled="!isChanged"
                    :class="{ 'btn-disabled': !isChanged }">Сохранить</v-btn>
                </div>
              </v-form>
            </v-card>
          </v-col>
          <v-col class="icon-col">
            <div class="icon-wrapper">
              <div class="block-icon">
                <component :is="PersonSvg" color="#61656d" style="padding: 10px" />
              </div>
              <p class="icon-caption">Данные о клиентах</p>
            </div>
          </v-col>
        </v-row>
      </div>
    </v-container>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import PersonSvg from "./svg/person.vue";

defineOptions({
  name: "AddClients",
});

const title = "Регистрация отдыхающих";
const valid = ref(false);

const dateMenu = ref(false);
const dateInternal = ref(null);

const person = reactive({
  surname: "",
  name: "",
  patronymic: "",
  date: "",
  phone: "",
  cars: null,
  animals: null,
});

function updateDate(val) {
  if (!val) return;

  const d = new Date(val);
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();

  person.date = `${dd}.${mm}.${yyyy}`;
  dateMenu.value = false;
}

/* Проверка изменённости */
const isChanged = computed(() => {
  return (
    person.surname ||
    person.name ||
    person.patronymic ||
    person.date ||
    person.phone
  );
});

function saveForm() {
  console.log("Сохранение:", JSON.parse(JSON.stringify(person)));
}
</script>

<style scoped>
.v-picker.v-sheet {
  margin-top: -3.5%;
  border-radius: 15px !important;
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
</style>
