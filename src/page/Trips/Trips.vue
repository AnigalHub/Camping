<template>
  <div>
    <v-container>
      <Title :title="title" icon="mdi-calendar-clock-outline" />
      <v-card style="min-height:85vh;position:relative;z-index:2">
        <div class="tabs-container desktop-only">
          <div class="tabs-switch">
            <div class="tabs-slider" :style="sliderStyle"></div>
            <v-tab v-for="(item, i) in tabs" :key="item" :value="item"
              :class="['tabs-switch-tab', { active: tab === item }]" @click="tab = item" ref="tabRefs">
              <div v-if="i < 2" class="tab-label">{{ i === 0 ? 'Сегодня' : 'Завтра' }}</div>
              {{ item }}
            </v-tab>
          </div>
        </div>
        <div class="mobile-tabs mobile-only">
          <button class="arrow" @click="prevTab">‹</button>
          <div class="mobile-tab-label">{{ tab }}</div>
          <button class="arrow" @click="nextTab">›</button>
        </div>
        <v-tabs-window v-model="tab">
          <v-tabs-window-item v-for="item in tabs" :key="item" :text="item" :value="item">
            <div v-if="filteredItems.length">
              <search style="margin-top: -10px;"/>
              <Table :headers="headers" :items="filteredItems" sortByKey="fio" />
            </div>
            <div v-else class="no_data">Данных за день нет.</div>
          </v-tabs-window-item>
        </v-tabs-window>
      </v-card>
    </v-container>
  </div>
</template>

<script setup>
import items from './../../../public/data/clients.json';
import { shallowRef, ref, computed, onMounted, nextTick, watch } from "vue";

defineOptions({
  name: "Trips",
});
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
const updateSlider = () => {
  nextTick(() => {
    const activeIndex = tabs.indexOf(tab.value);
    const el = tabRefs.value[activeIndex]?.$el || tabRefs.value[activeIndex];
    if (el) {
      sliderStyle.value = {
        width: `${el.offsetWidth}px`,
        transform: `translateX(${el.offsetLeft}px)`,
      };
    }
  });
};
onMounted(updateSlider);
watch(tab, updateSlider);

// Mobile navigation
const nextTab = () => {
  const idx = tabs.findIndex((t) => t.value === tab.value);
  tab.value = tabs[(idx + 1) % tabs.length].value;
};

const prevTab = () => {
  const idx = tabs.findIndex((t) => t.value === tab.value);
  tab.value = tabs[(idx - 1 + tabs.length) % tabs.length].value;
};

// --- Логика фильтрации, таблицы и данных без изменений ---
const filteredItems = computed(() => {
  const currentDateStr = tab.value;
  const filtered = items.filter((item) => {
    const endDate = new Date(item.endDate);
    const day = String(endDate.getDate()).padStart(2, "0");
    const month = String(endDate.getMonth() + 1).padStart(2, "0");
    const year = endDate.getFullYear();
    const endDateStr = `${day}.${month}.${year}`;
    return endDateStr === currentDateStr;
  });
  return filtered.sort((a, b) => new Date(a.endDate) - new Date(b.endDate));
});

const headers = [[
  { label: "ФИО", rowspan: 2, key: "fio", sortable: true },
  { label: "Телефон", rowspan: 2, key: "phone" },
  { label: "Проживание", rowspan: 2, key: "dateStay", sortable: true },
  { label: "Аренда домика", rowspan: 2, key: "house", sortable: true },
  { label: "Транспорт", rowspan: 2, key: "cars", sortable: true },
  { label: "Животные", rowspan: 2, key: "animals", sortable: true },
  { label: "Поляна", rowspan: 2, key: "object", sortable: true },
  { label: "Стоимость", rowspan: 2, key: "price", sortable: true },
  { label: "", key: "buttons" }
]];
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
  padding: 15px
}
</style>
