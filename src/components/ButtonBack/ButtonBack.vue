<template>
  <div @click="clickBack" class="back">
    <component :is="backSvg" />
    <div class="back_text">Назад</div>
  </div>
</template>

<script setup>
import { router } from '@/router';
import back from './../../svg/back.vue';
import { shallowRef } from 'vue';

const backSvg = shallowRef(back);

/** Возврат назад */
function clickBack() {
  return router.push('/');
}
</script>

<style scoped>
.back {
  cursor: pointer;
    position: relative;
  display: flex;
  align-items: center;
  width: max-content;
  padding: 4px 10px;
  font-family: "Georgia", serif;
  font-size: 1.6rem;
  color: #2a3a1f;
  border: 3px solid #acb1967c;
  border-radius: 20px;
  backdrop-filter: blur(10px);
  /* размытие фона за элементом (поддержка в современных браузерах) */
  -webkit-backdrop-filter: blur(10px);
  /* для Safari */
  /* Добавим градиент для имитации блика */
  background: linear-gradient(to top,
      rgba(255, 255, 255, 0.6),
      rgba(255, 255, 255, 0.2));
  /* Тень и внутренний блеск для стеклянного эффекта */
  box-shadow: inset 0 0 10px rgba(255, 255, 255, 0.3),
    2px 2px 8px rgba(17, 44, 18, 0.1);
  transition: all 0.25s ease;
}

.back:hover{
  cursor: pointer;
    background: linear-gradient(to top,
         rgba(197, 211, 149, 0.2),
      rgba(197, 211, 149, 0.2)); 
        box-shadow: inset 0 0 10px rgba(255, 255, 255, 0.4),
    10px 10px 8px rgba(17, 44, 18, 0.2);
}

svg {
  float: left; 
  margin-right: 8%;
}

.back_text {
  font-family:  var(--font-family);
  font-weight: 200;
  font-size: 1.45rem;
  align-items: center;
  height: 55px;
  max-width: 80px;
  padding-top: 8px;
  display: flex;
  justify-content: center;
}
</style>