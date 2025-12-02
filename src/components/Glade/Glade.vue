<template>
  <div 
    class="place-card" 
    :class="{ 'card-layout': rightLayout }"
    :style="{ border: route.name === 'Home' ? `1.6px solid ${place.color}` : '' }"
  >
    <div class="layout" :class="{ 'right-layout': rightLayout }">
      <div class="left-content">
        <div class="header">
          <div 
            class="number-badge" 
            :style="{ border: `1.8px solid ${place.color}`, color: place.color }"
          >
            {{ number + 1 }}
          </div>
          <div class="title-wrap">
            <v-icon :color="place.color" size="35" class="title-icon">{{ place.icon }}</v-icon>
            <h3 class="title">{{ place.name }}</h3>
          </div>
          <div v-if="rightLayout" class="right-tools">
            <div class="map-button map-button-right" @click="openOnMap(place.value)">
              <div class="map-icon-wrap icon-block">
                <v-icon size="30" color="#6d8f3c" class="map-icon-animated">mdi-map-marker</v-icon>
                <div class="ping"></div>
              </div>
              <span>Открыть</span>
            </div>
          </div>
        </div>
        <div class="desc-wrap">
          <p class="description">{{ place.description }}</p>
          <div v-if="rightLayout" class="coords coords-inline" @click="copyCoords(place.value, number)">
            <span>{{ place.value }}</span>
            <v-icon size="20" color="#5F8835">mdi-content-copy</v-icon>
          </div>
        </div>
        <div class="progress-section">
          <div class="progress-item">
            <v-icon size="26" color="#6d8f3c" class="icon-float">mdi-human-female-female-child</v-icon>
            <span>{{ place.textPerson }}</span>
            <v-progress-linear :model-value="place.percentPerson" color="#8AB539" height="9" rounded />
          </div>
          <div class="progress-item">
            <v-icon size="26" color="#7a7a7a" class="icon-float">mdi-car</v-icon>
            <span>{{ place.textCar }}</span>
            <v-progress-linear :model-value="place.percentCar" color="#B5B5B5" height="9" rounded />
          </div>
        </div>
        <div v-if="!rightLayout" class="coords" @click="copyCoords(place.value, number)">
          <span>{{ place.value }}</span>
          <v-icon size="20" color="#5F8835">mdi-content-copy</v-icon>
        </div>
        <div v-if="!rightLayout" class="map-button" @click="openOnMap(place.value)">
          <div class="map-icon-wrap">
            <v-icon size="30" color="#759930" class="map-icon-animated">mdi-map-marker</v-icon>
            <div class="ping"></div>
          </div>
          <span>Открыть на картах</span>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const props = defineProps({
  number: Number,
  place: Object,
  rightLayout: { type: Boolean, default: false }
});

const copiedIndex = ref(null);

const copyCoords = async (coords, index) => {
  await navigator.clipboard.writeText(coords);
  copiedIndex.value = index;
  setTimeout(() => (copiedIndex.value = null), 1500);
};

const openOnMap = coords => {
  const [lat, lng] = coords.split(',').map(c => c.trim());
  window.open(
    `https://yandex.ru/maps/?ll=${lng},${lat}&pt=${lng},${lat},pm2rdm&z=15`,
    '_blank'
  );
};
</script>


<style scoped>
.card-layout {
  padding: 15px !important;
}

.place-card {
  background: #fff;
  border-radius: 18px;
  padding: 18px 20px;
  margin: 5px 8px 10px;
  position: relative;
  transition: .35s;
  box-shadow: inset 0 0 6px rgba(255, 255, 255, .3), 2px 2px 8px rgba(17, 44, 18, .08);
}

.place-card:hover {
  transform: translateY(-4px);
  box-shadow: inset 0 0 6px rgba(255, 255, 255, .8), 2px 2px 8px rgba(17, 44, 18, .2);
}

.header,
.progress-item,
.title-wrap,
.map-icon-wrap {
  display: flex;
  align-items: center;
}

.header {
  justify-content: space-between;
}

.right-layout .header {
  justify-content: flex-start;
}

.number-badge {
  font-family: var(--font-family);
  font-size: 1.35rem;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ffffffc6;
  backdrop-filter: blur(4px);
  transition: .3s;
}

.place-card:hover .number-badge {
  transform: scale(1.12);
}

.title-icon {
  animation: sway 3s ease-in-out infinite, rotY 5s ease-in-out infinite;
}

.title {
  font-family: "Amatic SC", cursive;
  font-size: 1.9rem;
  color: #2a2a2a;
}

.description {
  color: #4b4b4b;
  font-family: var(--font-family-text);
  font-size: .93rem;
  line-height: 1.45;
  padding: 8px 0;
}

.progress-section {
  margin-top: 6px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.right-layout .progress-section {
  margin-top: 0;
  gap: 8px;
}

.progress-item {
  gap: 10px;
}

.progress-item span {
  font-size: .92rem;
  color: #3a3a3a;
  font-weight: 600;
}

.icon-float {
  animation: float 3s ease-in-out infinite;
}

.coords,
.map-button {
  background: rgba(117, 153, 48, .08);
  border-radius: 12px;
  transition: .3s;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

.coords {
  margin-top: 18px;
  padding: 8px 12px;
  gap: 8px;
  float: left;
  margin-right: 10px;
  min-height: 50px;
  width: 50%;
}

.coords:hover {
  background: rgba(117, 153, 48, .16);
  transform: translateX(-3px);
}

.coords span {
  font-size: .92rem;
  font-weight: 500;
  color: #3a3a3a;
}

.map-button {
  margin-top: 20px;
  padding: 8px 10px;
  gap: 10px;
}

.map-button:hover {
  background: rgba(117, 153, 48, .16);
}

.map-icon-animated {
  animation: bounce 2s infinite ease-in-out;
  z-index: 2;
}

.ping {
  position: absolute;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: rgba(130, 130, 129, .42);
  animation: ping 2s infinite ease-out;
}

.layout {
  display: grid;
  grid-template-columns: 1fr;
}

.layout.right-layout {
  grid-template-columns: 1fr auto;
  align-items: start;
  gap: 14px;
}

.desc-wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.coords-inline {
  margin: 0;
  min-width: 170px;
  min-height: 20px;
  background: transparent;
  color: #6f9233;
  border: 1.5px solid #6f9233;
  width: auto;
}

.right-tools {
  display: flex;
  flex-direction: column;
  gap: 14px;
  height: 100%;
}

.map-button-right {
  position: absolute;
  top: -20px;
  right: 0;
  display: flex;
  min-width: 200px;
  height: 40px;
  padding: 10px 14px;
  border-radius: 0 18px 0 0;
  box-shadow: inset 0 3px 7px rgba(32, 33, 31, .15);
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: .35s ease;
  z-index: 5;
}

.map-button-right:hover {
  background: linear-gradient(135deg, rgba(117, 153, 48, .18), rgba(117, 153, 48, .28));
  transform: scale(1.05);
  transform: translateX(0px);
}

.map-button-right span {
  margin-top: 6px;
  font-size: .95rem;
  font-weight: 600;
  color: #6d8f3c;
}

@keyframes float {
  50% {
    transform: translateY(-4px);
  }
}

@keyframes sway {
  25% {
    transform: rotate(4deg);
  }

  75% {
    transform: rotate(-4deg);
  }
}

@keyframes rotY {
  50% {
    transform: rotateY(180deg);
  }
}

@keyframes bounce {
  50% {
    transform: translateY(-6px);
  }
}

@keyframes ping {
  0% {
    transform: scale(.5);
    opacity: .7;
  }

  100% {
    transform: scale(1.8);
    opacity: 0;
  }
}
</style>
