<template>
  <v-card class="search-bar d-flex flex-wrap align-center justify-space-between">
    <v-text-field 
      v-model="search" 
      placeholder="Поиск" 
      prepend-inner-icon="mdi-magnify" 
      variant="solo"
      density="comfortable" 
      rounded="lg" 
      hide-details 
      class="search-input" 
    />
    <div class="search-controls d-flex align-center gap-3 flex-wrap mt-2 mt-md-0">
      <v-select 
        v-model="sort" 
        :items="sortOptions" 
        item-title="title" 
        item-value="value" 
        return-object
        label="Сортировать по:" 
        variant="solo" 
        density="comfortable" 
        rounded="lg" 
        hide-details 
        class="filter-select"
        @update:modelValue="onSelectChanged" 
      />
      <v-btn class="btn-page" prepend-icon="mdi-magnify" @click="onSearch">Найти</v-btn>
    </div>
  </v-card>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";

const props = defineProps({ sort: Object });
const emit = defineEmits(["update:sort", "search"]);

const search = ref("");
const sort = ref(null);
watch(sort, v => emit("update:sort", v));

const route = useRoute();
const sortOptions =
  route.name === "AdditionalCosts"
    ? [
      { title: "Наименование (А→Я)", key: "text", dir: "asc", value: "text_asc" },
      { title: "Дата (недавно добавленные)", key: "date", dir: "desc", value: "date_desc" },
      { title: "Цена (по возрастанию)", key: "price", dir: "asc", value: "price_asc" },
      { title: "Цена (по убыванию)", key: "price", dir: "desc", value: "price_desc" },
    ]
    : route.name === "MapObjects"
      ? [
        { title: "Свободные места и парковка", key: "combined", dir: "asc", value: "combined_asc" },
        { title: "Свободные места", key: "person", dir: "asc", value: "person_asc" },
        { title: "Свободная парковка", key: "car", dir: "asc", value: "car_asc" },
      ]
      : route.name === "Trips"
        ? [
          { title: "ФИО (А→Я)", key: "fio", dir: "asc", value: "fio_asc" },
          { title: "Аренда (наличие)", key: "house", dir: "desc", value: "house_desc" },
          { title: "Транспорт (наличие)", key: "cars", dir: "desc", value: "cars_desc" },
          { title: "Животные (наличие)", key: "animals", dir: "desc", value: "animals_desc" },
        ] :
        [
          { title: "ФИО (А→Я)", key: "fio", dir: "asc", value: "fio_asc" },
          { title: "Дата (ближайшие выезды)", key: "dateStay", dir: "asc", value: "dateStay_asc" },
          { title: "Аренда (наличие)", key: "house", dir: "desc", value: "house_desc" },
          { title: "Транспорт (наличие)", key: "cars", dir: "desc", value: "cars_desc" },
          { title: "Животные (наличие)", key: "animals", dir: "desc", value: "animals_desc" },
        ];
const onSelectChanged = () => {
  if (!sort.value) return;
  emit("search", {
    search: search.value,
    sortKey: sort.value.key,
    sortDirection: sort.value.dir,
    fromSelect: true
  });
};

const onSearch = () => emit("search", { search: search.value, sort: sort.value });
</script>


<style>
.v-field--variant-solo {
  box-shadow: inset 0 0 6px rgba(255, 255, 255, 0.3),
    2px 2px 8px rgba(17, 44, 18, 0.08) !important;
  transition: 0.3s;
}

.v-field--variant-solo:hover {
  box-shadow: 0 0 0 2px rgba(16, 65, 85, 0.15),
    2px 2px 10px rgba(17, 44, 18, 0.1) !important;
  transform: translateY(-1px);
}

.search-bar .v-field--variant-solo {
  border-radius: 12px !important;
}
</style>

<style scoped>
.search-bar {
  border-radius: 12px;
  padding-left: 2px !important;
  margin-bottom: 5px;
}

.search-input {
  min-width: 200px;
}

.filter-select {
  min-width: 300px;
  max-width: 350px;
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

/* --------------------------
   АДАПТИВНОСТЬ ДЛЯ МОБИЛЬНЫХ
--------------------------- */

/* Телефоны до 600px */
@media (max-width: 600px) {

  .search-bar {
    padding: 6px 0 !important;
    border-radius: 10px;
    gap: 6px !important;
  }

  .search-input :deep(.v-field__input),
  .filter-select :deep(.v-field__input) {
    min-height: 45px !important;
    padding-top: 2px !important;
    padding-bottom: 2px !important;
    font-size: 0.9rem !important;
  }

  .search-controls {
    flex-direction: column;
    gap: 14px !important;
    margin-top: 6px !important;
  }

  .btn-page {
    min-height: 45px !important;
    font-size: 0.9rem !important;
    padding: 4px 10px !important;
  }

  .filter-select {
    min-width: 100%;
    max-width: 100%;
  }

  .search-input {
    min-width: 100%;
  }
}

/* Маленькие телефоны 360–400px */
@media (max-width: 400px) {

  .search-bar {
    padding: 4px 0 !important;
    border-radius: 8px;
  }

  .search-controls {
    gap: 12px !important;
  }

  .search-input :deep(.v-field__input),
  .filter-select :deep(.v-field__input) {
    min-height: 40px !important;
    font-size: 0.85rem !important;
  }

  .btn-page {
    min-height: 34px !important;
    padding: 3px 8px !important;
    font-size: 0.85rem !important;
  }
}

</style>
