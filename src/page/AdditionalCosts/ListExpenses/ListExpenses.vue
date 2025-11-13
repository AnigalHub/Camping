<template>
  <search class="search" />
  <Table :headers="headers" :items="items" sortByKey="date" />
</template>

<script setup>
/** Заголовки */
const headers = [
  [
    { label: 'Наименование', key: 'text', sortable: true },
    { label: 'Дата', key: 'date', sortable: true },
    { label: 'Цена', key: 'price', sortable: true },
    { label: '', key: 'buttons' },
  ],
]
/** Содержимое таблицы */
const items = [
  {
    text: 'Вызов сантехника из-за засора в раковинах на полянах №5 и №3',
    date: '2025-07-15T00:00:00.000+00:00',
    price: 6000,
  },
  {
    text: 'Ложный вызов полиции к отдыхающим',
    date: '2025-09-21T00:00:00.000+00:00',
    price: 10000,
  },
  {
    text: 'Замена сифона в раковинах на полянх №2 и №4',
    date: '2025-05-21T00:00:00.000+00:00',
    price: 5000,
  },
  {
    text: 'Вызов частной скорой к отдыхающему по состоянию здоровья',
    date: '2025-09-03T00:00:00.000+00:00',
    price: 1000,
  },
]
</script>
<style scoped>
.search{
  margin-top: -1rem;
}
</style>