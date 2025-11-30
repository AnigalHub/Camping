<template>
  <div class="content">
    <v-row dense align="stretch">
      <v-col cols="9" style="overflow: auto;height: 65vh;">
        <v-card class="pa-6" elevation="2">
          <v-form>
            <h3 class="form-subtitle">Траты по лагерю</h3>
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
              <v-btn class="btn-page" :disabled="!isChanged" :class="{ 'btn-disabled': !isChanged }">Сохранить</v-btn>
            </div>
          </v-form>
        </v-card>
      </v-col>
       <v-col class="content-icons">
        <icon-circle :svg="ExpensesSvg" text="Расходы по содержанию лагеря"/>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import ExpensesSvg from "./svg/expenses.vue";
import { ref, onMounted, computed } from "vue";

const date = ref("");
const dateMenu = ref(false);
const dateInternal = ref(null);

const name = ref("");
const price = ref("");
const valid = ref(false);

const isChanged = computed(() => {
  return (
    date.value &&
    name.value &&
    price.value
  );
});

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
.content {
  padding: 20px 10px;
  height: 70vh;
}

.form-subtitle {
  margin: 10px 0 30px;
  font-family: var(--font-family-title);
  font-size: 1.35rem;
  font-weight: 600;
  letter-spacing: .7px;
  background: linear-gradient(90deg, #3f4a52, #7b6f5e, #3f4a52);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: relative;
}

.form-subtitle:first-of-type {
  margin-top: 0;
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

.btn-page {
  margin: 0 auto;
  width: 60%;
}

/* .v-picker.v-sheet {
  margin-top: -3.5%;
  border-radius: 15px !important;
} */

.modern-input {
  margin-bottom: 18px;
}

.textarea-large textarea {
  min-height: 120px !important;
  font-size: 15px;
  line-height: 1.5;
}

.v-card {
  overflow: initial;
}

@media (max-width:780px) {
  .v-col-9{
    flex: 0 0 100%;
    max-width: 100%;
  }
  .content-icons{
    display: none;
  }
}
</style>