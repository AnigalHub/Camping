<template>
  <div>
    <v-container>
      <Title :title="title" :icon="'mdi-tent'" class="title" />
      <Search />
      <div class="block">
        <div class="grid-container">
          <Glade v-for="(place, index) in places" :key="index" :place="place" :number="index" :rightLayout="true"/>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script setup>
import places from './../../../public/data/places.json';
defineOptions({ name: 'MapObjects' })
const title = 'Свободные поляны';
</script>

<style scoped>
.block {
  height: 70vh;
  padding: 0 5px 20px 15px;
  overflow: auto;
  margin-left: -18px;
  margin-top: -5px;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 4px;
  grid-auto-rows: min-content;
}

@media (max-width: 600px) {
  .grid-container {
    grid-template-columns: 1fr;
  }
}

</style>