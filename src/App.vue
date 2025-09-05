<template>
  <v-app>
    <top-menu :drawer="drawer" @toggle-drawer="drawer = !drawer" />
    <div class="layout-container">
      <side-menu v-model:drawer="drawer" />
      <v-main>
        <router-view style="margin-top: 53px" />
      </v-main>
    </div>
    <modal v-for="(modal, index) in modals" v-bind="modal" :key="index" :value="modal.isVisible" />
  </v-app>
</template>

<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { loadComponent } from "./utils/loadComponent";

const Modal = loadComponent("Modal");
const store = useStore();
const modals = computed(() => store.getters["Modal/modals"]);

const drawer = ref(false);

/** Проверка видимости модального окна по имени */
function isModalVisible(name) {
  const found = modals.value.find((x) => x.name === name);
  return found ? found.isVisible : false;
}
</script>


<style>
@import "./../public/style.css";

.v-card--variant-elevated {
  background: transparent !important;
}


/**Фон страниц */
.page {
  background: var(--background-color-page);
  min-height: 95.5vh;
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

/**Скролл */
::-webkit-scrollbar {
  width: var(--size-scrollbar);
  height: var(--size-scrollbar);
}

.v-table__wrapper::-webkit-scrollbar-thumb,
.wrapper_content::-webkit-scrollbar-thumb {
  background-color: #6c92a4 !important;
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

.v-expansion-panel--active>.v-expansion-panel-title:not(.v-expansion-panel-title--static) {
  min-height: 50px;
  padding: 10px 20px;
}

.btn-home {
  border: 1.5px solid #547c8f;
  opacity: .75;
}

.btn-home,
.btn-page {
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  font-family: 'El Messiri', sans-serif;
  font-size: 1.2rem;
  text-transform: none !important;
  border-radius: 14px;
  box-shadow: 0 2px 5px rgba(90, 130, 55, 0.08);
  transition: all 0.3s ease;
  padding: 10px 22px !important;
  background: #fff;
  color: #4b707f;
  font-weight: 800;
  letter-spacing: 1px !important;
  min-height: 46px;
}

.v-card:hover .btn-home {
  transform: translateY(-2px);
  transform: scale(1.05);
  box-shadow: none;
  background: #e9eff9;
  opacity: 1;
}

.v-card,
.content,
.block-title,
.v-list-item {
  position: relative;
  z-index: 4;
  animation: fadeSlide 1.2s ease-in-out;
}

.content,
.block-search {
  background: var(--background-content-card) !important;
  box-shadow: var(--box-shadow-content-card) !important;
  border-radius: var(--border-radius-content-card) !important;
}

.block-search {
  height: 10vh;
  margin-bottom: 3vh;
  padding-top: 0;
}

.v-card-text {
  padding: .25rem 5px 0 0 !important;
}

.content {
  height: 72vh;
}

.v-card .v-card {
  box-shadow: var(--box-shadow-content-inner-card);
  background-color: var(--background-content-inner-card) !important;
}

.v-card--variant-elevated {
  padding: 10px !important;
  box-shadow: var(--box-shadow-content-inner-card) !important;
}

.inactive-tab {
  background: rgb(246 249 239) !important;
  color: var(--color-inactive-tab) !important;
  -webkit-text-stroke: var(--text-stroke-inactive-tab);
  border: var(--border-inactive-tab) var(--border-color-inactive-tab) !important;
}

.active-tab {
  background-color: var(--background-active-tab) !important;
  color: var(--color-active-tab) !important;
  -webkit-text-stroke: var(--text-stroke-active-tab);
  border: var(--border-active-tab) var(--border-color-active-tab) !important;
}

.inactive-tab,
.active-tab {
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
