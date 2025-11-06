<template>
  <div class="content">
    <v-row dense align="stretch">
      <!-- Левая часть — форма -->
      <v-col cols="9">
        <v-card class="pa-6" elevation="2">
          <v-form v-model="valid" @submit.prevent="saveForm">
            <!-- Дата -->
            <v-text-field
              v-model="date"
              label="Дата"
              placeholder="Введите дату (дд.мм.гггг)"
              variant="outlined"
              density="comfortable"
              rounded="lg"
              :rules="[rules.required, rules.date]"
              prepend-inner-icon="mdi-calendar"
              class="modern-input"
              @input="onDateInput"
            ></v-text-field>

            <!-- Наименование -->
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
              prepend-inner-icon="mdi-text"
              class="modern-input textarea-large"
            ></v-textarea>

            <!-- Стоимость -->
            <v-text-field
              v-model="price"
              label="Стоимость"
              placeholder="Введите сумму"
              variant="outlined"
              density="comfortable"
              rounded="lg"
              :rules="[rules.required, rules.numeric]"
              prepend-inner-icon="mdi-cash"
              class="modern-input"
              @input="onPriceInput"
            ></v-text-field>

            <!-- Кнопка -->
            <div class="mt-6">
              <v-btn type="submit" class="btn_page" rounded="lg" size="large">
                <v-icon start>mdi-content-save</v-icon>
                Сохранить
              </v-btn>
            </div>
          </v-form>
        </v-card>
      </v-col>

      <!-- Правая часть — иконка -->
      <v-col class="icon-col">
        <div class="icon-wrapper">
          <div class="block_icon">
            <img
              src="./../../../../public/1.png"
              alt="Account security"
              class="camp-image"
            />
          </div>
          <p class="icon-caption">Расходы по содержанию лагеря</p>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { ref } from "vue";

const date = ref("");
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

// Маска для даты (дд.мм.гггг)
function onDateInput(e) {
  let value = e.target.value.replace(/\D/g, "");
  if (value.length > 2) value = value.slice(0, 2) + "." + value.slice(2);
  if (value.length > 5) value = value.slice(0, 5) + "." + value.slice(5, 9);
  date.value = value.slice(0, 10);
}

// Маска для цены (только цифры)
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
  background: #f1f6fa;
  border: 1.5px solid #4170839e;
  color: #4b707f;
  font-weight: 800;
  font-family: "El Messiri", sans-serif;
  font-size: 1.1rem;
  text-transform: none !important;
  letter-spacing: 1px !important;
  border-radius: 10px;
  box-shadow: inset 0 0 10px rgba(255, 255, 255, 0.3),
    2px 2px 8px rgba(17, 44, 18, 0.1);
  transition: all 0.3s ease;
  padding: 10px 22px !important;
  min-height: 46px;
  min-width: 250px;
  width: 100%;
}

.btn_page:hover {
  transform: translateY(-2px);
  background: #fefefe;
}

.content {
  padding: 30px 10px;
  background: linear-gradient(
    to top,
    rgba(255, 255, 255, 0.7),
    rgba(255, 255, 255, 0.8)
  ) !important;
  box-shadow: inset 0 0 10px rgba(255, 255, 255, 0.3),
    2px 2px 8px rgba(17, 44, 18, 0.1) !important;
  border-radius: 15px !important;
  height: 70vh;
}

.icon-col {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  position: relative;
  overflow: hidden;
}

.icon-col::before {
  content: "";
  position: absolute;
  width: 400px;
  height: 400px;
  background: radial-gradient(
    circle,
    rgba(138, 181, 57, 0.18),
    transparent 70%
  );
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
  background: linear-gradient(180deg, #ffffff, #f3f7ef);
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 6px 15px rgba(85, 139, 47, 0.18),
    inset 0 0 10px rgba(255, 255, 255, 0.3);
  transition: all 0.5s ease;
  animation: breathe 5s ease-in-out infinite;
}

.block_icon:hover {
  transform: scale(1.06);
  box-shadow: 0 10px 25px rgba(76, 175, 80, 0.25),
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
  margin-top: 1.2rem;
  font-weight: 600;
  font-size: 1.05rem;
  color: #4d672c;
  font-family: var(--font-family);
  letter-spacing: 0.2px;
}
</style>
