<template>
  <div>
    <v-container>
      <Title :title="title" :icon="'mdi-cog-outline'" />
      <v-card style="height: 87vh">
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
.desktop-only {
  display: flex;
}

.mobile-only {
  display: none;
}

.tabs-switch {
  position: relative;
  display: flex;
  background: #fff;
  border-radius: 15px;
  width: fit-content;
  font-weight: 800;
  margin-bottom: 15px;
  overflow: hidden;
}

.tabs-slider {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  border-radius: 15px;
  background: #89ac49d7;
  border: 1.5px solid var(--border-color-inactive-tab);
  transition: .35s;
  z-index: 0;
}

.tabs-switch-tab {
  padding: 15px 25px;
  cursor: pointer;
  letter-spacing: 2px;
  color: #494c54;
  background: transparent;
  transition: .25s;
  z-index: 1;
}

.tabs-switch-tab.active {
  color: #fff;
  font-weight: 900;
  -webkit-text-stroke: .05px #fff;
  box-shadow: 0 4px 10px rgba(138, 181, 57, .096);
}

.mobile-tabs {
  display: none;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-bottom: 15px;
}

.mobile-tab-label {
  font-size: 16px;
  font-weight: 700;
  min-width: 150px;
  text-align: center;
  color: #3e3f45;
}

.arrow {
  background: #89ac49d7;
  border: none;
  color: #fff;
  font-size: 22px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, .15);
  transition: transform .2s;
}

.arrow:active {
  transform: scale(.9);
}

/* Breakpoint */
@media (max-width:700px) {
  .desktop-only {
    display: none;
  }

  .mobile-only {
    display: flex;
  }
}
</style>