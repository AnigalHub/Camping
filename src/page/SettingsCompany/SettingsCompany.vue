<template>
  <div>
    <v-container>
      <Title :title="title" :icon="'mdi-cog-outline'" />
      <v-card style="height: 87vh; padding: 10px 0 !important;">
        <div class="tabs-container desktop-only">
          <div class="tabs-switch">
            <div class="tabs-slider" :style="sliderStyle"></div>
            <v-tab
              v-for="item in tabs"
              :key="item.value"
              :class="['tabs-switch-tab', { active: tab === item.value }]"
              @click="tab = item.value"
              ref="tabRefs"
            >
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
          <v-tabs-window-item
            v-for="item in tabs"
            :key="item.value"
            :value="item.value"
          >
            <v-card-text>
              <div v-if="tab === tabs[0].value">
                <Company />
              </div>
              <div v-else-if="tab === tabs[1].value">
                <Prices />
              </div>
              <div v-else-if="tab === tabs[2].value">
                <Objects />
              </div>
            </v-card-text>
          </v-tabs-window-item>
        </v-tabs-window>
      </v-card>
    </v-container>
  </div>
</template>

<script setup>
import { shallowRef, ref, nextTick, onMounted, watch } from "vue";
import Company from "./Company/Company.vue";
import Prices from "./Prices/Prices.vue";
import Objects from "./Objects/Objects.vue";


defineOptions({
  name: "SettingsCompany",
});
const title = "Настройки, тарифы";

const tabs = [
  { value: "Описание" },
  { value: "Тарифы" },
  { value: "Объекты заселения" },
];

const tab = shallowRef(tabs[0].value);

const tabRefs = ref([]);
const sliderStyle = ref({});

const updateSlider = () => {
  nextTick(() => {
    const activeIndex = tabs.findIndex((t) => t.value === tab.value);
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
</script>

<style scoped>
@import "./../../../public/tabs.css";
</style>