<template>
  <v-row no-gutters>
        <v-col >
      <!-- <component :is="mapSvg"/> -->
        <img src="./../../../../public/map_2.png" style="width: 100%;height: 63vh;" />
    </v-col>

     <v-col cols="3">
      <v-card height="50vh" class="coordinates">
        <v-list lines="two">
          <v-list-item v-for="(item, index) in halfArray" :key="index" two-line>
            <template v-slot:prepend>
              <v-icon icon="mdi-circle" size="x-small" color="#3A6210"></v-icon>
            </template>
            <v-list-item-content>
              <v-list-item-title>Поляна {{ index + 1 }}</v-list-item-title>
              <v-list-item-subtitle>{{ item.value }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-col>
        <v-col cols="3">
      <v-card height="50vh" class="coordinates">
        <v-list lines="two">
          <v-list-item v-for="(item, index) in halfFromEnd" :key="index" two-line>
            <template v-slot:prepend>
              <v-icon icon="mdi-circle" size="x-small" color="#3A6210"></v-icon>
            </template>
            <v-list-item-content>
              <v-list-item-title>Поляна {{ halfArray.length + index + 1 }}</v-list-item-title>
              <v-list-item-subtitle>{{ item.value }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-col>

  </v-row>
</template>

<script setup>
import { computed } from 'vue';
import map from './../../../svg/map.vue';
import { shallowRef } from 'vue'
const mapSvg = shallowRef(map)
const items = [
  { value: '43.960635, 39.263933' },
  { value: '44.260545, 37.463974' },
  { value: '46.742464, 35.933421' },
  { value: '45.126335, 34.393356' },
  { value: '47.256335, 32.372356' },
  { value: '48.363257, 30.295367' },
  { value: '41.830533, 31.118635' },
  { value: '49.220335, 46.253733' },
]

 const halfArray= computed(() => { 
      const halfIndex = Math.floor(items.length / 2);
      return items.slice(0, halfIndex);
  })

  const  halfFromEnd= computed(() => { 
      const halfIndex = Math.ceil(items.length / 2);
      return items.slice(-halfIndex);
    })
</script>

<style>
.v-list-item__prepend {
  display: block !important;
}
</style>
<style scoped>
.v-list-item-title {
  color: #3A6210;
  -webkit-text-stroke: .05px #5F8835;
  font-family:  var(--font-family);
  font-weight: 500;
  font-size: 1.35rem;
  letter-spacing: -1px;
}

.v-list-item-subtitle {
  font-size: 1.2rem;
}

.coordinates {
  overflow: auto;
  border-radius: 10px;
  margin-top: 5%;
}

.v-card .v-card {
  margin: 5px 30px 10px 15px;
  border-radius: 10px; 
  border: none;
  box-shadow: none;
}
svg {
  width: 100%;
  margin-top: 20px;
  max-height: 50vh;
  height: auto;
}

/* WebKit стили */
.coordinates::-webkit-scrollbar {
  width: 8px;
  /* ширина полосы прокрутки */
  height: 8px;
  /* ширина полосы прокрутки */
}

.coordinates::-webkit-scrollbar-track {
  background: transparent;
  /* фон дорожки */
  border-radius: 4px;
}

.coordinates::-webkit-scrollbar-thumb {
  background-color: #8AB539;
  /* желаемый цвет ползунка */
  border-radius: 4px;
}

.coordinates::-webkit-scrollbar-track {
  background-color: #e0e0e0;
  /* цвет фона полоски */
  border: .3px solid #9f9f9f;
  border-radius: 4px;
}

.v-list{
  margin-top: 3%;
      background: rgb(250 250 250);
}
</style>