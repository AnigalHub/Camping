<template>
  <v-container>
    <Title :title="title" />
    <div class="grid-block glamping block">
      <div v-for="house in glampingWithSvg" :key="house.name" class="home-card" @mouseenter="house.hovered = true"
        @mouseleave="house.hovered = false">
        <div class="card-row">
          <v-progress-circular :model-value="(house.progress.current / house.progress.total) * 100" :size="70"
            :rotate="5" :width="4" :color="house.color" class="progress-circle">
            {{ house.progress.current }}/{{ house.progress.total }}
          </v-progress-circular>

          <div class="text-column">
            <v-icon :color="house.color" class="icon">{{ house.icon }}</v-icon>
            <div class="name-desc">
              <div class="title">{{ house.name }}</div>
              <div class="sub-description">{{ house.description }}</div>
            </div>
          </div>
        </div>
        <div class="places-container">
          <div v-for="place in filteredPlaces(house)" :key="place.name" class="place"
            :style="{ borderColor: house.color }">
            <v-icon :color="house.color" size="22">{{ place.icon }}</v-icon>
            <div class="place-name">
              <b>{{ place.number }}.</b> {{ place.name }}
              <b :style="{ color: house.color }">
                ({{ availableTents(house, place) }}/{{ place[house.type] }})
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
import { ref, reactive, onMounted } from 'vue';

const title = 'Доступный глэмпинг';
const today = new Date().toISOString().split('T')[0];

const glampingWithSvg = ref(
  glampingData.map(item => {
    const type = item.type;
    const occupied = clients.reduce((sum, c) => {
      if (!c.startDate || !c.endDate) return sum;
      const start = new Date(c.startDate);
      const end = new Date(c.endDate);
      const todayDate = new Date(today);
      if (todayDate >= start && todayDate <= end) {
        if (Array.isArray(c.tentType)) return sum + c.tentType.filter(t => t === type).length;
        return c.tentType === type ? sum + 1 : sum;
      }
      return sum;
    }, 0);

    const total = places.reduce((sum, p) => sum + (p[type] || 0), 0);

    return reactive({
      ...item,
      hovered: false,
      progress: {
        current: 0,
        target: total - occupied,
        total
      }
    });
  })
);

onMounted(() => {
  glampingWithSvg.value.forEach(house => {
    const step = house.progress.target / 50; 
    let current = 0;
    const interval = setInterval(() => {
      current += step;
      if (current >= house.progress.target) {
        house.progress.current = house.progress.target;
        clearInterval(interval);
      } else {
        house.progress.current = Math.round(current);
      }
    }, 16);
  });
});


const availableTents = (house, place) => {
  const type = house.type;
  const todayDate = new Date(today);

  const occupied = clients.reduce((sum, c) => {
    if (!c.startDate || !c.endDate) return sum;
    if (c.object !== place.number) return sum;
    const start = new Date(c.startDate);
    const end = new Date(c.endDate);
    if (todayDate >= start && todayDate <= end) {
      if (Array.isArray(c.tentType)) return sum + c.tentType.filter(t => t === type).length;
      return c.tentType === type ? sum + 1 : sum;
    }

    return sum;
  }, 0);

  return (place[type] || 0) - occupied;
};

// Фильтруем места по type и сортируем по number
const filteredPlaces = house => 
  places
    .filter(p => p[house.type] > 0)
    .sort((a, b) => a.number - b.number);
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
  font-size: 1.1rem;
}

.v-progress-circular__content {
  height: 100px !important;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  color: #000 !important;
  transition: all 0.3s ease;
}

.text-column {
  display: flex;
  align-items: flex-start;
  gap: 6px;
}

.icon {
  font-size: 1.8rem;
  padding: 20px 6px 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s;
  animation: sway 3s ease-in-out infinite, rotY 5s ease-in-out infinite;
}

.title {
  font-family: "Amatic SC", cursive;
  font-size: 1.9rem;
  font-weight: bold;
  color: #2a2a2a;
}

.places-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 18px;
}

.place {
  display: flex;
  align-items: center;
  gap: 4px;
  border: 1px solid;
  border-radius: 12px;
  padding: 8px 10px;
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: default;
}

.place:hover {
  transform: translateY(-2px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.place-name {
  font-size: 0.93rem;
  color: #555;
  white-space: nowrap;
}

.name-desc {
  display: flex;
  flex-direction: column;
}

.sub-description {
  font-size: 0.95rem;
  font-style: italic;
  color: #555;
  margin-left: -40px;
  line-height: 1.3;
}

.block {
  height: 78vh;
  padding: 0 5px 0 15px;
  overflow: auto;
  margin-left: -18px;
}

/* Анимации */
@keyframes sway {
  25% { transform: rotate(4deg); }
  75% { transform: rotate(-4deg); }
}

@keyframes rotY {
  50% { transform: rotateY(180deg); }
}
</style>
