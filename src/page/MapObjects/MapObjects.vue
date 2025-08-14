<template>
  <div>
    <v-container>
      <Title :title="title" :icon="'mdi-tent'" class="title" />
      <Search :sort="sortOption" @update:sort="onSortChanged" @search="onSearch" />
      <div class="block">
        <div class="grid-container">
          <Glade 
            v-for="(place, index) in sortedPlaces" 
            :key="index" 
            :place="place" 
            :number="index" 
          />
        </div>
      </div>
    </v-container>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import placesData from './../../../public/data/places.json';

defineOptions({ name: 'MapObjects' });
const title = 'Свободные поляны';

/** Состояние сортировки */
const sortOption = ref({ key: "combined", dir: "asc" });
/** Массив мест */
const places = ref([...placesData]);

/** Сортированный массив */
const sortedPlaces = computed(() => {
  if (!sortOption.value) return places.value;

  const key = sortOption.value.key;
  const dir = sortOption.value.dir === "asc" ? 1 : -1;

  return [...places.value].sort((a, b) => {
    if (key === "combined") {
      const freeA = (a.maxperson - a.person) + (a.maxcar - a.car);
      const freeB = (b.maxperson - b.person) + (b.maxcar - b.car);
      return (freeA - freeB) * dir;
    }
    return (a[key] - b[key]) * dir;
  });
});

/** Обработчик смены сортировки из Search */
const onSortChanged = (newSort) => {
  if (!newSort) return;
  sortOption.value = { key: newSort.key, dir: newSort.dir };
};

/** Обработчик поиска (при необходимости) */
const onSearch = ({ search }) => {
  // Если нужен фильтр по названию
  if (!search) return;
  places.value = [...placesData].filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase())
  );
};
</script>

<style scoped>
.block {
  height: 70vh;
  padding: 0 5px 20px 15px;
  overflow: auto;
  margin-left: -18px;
  margin-top: -5px;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 4px;
  grid-auto-rows: min-content;
}

@media (max-width: 600px) {
  .grid-container {
    grid-template-columns: 1fr;
  }
}
</style>
