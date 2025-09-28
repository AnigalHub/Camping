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
  return router.go(-1);
}
</script>

<style scoped>
.back {
  cursor: pointer;
}

.back:hover .back_text{
  color: #5F8835;
}

svg {
  float: left;
}

.back_text {
  font-family: "El Messiri", sans-serif;
  font-weight: 200;
  font-size: 1.45rem;
  align-items: center;
  height: 55px;
  max-width: 80px;
  display: flex;
  justify-content: center;
}
</style>