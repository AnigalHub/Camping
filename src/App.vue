<template>
  <v-app  >
    <div class="content_wrapper">
      <div class="wrapper">
      <v-main>
        <router-view />
      </v-main>
      </div>
      <modal 
        v-for="(modal, index) in modals" 
        v-bind="modal" 
        :key="index" 
        :value="modal.isVisible" 
      />
    </div>
  </v-app>
</template>

<script setup>
import { loadComponent } from './utils/loadComponent';
const Modal = loadComponent('Modal');

import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const modals = computed(() => store.getters['Modal/modals']);

/** Проверка видимости модального окна по имени */
function isModalVisible(name) {
  const found = modals.value.find(x => x.name === name);
  return found ? found.isVisible : false;
}
</script>

<style >
@import './../public/style.css';

/**Фон страниц */
.content_wrapper {
  background: var(--background-color-page);
  height: 100vh;
}
.wrapper::before {
  content: "";
  position: absolute;
  top: 0; left: 0;
  width: 100%; 
  height: 100%;
  background: var(--background-img-page);
  background-size: var(--background-size-img-page);
  filter: var(--filter-background-page);
  z-index: 1; 
}
.wrapper > * {
  position: relative;
  z-index: 2;
}
/**Заголовок страниц */
.page h1{
  color: var(--color-h1);
  -webkit-text-stroke: var(--text-stroke-h1);
  font-family: var(--font-family);
  font-weight: 200;
  font-size: 1.4rem !important;
  background: var(--background-h1);
  box-shadow: var(--box-shadow-h1);
  border-radius: var(--border-radius-h1);
  border: var(--border-h1);
  border-color: var(--border-color-h1);
  width: max-content;
  display: block;
  margin: -10px auto 10px;
  padding: 5px 0;
  transform: scale(1.1);
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
  padding: 0 10px !important;
  min-height: 40px;
  margin-top: 15px;
}

/**Вкладки (содержимое)*/
.v-card, .table_block {
  height: 80vh;border: 1.5px solid #4d672c;
  padding: 15px 10px;
  -webkit-backdrop-filter: blur(9px);
  backdrop-filter: blur(9px);
  background: linear-gradient(to top,rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.8)) !important;
  box-shadow: inset 0 0 10px rgba(255, 255, 255, 0.3),
    2px 2px 8px rgba(17, 44, 18, 0.1) !important;
  transition: all 0.25s ease;
}

.content, .v-card{
  border: 1.5px solid rgb(77, 103, 44) !important;
  border-radius: 15px !important;  
  background-color: transparent !important;
}

.v-card .v-card {
  border: none !important;
  box-shadow: none;
  background-color: transparent !important;
}

.v-card--variant-elevated{
  padding: 10px !important;
}

/* Неактивные табы */
.inactive-tab {
  border-bottom: 1.8px solid #5e8835af !important;
  opacity: 0.55 !important;
  text-transform: none !important;
  -webkit-text-stroke: .05px #5F8835;
}

/* Активный таб */
.active-tab {
  background-color:  transparent !important;
  border: 1px solid transparent !important;
  border-radius: 10px !important;
  color: #5F8835 !important;
  text-transform: none !important;
  -webkit-text-stroke: .2px #5F8835;
 

}
/* Отключение подчеркивания у активного таба */
.v-tab__slider {
  background: #5F8835 !important;
}
</style>
