<template>
    <div class="map">
      <v-container min-height="97vh">
        <ButtonBack/>
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
                    <ListExpenses/>
                </div>
                <div v-if="tab === tabs[2].value">
                    Нету
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

  const tab = shallowRef('Добавить расходы')
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
    font-size: 1.2rem;
    color: #3A6210;
    -webkit-text-stroke: .5px #5F8835;
  }
  
  .v-card {
    height: auto;
    min-height: 70vh;
    border-radius: 10px !important;
    border: 1px solid rgba(0, 0, 0, 0.15);
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
    color: #4d702be7;
    margin: 10px 0 20px;
  }
  </style>