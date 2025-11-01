<template>
  <div class="page">
    <v-container >
      <Title :title="title" :icon="'mdi-cash-multiple'"/>
      <v-card :style="!tabs[1].value ? 'height: 100vh;':'height: 87vh;'">
        <v-tabs v-model="tab" >
          <v-tab v-for="item in tabs" :key="item" :text="item.text" :value="item.value"
            :class="{ 'active-tab': tab === item.value, 'inactive-tab': tab !== item.value }">
          </v-tab>
        </v-tabs>
        <v-tabs-window v-model="tab">
          <v-tabs-window-item v-for="item in tabs" :key="item" :text="item.text" :value="item.value">
            <v-card-text>
              <div v-if="tab === tabs[0].value" class="content">
                Нету
              </div>
              <div v-if="tab === tabs[1].value">
                <Search />
                <ListExpenses class="list"/>
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
import ListExpenses from './ListExpenses/ListExpenses.vue'

defineOptions({
  name: 'AdditionalCosts'
})
const title = 'Учет расходов';
const tab = shallowRef('Добавить расходы');
const tabs = [
  {
    text: 'Добавить расходы',
    value: 'Добавить расходы-1',
  },
  {
    text: 'Список расходов',
    value: 'Список расходов-2',
  },
]
</script>

<style scoped>
.list{
  height: 58vh;
}
</style>