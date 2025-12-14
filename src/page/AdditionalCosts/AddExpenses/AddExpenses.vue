<template>
  <div class="content">
    <v-row dense align="stretch">
      <v-col cols="9">
        <v-card class="pa-6" elevation="2">
          <v-form>
            <h3 class="form-subtitle">Траты по лагерю</h3>
            <v-menu v-model="dateMenu" :close-on-content-click="false" transition="scale-transition" offset-y
              @click:outside="closeDateMenuOutside">
              <template #activator="{ props }">
                <v-text-field 
                  v-model="object.date" 
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
              v-model="object.text" 
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
              v-model="object.price" 
              label="Стоимость" 
              placeholder="Введите сумму" 
              variant="outlined"
              density="comfortable" 
              rounded="lg" 
              :rules="[rules.required, rules.numeric]" 
              class="modern-input"
              @input="onPriceInput" 
              clearable
            />
            <v-btn class="btn-page" :disabled="!isChanged" :class="{ 'btn-disabled': !isChanged }">Сохранить</v-btn>
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

const object = ref({
  text: "",
  date: "",
  price: "",
});

const dateMenu = ref(false);
const dateInternal = ref(null);

const isChanged = computed(() => {
  return (
    object.value.date &&
    object.value.text &&
    object.value.price
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
  updateDate(dateInternal.value);
});

// Форматирование даты
function updateDate(val) {
  if (!val) return;
  const d = new Date(val);
  const dd = d.getDate().toString().padStart(2, "0");
  const mm = (d.getMonth() + 1).toString().padStart(2, "0");
  const yyyy = d.getFullYear();
  object.value.date = `${dd}.${mm}.${yyyy}`;
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
  object.value.price = e.target.value.replace(/[^\d]/g, "");
}

</script>


<style scoped>
@import "../../../../public/form.css";
.content {
  padding: 20px 10px;
  height: 70vh;
  margin-top: 10px;
}

.textarea-large textarea {
  min-height: 120px !important;
  font-size: 15px;
  line-height: 1.5;
}

.v-card {
  overflow: initial;
}
</style>