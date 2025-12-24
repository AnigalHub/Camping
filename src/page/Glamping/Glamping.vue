<template>
  <v-container>
    <Title :title="title" />
    <div class="grid-block glamping">
      <div 
        v-for="house in glampingWithSvg" 
        :key="house.name" 
        class="home-card"
        @mouseenter="house.hovered = true" 
        @mouseleave="house.hovered = false"
      >
        <div class="card-row">
          <v-progress-circular 
            :model-value="(house.progress.current / house.progress.total) * 100" 
            :size="70"
            :rotate="5" 
            :width="5" 
            :color="house.color" 
            class="progress-circle"
          >
            {{ house.progress.current }}/{{ house.progress.total }}
            
          </v-progress-circular>

          <div class="text-column">
            <v-icon :color="house.color" class="icon">{{ house.icon }}</v-icon>
            <div class="title">{{ house.name }}</div>
          </div>
        </div>

        <p class="description">{{ house.description }}</p>

        <!-- Горизонтальный список мест в виде карточек -->
        <div class="places-container">
          <div 
            v-for="place in filteredPlaces(house)" 
            :key="place.name" 
            class="place"
            :style="{ borderColor: house.color }"
          >
            <div class="dot" :style="{ backgroundColor: house.color }"></div>
            <div class="place-name">
              <b><span>{{ place.number }}.</span></b>
              {{ place.name }} 
              <b>
                <span :style="{ color: house.color }">({{ place[house.type] }})</span>
              </b>
            </div>
          </div>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script setup>
import glampingData from './../../../public/data/glamping.json';
import places from './../../../public/data/places.json';
import clients from './../../../public/data/clients.json';
import { ref, reactive } from 'vue';

const title = 'Аренда глэмпинга';

// Текущая дата для фильтрации активных клиентов
const today = new Date().toISOString().split('T')[0];

// Создаем данные для карточек с вычисленным progress
const glampingWithSvg = ref(
  glampingData.map(item => {
    const type = item.type; // standart / family / premium

    // Считаем количество занятых палаток этого типа среди активных клиентов
    let occupied = clients.reduce((sum, client) => {
      if (!client.endDate || client.endDate < today) return sum;

      if (Array.isArray(client.tentType)) {
        return sum + client.tentType.filter(t => t === type).length;
      } else if (client.tentType === type) {
        return sum + 1;
      }
      return sum;
    }, 0);

    // Общая доступность палаток этого типа (сумма по всем местам)
    const total = places.reduce((sum, place) => sum + (place[type] || 0), 0);

    // Свободные палатки = total - занятые
    const current = total - occupied;

    return reactive({
      ...item,
      hovered: false,
      progress: { current, total }
    });
  })
);

// Фильтруем места по типу
function filteredPlaces(house) {
  const type = house.type; // standart / family / premium
  return places.filter(place => place[type] && place[type] > 0);
}
</script>



<style scoped>
.grid-block {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 25px;
}

.home-card {
  background: #fff;
  border-radius: 15px;
  padding: 18px 20px;
  transition: transform 0.35s;
  display: flex;
  flex-direction: column;
  width: 100%;
}

.home-card:hover {
  transform: translateY(-4px);
}

.card-row {
  display: flex;
  align-items: center;
  gap: 20px;
}

.progress-circle {
  flex-shrink: 0;
}

.v-progress-circular__content {
  height: 100px !important;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  color: #000 !important;
}

.text-column {
  display: flex;
  align-items: center; 
  gap: 6px;      
}

.icon {
  font-size: 1.8rem; 
  padding: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s;
}

.title {
  font-family: "Amatic SC", cursive;
  font-size: 1.8rem;
  font-weight: bold;
  color: #2a2a2a;
}

.description {
  margin-top: 6px;
  font-size: 0.95rem;
  color: #555;
}

/* Горизонтальный контейнер для мест */
.places-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 12px;
}

/* Каждое место как мини-карточка */
.place {
  display: flex;
  align-items: center;
  gap: 8px;
  border: 1px solid;
  border-radius: 12px;
  padding: 6px 10px;
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: default;
}

.place:hover {
  transform: translateY(-2px);
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.place-name {
  font-size: 0.85rem;
  color: #555;
  white-space: nowrap;
}
</style>
