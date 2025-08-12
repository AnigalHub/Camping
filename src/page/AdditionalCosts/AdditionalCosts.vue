<template>
  <div>
    <v-container>
      <Title :title="title" icon="mdi-cash-multiple" />
      <v-card style="min-height:85vh; position:relative; z-index:2; padding: 10px 0 !important;">
        <div class="tabs-container desktop-only">
          <div class="tabs-switch tabs-custom">
            <div class="tabs-slider" :style="sliderStyle"></div>
            <v-tab v-for="(item, i) in tabs" :key="i" :class="['tabs-switch-tab', { active: tab === item.value }]"
              @click="tab = item.value" ref="tabRefs">
              {{ item.value }}
            </v-tab>
          </div>
        </div>
        <div class="mobile-tabs mobile-only">
          <div class="mobile-tabs-wrapper">
            <button 
              v-for="(item, i) in tabs" 
              :key="i" 
              :class="['mobile-tab', { active: tab === item.value }]"
              @click="tab = item.value"
            >
              {{ item.value }}
            </button>
          </div>
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
import { shallowRef, ref, nextTick, onMounted, onBeforeUnmount, watch } from "vue";
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
    const activeIndex = tabs.findIndex((t) => t.value === tab.value);
    const el = tabRefs.value[activeIndex]?.$el ?? tabRefs.value[activeIndex];
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const parentRect = el.parentElement.getBoundingClientRect();

    sliderStyle.value = {
      width: `${rect.width}px`,
      transform: `translateX(${rect.left - parentRect.left}px)`
    };
  });
};

onMounted(() => {
  updateSlider();
  window.addEventListener("resize", updateSlider);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateSlider);
});

watch(tab, updateSlider);
</script>


<style scoped>
@import "./../../../public/tabs.css";
</style>