<template>


    <v-app>
  <v-app-bar style="
          display: flex; 
          justify-content: space-between; 
          position: fixed;
          border-radius: 0 0 15px 15px;
          border: 1.5px solid rgba(255, 255, 255, 1);
          background: #fff !important;
          padding: 5px 15px 5px !important;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1) !important;
        ">
      <v-app-bar-nav-icon @click="toggleDrawer" />
      <v-toolbar-title class="d-flex align-center">
      <div style="display: flex;">
          <img src="./../../../public/l3.png" style="width: 50px; margin-right: 4px; height: 50px;"
            class="logo" />
          <v-toolbar-title class="d-flex align-center">
            <h1 class="title">Ромашка</h1>
            <div class="slogan">«Кемпинг у моря — природа, которой хочется делиться!»</div>
          </v-toolbar-title>
        </div>
         
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <div class="buttons_options">
        <div v-for="menu in menus1" :key="menu" class="buttons">
          <div @click="goRoute(menu.route)" class="button" v-tooltip:bottom="menu.name">
            <component v-if="menu.icon" :is="menu.icon" :color="'#104155'" class="icon" />
          </div>
        </div>
      </div>
    </v-app-bar>

    <div class="layout-container">
      <!-- Боковое меню -->
      <v-navigation-drawer
        v-model="drawer"
        v-show="drawer || isWideScreen"
        class="custom-drawer"
        :class="{ 'drawer-fixed': drawer || isWideScreen }"
        :permanent="isWideScreen"
        :width="drawerWidth"
      >
        <v-list>
          <v-list-item
            v-for="item in menus"
            :prepend-icon="item.icon"
            :key="item.title"
            @click="router.push({ name: item.route })"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <!-- Контент -->
      <v-main>
        <router-view  style="margin-top: 53px;"/>
      </v-main>
    </div>
    <modal v-for="(modal, index) in modals" v-bind="modal" :key="index" :value="modal.isVisible" />
  </v-app>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from 'vuex';

import RegistrationSvg from './svg/registration.vue'
import ListClientsSvg from './svg/listclients.vue'
import SettingsSvg from './svg/settings.vue'
import ExitSvg from './svg/exit.vue'
import { loadComponent } from './utils/loadComponent';
const Modal = loadComponent('Modal');
const store = useStore();
const modals = computed(() => store.getters['Modal/modals']);

/** Проверка видимости модального окна по имени */
function isModalVisible(name) {
  const found = modals.value.find(x => x.name === name);
  return found ? found.isVisible : false;
}



const router = useRouter();
const drawer = ref(false);
const isWideScreen = ref(window.innerWidth >= 1100);

// ширина бокового меню
const drawerWidth = computed(() => (isWideScreen.value ? 260 : 240));

const toggleDrawer = () => {
  drawer.value = !drawer.value;
};

const handleResize = () => {
  isWideScreen.value = window.innerWidth >= 1100;
  drawer.value = isWideScreen.value; // на широком экране меню всегда открыто
};

onMounted(() => {
  window.addEventListener("resize", handleResize);
  handleResize();
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});

const menus = [
  { icon:'mdi-account-plus-outline', title: "Регистрация клиентов", route: "AddClients" },
  { icon:'mdi-account-group-outline', title: "Список клиентов", route: "ListClients" },
  { icon:'mdi-calendar-clock-outline', title: "Ближайшие выезды", route: "Trips" },
  { icon:'mdi-tent', title: "Свободные поляны", route: "MapObjects" },
  { icon:'mdi-cash-multiple', title: "Учет расходов", route: "AdditionalCosts" },
  { icon:'mdi-cog-outline', title: "Настройки", route: "AdditionalCosts" },
];

const menus1= [
  { icon: SettingsSvg, name: 'Настройки', route: 'Settings' },
  { icon: ExitSvg, name: 'Выход', route: 'Exit' },
]
function goRoute(name) {
  router.push({ name })
}

</script>


<style>
@import './../public/style.css';

/**Фон страниц */
.content_wrapper {
  background: var(--background-color-page);
  min-height: 100vh;
  height: auto;
}

.wrapper::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--background-img-page);
  background-size: var(--background-size-img-page);
  filter: var(--filter-background-page);
  z-index: 1;
}

.wrapper>* {
  position: relative;
  z-index: 2;
}


/* Заголовок */
.title {
  font-family: "Amatic SC", cursive;
  font-size: 2.25rem;
  font-weight: 700;
  letter-spacing: 3px;
  display: inline-block;
  color: #6F9233;
  text-align: center;
}

.slogan {
  -webkit-text-stroke: .04px #dfdfdf;
  font-family: "Pacifico", cursive;
  color: #767677;
  letter-spacing: 1px;
  font-size: 1rem;
  font-weight: 100;
  text-align: center;
  opacity: 1;
  margin-top: -8px;
  margin-left: -10px;
}


/**Заголовок страниц */
.page h1 {
  -webkit-text-stroke: none;
  font-family: "Poiret One", sans-serif;
  color: #455e25;
  margin-top: 2px;
  letter-spacing: 0.009375em;
  font-size: 1.65rem !important;
  background: var(--background-h1);
  box-shadow: var(--box-shadow-h1);
  border-radius: var(--border-radius-h1);
  border: var(--border-h1);
  border-color: var(--border-color-h1);
  width: max-content;
  display: block;

  padding-left: .6rem;

}

/**Скролл */
::-webkit-scrollbar {
  width: var(--size-scrollbar);
  height: var(--size-scrollbar);
}

::-webkit-scrollbar-thumb {
  background-color: var(--background-slider-scrollbar);
  border-radius: var(--border-radius-slider-scrollbar);
  border: var(--border-slider-scrollbar);
  border-color: var(--border-color-slider-scrollbar);
}

::-webkit-scrollbar-track {
  background-color: var(--background-track-scrollbar);
  border-radius: var(--border-radius-track-scrollbar);
  border: var(--border-track-scrollbar);
  border-color: var(--border-color-track-scrollbar);
}

/**Кнопки страниц */
.btn_page {
  color: var(--color-btn-page) !important;
  -webkit-text-stroke: var(--text-stroke-btn-page);
  text-transform: none !important;
  letter-spacing: var(--letter-spacing-btn-page) !important;
  font-family: var(--font-family-main) !important;
  font-size: .95rem !important;
  background: var(--background-btn-page) !important;
  border-radius: var(--border-radius-btn-page) !important;
  border: var(--border-btn-page) !important;
  border-color: var(--border-color-btn-page) !important;
  box-shadow: var(--box-shadow-btn-page) !important;
  width: 100%;
  padding: 10px !important;
  min-height: 42px;
  margin-top: 5px;
}

.content, .block_search {
  padding: 15px 10px;
  background: var(--background-content-card) !important;
  box-shadow: var(--box-shadow-content-card) !important;
  border-radius: var(--border-radius-content-card) !important;
}

.block_search {
  height: 10vh;
  margin-bottom: 3vh;
  padding-top: 0;
}

.v-card-text {
  padding: 1rem 5px 0 0 !important;
}

.v-window-item,
.v-window-item--active,
.v-tabs-window-item {
  padding: 0;
}

.content {
  height: 72vh;
}

.v-card{
  padding: 5px 10px;
  transition: all 0.25s ease;
  border-radius: var(--border-radius-content-card) !important;
  background-color: var(--background-content-inner-card) !important;
}

.v-card .v-card {
  box-shadow: var(--box-shadow-content-inner-card);
  background-color: var(--background-content-inner-card) !important;
}

.v-card--variant-elevated {
  padding: 10px !important;
  box-shadow: var(--box-shadow-content-inner-card) !important;
}

/* Неактивные табы */
.inactive-tab {
  background: var(--background-inactive-tab) !important;
  color: var(--color-inactive-tab) !important;
  -webkit-text-stroke: var(--text-stroke-inactive-tab);
  border: var(--border-inactive-tab) var(--border-color-inactive-tab) !important;
}

/* Активный таб */
.active-tab {
  background-color: var(--background-active-tab) !important;
  color: var(--color-active-tab) !important;
  -webkit-text-stroke: var(--text-stroke-active-tab);
  border: var(--border-active-tab) var(--border-color-active-tab) !important;
}

.inactive-tab, .active-tab {
  text-transform: var(--text-transform-tabs) !important;
  border-radius: var(--border-radius-tabs) !important;
  margin-right: 8px;
  margin-bottom: 10px;
}

.v-tab__slider {
  background: var(--underline-active-tab) !important;
}

.v-form {
  padding: 10px 10px 0 !important; 
  margin-top: -20px;
}
</style>
