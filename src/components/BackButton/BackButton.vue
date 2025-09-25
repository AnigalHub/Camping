<template>
  <div>
    <component :is="backSvg"/>
    <div class="back">Назад</div>
  </div>
</template>

<script setup>
import back from './../../svg/back.vue';
import { shallowRef } from 'vue'
const backSvg = shallowRef(back)
</script>

<style scoped>
svg {
  float: left;
}

.back {
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