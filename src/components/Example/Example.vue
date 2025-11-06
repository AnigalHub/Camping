<template>
  <v-card
    class="d-flex flex-wrap align-center justify-space-between search-bar"
  >
    <!-- Поле поиска -->
    <v-text-field
      v-model="search"
      density="comfortable"
      hide-details
      rounded="lg"
      variant="solo"
      placeholder="Поиск"
      prepend-inner-icon="mdi-magnify"
      class="search-input"
    ></v-text-field>

    <div
      class="d-flex align-center gap-3 flex-wrap mt-2 mt-md-0 search-controls"
    >
      <!-- Сортировка -->
      <v-select
        v-model="sort"
        :items="sortOptions"
        label="Сортировать"
        variant="solo"
        density="comfortable"
        hide-details
        rounded="lg"
        class="filter-select"
      ></v-select>

      <!-- Кнопка -->
      <v-btn class="btn_page" prepend-icon="mdi-magnify" @click="onSearch">
        Найти
      </v-btn>
    </div>
  </v-card>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();

const search = ref("");
const sort = ref(null);
const sortOptions = route.name !== 'AdditionalCosts'  ? ["По дате", "По имени"] : ["По наиенованию", "По дате", "По цене"] ;

function onSearch() {
  console.log(
    "Поиск:",
    search.value,
    "Сортировка:",
    sort.value
  );
}
</script>

<style>
/* Добавим лёгкий эффект для полей */
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
</style>

<style scoped>
.search-bar {
  background: transparent;
  border-radius: 12px;
  padding-left: 0 !important;
  padding-right: 0 !important;
  box-shadow: none;
  gap: 20px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.search-input {
  flex: 1;
  min-width: 200px;
  max-width: 100%; /* немного меньше */
}

/* Удлинённые селекты */
.filter-select {
  min-width: 250px;
  max-width: 300px; /* чуть длиннее чем раньше */
}

/* Для красивого выравнивания */
.search-controls {
  display: flex;
  align-items: center;
  gap: 20px;
}

/* Placeholder серый */
.search-input input::placeholder {
  color: #9c9c9c !important;
}

/* Кнопка поиска */
.btn_page {
  background: #f1f6fa;
  border: 1.5px solid #4170839e;
  color: #4b707f;
  font-weight: 800;
  font-family: "El Messiri", sans-serif;
  font-size: 1.1rem;
  text-transform: none !important;
  letter-spacing: 1px !important;
  border-radius: 10px;
  box-shadow: inset 0 0 10px rgba(255, 255, 255, 0.3),
    2px 2px 8px rgba(17, 44, 18, 0.1);
  transition: all 0.3s ease;
  padding: 10px 22px !important;
  min-height: 46px;
  min-width: 250px;
}

.btn_page:hover {
  transform: translateY(-2px);
  background: #fefefe;
}

@media (max-width: 768px) {
  .search-bar {
    flex-direction: column;
    align-items: stretch;
  }
  .filter-select {
    width: 100%;
  }
}
</style>
