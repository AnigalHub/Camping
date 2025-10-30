<template>
  <div :class="['card-place', `card-place-${number + 1}`]">
    <div class="d-flex align-center justify-space-between mb-3">
      <div class="card-place-number">{{ number + 1 }}</div>
      <div class="d-flex">
        <div class="d-flex align-center justify-center position-relative card-place-icon">
          <v-icon :color="place.color" size="35">{{ place.icon }}</v-icon>
        </div>
        <h3 class="card-place-name">{{ place.name }}</h3>
      </div>
    </div>
    <div class="card-place-text">{{ place.caption }}</div>
    <div class="d-flex align-center mt-2.5 card-place-progress-block">
      <img
        src="./../../../../public/people.png"
        style="width: 25px; margin-right: 5px; margin-top: -5px"
      />
      <span class="card-place-name-progress">{{ place.textPerson }}</span>
      <v-progress-linear
        :model-value="place.percentPerson"
        color="#8AB539"
        height="7"
        rounded
        class="flex-grow-1"
      ></v-progress-linear>
    </div>
    <div class="d-flex align-center mt-2.5 card-place-progress-block">
      <img
        src="./../../../../public/car.png"
        style="width: 25px; margin-right: 5px; margin-top: -5px"
      />
      <span class="card-place-name-progress">{{ place.textCar }}</span>
      <v-progress-linear
        :model-value="place.percentCar"
        color="#aeaeae"
        height="7"
        rounded
        class="flex-grow-1"
      ></v-progress-linear>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  number: Number,
  place: Object,
});
</script>
<style scoped>
.card-place {
  position: relative;
  background: rgba(255, 255, 255, 0.85);
  border-radius: 18px;
  padding: 10px 15px 30px;
  margin-right: 5px;
  transition: all 0.25s ease;
  backdrop-filter: blur(4px);
  box-shadow: 1px 1px 1px 1px #edeef0;
  overflow: hidden;
  z-index: 0;
}
.card-place:hover {
  transform: translateY(-5px);
}
.card-place .card-place-icon {
  animation: swayIcon 3.5s ease-in-out infinite, rotateY 6s ease-in-out infinite;
  transform-origin: center;
  margin-right: 6px;
}
.card-place:hover .card-place-number {
  transform: scale(1.15);
  background-color: #abadb114 !important;
}
.card-place-1 {
  border: 1.58px solid rgb(240 173 41);
}
.card-place-1 .card-place-number {
  border: 1.55px solid rgb(240 173 41);
  color: rgb(151, 105, 15);
}
.card-place-2 {
  border: 1.58px solid rgb(125 172 71);
}
.card-place-2 .card-place-number {
  border: 1.55px solid rgb(125 172 71);
  color: rgb(84, 116, 24);
}
.card-place-3 {
  border: 1.58px solid rgb(0, 107, 153, 0.68);
}
.card-place-3 .card-place-number {
  border: 1.55px solid rgb(0, 107, 153, 0.68);
  color: rgb(0, 107, 153, 0.9);
}
.card-place-name {
  font-family: "Amatic SC";
  font-size: 1.8rem;
  color: #2a2a2a;
  text-align: right;
}
.card-place-number {
  font-family: "El Messiri";
  font-size: 1.4rem;
  box-shadow: 1px 1px 1px 1px #edeef0;
  margin-left: 30px;
  padding: 0 10px 5px;
  height: 35px;
  width: 35px;
  border-radius: 50%;
  opacity: 0.85;
}

/* Прогресс-блок */
.progress_block_v2 {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 10px;
}
.card-place-progress-block {
  gap: 10px;
}

.card-place-name-progress {
  font-size: 0.9rem;
  font-weight: 500;
  color: #3a3a3a;
  text-align: right;
  margin-bottom: 6px;
}

.card-place-text {
  font-family: "Poppins", sans-serif;
  font-size: 0.93rem;
  color: #505050;
  line-height: 1.45;
  margin: 20px;
  width: 90%;
}

/* Анимации */
@keyframes orbitRotate {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
@keyframes swayIcon {
  0%,
  100% {
    transform: rotate(0deg) translateY(0);
  }

  25% {
    transform: rotate(3deg) translateY(-3px);
  }

  75% {
    transform: rotate(-3deg) translateY(3px);
  }
}
@keyframes rotateY {
  0%,
  100% {
    transform: rotateY(0);
  }

  25% {
    transform: rotateY(90deg);
  }

  50% {
    transform: rotateY(180deg);
  }
}
</style>
