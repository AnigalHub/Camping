<template>
  <div>
    <v-container>
      <Title :title="title" :icon="'mdi-account-group-outline'" />
      <search />
      <Table
        v-if="items.length"
        :headers="headers"
        :items="items"
        sortByKey="fio"
      />
      <div v-else class="content">Данные не найдены.</div>
    </v-container>
  </div>
</template>

<script setup>
defineOptions({
  name: "ListClients",
});
const title = "Список клиентов";
import items from './../../../public/data/clients.json';
const headers = [
  [
    { label: "ФИО", rowspan: 2, key: "fio", sortable: true },
    { label: "Телефон", rowspan: 2, key: "phone" },
    { label: "Проживание", rowspan: 2, key: "dateStay", sortable: true },
    { label: "Аренда домика", rowspan: 2, key: "house", sortable: true },
    { label: "Транспорт", rowspan: 2, key: "cars", sortable: true },
    { label: "Животные", rowspan: 2, key: "animals", sortable: true },
    { label: "Поляна", rowspan: 2, key: "object", sortable: true },
    { label: "Стоимость", rowspan: 2, key: "price", sortable: true },
    { label: "", key: "buttons" },
  ],
];
</script>

<style scoped>
.content {
  height: 70vh;
}
</style>