<template>
  <div class="content">
    <v-row dense align="stretch">
      <v-col cols="9" style="overflow: auto; height: 65vh;">
        <v-card class="pa-6" elevation="2">
          <v-form>
            <h3 class="form-subtitle">Данные профиля</h3>
            <v-text-field
              v-model="person.surname"
              label="Фамилия"
              variant="outlined"
              density="comfortable"
              rounded="lg"
              clearable
            />
            <v-text-field
              v-model="person.name"
              label="Имя"
              variant="outlined"
              density="comfortable"
              rounded="lg"
              clearable
            />
            <v-text-field
              v-model="person.patronymic"
              label="Отчество"
              variant="outlined"
              density="comfortable"
              rounded="lg"
              clearable
            />
            <v-text-field
              v-model="person.mail"
              label="Почта"
              variant="outlined"
              density="comfortable"
              rounded="lg"
              clearable
              @input="filterEmail"
            />
            <v-text-field
              v-model="person.phone"
              label="Телефон"
              variant="outlined"
              density="comfortable"
              rounded="lg"
              clearable
              v-mask="'+7 (###) ###-##-##'"
            />
            <v-btn
              class="btn-page"
              :disabled="!isChanged"
              :class="{ 'btn-disabled': !isChanged }"
            >
              Сохранить
            </v-btn>
          </v-form>
        </v-card>
      </v-col>
      <v-col class="content-icons">
        <icon-circle :svg="PersonSvg" text="Личная информация" />
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import PersonSvg from "./svg/person.vue";
import admin from "./../../../../public/data/admin.json";

const person = reactive(admin);

// фильтрация email
function filterEmail() {
  person.mail = person.mail.replace(/[^a-zA-Z0-9@._-]/g, "").toLowerCase();
}

const originalAdmin = ref(JSON.parse(JSON.stringify(person)));
const isChanged = computed(() => JSON.stringify(person) !== JSON.stringify(originalAdmin.value));
</script>

<style scoped>
@import "../../../../public/form.css";

.content {
  padding: 20px 10px;
  height: 70vh;
}

.v-card {
  overflow: initial;
}
</style>
