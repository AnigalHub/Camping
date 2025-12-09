<template>
  <v-card class="profile-card pa-5 mx-auto">
    <div class="decor-layer">
      <div class="orbit-ring"></div>
      <div class="orbit orbit1"></div>
      <div class="orbit orbit2"></div>
    </div>
    <div class="d-flex align-center justify-space-between">
      <div class="d-flex align-center profile" @click="goRoute">
        <v-avatar size="60" class="mr-5 icon-main">
          <v-icon size="30">mdi-account-outline</v-icon>
        </v-avatar>
        <div>
          <div class="text">{{ admin.name }} {{ admin.surname[0] }}.</div>
          <div class="text-caption">Настройки</div>
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
  box-shadow: inset 0 0 10px rgba(255, 255, 255, 0.1), 2px 2px 8px rgb(136 145 136 / 12%) !important;
  margin-bottom: 32px;
  filter: blur(-3px);
  border-radius: 15px !important;
  background: linear-gradient(165deg, rgb(245 248 238), rgb(237 242 248 / 87%)) !important;
  backdrop-filter: blur(8px);
  border: 1px solid #006c9a3b;
}

.profile:hover .text-caption{
  color: #dc9c1b !important;
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
  width: 260px;
  height: 260px;
  top: -140px;
  right: -150px;
  border-color: rgba(0, 107, 153, .55);
}

.orbit2 {
  width: 85px;
  height: 85px;
  bottom: -8px;
  left: -11px;
  border-color: rgb(174 191 142);
  animation: floatAnim 4.5s ease-in-out infinite;
}

.orbit-ring {
  position: absolute;
  width: 130px;
  height: 130px;
  top: 15%;
  left: 90%;
  transform: translate(-50%, -50%);
  background: radial-gradient(circle, rgba(0, 107, 153, .08), transparent);
  filter: blur(15px);
  border-radius: 50%;
  animation: ringPulse 3s ease-in-out infinite;
}

.icon-main,
.icon-exit {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #f5f9ef;
  box-shadow: none !important;
}

.icon-main {
  width: 50px !important;
  height: 50px !important;
  border: 1.7px solid #cde0ac;
  animation: floatAnim-84d4b824 4.5s ease-in-out infinite;
}
.profile{
  width: 99%;
}

.icon-main i {
  color: rgb(174 191 142);
}
.profile:hover .icon-main i{
 color: #afda66;
}
.profile:hover .icon-main {
  border: 1.7px solid #afda66;
  background: #ffffffee;
}

.icon-exit {
  width: 42px !important;
  height: 42px !important;
  min-width: 42px !important;
  border: 1.5px solid #547c8f87;
  background: #e9f0f6 !important;
}

.icon-exit i {
  color: rgba(60, 95, 150, 0.75);
}

@keyframes ringPulse {

  0%,
  100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: .7;
  }

  50% {
    transform: translate(-50%, -50%) scale(1.25);
    opacity: 1;
  }
}

@keyframes orbitSpin {
  0% {
    transform: rotate(0deg);
    opacity: .7;
  }

  50% {
    opacity: 1;
  }

  100% {
    transform: rotate(360deg);
    opacity: .7;
  }
}

@keyframes floatAnim {

  0%,
  100% {
    transform: scale(1);
    opacity: .7;
  }

  50% {
    transform: scale(1.05);
    opacity: 1;
  }
}

@media (max-width: 850px) {
  .profile-card {
    margin-bottom: 20px;
  }

  .orbit1,
  .orbit2,
  .orbit-ring {
    opacity: .35;
  }
}
</style>
