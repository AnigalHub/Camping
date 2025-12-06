<template>
  <div>
    <v-container>
      <Title :title="title" icon="mdi-cash-multiple" />
      <v-card style="min-height:85vh; position:relative; z-index:2; padding: 10px 0 !important;">
        <div class="tabs-container desktop-only">
          <div class="tabs-switch">
            <div class="tabs-slider" :style="sliderStyle"></div>
            <v-tab v-for="(item, i) in tabs" :key="i" :class="['tabs-switch-tab', { active: tab === item.value }]"
              @click="tab = item.value" ref="tabRefs">
              {{ item.value }}
            </v-tab>
          </div>
        </div>
        <div class="mobile-tabs mobile-only">
          <button class="arrow" @click="prevTab">‹</button>
          <div class="mobile-tab-label">{{ tab }}</div>
          <button class="arrow" @click="nextTab">›</button>
        </div>
        <v-tabs-window v-model="tab">
          <v-tabs-window-item v-for="(item, i) in tabs" :key="i" :value="item.value">
            <AddExpenses v-if="tab === tabs[0].value" />
            <ListExpenses v-else />
          </v-tabs-window-item>
        </v-tabs-window>
      </v-card>
    </v-container>
  </div>
</template>

<script setup>
import { shallowRef, ref, nextTick, computed, onMounted, watch } from "vue";
import AddExpenses from "./AddExpenses/AddExpenses.vue";
import ListExpenses from "./ListExpenses/ListExpenses.vue";

defineOptions({ name: "AdditionalCosts" });

const title = "Учет расходов";

const tabs = [
  { value: "Добавить расходы" },
  { value: "Список расходов" },
];

const tab = shallowRef(tabs[0].value);

const tabRefs = ref([]);
const sliderStyle = ref({});

const updateSlider = () => {
  nextTick(() => {
    const index = tabs.findIndex(t => t.value === tab.value);
    const el = tabRefs.value[index]?.$el || tabRefs.value[index];
    if (!el) return;

    sliderStyle.value = {
      width: `${el.offsetWidth}px`,
      transform: `translateX(${el.offsetLeft}px)`
    };
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
</script>


<style scoped>
@import "./../../../public/tabs.css";
</style>