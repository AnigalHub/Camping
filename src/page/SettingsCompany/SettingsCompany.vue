<template>
  <div class="page">
    <v-container>
      <Title :title="title" :icon="'mdi-cog-outline'" />
      <v-card style="height: 87vh">
        <div class="tabs-container">
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
        <v-tabs-window v-model="tab">
          <v-tabs-window-item
            v-for="item in tabs"
            :key="item.value" 
            :value="item.value"
          >
            <v-card-text>
              <div v-if="tab === tabs[0].value">
                <Company/>
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
const title = "Управление лагерем и тарифами";

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
    const activeIndex = tabs.findIndex(t => t.value === tab.value);
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
</script>

<style scoped>
.tabs-switch {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background: #fff;
  border-radius: 15px;
  width: fit-content;
  box-sizing: border-box;
  font-weight: 800 !important;
  font-family: var(--font-family-title);
  margin-bottom: 15px;
  padding: 0; /* убираем внутренний отступ */
  overflow: hidden; /* чтобы скругления выглядели аккуратно */
}

.tabs-slider {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  border-radius: 15px;
  background-color: #89ac49d7;
  border: 1.5px solid var(--border-color-inactive-tab);
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 0;
}

.tabs-switch-tab {
  text-align: center;
  background: transparent;
  border: none;
  font-weight: 600;
  font-size: 14px;
  padding: 15px 25px;
  cursor: pointer;
  letter-spacing: 2px;
  color: #494c54;
  position: relative;
  z-index: 1;
  transition: all 0.25s ease;
  border-radius: 0; 
  margin: 0; 
}

.tabs-switch-tab:first-child {
  border-radius: 15px 0 0 15px;
}

.tabs-switch-tab:last-child {
  border-radius: 0 15px 15px 0;
}

.tabs-switch-tab:hover {
  background-color: rgba(57, 181, 94, 0.05);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
}

.tabs-switch-tab.active {
  color: #fff;
  font-weight: 900;
  -webkit-text-stroke: .05px #fff;
  box-shadow: 0 4px 10px rgba(138, 181, 57, 0.096);
}

.list {
  height: 58vh;
}
</style>