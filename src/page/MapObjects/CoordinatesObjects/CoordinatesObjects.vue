<template>
  <v-card class="menu-grid" style="overflow-y: auto;">
    <div v-for="(menu, i) in items" :key="i" class="card_menu">
      <div class="menu_header">
        <div class="number_circle">{{ i + 1 }}</div>
        <h3 class="menu_title">{{ menu.name }}</h3>
      </div>
      <div class="decor_block">
        <v-icon class="decor_icon" :style="{ color: menu.color }">
          {{ menu.icon }}
        </v-icon>
        <p class="decor_text">{{ menu.caption }}</p>
      </div>
      <div class="coords_block" @click="copyCoords(menu.value, i)">
        <span class="coords_value">{{ menu.value }}</span>
        <v-icon size="16" color="#5F8835">mdi-content-copy</v-icon>
      </div>
      <div class="card_footer" @click="openOnMap(menu.value)">
        <v-icon size="18" color="#5F8835">mdi-map-marker</v-icon>
        <span>Открыть на картах</span>
      </div>
    </div>
  </v-card>
</template>

<script setup>
import { ref } from 'vue';

const items = [
  { name: 'У Песчаного Моря', value: '43.960635, 39.263933', icon: 'mdi-weather-sunny', caption: 'Тёплый песок, мягкий бриз и спокойные волны', color: '#f4b740' },
  { name: 'В Тени Сосен', value: '44.260545, 37.463974', icon: 'mdi-pine-tree', caption: 'Аромат хвои, прохлада и шелест леса', color: '#8ab45a' },
  { name: 'У Подножья Гор', value: '46.742464, 35.933421', icon: 'mdi-image-filter-hdr', caption: 'Величественные вершины и кристально чистый воздух', color: '#bca37f' },
  { name: 'Лесная Опушка', value: '45.126335, 34.393356', icon: 'mdi-flower', caption: 'Солнечная поляна, пение птиц и мягкий свет', color: '#d7a77b' },
  { name: 'Закат у Моря', value: '47.256335, 32.372356', icon: 'mdi-weather-sunset', caption: 'Нежное сияние заката над морской гладью', color: '#ff9c6a' },
  { name: 'Под Горным Ветром', value: '48.363257, 30.295367', icon: 'mdi-weather-windy', caption: 'Свежесть ветра и свобода простора', color: '#8bb7d2' },
  { name: 'У Ветреного Берега', value: '41.830533, 31.118635', icon: 'mdi-waves', caption: 'Плеск волн и морской бриз', color: '#7cb7c5' },
  { name: 'Между Морем и Горами', value: '49.220335, 46.253733', icon: 'mdi-compass', caption: 'Баланс стихий — море, горы и небо', color: '#9a8cd4' },
  { name: 'Звёздная Ночь', value: '50.456723, 36.234655', icon: 'mdi-star-shooting', caption: 'Чистое небо, млечный путь и тишина природы', color: '#4a77d4' },
  { name: 'У Горного Озера', value: '51.162342, 37.635122', icon: 'mdi-water-outline', caption: 'Хрустальная вода и отражение гор в глади озера', color: '#7db6d4' },
  { name: 'Долина Цветов', value: '52.342156, 38.451212', icon: 'mdi-flower-tulip-outline', caption: 'Ковёр из ароматных трав и цветов под солнцем', color: '#d48ab4' },
  { name: 'Сосновая Тропа', value: '53.152534, 40.126334', icon: 'mdi-nature', caption: 'Шелест хвои и лёгкий аромат смолы на тропинке', color: '#8cc47d' },
  { name: 'Туманное Утро', value: '54.626235, 41.835236', icon: 'mdi-weather-partly-cloudy', caption: 'Лёгкая дымка, свежесть воздуха и покой', color: '#b0bec5' },
  { name: 'Берег Рассвета', value: '55.612334, 42.783214', icon: 'mdi-weather-sunset-up', caption: 'Первый свет дня и золотые блики на воде', color: '#ffcc80' },
  { name: 'Лунная Долина', value: '56.134562, 43.254623', icon: 'mdi-moon-full', caption: 'Таинственное свечение луны и лёгкий шепот ветра', color: '#9fa8da' },
  { name: 'Голубая Гавань', value: '57.215634, 44.612345', icon: 'mdi-anchor', caption: 'Спокойная вода, качающиеся лодки и морская свежесть', color: '#81d4fa' },
  { name: 'Лес Туманов', value: '58.124534, 45.726512', icon: 'mdi-forest', caption: 'Мягкий туман среди сосен и загадочная тишина', color: '#90a4ae' },
  { name: 'Серебряный Ручей', value: '59.283412, 46.985734', icon: 'mdi-waterfall', caption: 'Прозрачная вода журчит среди камней и трав', color: '#a5d6a7' },
];

const copiedIndex = ref(null);
const copyCoords = async (coords, index) => {
  await navigator.clipboard.writeText(coords);
  copiedIndex.value = index;
  setTimeout(() => (copiedIndex.value = null), 1500);
};

const openOnMap = (coords) => {
  const [lat, lng] = coords.split(',').map((c) => c.trim());
  window.open(`https://yandex.ru/maps/?ll=${lng},${lat}&pt=${lng},${lat},pm2rdm&z=15&l=map`, '_blank');
};
</script>

<style scoped>
.menu-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 22px;
  margin-top: -10px;
  padding: 15px 0 15px !important;
}

/* --- Карточка --- */
.card_menu {
  flex: 1 1 calc(20% - 22px);
  /* 🔹 5 карточек в строке */
  min-width: 200px;
  max-width: 260px;
  background: #fff;
  border: 1px solid rgba(120, 130, 120, 0.2);
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
  transition: all 0.3s ease;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.05);
}

.card_menu:hover {
  transform: translateY(-5px);
  border: 0.5px solid #8c8c8c91 !important;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15) !important;
}

/* Заголовок */
.menu_header {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
  padding: 5px 12px;
  border-bottom: 1px solid rgba(150, 170, 150, 0.25);
}

.number_circle {
  width: 28px;
  height: 28px;
  background: rgba(138, 181, 57, 0.08);
  border: 1px solid rgba(138, 181, 57, 1);
  color: #5F8835;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.card_menu:hover .number_circle {
  background: rgba(138, 181, 57, 0.1);
  transform: scale(1.1);
}

.menu_title {
  color: var(--color-h1, #2f3e2f);
  -webkit-text-stroke: 0.1px #4d672c;
  font-size: 1.05rem;
  font-weight: 600;
  font-family: 'El Messiri', sans-serif;
}

.decor_block {
  text-align: center;
  padding: 10px 10px 0;
}

.decor_icon {
  font-size: 36px !important;
  transition: transform 0.3s ease;
  padding: 22px 0;
  opacity: .7;
}

.card_menu:hover .decor_icon {
  transform: scale(1.18) rotate(7deg);
}

.decor_text {
  color: #3d483d;
  font-size: 0.9rem;
  font-weight: 500;
  font-family: "El Messiri", sans-serif;
  margin-top: 6px;
}

.coords_block {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  border-radius: 8px;
  padding: 8px;
  margin: 4px auto 8px;
  width: fit-content;
  transition: all 0.3s ease;
  cursor: pointer;
}

.coords_value {
  font-family: 'Courier New', monospace;
  font-size: 0.85rem;
  font-weight: 600;
  color: #5F8835;
}

.card_footer {
  display: flex;
  cursor: pointer;
  justify-content: center;
  padding: 8px 5px;
  align-items: center;
  gap: 6px;
  border-top: 1px solid rgba(160, 180, 160, 0.25);
  background: rgba(138, 181, 57, 0.05);
  color: #426842;
  font-size: 0.82rem;
  border-radius: 0 0 10px 10px;
  transition: all 0.3s ease;
}

.card_footer:hover {
  background: rgba(138, 181, 57, 0.08);
  color: #1f451f;
  transform: translateY(-1px);
  padding-bottom: 10px;
}


@media (max-width: 1600px) {
  .card_menu {
    flex: 1 1 calc(25% - 22px);
  }
}

@media (max-width: 1200px) {
  .card_menu {
    flex: 1 1 calc(33.33% - 22px);
  }
}

@media (max-width: 800px) {
  .card_menu {
    flex: 1 1 calc(50% - 22px);
  }
}

@media (max-width: 500px) {
  .card_menu {
    flex: 1 1 100%;
  }
}
</style>
