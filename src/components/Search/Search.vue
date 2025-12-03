<template>
  <v-card class="search-bar d-flex flex-wrap align-center justify-space-between">
    <v-text-field v-model="search" density="comfortable" hide-details rounded="lg" variant="solo" placeholder="Поиск"
      prepend-inner-icon="mdi-magnify" class="search-input" />

    <div class="search-controls d-flex align-center gap-3 flex-wrap mt-2 mt-md-0">
      <v-select
        v-model="sort"
        :items="sortOptions"
        label="Сортировать"
        density="comfortable"
        hide-details
        rounded="lg"
        variant="solo"
        class="filter-select"
        @update:modelValue="onSearch"   
      />
      <v-btn 
        class="btn-page"
        prepend-icon="mdi-magnify"
        @click="onSearch"
      >
        Найти
      </v-btn>
    </div>
  </v-card>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";

defineOptions({ name: "Search" });

const route = useRoute();
const search = ref("");
const sort = ref(null);

const sortOptions =
  route.name === "AdditionalCosts"
    ? ["По наименованию", "По дате", "По цене"]
    : route.name === "MapObjects"
      ? ["По местам", "По парковке"]
      : ["По дате", "По фио"];

const emit = defineEmits(["search"]);

const onSearch = () => {
  emit("search", { search: search.value, sort: sort.value });
};
</script>

<style>
.v-field--variant-solo {
  box-shadow: inset 0 0 6px rgba(255, 255, 255, 0.3),
    2px 2px 8px rgba(17, 44, 18, 0.08) !important;
  transition: box-shadow 0.3s ease, transform 0.2s ease;
}

.v-field--variant-solo:hover {
  box-shadow: 0 0 0 2px rgba(16, 65, 85, 0.15),
    2px 2px 10px rgba(17, 44, 18, 0.1) !important;
  transform: translateY(-1px);
}

.search-bar .v-input--density-comfortable .v-field--variant-solo {
  border-radius: 12px !important;
}
</style>

<style scoped>
.search-bar {
  border-radius: 12px;
  padding-left: 2px !important;
  padding-right: 0 !important;
  margin-bottom: 5px;
}

.search-input {
  min-width: 200px;
}

.filter-select {
  min-width: 250px;
  max-width: 300px;
}

.search-controls,
.search-bar {
  gap: 0 20px;
}

.search-input input::placeholder {
  color: #9c9c9c !important;
}

.btn-page {
  display: flex;
}

@media (max-width: 768px) {

  .search-input,
  .filter-select,
  .btn-page,
  .search-controls {
    width: 100% !important;
    max-width: 100% !important;
  }

  .search-controls {
    flex-direction: column;
    gap: 20px;
  }
}
</style>
