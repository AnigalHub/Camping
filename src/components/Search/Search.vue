<template>
  <v-container class="search">
    <v-row>
      <v-col>
        <v-text-field v-model="search" label="Поиск"></v-text-field>
      </v-col>
      <v-col cols="2">
        <v-btn @click="searchFunction">Найти</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>

</script>

<style>
.search .v-field--variant-filled .v-field__overlay {
  background: none !important;
}
.search .v-field--variant-filled .v-field__outline::before{
   opacity: .7 !important;
   border-color: #5F8835 !important;
}
.search .v-field--variant-filled .v-field__outline::after{
  border-width: 0 0 3.15px !important;
   border-color: #5F8835 !important;
}
</style>
<style scoped>

.search .v-btn {
  width: 100%;
  min-height: 50px;
  margin-top: 5px;
  text-transform: none;
   font-family: var(--font-family-main);
  font-weight: 500;
  letter-spacing: -.15px;
  font-size: 1.3rem;
  color: #3A6210;
  -webkit-text-stroke: .5px #5F8835;
  border: 2px solid #5F8835 !important;
  border-radius: 10px;
}
</style>