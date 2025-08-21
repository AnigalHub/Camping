<template>
  <div>
    <v-container>
      <Title :title="title" :icon="'mdi-account-outline'"/>
      <div class="block-table">
        <v-row dense align="stretch">
          <v-col cols="9">
            <v-card class="settings-card" elevation="3">
              <v-card-text>
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-text-field v-model="login" label="E-mail" variant="outlined" rounded="lg" :rules="[rules.required]"
                    clearable />
                  <p class="section-title">Изменение пароля:</p>
                  <v-text-field v-model="currentPassword" label="Текущий пароль" variant="outlined" type="password"
                    rounded="lg" :rules="[rules.required, rules.min]" clearable />
                  <v-text-field v-model="newPassword" label="Новый пароль" variant="outlined" type="password"
                    rounded="lg" :rules="[rules.required, rules.min]" clearable />
                  <v-text-field v-model="confirmPassword" label="Повторите новый пароль" variant="outlined"
                    type="password" rounded="lg" :rules="[rules.required, rules.matchPassword]" clearable />
                  <v-btn class="btn-page">
                    Сохранить
                  </v-btn>
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col class="icon-col">
            <div class="icon-wrapper">
              <div class="block-icon">
                <img src="./../../../public/1.png" alt="Account security" class="camp-image" />
              </div>
              <p class="icon-caption">Безопасность аккаунта</p>
            </div>
          </v-col>
        </v-row>
      </div>
    </v-container>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineOptions({
  name: 'Settings'
})

const title = 'Учетная запись'

const login = ref('')
const currentPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const valid = ref(false)

const rules = {
  required: (v) => !!v || 'Поле обязательно',
  min: (v) => (v && v.length >= 6) || 'Минимум 6 символов',
  matchPassword: (v) => v === newPassword.value || 'Пароли не совпадают',
}
</script>

<style>
.v-field.v-field--appended {
  background: #fff !important;
}

.v-text-field:last-of-type {
  margin-bottom: 16px !important;
}
</style>
<style scoped>
.block-table {
  min-height: 82.5vh;
  padding: 15px 25px 15px 15px !important;
  display: flex;
  margin-top: 12px;
  align-items: center;
}

.section-title {
  margin-bottom: 10px;
  font-weight: 500;
  font-family: var(--font-family);
  color: #425e38;
  font-size: 1.05rem;
  letter-spacing: 0.3px;
}

.settings-card {
  padding: 30px 35px;
  margin: 0 15px;
  border-radius: 18px;
  background-color: rgba(255, 255, 255, 0.9) !important;
  border: 1px solid rgba(180, 180, 180, 0.3);
  backdrop-filter: blur(8px);
  box-shadow:
    0 8px 25px rgba(76, 175, 80, 0.12),
    inset 0 0 12px rgba(255, 255, 255, 0.25);
  transition: all 0.3s ease;
}

.settings-card:hover {
  box-shadow:
    0 12px 30px rgba(76, 175, 80, 0.2),
    inset 0 0 14px rgba(255, 255, 255, 0.35);
}

.camp-image {
  width: 68%;
  height: auto;
  object-fit: contain;
  filter: drop-shadow(0 6px 10px rgba(85, 139, 47, 0.12));
  transition: transform 0.4s ease;
}

.block-icon:hover .camp-image {
  transform: scale(1.1);
}
</style>

