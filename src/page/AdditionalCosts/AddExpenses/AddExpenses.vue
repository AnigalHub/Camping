<template>
  <div class="content">
    <v-row dense align="stretch">
      <v-col cols="9">
        <v-card class="pa-6" elevation="2">
          <v-form v-model="valid" @submit.prevent="saveForm">
            <v-menu v-model="dateMenu" :close-on-content-click="false" transition="scale-transition" offset-y
              @click:outside="closeDateMenuOutside">
              <template #activator="{ props }">
                <v-text-field 
                  v-model="date" 
                  v-bind="props" 
                  label="Дата" 
                  placeholder="дд.мм.гггг" 
                  variant="outlined"
                  density="comfortable" 
                  rounded="lg" 
                  class="modern-input" 
                  :rules="[rules.required, rules.date]"
                  clearable 
                  readonly
                ></v-text-field>
              </template>
              <v-date-picker 
                v-model="dateInternal" 
                color="primary" 
                hide-header 
                locale="ru"
                @update:model-value="updateDate" 
                @click:date="selectDate"
              ></v-date-picker>
            </v-menu>
            <v-textarea 
              v-model="name" 
              label="Наименование" 
              placeholder="Введите наименование и причины расходов"
              variant="outlined" 
              density="comfortable" 
              auto-grow 
              rows="4" 
              max-rows="6" 
              rounded="lg"
              :rules="[rules.required]" 
              class="modern-input textarea-large" 
              clearable
            ></v-textarea>
            <v-text-field 
              v-model="price" 
              label="Стоимость" 
              placeholder="Введите сумму" 
              variant="outlined"
              density="comfortable" 
              rounded="lg" 
              :rules="[rules.required, rules.numeric]" 
              class="modern-input"
              @input="onPriceInput" 
              clearable></v-text-field>
            <div class="mt-6">
              <v-btn 
                type="submit" 
                class="btn_page" 
                rounded="lg" 
                size="large"
              >Сохранить</v-btn>
            </div>
          </v-form>
        </v-card>
      </v-col>
      <v-col class="icon-col">
        <div class="icon-wrapper">
          <div class="block_icon">
            <component
            :is="ExpensesSvg"
            color="#61656d"
            style="padding: 20px;"
          />
          <!-- <img src="./../../../../public/2.png" alt="Account security" class="camp-image" /> -->
          </div>
          <p class="icon-caption">Расходы по содержанию лагеря</p>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import ExpensesSvg from "./svg/expenses.vue";
import { ref, onMounted } from "vue";

const date = ref("");
const dateMenu = ref(false);
const dateInternal = ref(null);

const name = ref("");
const price = ref("");
const valid = ref(false);

const rules = {
  required: (v) => !!v || "Поле обязательно для заполнения",
  date: (v) =>
    !v ||
    /^\d{2}\.\d{2}\.\d{4}$/.test(v) ||
    "Введите дату в формате дд.мм.гггг",
  numeric: (v) => !v || /^[0-9]+$/.test(v) || "Только цифры",
};

onMounted(() => {
  const today = new Date();
  // Формируем yyyy-mm-dd вручную в локальном времени
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  dateInternal.value = `${yyyy}-${mm}-${dd}`;
  updateDate(dateInternal.value); // выставляем в поле
});


// Форматирование даты для отображения
function updateDate(val) {
  if (!val) return;
  const d = new Date(val);
  const dd = d.getDate().toString().padStart(2, "0");
  const mm = (d.getMonth() + 1).toString().padStart(2, "0");
  const yyyy = d.getFullYear();
  date.value = `${dd}.${mm}.${yyyy}`;
}

// Закрытие меню при выборе даты
function selectDate() {
  dateMenu.value = false;
}

// Закрытие меню при клике вне
function closeDateMenuOutside() {
  dateMenu.value = false;
}

// Маска для цены
function onPriceInput(e) {
  price.value = e.target.value.replace(/[^\d]/g, "");
}

function saveForm() {
  if (valid.value) {
    console.log({
      date: date.value,
      name: name.value,
      price: price.value,
    });
    alert("Форма успешно сохранена!");
  }
}
</script>


<style scoped>
.modern-input {
  margin-bottom: 18px;
}

/* Увеличиваем поле "Наименование" */
.textarea-large textarea {
  min-height: 120px !important;
  font-size: 15px;
  line-height: 1.5;
}

/* Кнопка */
.btn_page {
  background: #547c8f;
  color: #fff;
  font-weight: 800;
  font-family: "El Messiri", sans-serif;
  font-size: 1.05rem;
  border-radius: 12px !important;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 12px rgba(50, 70, 90, 0.08);
  transition: all 0.3s ease;
  padding: 10px 22px !important;
  min-height: 46px;
  min-width: 220px;
  margin: 0 auto;
  display: block;
  width: 60%;
}

.btn_page:hover {
  transform: translateY(-2px);
  background: #3b5865;
}

.content {
  padding: 30px 10px;
  background: linear-gradient(to top,
      rgba(255, 255, 255, 0.7),
      rgba(255, 255, 255, 0.8)) !important;
  box-shadow: inset 0 0 10px rgba(255, 255, 255, 0.3),
    2px 2px 8px rgba(17, 44, 18, 0.1) !important;
  border-radius: 15px !important;
  height: 70vh;
}

.icon-col {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: -8%;
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

.block_icon {
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

.block_icon:hover {
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

.camp-image {
  width: 68%;
  height: auto;
  object-fit: contain;
  filter: drop-shadow(0 6px 10px rgba(85, 139, 47, 0.12));
  transition: transform 0.4s ease;
}

.block_icon:hover .camp-image {
  transform: scale(1.1);
}

.icon-caption {
  font-weight: 600;
  width: 75%;
  margin: 1.2rem auto 0;
  font-size: 1.6rem;
  color: #494c54;
  font-family: "Amatic SC", cursive;
  letter-spacing: 1.2px;
  -webkit-text-stroke: .05px #494c54;
}

.v-card {
  overflow: initial;
}
</style>