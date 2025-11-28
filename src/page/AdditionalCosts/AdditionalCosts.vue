<template>
  <div>
    <v-container>
      <Title :title="title" icon="mdi-cash-multiple" />
      <v-card style="min-height:85vh;position:relative;z-index:2">
        <div class="tabs-container">
          <div class="tabs-switch">
            <div class="tabs-slider" :style="sliderStyle"></div>
            <v-tab
              v-for="(item, i) in tabs"
              :key="i"
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
            v-for="(item, i) in tabs"
            :key="i"
            :value="item.value"
          >
            <AddExpenses v-if="tab === tabs[0].value" />
            <ListExpenses v-else/>
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

// const cardHeight = computed(() =>
//   tab === tabs[1].value ? "height: 87vh;" : "height: 100vh;"
// );

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
</script>


<style scoped>
.tabs-switch {
  position: relative;
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 15px;
  width: fit-content;
  box-sizing: border-box;
  font-weight: 800 !important;
  font-family: var(--font-family-title);
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
  transition: .35s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 0;
}

.tabs-switch-tab {
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
  transition: .25s ease;
}

.tabs-switch-tab:first-child {
  border-radius: 15px 0 0 15px;
}

.tabs-switch-tab:last-child {
  border-radius: 0 15px 15px 0;
}

.tabs-switch-tab:hover {
  background: rgba(57, 181, 94, .05);
  box-shadow: 0 2px 6px rgba(0, 0, 0, .08);
}

.tabs-switch-tab.active {
  color: #fff;
  font-weight: 900;
  -webkit-text-stroke: .05px #fff;
  box-shadow: 0 4px 10px rgba(138, 181, 57, .096);
}
</style>