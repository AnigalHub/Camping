<template>
  <v-app-bar class="d-flex justify-space-between position-fixed navbar">
    <v-app-bar-nav-icon @click="toggleDrawer" />
    <v-toolbar-title class="d-flex align-center logo-block">
      <div class="d-flex cursor-pointer" @click="router.push({ name: 'Home' })">
        <img src="./../../../../public/l3.png" alt="логотип" class="logo" />
        <v-toolbar-title class="d-flex align-center">
          <h1 class="d-inline-block text-center title">Ромашка</h1>
          <div class="text-center slogan">
            «Кемпинг у моря — природа, которой хочется делиться!»
          </div>
        </v-toolbar-title>
      </div>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <div class="d-flex buttons">
      <div v-for="menu in menus" :key="menu" class="d-flex cursor-pointer">
        <v-btn :icon="menu.icon" variant="text" size="small" class="btn" v-tooltip:bottom="menu.name"
          @click="goRoute(menu.route)" />
      </div>
    </div>
  </v-app-bar>
</template>

<script setup>
import { useRouter } from "vue-router";

const props = defineProps({
  drawer: Boolean,
});
const emit = defineEmits(["toggle-drawer"]);
const router = useRouter();
const toggleDrawer = () => {
  emit("toggle-drawer");
};

const menus = [
  { icon: "mdi-cog", name: "Настройки", route: "Settings" },
  { icon: "mdi-exit-to-app", name: "Выход", route: "Exit" },
];

function goRoute(name) {
  router.push({ name });
}
</script>
<style>
.v-toolbar__content {
  height: 50px !important;
}
</style>

<style scoped>
.navbar {
  border-radius: 0 0 15px 15px;
  border: 1.5px solid #fff;
  background: #fff !important;
  box-shadow: 0 2px 6px rgba(0, 0, 0, .1) !important;
}

.logo {
  width: 50px;
  height: 50px;
  margin: 1px 4px 0 0;
  transition: transform 1s ease;
  transform: translateZ(0);
  will-change: transform;
}

.logo-block:hover .logo {
  transform: rotate(45deg);
}

.title {
  font-family: "Amatic SC", cursive;
  font-weight: 700;
  color: #6f9233;
  font-size: 2.15rem;
  letter-spacing: 3px;
  margin-top: 3px;
}

.slogan {
  font-family: var(--font-family-slogan-home);
  color: #767677;
  -webkit-text-stroke: .04px #dfdfdf;
  font-size: .95rem;
  letter-spacing: 1px;
  margin: -12px 0 0 -10px;
}

h1,
.slogan,
.logo,
.buttons {
  position: relative;
  z-index: 4;
  animation: fadeSlide 1.2s ease-in-out;
}

.buttons {
  margin-right: 10px;
}

.btn {
  width: 38px;
  height: 38px;
  opacity: .65;
  transition: .2s;
  margin: -2px 10px 0 0;
  border-radius: 10px;
  color: #547c8f;
  border: 1.8px solid #547c8f;
}

.btn:hover {
  opacity: 1;
  transform: scale(1.15);
  background: #e9eff9;
}
</style>