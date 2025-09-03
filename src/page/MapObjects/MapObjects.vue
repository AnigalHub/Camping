<template>
  <div>
    <v-container>
      <Title :title="title" :icon="'mdi-tent'" class="title" />
      <Search />
      <div class="block">
        <div class="grid-container">
          <Glade v-for="(place, index) in places" :key="index" :place="place" :number="index" />
        </div>
      </div>
    </v-container>
  </div>
</template>

<script setup>
defineOptions({ name: 'MapObjects' })

const title = 'Свободные поляны';
const places = [
  {
    name: "У Песчаного Моря",
    description: "Тёплый песок, мягкий бриз и спокойные волны",
    icon: "mdi-weather-sunny",
    color: "#f4b740",
    value: '43.960635, 39.263933',
    percentPerson: "24",
    textPerson: "7/30",
    percentCar: "10",
    textCar: "2/20",
  },
  {
    name: "В Тени Сосен",
    description: "Аромат хвои, прохлада и шелест леса",
    icon: "mdi-pine-tree",
    color: "#8ab45a",
    value: '44.260545, 37.463974',
    percentPerson: "30",
    textPerson: "3/10",
    percentCar: "12",
    textCar: "1/8",
  },
  {
    name: "У Подножья Гор",
    description: "Величественные вершины и кристально чистый воздух",
    icon: "mdi-image-filter-hdr",
    color: "#bca37f",
    value: '46.742464, 35.933421',
    percentPerson: "56",
    textPerson: "14/25",
    percentCar: "45",
    textCar: "7/15",
  },
  {
    name: 'Звёздная Ночь',
    value: '50.456723, 36.234655',
    icon: 'mdi-star-shooting',
    description: 'Чистое небо, млечный путь и тишина природы',
    color: '#6d8bc9',
    value: '45.126335, 34.393356',
    percentPerson: "14",
    textPerson: "2/15",
    percentCar: "50",
    textCar: "5/10",
  },
  {
    name: 'Закат у Моря',
    value: '47.256335, 32.372356',
    icon: 'mdi-weather-sunset',
    description: 'Нежное сияние заката над морской гладью',
    color: '#ff9c6a',
    value: '47.256335, 32.372356',
    percentPerson: "40",
    textPerson: "4/10",
    percentCar: "60",
    textCar: "3/5",
  },
  {
    name: 'У Ветреного Берега',
    value: '41.830533, 31.118635',
    icon: 'mdi-waves',
    description: 'Плеск волн и морской бриз',
    color: '#7cb7c5',
    value: '48.363257, 30.295367',
    percentPerson: "28",
    textPerson: "7/25",
    percentCar: "65",
    textCar: "13/20",
  },
  {
    name: 'Лесная Опушка',
    value: '45.126335, 34.393356',
    icon: 'mdi-flower',
    description: 'Солнечная поляна, пение птиц и мягкий свет',
    color: '#d7a77b',
    value: '41.830533, 31.118635',
    percentPerson: "40",
    textPerson: "10/25",
    percentCar: "90",
    textCar: "9/10",
  },
  {
    name: 'Между Морем и Горами',
    value: '49.220335, 46.253733',
    icon: 'mdi-compass',
    description: 'Баланс стихий — море, горы и небо',
    color: '#9a8cd4',
    value: '49.220335, 46.253733',
    percentPerson: "27",
    textPerson: "4/15",
    percentCar: "29",
    textCar: "2/7",
  },
  {
    name: 'Под Горным Ветром',
    value: '48.363257, 30.295367',
    icon: 'mdi-weather-windy',
    description: 'Свежесть ветра и свобода простора',
    color: '#8bb7d2',
    value: '50.456723, 36.234655',
    percentPerson: "30",
    textPerson: "3/10",
    percentCar: "80",
    textCar: "4/5",
  },
  {
    name: 'У Горного Озера',
    value: '51.162342, 37.635122',
    icon: 'mdi-water-outline',
    description: 'Хрустальная вода и отражение гор в глади озера',
    color: '#7db6d4',
    value: '51.162342, 37.635122',
    percentPerson: "40",
    textPerson: "8/20",
    percentCar: "50",
    textCar: "6/12",
  },
  {
    name: 'Долина Цветов',
    value: '52.342156, 38.451212',
    icon: 'mdi-flower-tulip-outline',
    description: 'Ковёр из ароматных трав и цветов под солнцем',
    color: '#d48ab4',
    value: '52.342156, 38.451212',
    percentPerson: "5",
    textPerson: "1/20",
    percentCar: "89",
    textCar: "8/9",
  },
  {
    name: 'Сосновая Тропа',
    value: '53.152534, 40.126334',
    icon: 'mdi-nature',
    description: 'Шелест хвои и лёгкий аромат смолы на тропинке',
    color: '#8cc47d',
    value: '53.152534, 40.126334',
    percentPerson: "73",
    textPerson: "11/15",
    percentCar: "84",
    textCar: "5/6",
  },
];
</script>
<style scoped>
.block {
  height: 78vh;
  padding: 0 15px 20px;
  overflow: auto;
  margin-left: -18px;
  margin-top: -5px;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 4px;
  grid-auto-rows: min-content;
}

@media (max-width: 600px) {
  .grid-container {
    grid-template-columns: 1fr;
  }
}
</style>