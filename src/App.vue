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
  font-size: 1.2rem !important;
  background: var(--background-h1);
  box-shadow: var(--box-shadow-h1);
  border-radius: var(--border-radius-h1);
  border: var(--border-h1);
  border-color: var(--border-color-h1);
  width: max-content;
  display: block;
  margin: -10px auto 10px;
  padding: 5px 7%;
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
</style>
