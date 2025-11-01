<template>
  <div class="page">
    <v-container>
      <Title :title="title" :icon="'mdi-account-plus-outline'" />
      <div class="content">
      </div>
    </v-container>
  </div>
</template>

<script setup>

defineOptions({
  name: 'AddClients'
})

const title = 'Регистрация отдыхающих';
</script>

<style scoped>
/* Общий контейнер */
.content {
  min-height: 82.5vh;
  padding: 15px 25px 15px 15px !important;
  display: flex;
  align-items: center;
}
</style>
