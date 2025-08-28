<template>
  <v-container>
    <Title :title="title" icon="mdi-account-group-outline" />

<search
  v-model:sort="searchSort"
  @search="onSearchChanged"
/>

<Table
  v-if="items.length"
  :headers="headers"
  :items="sortedItems"
  :sort-by-key="sortKey"
  :sort-by-direction="sortDirection"
  @sort-changed="onColumnSort"
/>

    <div v-else class="content">Данные не найдены.</div>
  </v-container>
</template>

<script setup>
import { ref, computed } from "vue";
import itemsData from './../../../public/data/clients.json';

const title = "Список клиентов";
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

const items = ref(itemsData);

const sortKey = ref(null);
const sortDirection = ref("asc");
const searchSort = ref(null);

// Сортировка при выборе из Select
function onSearchChanged({ sort, fromSelect }) {
  if (fromSelect) {
    // Сброс сортировки по столбцу
    sortKey.value = null;

    switch (sort) {
      case "По фио":
        sortKey.value = "fio";
        sortDirection.value = "asc";
        break;
      case "По дате":
        sortKey.value = "dateStay";
        sortDirection.value = "asc";
        break;
      default:
        sortKey.value = null;
    }
  }
}

// Сортировка при клике на заголовок
function onColumnSort() {
  // Сброс select
  searchSort.value = null;
}


function toggleSort(key) {
  if (sortKey.value === key) {
    sortDirection.value = sortDirection.value === "asc" ? "desc" : "asc";
  } else {
    sortKey.value = key;
    sortDirection.value = "asc";
  }
}

function compareFio(a, b) {
  const fields = ["surname", "name", "patronymic"];
  for (const f of fields) {
    const res = (a[f] || "").localeCompare(b[f] || "");
    if (res !== 0) return res;
  }
  return 0;
}

const sortedItems = computed(() => {
  const arr = [...items.value];

  if (!sortKey.value) return arr;

  arr.sort((a, b) => {
    if (sortKey.value === "fio") return compareFio(a, b);
    if (sortKey.value === "dateStay") return new Date(a.endDate) - new Date(b.endDate);
    return String(a[sortKey.value] || "").localeCompare(String(b[sortKey.value] || ""));
  });

  return sortDirection.value === "asc" ? arr : arr.reverse();
});

// сброс значения sort в Search.vue при клике на заголовок
function resetSortSelect() {
  searchSort.value = null;
}

// обработка выбора сортировки из Search.vue
// function onSearchChanged({ sort }) {
//   switch (sort) {
//     case "По фио":
//       toggleSort("fio");
//       break;
//     case "По дате":
//       toggleSort("dateStay");
//       break;
//     default:
//       sortKey.value = null;
//   }
// }
</script>

<style scoped>
.content {
  height: 70vh;
}
</style>
