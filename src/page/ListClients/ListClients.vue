<template>
  <v-container>
    <Title :title="title"/>
    <Search v-model:sort="searchSort" @search="onSearchChanged" />
    <Table v-if="items.length" :headers="headers" :items="sortedItems" />
    <div v-else class="content">Данные не найдены.</div>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import itemsData from "./../../../public/data/clients.json";

const title = "Список клиентов";
const headers = [
  [
  { label: "ФИО", key: "fio" },
  { label: "Телефон", key: "phone" },
  { label: "Даты", key: "dateStay" },
  { label: "Транспорт", key: "cars" },
  { label: "Домик", key: "house" },
  { label: "Палатка", key: "tent" },
  { label: "Животные", key: "animals" },
  { label: "Поляна", key: "object" },
  { label: "Сумма", key: "price" },
  { label: "", key: "buttons" },
]
];

const items = ref(itemsData);
const sortKey = ref("fio");
const sortDirection = ref("asc");
const searchSort = ref(null);

const onSearchChanged = ({ sortKey: key, sortDirection: dir, fromSelect }) => {
  if (!fromSelect) return;
  sortKey.value = key || null;
  sortDirection.value = dir || "asc";
};

onMounted(() => { searchSort.value = null; });

const compareFio = (a, b) =>
  ["surname", "name", "patronymic"].reduce((r, f) =>
    r !== 0 ?
      r : (a[f] || "").localeCompare(b[f] || ""), 0);

const sortedItems = computed(() => {
  if (!sortKey.value) return items.value;
  const sorted = [...items.value].sort((a, b) => {
    if (sortKey.value === "fio") return compareFio(a, b);
    if (sortKey.value === "dateStay") return new Date(a.endDate) - new Date(b.endDate);
    return String(a[sortKey.value] ?? "").localeCompare(String(b[sortKey.value] ?? ""));
  });
  return sortDirection.value === "asc" ? sorted : sorted.reverse();
});
</script>

<style scoped>
.content {
  height: 70vh;
}
</style>
