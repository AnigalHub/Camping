<template>
  <div>
    <v-container>
      <Title :title="title" icon="mdi-calendar-clock-outline" />
      <v-card style="min-height:85vh;position:relative;z-index:2; padding: 10px 0 !important;">
        <div class="tabs-container desktop-only">
          <div class="tabs-switch tabs-custom">
            <div class="tabs-slider" :style="sliderStyle"></div>
            <v-tab v-for="(item, i) in tabs" :key="item" :value="item"
              :class="['tabs-switch-tab', { active: tab === item }]" @click="tab = item" ref="tabRefs">
              <div v-if="i < 2" class="tab-label">{{ i === 0 ? 'Сегодня' : 'Завтра' }}</div>
              {{ item }}
            </v-tab>
          </div>
        </div>
        <div class="mobile-tabs mobile-only">
          <div class="mobile-tabs-wrapper" ref="mobileTabsWrapper">
            <button v-for="(item, i) in tabs" :key="item" :class="['mobile-tab', { active: tab === item }]"
              @click="tab = item">
              {{ i === 0 ? 'Сегодня' : i === 1 ? 'Завтра' : item }}
            </button>
          </div>
        </div>
        <v-tabs-window v-model="tab">
          <v-tabs-window-item v-for="item in tabs" :key="item" :text="item" :value="item">
            <div v-if="filteredSortedItems.length">
              <Search v-model:sort="searchSort" @search="onSearchChanged" class="search_block"/>
              <Table :headers="headers" :items="filteredSortedItems" />
            </div>
            <div v-else class="no_data">Данных за день нет.</div>
          </v-tabs-window-item>
        </v-tabs-window>
      </v-card>
    </v-container>
  </div>
</template>

<script setup>
import itemsData from './../../../public/data/clients.json';
import { ref, computed, shallowRef, onMounted } from "vue";
import { useTabsSlider } from "./../../utils/useTabsSlider.js";

defineOptions({ name: "Trips" });

const title = "Ближайшие выезды";

function get7Days() {
  const result = [];
  const today = new Date();
  for (let i = 0; i < 7; i++) {
    const nextDate = new Date(today);
    nextDate.setDate(today.getDate() + i);
    const day = String(nextDate.getDate()).padStart(2, "0");
    const month = String(nextDate.getMonth() + 1).padStart(2, "0");
    const year = nextDate.getFullYear();
    result.push(`${day}.${month}.${year}`);
  }
  return result;
}

const tabs = get7Days();
const tab = shallowRef(tabs[0]);
const tabRefs = ref([]);
const sliderStyle = ref({});

onMounted(() => {
  searchSort.value = null;
});

useTabsSlider(tabs, tab, tabRefs, sliderStyle, true);

const headers = [[
  { label: "ФИО", key: "fio" },
  { label: "Телефон", key: "phone" },
  { label: "Проживание", key: "dateStay" },
  { label: "Домик", key: "house" },
  { label: "Транспорт", key: "cars" },
  { label: "Животные", key: "animals" },
  { label: "Поляна", key: "object" },
  { label: "Стоимость", key: "price" },
  { label: "", key: "buttons" }
]];

const items = ref(itemsData);
const sortKey = ref("fio");
const sortDirection = ref("asc");
const searchSort = ref(null);

const onSearchChanged = ({ sortKey: key, sortDirection: dir, fromSelect }) => {
  if (!fromSelect) return;
  sortKey.value = key || null;
  sortDirection.value = dir || "asc";
};


const compareFio = (a, b) =>
  ["surname", "name", "patronymic"].reduce((r, f) =>
    r !== 0 ? r : (a[f] || "").localeCompare(b[f] || ""), 0);

const filteredSortedItems = computed(() => {
  const currentDateStr = tab.value;

  let filtered = items.value.filter(item => {
    const endDate = new Date(item.endDate);
    const day = String(endDate.getDate()).padStart(2, "0");
    const month = String(endDate.getMonth() + 1).padStart(2, "0");
    const year = endDate.getFullYear();
    const endDateStr = `${day}.${month}.${year}`;
    return endDateStr === currentDateStr;
  });

  if (!sortKey.value) return filtered;

  const sorted = [...filtered].sort((a, b) => {
    if (sortKey.value === "fio") return compareFio(a, b);
    if (sortKey.value === "dateStay") return new Date(a.endDate) - new Date(b.endDate);
    return String(a[sortKey.value] ?? "").localeCompare(String(b[sortKey.value] ?? ""));
  });

  return sortDirection.value === "asc" ? sorted : sorted.reverse();
});
</script>


<style scoped>
@import "./../../../public/tabs.css";

.tabs-switch {
  width: 100%;
}

.tabs-switch-tab {
  flex: 1;
}

.content {
  height: 62vh;
}

.no_data {
  background: var(--background-content-card) !important;
  box-shadow: var(--box-shadow-content-card) !important;
  border-radius: var(--border-radius-content-card) !important;
  height: 71vh;
  padding: 15px;
  margin-top: 10px;
}

@media (max-width: 700px) {
  .search_block{
    margin-top: 0;
  }
  .no_data {
    margin-top: 5px;
  }
}
</style>
