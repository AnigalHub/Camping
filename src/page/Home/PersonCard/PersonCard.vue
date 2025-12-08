<template>
  <v-card class="pa-5 mx-auto profile-card" elevation="8" rounded="xl">
    <div class="d-flex align-center justify-space-between">
      <div class="d-flex align-center" @click="goRoute">
        <v-avatar size="60" class="mr-4 icons">
          <v-icon size="30">mdi-account-outline</v-icon>
        </v-avatar>
        <div>
          <div class="text">Эдуард А.</div>
          <div class="text-caption text-medium-emphasis">Настройки</div>
        </div>
      </div>
      <v-btn class="icons">
        <v-icon size="20">mdi-logout</v-icon>
      </v-btn>
    </div>
  </v-card>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
function goRoute() {
  router.push('Account');
}
</script>

<style scoped>
.profile-card {
  backdrop-filter: blur(8px);
  background: linear-gradient(165deg, rgba(255, 255, 255, .96), rgba(255, 255, 255, .92)) !important;
  margin-bottom: 32px;
  border-radius: 15px !important;
}

.icons {
  width: 50px !important;
  height: 50px !important;
  min-width: 50px !important;
  border-radius: 50%;
  background: #fff;
  border: 1px solid rgba(60, 95, 150, 0.35);
  box-shadow: none !important;
}

.icons i {
  color: rgba(60, 95, 150, 0.75);
}

@media screen and (max-width: 850px) {
  .profile-card {
    margin-bottom: 20px;
  }
}
</style>
