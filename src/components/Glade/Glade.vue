<template>
  <div class="place-card" :class="cardClasses"
    :style="{ border: route.name === 'Home' ? `1.5px solid ${place.color}` : '' }">
    <div class="layout" :class="{ 'right-layout': useRightLayout }">
      <div class="left-content">
        <div class="header">
          <div class="number-badge" :style="{ border: `1.8px solid ${place.color}`, color: place.color }">
            {{ number + 1 }}
          </div>
          <div class="title-wrap">
            <v-icon :color="place.color" size="35" class="title-icon">{{ place.icon }}</v-icon>
            <h3 class="title">{{ place.name }}</h3>
          </div>
        </div>
        <div class="desc-wrap">
          <p class="description">{{ place.description }}</p>
          <div v-if="showCoordsPage" class="coords coords_page" @click="copyCoords(place.coordinations, number)">
            <span>{{ place.coordinations }}</span>
            <v-icon size="20" color="#5F8835">mdi-content-copy</v-icon>
          </div>
        </div>
        <div class="progress-layout">
          <div class="progress-column">
            <div class="progress-item">
              <v-icon size="26" color="#6d8f3c" class="icon-float">mdi-human-female-female-child</v-icon>
              <span>{{ place.person }}/{{ place.people }}</span>
              <v-progress-linear :model-value="showPercent(place.person, place.people)" color="#8AB539" height="9" rounded />
            </div>
            <div class="progress-item">
              <v-icon size="26" color="#7a7a7a" class="icon-float">mdi-car</v-icon>
              <span>{{ place.car }}/{{ place.cars }}</span>
              <v-progress-linear :model-value="showPercent(place.car, place.cars)" color="#B5B5B5" height="9" rounded />
            </div>
          </div>
          <div v-if="showRightTools" class="coords coords_page" @click="openOnMap(place.coordinations)">
            <span>Открыть на картах</span>
            <div class="map-icon-wrap icon-block">
              <v-icon size="20" color="#6d8f3c" class="map-icon-animated">mdi-map-marker</v-icon>
            </div>
          </div>
        </div>
        <div v-if="showBottomButtons" class="d-flex mt-2 block_buttons">
          <div class="coords" :class="bottomCoordsClass" @click="copyCoords(place.coordinations, number)">
            <span>{{ place.coordinations }}</span>
            <v-icon size="20" color="#5F8835">mdi-content-copy</v-icon>
          </div>
          <div class="map-button" :class="bottomMapClass" @click="openOnMap(place.coordinations)">
            <div class="map-icon-wrap">
              <v-icon size="30" color="#759930" class="map-icon-animated">mdi-map-marker</v-icon>
              <div class="ping"></div>
            </div>
            <span>Открыть на картах</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const props = defineProps({
  number: Number,
  place: Object,
});

const windowWidth = ref(window.innerWidth);
const isMobile = computed(() => windowWidth.value <= 600);

function onResize() {
  windowWidth.value = window.innerWidth;
}
onMounted(() => window.addEventListener('resize', onResize));
onBeforeUnmount(() => window.removeEventListener('resize', onResize));

const copiedIndex = ref(null);

const copyCoords = async (coords, index) => {
  await navigator.clipboard.writeText(coords);
  copiedIndex.value = index;
  setTimeout(() => copiedIndex.value = null, 1500);
};

const showPercent = (value, max) => Math.round((value / max) * 100);

const openOnMap = coords => {
  const [lat, lng] = coords.split(',').map(c => c.trim());
  window.open(`https://yandex.ru/maps/?ll=${lng},${lat}&pt=${lng},${lat},pm2rdm&z=15`, '_blank');
};

const useRightLayout = computed(() => route.name !== 'Home' && !isMobile.value);
const showRightTools = useRightLayout;
const showCoordsPage = useRightLayout;
const showBottomButtons = computed(() => route.name === 'Home' || isMobile.value);

const cardClasses = computed(() => ({
  'card-layout': useRightLayout.value
}));

const bottomCoordsClass = computed(() => (route.name === 'Home' || isMobile.value) ? 'coords_home' : 'coords_page');
const bottomMapClass = computed(() => (route.name === 'Home' || isMobile.value) ? 'map-button_home' : 'map-button_page');
</script>



<style scoped>
.card-layout {
  padding: 15px !important;
}

.progress-layout {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: 14px;
}

.progress-column {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.place-card {
  background: #fff;
  border-radius: 15px;
  padding: 18px 20px;
  margin: 5px 8px 10px;
  position: relative;
  transition: .35s;
}

.place-card:hover {
  transform: translateY(-4px);
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
  width: 38px;
  height: 38px;
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
  margin: 0 10px;
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

.coords_home,
.map-button_home {
  background: transparent;
  border: 1.5px solid #547c8f;
}

.coords_home:hover,
.map-button_home:hover {
  transform: translateY(-2px);
  background: #e9eff9;
}

.coords_page {
  margin: 0;
  min-width: 200px;
  min-height: 20px !important;
  background: transparent;
  color: #6f9233;
  border: 1.5px solid #6f9233;
  width: auto !important;
}

.map-button-right {
  background: rgba(117, 153, 48, .08);
}

.coords_page:hover,
.map-button_page:hover {
  transform: translateY(-2px);
  transform: scale(1.025);
  background: rgba(117, 153, 48, .16);
}

.coords,
.map-button {
  border-radius: 12px;
  transition: .3s;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

.coords {
  padding: 8px 12px;
  gap: 8px;
  float: left;
  margin-right: 10px;
  min-height: 50px;
  width: 50%;
}


.coords span {
  font-size: .92rem;
  font-weight: 500;
  color: #3a3a3a;
}

.map-button {
  width: 50%;
  padding: 8px 10px;
  gap: 10px;
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
  width: auto;
  margin-top: 20px;
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
  transform: scale(1.025);
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
    transform: translateY(-4px);
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

@media screen and (max-width: 900px) {
  .coords_home {
    margin-bottom: 10px;
  }

  .coords_home,
  .map-button_home {
    width: 100%;
  }

  .block_buttons {
    flex-direction: column;
  }

  .place-card {
    margin: 0 0 10px;
  }
}
</style>
