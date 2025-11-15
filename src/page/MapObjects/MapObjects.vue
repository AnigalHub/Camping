<template>
  <div class="page">
    <v-container>
      <Title :title="title" :icon="'mdi-tent'"/>
      <v-card >
                <FreeSeats />
                <!-- <CoordinatesObjects /> -->
            <AvailableGlades/>
      </v-card>
    </v-container> 
  </div>
</template>

<script setup>
import { shallowRef, ref, computed, onMounted, nextTick, watch } from "vue";
import AvailableGlades from "./../Home/AvailableGlades/AvailableGlades.vue";
import FreeSeats from './FreeSeats/FreeSeats.vue'
import CoordinatesObjects from './CoordinatesObjects/CoordinatesObjects.vue'

defineOptions({ name: 'MapObjects' })

const title = 'Свободные поляны';

// Данные табов
const tabs = [
  { text: 'Свободные места', value: 'free' },
  { text: 'Координаты объектов', value: 'coords' },
]

// Текущий активный таб (сохраняем value)
const tab = shallowRef(tabs[0].value);

// Подсветка активного таба
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
  background-color: #89ac49d7;
  border: 1.5px solid var(--border-color-inactive-tab);
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 0;
}

.tabs-switch-tab {
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

.tabs-switch-tab:hover {
  background-color: rgba(57, 181, 94, 0.05);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  border-radius: 15px !important;
}

.tabs-switch-tab.active {
  color: #fff;
  font-weight: 900;
  -webkit-text-stroke: .05px #fff;
  box-shadow: 0 4px 10px rgba(138, 181, 57, 0.096);
}
</style>