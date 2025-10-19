<template>
  <div @click="clickBack" class="back">
    <component :is="backSvg" :color="'var(--fill-icon-btn-back-page)'" class="icon"/>
    <!-- <div class="back_text">Назад</div> -->
  </div>
</template>

<script setup>
import { router } from '@/router';
import back from './../../svg/back.vue';
import { shallowRef } from 'vue';

const backSvg = shallowRef(back);

/** Возврат назад */
function clickBack() {
  return router.go(-1);
}
</script>

<style scoped>
svg{
  transform: scale(.85);
  margin-right: 8%;
}

.back {
  position: relative;
  display: flex;
  align-items: center;
  width: max-content;
  padding: 4px 10px;
  font-family: var(--font-family-btn);
  /* background: var(--background-btn-back-page);
  border-radius: var(--border-radius-btn-back-page);
  border: var(--border-btn-back-page); */
  /* border-color: var(--border-color-btn-back-page); */
  /* box-shadow: var(--box-shadow-btn-back-page); */
  transition: all 0.25s ease;
  backdrop-filter: var(--filter-btn-back-page);
  -webkit-backdrop-filter: var(--filter-btn-back-page);
}

.back:hover {
  cursor: pointer;
  background: var(--background-btn-back-page-hover);
  /* border-radius: var(--border-radius-btn-back-page-hover);
  border: var(--border-btn-back-page-hover);
  border-color: var(--border-color-btn-back-page-hover);
  box-shadow: var(--box-shadow-btn-back-page-hover); */
  backdrop-filter: var(--filter-btn-back-page-hover);
  -webkit-backdrop-filter: var(--filter-btn-back-page-hover);
}

.back_text {
  color: var(--color-btn-back-page);
  -webkit-text-stroke: var(--text-stroke-btn-back-page);
  font-family: var(--font-family);
  font-size: 1rem;
  display: flex;
  align-items: center;
  height: 35px;
  padding-top: 8px;
}

.back:hover .back_text {
  color: var(--color-btn-back-page-hover);
  -webkit-text-stroke: var(--text-stroke-btn-back-page-hover);
}
</style>