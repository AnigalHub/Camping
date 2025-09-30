<template>
  <div class="map">
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

<style>
.v-tab__slider {
  background: transparent !important;
}
</style>

<style scoped>
/* Неактивные табы — чёрные фон и белый текст */
.inactive-tab {
  background-color: rgba(204, 204, 204, 0.2) !important;
  border: 1px solid #CAC9C9;
  box-shadow: 1px -2px 0px rgba(95, 136, 53, 0.4);
  border-radius: 20px 20px 0px 0px;
  opacity: 0.55;
}

/* Активный таб — красный фон, белый текст */
.active-tab {
  background-color: transparent !important;
  border: 1px solid transparent !important;
  box-shadow: 1px -2px 0px rgba(0, 0, 0, 0.2);
  border-radius: 20px 20px 0px 0px;
}


.v-btn {
  text-transform: none;
  font-family: "Zen Kaku Gothic New", sans-serif;
  font-weight: 500;
  letter-spacing: -.15px;
  font-size: 1.45rem;
  color: #3A6210;
  -webkit-text-stroke: .5px #5F8835;
  font-family: "El Messiri", sans-serif;
  font-weight: 200;
}

.v-card {
  height: auto;
  min-height: 75vh;
 border-radius: 20px !important;
  border: 1px solid rgba(0, 0, 0, 0.15);
   box-shadow: inset 0 0 10px rgba(255, 255, 255, 0.3),
    2px 2px 8px rgba(17, 44, 18, 0.1);
}

.v-card .v-card {
  border: none;
}

.map {
  background: url(./public/bg.png) 100% 100% no-repeat;
  background-size: 100% 100%;
  padding: 10px;
}


h1 {
  font-family: "El Messiri", sans-serif;
  font-weight: 200;
 color: #4d672c;
  -webkit-text-stroke: 0.5px #4d672c;
margin: 0 0 15px;
}
</style>