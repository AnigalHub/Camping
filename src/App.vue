<template>
  <v-app  >
    <div class="home1">
      <div class="home2">
      <v-main>
        <router-view />
      </v-main>
      </div>
    </div>
  </v-app>
</template>

<script setup>

</script>

<style>
.home1 {
  background: radial-gradient(
    circle,
    #ffffff 0%,
    #f4efd7 75%
  );
  height: 100vh;
}
.home2::before {
  content: "";
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: url(./../../../public/1111.png) no-repeat center/cover;
  background-size: 100% 100%;
  filter: blur(2.5px); /* или другой уровень размытия */
  z-index: 1; /* чтобы был поверх, но ниже содержимого */
}

/* Основное содержимое оставляем поверх */
.home2 > * {
  position: relative; /* чтобы было поверх псевдоэлемента */
  z-index: 2;
}
</style>
