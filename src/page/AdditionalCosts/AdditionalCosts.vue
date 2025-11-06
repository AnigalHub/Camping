<template>
  <div class="page">
    <v-container>
      <Title :title="title" :icon="'mdi-cash-multiple'" />
      <v-card :style="!tabs[1].value ? 'height: 100vh;' : 'height: 87vh;'">
        <div class="tabs-container">
          <div class="tabs-switch">
            <div class="tabs-slider" :style="sliderStyle"></div>
            <v-tab
              v-for="item in tabs"
              :key="item.value" 
              :class="['tabs-switch__tab', { active: tab === item.value }]"
              @click="tab = item.value"
              ref="tabRefs"
            >
              {{ item.text }} <!-- Выводим текст таба -->
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
                <AddExpenses/>
              </div>
              <div v-else-if="tab === tabs[1].value">
                <search />
                <ListExpenses class="list" />
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
import AddExpenses from "./AddExpenses/AddExpenses.vue";
import ListExpenses from "./ListExpenses/ListExpenses.vue";

defineOptions({
  name: "AdditionalCosts",
});
const title = "Учет расходов";

const tabs = [
  { text: "Добавить расходы", value: "Добавить расходы-1" },
  { text: "Список расходов", value: "Список расходов-2" },
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
  background: #fff;
  border-radius: 15px;
  overflow: hidden;
  width: 100%;
  box-sizing: border-box;
  font-weight: 800 !important;
  font-family: var(--font-family-title);
  margin-bottom: 15px;
  padding: 0;
}

.tabs-slider {
  position: absolute;
  top: 0;     
  left: 0;
  height: 100%; 
  border-radius: 15px;
  background-color: #f6f9ef;
  border: 1.5px solid #8ab539;
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 0;
}

.tabs-switch__tab {
  flex: 1;
  text-align: center;
  background: transparent;
  border: none;
  font-weight: 600;
  font-size: 14px;
  padding: 15px 0;
  cursor: pointer;
  letter-spacing: 2px;
  color: #494c54;
  position: relative;
  z-index: 1;
  transition: all 0.25s ease;
  border-radius: 15px; /* сохраняем закругления */
  margin: 1px 2px; /* убрали внешний отступ */
}

.tabs-switch__tab:hover {
  background-color: rgba(57, 181, 94, 0.05); 
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  border-radius: 15px !important;
}

.tabs-switch__tab.active {
color: #71964f;
    font-weight: 900;
    -webkit-text-stroke: 0.5px #759a6c;
    box-shadow: 0 4px 10px rgba(138, 181, 57, 0.096);
}

.list {
  height: 58vh;
}
</style>