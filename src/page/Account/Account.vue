<template>
  <div>
    <v-container>
      <Title :title="title" :icon="'mdi-account-outline'"/>
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
                <PersonalData/>
              </div>
              <div v-else-if="tab === tabs[1].value">
                <ChangePassword/>
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
import PersonalData from "./PersonalData/PersonalData.vue";
import ChangePassword from "./ChangePassword/ChangePassword.vue";

defineOptions({
  name: 'Account'
})

const title = 'Учетная запись'

const tabs = [
  { value: "Персональные данные" },
  { value: "Изменение пароля" },
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
</script>
<style scoped>
@import "./../../../public/tabs.css";
</style>

