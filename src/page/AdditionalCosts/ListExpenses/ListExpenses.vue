<template>
  <div class="list">
    <search class="search" v-model:sort="searchSort" @search="onSearchChanged" />
    <Table :headers="headers" :items="sortedItems" />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import itemsData from "./../../../../public/data/expenses.json";
/** Заголовки */
const headers = [
  [
    { label: 'Наименование', key: 'text', sortable: true },
    { label: 'Дата', key: 'date', sortable: true },
    { label: 'Цена', key: 'price', sortable: true },
    { label: '', key: 'buttons' },
  ],
];


const items = ref(itemsData);
const sortKey = ref("date");
const sortDirection = ref("desc");
const searchSort = ref(null);


const onSearchChanged = ({ sortKey: key, sortDirection: dir, fromSelect }) => {
  if (fromSelect) {
    sortKey.value = key || null;
    sortDirection.value = dir || "asc";
  }
};

/** Отсортированные элементы */
const sortedItems = computed(() => {
  if (!sortKey.value) return items.value;

  return [...items.value].sort((a, b) => {
    const valA = a[sortKey.value], valB = b[sortKey.value];
    const cmp = sortKey.value === "price"
      ? valA - valB
      : sortKey.value === "date"
        ? new Date(valA) - new Date(valB)
        : String(valA ?? "").localeCompare(String(valB ?? ""));
    return sortDirection.value === "asc" ? cmp : -cmp;
  });
});
</script>

<style scoped>
.search { margin-top: -.5rem; }
.content { height: 60vh; }
.list { min-height: 58vh; }
</style>
