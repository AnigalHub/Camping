<template>
  <div>
    <v-container>
      <Title :title="title" icon="mdi-account-group-outline" />

      <search @search="onSearchChanged" />

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
import { ref, computed } from "vue";
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


const sortKey = ref(null);
const sortDirection = ref("asc");

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
  if (!sortKey.value) return items;

  const arr = [...items];

  arr.sort((a, b) => {
    if (sortKey.value === "fio") return compareFio(a, b);

    if (sortKey.value === "dateStay")
      return new Date(a.endDate) - new Date(b.endDate);

    return String(a[sortKey.value] || "").localeCompare(
      String(b[sortKey.value] || "")
    );
  });

  return sortDirection.value === "asc" ? arr : arr.reverse();
});


function onSearchChanged({ sort }) {
  switch (sort) {
    case "По фио":
      toggleSort("fio");
      break;
    case "По дате":
      toggleSort("dateStay");
      break;
    default:
      sortKey.value = null;
  }
}
</script>

<style scoped>
.content {
  height: 70vh;
}
</style>