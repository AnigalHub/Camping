<template>
  <v-app  >
    <div class="content_wrapper">
      <div class="wrapper">
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
@import './../public/style.css';

.page h1{
  font-family: var(--font-family);
  font-weight: 200;
  color: var(--color-h1);
  -webkit-text-stroke: var(--text-stroke-h1);
  margin: -5px auto 25px;
  padding: 5px 7%;
  transform: scale(1.25);
  background: var(--background-h1);
  width: max-content;
  display: block;
  border-radius: 10px;
}

.content_wrapper {
  background: radial-gradient(
    circle,
    #ffffff 0%,
    #f4efd7 75%
  );
  height: 100vh;
}
.wrapper::before {
  content: "";
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: url(./../../../public/1111.png) no-repeat center/cover;
  background-size: 100% 100%;
  filter: blur(2.5px);
  z-index: 1; 
}

.wrapper > * {
  position: relative;
  z-index: 2;
}
</style>
