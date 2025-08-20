<template>
  <div class="content">
    <v-row dense align="stretch">
      <v-col cols="9" style="overflow: auto;height: 65vh;">
        <v-card class="pa-6" elevation="2">
          <v-form>
            <h3 class="form-subtitle">Безопасность профиля</h3>
            <v-text-field
              v-model="person.login"
              label="Логин"
              variant="outlined"
              density="comfortable"
              rounded="lg"
              clearable
              disabled
            />
            <v-text-field
              v-model="person.password1"
              :type="showPassword.password1 ? 'text' : 'password'"
              label="Текущий пароль"
              variant="outlined"
              density="comfortable"
              rounded="lg"
              clearable
              :append-inner-icon="showPassword.password1 ? 'mdi-eye-off' : 'mdi-eye'"
              @click:append-inner="togglePassword('password1')"
            />
            <hr />
            <v-text-field
              v-model="person.password2"
              :type="showPassword.password2 ? 'text' : 'password'"
              label="Новый пароль"
              variant="outlined"
              density="comfortable"
              rounded="lg"
              clearable
              :append-inner-icon="showPassword.password2 ? 'mdi-eye-off' : 'mdi-eye'"
              @click:append-inner="togglePassword('password2')"
            />
            <v-text-field
              v-model="person.password3"
              :type="showPassword.password3 ? 'text' : 'password'"
              label="Повторите пароль"
              variant="outlined"
              density="comfortable"
              rounded="lg"
              clearable
              :append-inner-icon="showPassword.password3 ? 'mdi-eye-off' : 'mdi-eye'"
              @click:append-inner="togglePassword('password3')"
            />
            <v-btn class="btn-page" :disabled="!isChanged" :class="{ 'btn-disabled': !isChanged }">
              Сохранить
            </v-btn>
          </v-form>
        </v-card>
      </v-col>
      <v-col class="content-icons">
        <icon-circle :svg="PasswordSvg" text="Обновление пароля" />
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import PasswordSvg from "./svg/password.vue";
import admin from "./../../../../public/data/admin.json";

// Переключатели видимости пароля
const showPassword = reactive({
  password1: false,
  password2: false,
  password3: false,
});

function togglePassword(field) {
  showPassword[field] = !showPassword[field];
}

const person = reactive(admin);
const originalAdmin = ref(JSON.parse(JSON.stringify(person)));
const isChanged = computed(() => JSON.stringify(person) !== JSON.stringify(originalAdmin.value));
</script>

<style scoped>
@import "../../../../public/form.css";

.content {
  padding: 20px 10px;
  height: 70vh;
}

hr {
  margin-top: 20px;
  margin-bottom: 40px;
}

.v-card {
  overflow: initial;
}
</style>