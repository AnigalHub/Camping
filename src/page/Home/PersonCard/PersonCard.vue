<template>
  <v-card class="profile-card pa-5 mx-auto">
    <div class="decor-layer">
      <div class="orbit-ring"></div>
      <div class="orbit orbit1"></div>
      <div class="orbit orbit2"></div>
    </div>
    <div class="d-flex align-center justify-space-between">
      <div class="d-flex align-center" @click="goRoute">
        <v-avatar size="60" class="mr-5 icon-main">
          <v-icon size="30">mdi-account-outline</v-icon>
        </v-avatar>
        <div>
          <div class="text">{{ admin.name }} {{ admin.surname[0] }}.</div>
          <div class="text-caption text-medium-emphasis">Настройки</div>
        </div>
      </div>
      <v-btn class="icon-exit">
        <v-icon size="20">mdi-logout</v-icon>
      </v-btn>
    </div>
  </v-card>
</template>

<script setup>
import admin from "./../../../../public/data/admin.json";
import { useRouter } from "vue-router";
const router = useRouter();
function goRoute() {
  router.push('Account');
}
</script>

<style scoped>
.profile-card {
  position: relative;
  overflow: hidden;
  margin-bottom: 32px;
  border-radius: 15px !important;
  background: linear-gradient(165deg, rgba(255,255,255,.96), rgba(255,255,255,.92)) !important;
  backdrop-filter: blur(8px);
  border: .65px solid #006c9a38;
}

.decor-layer {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}

.orbit {
  position: absolute;
  border-radius: 50%;
  border: 1.5px dashed;
  filter: blur(.3px);
  animation: orbitSpin 190s linear infinite;
}

.orbit1 {
  width: 260px; height: 260px;
  top: -140px; right: -150px;
  border-color: rgba(0,107,153,.55);
}

.orbit2 {
  width: 85px; height: 85px;
  bottom: -8px; left: -11px;
  border-color: #749339d3;
  animation: floatAnim 4.5s ease-in-out infinite;
}

.orbit-ring {
  position: absolute;
  width: 130px; height: 130px;
  top: 15%; left: 90%;
  transform: translate(-50%, -50%);
  background: radial-gradient(circle, rgba(0,107,153,.08), transparent);
  filter: blur(15px);
  border-radius: 50%;
  animation: ringPulse 3s ease-in-out infinite;
}

.icon-main,
.icon-exit {
  display: flex; align-items: center; justify-content: center;
  border-radius: 50%;
  background: #fff;
  box-shadow: none !important;
}

.icon-main {
  width: 50px !important;
  height: 50px !important;
  border: 1.7px solid #afd56885;
  animation: floatAnim 4.5s ease-in-out infinite;
}

.icon-main i {
  color: #afd568d3;
}

.icon-exit {
  width: 42px !important;
  height: 42px !important;
  min-width: 42px !important;
  border: 1.5px solid #547c8f87;
  background: #f3f8fa82 !important;
}

.icon-exit i {
  color: rgba(60,95,150,0.75);
}

@keyframes ringPulse {
  0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: .7; }
  50% { transform: translate(-50%, -50%) scale(1.25); opacity: 1; }
}

@keyframes orbitSpin {
  0% { transform: rotate(0deg); opacity: .7; }
  50% { opacity: 1; }
  100% { transform: rotate(360deg); opacity: .7; }
}

@keyframes floatAnim {
  0%, 100% { transform: scale(1); opacity: .7; }
  50% { transform: scale(1.05); opacity: 1; }
}

@media (max-width: 850px) {
  .profile-card { margin-bottom: 20px; }
  .orbit1, .orbit2, .orbit-ring { opacity: .35; }
}
</style>
