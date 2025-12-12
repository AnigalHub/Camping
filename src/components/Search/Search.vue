<template>
  <v-card class="search-bar d-flex flex-wrap align-center justify-space-between">
    <v-text-field v-model="search" placeholder="Поиск" prepend-inner-icon="mdi-magnify" variant="solo"
      density="comfortable" rounded="lg" hide-details class="search-input" />
    <div class="search-controls d-flex align-center gap-3 flex-wrap mt-2 mt-md-0">
      <v-select v-model="sort" :items="sortOptions" item-title="title" item-value="value" return-object
        label="Сортировать по:" variant="solo" density="comfortable" rounded="lg" hide-details
        class="filter-select sort-select" @update:modelValue="onSelectChanged" prepend-inner-icon="mdi-sort" />
    </div>
  </v-card>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";

const emit = defineEmits(["update:sort", "search"]);
const search = ref("");
const sort = ref(null);
watch(sort, v => emit("update:sort", v));

const route = useRoute();
const base = [
  { title: "ФИО", key: "fio", dir: "asc", value: "fio_asc" },
  { title: "Аренда дома", key: "house", dir: "desc", value: "house_desc" },
  { title: "Транспорт", key: "cars", dir: "desc", value: "cars_desc" },
  { title: "Животные", key: "animals", dir: "desc", value: "animals_desc" },
];

const sortOptions = route.name === "AdditionalCosts"
  ? [
    { title: "Наименование", key: "text", dir: "asc", value: "text_asc" },
    { title: "Дата (недавние)", key: "date", dir: "desc", value: "date_desc" },
    { title: "Цена ↑", key: "price", dir: "asc", value: "price_asc" },
    { title: "Цена ↓", key: "price", dir: "desc", value: "price_desc" },
  ]
  : route.name === "MapObjects"
    ? [
      { title: "Свободные места + парковка", key: "combined", dir: "asc", value: "combined_asc" },
      { title: "Свободные места", key: "person", dir: "asc", value: "person_asc" },
      { title: "Свободная парковка", key: "car", dir: "asc", value: "car_asc" },
    ]
    : route.name === "Trips" ? base : [{ title: "Ближайшие выезды", key: "dateStay", dir: "asc", value: "dateStay_asc" }, ...base];

const onSelectChanged = () => {
  if (!sort.value) return;
  emit("search", { search: search.value, sortKey: sort.value.key, sortDirection: sort.value.dir, fromSelect: true });
};
</script>

<style>
.search-bar .v-field--variant-solo {
  box-shadow: none !important;
  transition: 0.3s;
}

.search-bar  .v-field--variant-solo:hover {
  box-shadow: 0 0 0 2px rgba(16, 65, 85, 0.15),
    2px 2px 10px rgba(17, 44, 18, 0.1) !important;
  transform: translateY(-1px);
}

.search-bar .v-field--variant-solo {
  border-radius: 12px !important;
}

.search-bar  .v-field__prepend-inner {
  color: #0d3646 !important;
}
</style>

<style scoped>
.search-bar {
  border-radius: 12px;
  padding-left: 2px !important;
  padding-right: 2px !important;
  margin-bottom: 5px;
  gap: 20px;
}

.search-input {
  min-width: 200px;
}

.filter-select {
  min-width: 320px;
  max-width: 350px;
}

.v-field--variant-solo {
  box-shadow: none;
  transition: .3s;
}

.v-field--variant-solo:hover {
  box-shadow: 0 0 0 2px rgba(16, 65, 85, .15), 2px 2px 10px rgba(17, 44, 18, .1);
  transform: translateY(-1px);
}

.v-field--variant-solo,
.search-bar .v-field--variant-solo {
  border-radius: 12px;
}

.v-field__prepend-inner {
  color: #0d3646;
}

/* Сортировка */
.sort-select .v-field--variant-solo {
  border: 2px solid #cfd8dc;
  background: #f7f9fa;
  transition: .25s;
}

.sort-select .v-field--variant-solo:hover {
  border-color: #90a4ae;
  background: #fff;
  box-shadow: 0 0 6px rgba(0, 0, 0, .08);
}

.sort-select .v-field--variant-solo .v-icon {
  opacity: .8;
  transition: .25s;
}

.sort-select .v-field--variant-solo:hover .v-icon {
  opacity: 1;
}

/* Адаптивность */
@media (max-width: 768px) {
  .search-bar {
    gap: 10px;
  }

  .search-input,
  .filter-select,
  .search-controls {
    width: 100% !important;
    max-width: 100%;
  }

  .search-controls {
    flex-direction: column;
    gap: 20px;
  }
}

@media(max-width:600px) {
  .search-bar {
    padding: 6px 0 !important;
    border-radius: 10px;
    margin: 10px 0 15px;
    gap: 6px !important;
  }

  .search-input :deep(.v-field__input),
  .filter-select :deep(.v-field__input) {
    min-height: 45px !important;
    font-size: .9rem !important;
  }

  .search-controls {
    flex-direction: column;
    gap: 14px !important;
  }
}

@media (max-width: 400px) {
  .search-bar {
    padding: 4px 0 !important;
    border-radius: 8px;
  }

  .search-input :deep(.v-field__input),
  .filter-select :deep(.v-field__input) {
    min-height: 40px !important;
    font-size: .85rem !important;
  }
}
</style>
