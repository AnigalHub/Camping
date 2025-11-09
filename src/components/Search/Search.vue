<template>
  <v-container class="search">
    <v-row>
      <v-col>
        <v-text-field label="Поиск" variant="plain"></v-text-field>
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
  padding-left: 7px !important;
  padding-right: 0px !important;
  margin-bottom: -10px !important;
}

.search .v-field--variant-filled .v-field__outline::before {
  opacity: var(--opacity-search) !important;
  border-color: var(--border-color-search) !important;
}

.search .v-field--variant-filled .v-field__outline::after {
  border-width: var(--border-width-after-search) !important;
  border-color: var(--border-color-after-search) !important;
}
.search .v-field__field {
  background: var(--background-search) !important;
  box-shadow: var(--box-shadow-search) !important;
  padding: 2.5px 5px;
  border-radius: 10px !important;
}
.search .v-label.v-field-label {
  padding-left: 8px;
  margin-top: -5px;
}
</style>
<style scoped>
.v-col{
  padding: 0 15px 3px 0 !important
}
.v-col-2{
  padding-right: 3px !important;
}
.v-row{
  margin: -6px !important;
}
</style>