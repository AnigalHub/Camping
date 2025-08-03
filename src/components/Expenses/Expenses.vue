<template>
  <div>
    <h2 v-html="title"></h2>
    <v-form>
      <v-menu v-model="dateMenu" :close-on-content-click="false" transition="scale-transition" offset-y
        @click:outside="closeDateMenuOutside">
        <template #activator="{ props }">
          <v-text-field v-model="object.date" v-bind="props" label="Дата" :disabled="disable" placeholder="дд.мм.гггг" variant="outlined"
            density="comfortable" rounded="lg" class="modern-input" :rules="[rules.required, rules.date]" clearable
            readonly></v-text-field>
        </template>
        <v-date-picker v-model="dateInternal" color="primary" hide-header locale="ru" @update:model-value="updateDate"
          @click:date="selectDate"></v-date-picker>
      </v-menu>
      <v-textarea v-model="object.text" label="Наименование" :disabled="disable" placeholder="Введите наименование и причины расходов"
        variant="outlined" density="comfortable" auto-grow rows="4" max-rows="6" rounded="lg" :rules="[rules.required]"
        class="modern-input textarea-large" clearable></v-textarea>
      <v-text-field v-model="object.price" label="Стоимость" :disabled="disable" placeholder="Введите сумму" variant="outlined"
        density="comfortable" rounded="lg" :rules="[rules.required, rules.numeric]" class="modern-input"
        @input="onPriceInput" clearable />
    </v-form>
    <!-- Кнопки -->
    <div class="btn-wrapper">
      <div class="btn-block">
        <v-btn v-if="name === 'edit'" class="btn-page" @click="$emit('submit', object)">Сохранить</v-btn>
        <div v-if="name === 'delete'" class="btn-delete">
          <v-btn class="btn-page" @click="emit('close')">Да</v-btn>
          <v-btn class="btn-page" @click="emit('close')">Нет</v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  name: String,
  object: Object,
  disable: {
    type: Boolean,
    default: false,
  }
});

const emit = defineEmits(["close", "submit"]);

const rules = {
  required: (v) => !!v || "Поле обязательно для заполнения",
  date: (v) =>
    !v ||
    /^\d{2}\.\d{2}\.\d{4}$/.test(v) ||
    "Введите дату в формате дд.мм.гггг",
  numeric: (v) => !v || /^[0-9]+$/.test(v) || "Только цифры",
};

// Форматирование даты
function updateDate(val) {
  if (!val) return;
  const d = new Date(val);
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  object.value.date = `${dd}.${mm}.${yyyy}`;
}

function selectDate() {
  dateMenu.value = false;
}

function closeDateMenuOutside() {
  dateMenu.value = false;
}

// Маска для цены
function onPriceInput(e) {
  object.value.price = e.target.value.replace(/[^\d]/g, "");
}

function saveForm() {
  if (!isChanged.value) return;

  console.log(object.value);
  alert("Форма успешно сохранена!");
}

const title = computed(() => {
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
</style>

<style scoped>
@import "./../../../public/form.css";

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
