<template>
  <div>
    <v-container>
      <Title :title="title"/>
      <v-card style="padding: 10px 0 !important;">
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
              <div v-else-if="tab === tabs[3].value">
                <Houses />
              </div>
            </v-card-text>
          </v-tabs-window-item>
        </v-tabs-window>
      </v-card>
    </v-container>
  </div>
</template>

<script setup>
import { shallowRef, ref } from "vue";
import { useTabsSlider } from "./../../utils/useTabsSlider.js";
import Company from "./Company/Company.vue";
import Prices from "./Prices/Prices.vue";
import Objects from "./Objects/Objects.vue";
import Houses from "./Houses/Houses.vue";

defineOptions({
  name: "SettingsCompany",
});

const title = "Настройки, тарифы";

const tabs = [
  { value: "Описание" },
  { value: "Тарифы" },
  { value: "Поляны" },
  { value: "Глэмпинг" },
];

const tab = shallowRef(tabs[0].value);
const tabRefs = ref([]);
const sliderStyle = ref({});

useTabsSlider(tabs, tab, tabRefs, sliderStyle);
</script>

<style scoped>
@import "./../../../public/tabs.css";
.content{
  margin-top: 5px;
}
</style>