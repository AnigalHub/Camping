<template>
  <div class="page">
    <v-container min-height="97vh">
      <ButtonBack />
      <div>
        <h1 class="text-center">Дополнительные расходы и настройки</h1>
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
                Нету
              </div>
              <div v-if="tab === tabs[1].value">
                <Search />
                <ListExpenses />
              </div>
              <div v-if="tab === tabs[2].value">
                <v-row no-gutters>
                  <v-col></v-col>
                  <v-col cols="3">
                    <img src="./../../../../public/33.png" style="width: 120%; height: 50vh; margin-left: -25%; " />
                  </v-col>
                </v-row>
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
  {
    text: 'Настройки',
    value: 'Настройки-3',
  },
]
</script>

<style scoped></style>