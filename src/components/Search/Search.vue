<template>
  <v-container class="search">
    <v-row>
      <v-col>
        <v-text-field label="Поиск"></v-text-field>
      </v-col>
      <v-col cols="2">
        <v-btn class="btn_page">Найти</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup></script>

<style>
.search{
  margin-top: -1.5%;
}

.search .v-field--variant-filled .v-field__overlay {
  background: var(--background-search) !important;
}

.search .v-field--variant-filled .v-field__outline::before {
  opacity: var(--opacity-search) !important;
  border-color: var(--border-color-search) !important;
}

.search .v-field--variant-filled .v-field__outline::after {
  border-width: var(--border-width-after-search) !important;
  border-color: var(--border-color-after-search) !important;
}
</style>