<template>
  <div class="card-place" :style="{
    border: route.name !== 'Home' ? `` : `1.55px solid ${place.color}`,
    'padding-bottom': route.name === 'Home' ? `10px` : ''
  }">
    <div class="d-flex align-center justify-space-between  card-place-header">
      <div class="card-place-number" :style="{
        border: route.name !== 'Home' ? `1.8px solid ${place.color}` : `1.55px solid ${place.color}`,
        color: place.color
      }">
        {{ number + 1 }}
      </div>
      <div class="d-flex">
        <div class="d-flex align-center justify-center position-relative card-place-icon">
          <v-icon :color="place.color" size="35">{{ place.icon }}</v-icon>
        </div>
        <h3 class="card-place-name">{{ place.name }}</h3>
      </div>
    </div>
    <div class="card-place-text">
      {{ place.description }}
    </div>
    <div class="three-blocks">
      <div class="block block-long">
        <h5>Загруженность:</h5>
        <div class="d-flex align-center mt-2.5 card-place-progress-block">
          <component :is="PeopleSvg" class="progress-svg" :color="'#759930'" />
          <span class="card-place-name-progress">{{ place.textPerson }}</span>
          <v-progress-linear :model-value="place.percentPerson" color="#8AB539" height="9" rounded
            class="flex-grow-1" />
        </div>
        <div class="d-flex align-center mt-2.5 card-place-progress-block">
          <component :is="CarSvg" class="progress-svg" :color="'#999999'" />
          <span class="card-place-name-progress">{{ place.textCar }}</span>
          <v-progress-linear :model-value="place.percentCar" color="#aeaeae" height="15" rounded class="flex-grow-1" />
        </div>
      </div>
      <div class="vertical-hr"></div>
      <div class="block block-long">
        <h5>Координаты:</h5>
        <div class="coords-block" @click="copyCoords(place.value, number)">
          <span class="coords-value">{{ place.value }}</span>
          <v-icon size="16" color="#5F8835" style="margin-top: -2.5px; margin-left: 2.5px;">mdi-content-copy</v-icon>
        </div>
        <div class="card-footer" @click="openOnMap(place.value)">
          <div class="map-icon-wrap">
            <v-icon size="30" color="#759930" class="map-icon-animated">mdi-map-marker</v-icon>
            <div class="ping"></div>
          </div>
          <span class="map-open" :style="{ color: `#759930`, }">Открыть на картах</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from "vue-router";
import CarSvg from "./../../svg/car.vue";
import PeopleSvg from "./../../svg/people.vue";
const route = useRoute();
const props = defineProps({
  number: Number,
  place: Object,
});
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
.progress-svg {
  width: 45px
}

.card-place {
  position: relative;
  background: linear-gradient(145deg, #fff, #f7f7f7);
  border-radius: 20px;
  padding: 10px 0 0;
  margin: 8px;
  transition: .3s;
  backdrop-filter: blur(6px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, .08), 0 0 0 1px rgba(0, 0, 0, .02);
  display: flex;
  flex-direction: column;
  height: 100%
}

.card-place:hover {
  transform: scale(1.03);
  box-shadow: 0 6px 18px rgba(0, 0, 0, .15)
}

.card-place h5 {
  font: 600 1rem "Poiret One";
  color: #3a3a3a;
  -webkit-text-stroke: .05px #3a3a3a;
  margin: 12px 20px 6px;
  letter-spacing: .3px;
  opacity: .9
}

.card-place h5:after {
  content: "";
  display: block;
  width: 42px;
  height: 3px;
  border-radius: 2px;
  background: #8ab539;
  margin-top: 4px;
  opacity: .9
}

.card-place hr {
  width: 92%;
  height: 1.5px;
  border: 0;
  background: linear-gradient(to right, #dcdcdc, #e9e9e9, #dcdcdc);
  border-radius: 10px;
  opacity: .8
}

.card-place-icon {
  animation: sway 3s ease-in-out infinite, rotY 5s ease-in-out infinite;
  transform-origin: center;
  margin-right: 8px;
  transition: .3s
}

.card-place:hover .card-place-number,
.card-place:hover svg {
  transform: scale(1.2)
}

.card-place-header {
  margin: 0 20px 0 10px
}

.card-place-number {
  font-family: "El Messiri";
  font-size: 1.5rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, .1);
  margin-left: 6px;
  padding: 0 12px;
  min-height: 38px;
  min-width: 38px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: .9;
  transition: .3s;
  background: linear-gradient(135deg, rgba(255, 255, 255, .6), rgba(255, 255, 255, .9))
}

.card-place-name {
  font-family: "Amatic SC";
  font-size: 1.9rem;
  color: #2a2a2a;
  text-shadow: 0 1px 2px rgba(0, 0, 0, .05)
}

.card-place-text {
  font-family: "Poppins", sans-serif;
  font-size: 1rem;
  color: #505050;
  line-height: 1.5;
  margin: 10px 15px -5px;
  flex: 1 0 auto;
  overflow-wrap: break-word
}

.card-place-progress-block {
  display: flex;
  align-items: center;
  width: 100%;
  gap: 10px;
  padding: 0 20px;
  margin-top: 10px;
  box-sizing: border-box
}

.card-place-name-progress {
  font-size: .95rem;
  font-weight: 500;
  color: #3a3a3a
}

.v-progress-linear {
  border-radius: 12px;
  overflow: hidden;
  height: 10px !important;
  background: #e0e0e0;
  transition: .4s
}

.v-progress-linear__bar {
  background: linear-gradient(90deg, #8ab539, #aedd62) !important;
  border-radius: 12px;
  transition: .6s
}

.coords-block,
.card-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  border-radius: 12px;
  cursor: pointer;
  transition: .3s;
  margin: 0 auto
}

.coords-block {
  padding: 8px 12px
}

.coords-block:hover {
  background: rgba(138, 181, 57, .08)
}

.coords-value {
  font-family: var(--font-family-numbers);
  font-size: .9rem;
  font-weight: 600;
  color: #5f8835
}

.card-footer {
  padding: 5px 8px;
  margin-top: 5px
}

.card-place:hover .card-footer {
  transform: scale(1.1)
}

.card-place:hover .map-open {
  text-decoration: underline
}

.marker {
  display: inline-block;
  animation: bounce2 2s cubic-bezier(.4, 0, .2, 1) infinite
}

.marker-icon {
  margin-top: -6px
}

.three-blocks {
  display: flex;
  padding: 0 10px 15px;
  gap: 1px
}

.block {
  display: flex;
  flex-direction: column
}

.block-long {
  flex: 2
}

.block-small {
  flex: 1;
  text-align: center;
  cursor: pointer
}

.vertical-hr {
  width: 1.5px;
  background: linear-gradient(#dcdcdc, #e9e9e9, #dcdcdc);
  border-radius: 10px;
  opacity: .8
}

.map-icon {
  margin-bottom: 6px;
  transition: transform 0.3s ease;
}

.block-small:hover .map-icon {
  transform: scale(1.2);
}

.map-open {
  font-size: 0.95rem;
  font-weight: 500;
  color: #3a3a3a;
}

.map-block {
  flex: 1;
  text-align: center;
  padding: 12px 10px;
  border-radius: 16px;
  background: rgba(138, 181, 57, .12);
  box-shadow: 0 2px 10px rgba(90, 130, 40, .08);
  transition: .35s;
  display: flex;
  flex-direction: column;
  gap: 6px;
  position: relative;
  overflow: hidden
}

.map-block:hover {
  transform: translateY(-3px);
  background: rgba(138, 181, 57, .18);
  box-shadow: 0 4px 16px rgba(90, 130, 40, .2)
}

.map-icon-wrap {
  position: relative;
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center
}

.map-icon-animated {
  animation: bounce 2s infinite ease-in-out;
  z-index: 2
}

.ping {
  position: absolute;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: rgba(130, 130, 129, .47);
  animation: ping 2s infinite ease-out
}

/* animations */
@keyframes sway {

  0%,
  100% {
    transform: rotate(0)
  }

  25% {
    transform: rotate(4deg) translateY(-2px)
  }

  75% {
    transform: rotate(-4deg) translateY(2px)
  }
}

@keyframes rotY {

  0%,
  100% {
    transform: rotateY(0)
  }

  25% {
    transform: rotateY(90deg)
  }

  50% {
    transform: rotateY(180deg)
  }
}

@keyframes bounce2 {

  0%,
  100% {
    transform: translateY(0)
  }

  50% {
    transform: translateY(-5px)
  }
}

@keyframes ping {
  0% {
    transform: scale(.5);
    opacity: .8
  }

  100% {
    transform: scale(1.8);
    opacity: 0
  }
}

@keyframes bounce {

  0%,
  100% {
    transform: translateY(0)
  }

  50% {
    transform: translateY(-5px)
  }
}
</style>
