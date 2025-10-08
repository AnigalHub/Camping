<template>
  <div class="page">
    <v-container min-height="97vh">
      <ButtonBack/>
      <div>
        <h1 class="text-center">Карта полянок</h1>
      </div>
      <v-card>
        <v-tabs v-model="tab" grow>
          <v-tab v-for="item in tabs" :key="item" :text="item.text" :value="item.value"
            :class="{ 'active-tab': tab === item.value, 'inactive-tab': tab !== item.value }">
          </v-tab>
        </v-tabs>
        <v-tabs-window v-model="tab">
          <v-tabs-window-item v-for="item in tabs" :key="item" :text="item.text" :value="item.value">
            <v-card-text>
              <div v-if="tab === tabs[0].value">
                <FreeSeats />
              </div>
              <div v-else>
               <CoordinatesObjects/>
              </div>
            </v-card-text>
          </v-tabs-window-item>
        </v-tabs-window>
      </v-card>
    </v-container>
  </div>
</template>

<script setup>
import { shallowRef } from 'vue';
import FreeSeats from './FreeSeats/FreeSeats.vue'
import CoordinatesObjects from './CoordinatesObjects/CoordinatesObjects.vue'

defineOptions({
  name: 'MapObjects'
})
const tab = shallowRef('Свободные места')
const tabs = [
  {
    text: 'Свободные места',
    value: 'Свободные места-1',
  },
  {
    text: 'Координаты объектов',
    value: 'Координаты объектов-2',
  },
]
</script>

<style scoped></style>