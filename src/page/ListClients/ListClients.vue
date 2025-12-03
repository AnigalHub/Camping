<template>
  <div>
    <v-container>
      <Title :title="title" :icon="'mdi-account-group-outline'" />
      <search @search="onSearchChanged"/>
<Table
  v-if="items.length"
  :headers="headers"
  :items="sortedItems"
/>

      <div v-else class="content">Данные не найдены.</div>
    </v-container>
  </div>
</template>

<script setup>
import { ref, watch, computed } from "vue";
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

const searchValue = ref("");
const sortValue = ref(null);

function onSearchChanged({ search, sort }) {
  searchValue.value = search;
  sortValue.value = sort;
}

const sortKey = ref("fio");
const sortDirection = ref("asc");

const sortedItems = computed(() => {
  let arr = [...items];

  if (searchValue.value) {
    const q = searchValue.value.toLowerCase();
    arr = arr.filter(i =>
      `${i.surname} ${i.name} ${i.patronymic}`.toLowerCase().includes(q)
    );
  }

  return arr.sort((a, b) => {
    switch (sortValue.value) {
      case "По имени":
        return `${a.surname}${a.name}${a.patronymic}`.localeCompare(
          `${b.surname}${b.name}${b.patronymic}`
        );

      case "По дате":
        return new Date(a.endDate) - new Date(b.endDate);

      default:
        return 0;
    }
  });
});


watch(sortValue, (value) => {
  switch (value) {
    case "По имени":
      sortKey.value = "fio";
      sortDirection.value = "asc";
      break;

    case "По дате":
      sortKey.value = "dateStay";
      sortDirection.value = "asc";
      break;

    default:
      sortKey.value = "fio";
      sortDirection.value = "asc";
  }
});

</script>

<style scoped>
.content {
  height: 70vh;
}
</style>