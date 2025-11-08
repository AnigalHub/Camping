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
    <div class="d-flex">
      <div v-for="menu in menus" :key="menu" class="d-flex cursor-pointer buttons">
        <div
          @click="goRoute(menu.route)"
          class="d-flex button"
          v-tooltip:bottom="menu.name"
        >
          <component 
            v-if="menu.icon"
            :is="menu.icon"
            color="#547c8f"
            width="30px"
          />
        </div>
      </div>
    </div>
  </v-app-bar>
</template>

<script setup>
import { ref } from "vue";
import SettingsSvg from "./../../../svg/settings.vue";
import ExitSvg from "./../../../svg/exit.vue";
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
  { icon: SettingsSvg, name: "Настройки", route: "Settings" },
  { icon: ExitSvg, name: "Выход", route: "Exit" },
];

function goRoute(name) {
  router.push({ name });
}
</script>
<style >
.v-toolbar__content{
  height: 50px !important;
}
</style>

<style scoped>
.navbar {
  border-radius: 0 0 15px 15px;
  border: 1.5px solid rgba(255, 255, 255, 1);
  background: #fff !important;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1) !important;
}

.logo {
  width: 50px;
  height: 50px;
  margin-top: 1px;
  margin-right: 4px;
  transition: transform 1000ms ease;
  transform: translateZ(0);
  will-change: transform;
}

.logo-block:hover .logo{
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
  -webkit-text-stroke: 0.04px #dfdfdf;
  font-size: .95rem;
  letter-spacing: 1px;
  margin-top: -12px;
  margin-left: -10px;
}

h1,
.slogan,
.logo,
.buttons {
  position: relative;
  z-index: 4;
  animation: fadeSlide 1.2s ease-in-out;
}

.button {
  width: 42px;
  height: 42px;
  transition: all 0.25s ease;
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: #fff;
  border: 1.5px solid #618da2;
  box-shadow:
    0 1px 2px rgba(0, 0, 0, 0.05),
    inset 0 1px 2px rgba(0, 0, 0, 0.03);
  transition: all 0.3s ease;
}

.button:hover {
  transform: scale(1.05);
  background: #ecf9ff;
}
</style>