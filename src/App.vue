<template>
  <v-app>
    <top-menu v-if="isDesktop" :drawer="drawer" @toggle-drawer="drawer = !drawer" />
    <div class="layout-container">
      <side-menu v-if="isDesktop" v-model:drawer="drawer" />
      <v-main>
        <router-view :style="routerViewStyle" />
      </v-main>
    </div>
    <mobile-menu v-if="!isDesktop"/>
    <modal v-for="(modal, index) in modals" v-bind="modal" :key="index" :value="modal.isVisible" />
  </v-app>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useStore } from "vuex";
import { loadComponent } from "./utils/loadComponent";

const Modal = loadComponent("Modal");
const store = useStore();
const modals = computed(() => store.getters["Modal/modals"]);

const drawer = ref(false);

const windowWidth = ref(window.innerWidth);
const isDesktop = computed(() => windowWidth.value >= 1150);

function onResize() {
  windowWidth.value = window.innerWidth;
}

const routerViewStyle = computed(() => ({
  marginTop: isDesktop.value ? "53px" : "0",
  marginBottom: !isDesktop.value ? "53px" : "0",
}));

/** Проверка видимости модального окна по имени */
function isModalVisible(name) {
  const found = modals.value.find((x) => x.name === name);
  return found ? found.isVisible : false;
}

onMounted(async () => {
    window.addEventListener("resize", onResize);
}); 

onBeforeUnmount(() => {
  window.removeEventListener("resize", onResize);
});
</script>


<style>
@import "./../public/style.css";
html, body, #app {
  height: 100%;
}
@media (max-width: 1150px) {
  .content, .wrapper_content, .v-table, .block{
    height: auto !important;
    min-height: 75vh;
  }
}

.v-input__details {
  padding: 3px !important;
}

/**Фон страниц */
.v-application__wrap, html{
  background: var(--background-color-page) !important;
  min-height: 100vh;
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

.v-expansion-panel--active > 
.v-expansion-panel-title:not(.v-expansion-panel-title--static) {
  min-height: 50px;
  padding: 10px 20px;
}

.btn-home {
  color: #2b4754;
  border: 1.5px solid #547c8f;
  opacity: .9;
  box-shadow: none;
}

.v-card:hover .btn-home {
  transform: translateY(-2px);
  transform: scale(1.025);
  box-shadow: none;
  background: #e9eff9;
  opacity: 1;
}

.btn-page{
  background: #547c8f;
  color: #fff;
  box-shadow: none;
}

.btn-page:hover {
  transform: translateY(-2px);
  background: #3b5865;
}

.btn-disabled {
  color: #fff !important;
  background: #393939 !important;
  cursor: not-allowed;
}

.btn-home,
.btn-page {
  font-family: var(--font-family);
  font-size: 1.1rem;
  font-weight: 800;
  border-radius: 12px;
  letter-spacing: 1px;
  transition: all .3s ease;
  padding: 10px 22px;
  text-transform: none !important;
  min-height: 46px;
  min-width: 220px;
  display: block;
}

.v-card,
.content,
.block-title,
.v-list-item, 
.place-card, .block, .profile-card {
  position: relative;
  z-index: 4;
  animation: fadeSlide 1.2s ease-in-out;
}

.content {
  background: var(--background-content-card);
  box-shadow: var(--box-shadow-content-card);
  border-radius: var(--border-radius-content-card);
  height: 72vh;
}

.v-card-text {
  padding: 0 5px 0 0 !important;
}

.v-card--variant-elevated {
  background: transparent !important;
  padding: 10px !important;
  box-shadow: var(--box-shadow-content-inner-card) !important;
}

.v-form {
  padding: 10px 0 0 !important;
  margin-top: -20px;
}

/*Плавное появление элементов при загрузке страницы*/
@keyframes fadeSlide {
  from {
    opacity: 0;
    transform: translateY(6px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
