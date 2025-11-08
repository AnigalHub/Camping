<template>
  <v-card
    class="d-flex flex-column justify-space-between card"
    elevation="4"
    rounded="xl"
    @click="goRoute('MapObjects')"
  >
    <div class="d-flex align-start text-start card-header">
      <v-icon color="#debe7e" size="33"> mdi-tent</v-icon>
      <h2>Свободные поляны</h2>
    </div>
    <div class="position-absolute decor-wave-and-orbits">
      <svg
        class="position-absolute decor-wave"
        viewBox="0 0 400 120"
        preserveAspectRatio="none"
      >
        <path
          d="M0,80 Q150,10 300,70 T400,60"
          stroke="rgb(240 ,173 ,41 , .4)"
          stroke-width="3"
          fill="none"
          stroke-linecap="round"
        />
      </svg>
      <div class="position-absolute orbit orbit1"></div>
      <div class="position-absolute orbit orbit2"></div>
    </div>
    <v-row dense>
      <v-col v-for="(place, index) in places" :key="index" cols="12" md="4">
        <Glade :place="place" :number="index" />
      </v-col>
    </v-row>
    <div class="d-flex align-center card-footer mt-4">
      <span>Подробнее</span>
      <v-icon size="20">mdi-arrow-right</v-icon>
    </div>
  </v-card>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
function goRoute(name) {
  if (name) router.push({ name });
}
const places = [
  {
    name: "У Песчаного Моря",
    caption: "Тёплый песок, мягкий бриз и спокойные волны",
    icon: "mdi-weather-sunny",
    color: "#f4b740",
    percentPerson: "13",
    textPerson: "2/15",
    percentCar: "50",
    textCar: "5/10",
  },
  {
    name: "В Тени Сосен",
    caption: "Аромат хвои, прохлада и шелест леса",
    icon: "mdi-pine-tree",
    color: "#8ab45a",
    percentPerson: "24",
    textPerson: "7/30",
    percentCar: "10",
    textCar: "2/20",
  },
  {
    name: "У Подножья Гор",
    caption: "Величественные вершины и кристально чистый воздух",
    icon: "mdi-image-filter-hdr",
    color: "#bca37f",
    percentPerson: "56",
    textPerson: "14/25",
    percentCar: "45",
    textCar: "7/15",
  },
];
</script>
<style scoped>
.card {
  cursor: pointer;
  padding: 15px !important;
  border-radius: 15px !important;
  border: 1.5px solid #fff;
  background: linear-gradient(165deg,
      rgba(255, 255, 255, 0.96),
      rgba(255, 255, 255, 0.92)) !important;
  margin-top: 30px;
  transition:
    transform 0.3s ease,
    filter 0.3s ease,
    box-shadow 0.3s ease;
}

.card-header {
  gap: 12px;
}

.card-footer {
  justify-content: flex-end;
  gap: 6px;
  font-weight: 500;
  font-size: 1.1rem;
  font-family: var(--font-family);
  color: #104155;
  transition: color 0.25s ease;
}

.card:hover {
  filter: contrast(110%);
  transform: scale(1.025);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.card:hover .card-footer {
  color: #006c9a;
}

h2 {
  font-family: var(--font-family-title);
  font-size: 1.5rem;
  color: #494c54;
  margin: -5px 0 25px;
  position: relative;
}

h2::after {
  content: "";
  position: absolute;
  bottom: -6px;
  left: 0;
  width: 50px;
  height: 3px;
  border-radius: 3px;
  background: #f0ad29;
}

.decor-wave-and-orbits {
  inset: 0;
  overflow: hidden;
}

.decor-wave {
  bottom: 0;
  left: -20px;
  width: 100%;
  height: 120px;
  opacity: 0.5;
}

.orbit {
  border-radius: 50%;
  border: 1.58px dashed rgba(138, 181, 57, 1);
  animation: orbitRotate 270s linear infinite;
  z-index: 0;
}

.orbit1 {
  width: 600px;
  height: 600px;
  top: -250px;
  right: -300px;
  border: 1.58px dashed rgb(0, 107, 153, 0.6);
}

.orbit2 {
  width: 400px;
  height: 400px;
  bottom: -150px;
  left: -200px;
  animation-duration: 160s;
}
</style>
