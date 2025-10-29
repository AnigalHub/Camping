<template>
  <v-card
    class="card position-relative"
    elevation="4"
    rounded="xl"
    @click="goRoute('Trips')"
  >
    <!-- Заголовок -->
    <div class="d-flex align-center card-header">
      <v-icon color="#debe7e" size="33">mdi-calendar-clock-outline</v-icon>
      <h2>Ближайшие выезды</h2>
    </div>

    <!-- Текст -->
    <div class="card-text ma-5">
      Общее количество гостей, транспортных средств и глэмпингов, покидающих
      территорию лагеря в течение дня:
    </div>

    <!-- Основная информация -->
    <v-row dense align="center">
      <v-col cols="8">
        <div class="d-flex justify-space-around text-center">
          <div v-for="item in status" :key="item.label">
            <div class="numbers">{{ item.value }}</div>
            <div class="numbers-text">{{ item.label }}</div>
          </div>
        </div>
      </v-col>

      <v-col cols="4" class="d-flex justify-center">
        <v-card flat class="pa-4 text-center position-relative date-block">
          <component :is="CalendarSvg" width="50px" class="mx-auto" />
          <div class="day mt-2">{{ today[0] }} {{ months[today[1]] }}</div>
          <div class="today">Сегодня</div>
        </v-card>
      </v-col>
    </v-row>

    <!-- Нижнее меню -->
    <div class="d-flex align-center card-footer mt-4">
      <span>Подробнее</span>
      <v-icon size="20">mdi-arrow-right</v-icon>
    </div>

    <!-- Геометрические фигуры -->
    <div class="geom-circle position-absolute"></div>
    <div class="geom-circle2 position-absolute"></div>
  </v-card>
</template>

<script setup>
import { useRouter } from "vue-router";
import CalendarSvg from "./../../../svg/calendar.vue";

const today = new Date().toLocaleDateString("ru-RU").split(".");
const months = {
  "01": "января",
  "02": "февраля",
  "03": "марта",
  "04": "апреля",
  "05": "мая",
  "06": "июня",
  "07": "июля",
  "08": "августа",
  "09": "сентября",
  10: "октября",
  11: "ноября",
  12: "декабря",
};

const status = [
  { label: "Человек", value: 15 },
  { label: "Машин", value: 4 },
  { label: "Глэмпинг", value: 0 },
];

const router = useRouter();
function goRoute(name) {
  if (name) router.push({ name });
}
</script>

<style scoped>
.card {
  overflow: hidden;
  padding: 15px !important;
  border-radius: 15px !important;
  border: 1.5px solid #fff;
  transition: all 0.4s ease;
}
.card::before {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at 60% 30%,
    rgba(138, 181, 57, 0.07),
    transparent 65%
  );
  animation: pulseGlow 6s ease-in-out infinite;
}
.card-header {
  gap: 12px;
}
.card:hover {
  border: 1.5px solid rgba(95, 136, 53, 0.25);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}
h2 {
  font-family: "Poiret One", sans-serif;
  font-size: 1.5rem;
  color: #494c54;
  margin: -5px 0 10px;
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
.numbers {
  font-family: "Smooch Sans", sans-serif;
  font-size: 72px;
  color: #4b707f;
  transition: color 0.3s ease;
}
.card:hover .numbers {
  color: #e28a00;
}
.numbers-text {
  font-family: "Amatic SC";
  font-size: 33px;
  color: #000;
  margin-top: -20%;
}
.date-block {
  border-radius: 15px;
  width: 100%;
  background: #fff;
  box-shadow: 1px 1px 1px 1px #edeef0 !important;
  margin-top: -45%;
  z-index: 5;
  transition: all 0.4s ease;
}
.date-block::before {
  content: "";
  position: absolute;
  inset: -3px;
  border-radius: 17px;
  background: conic-gradient(
    from 0deg,
    rgba(138, 181, 57, 0.8),
    rgba(255, 138, 61, 0.6),
    rgba(0, 107, 153, 0.6),
    rgba(138, 181, 57, 0.8)
  );
  animation: spinBorder 12s linear infinite;
  z-index: 0;
}
.date-block::after {
  content: "";
  position: absolute;
  inset: 1.5px;
  background: #fff;
  border-radius: 13px;
  z-index: 1;
}
.date-block > * {
  position: relative;
  z-index: 2;
}
.card:hover .date-block {
  transform: translateY(-3px) scale(1.04);
  box-shadow: 0 6px 18px rgba(138, 181, 57, 0.3);
}
.card-text {
  font-family: "Poppins", sans-serif;
  font-size: 0.93rem;
  color: #505050;
  width: 60%;
  line-height: 1.45;
}
.card-footer {
  justify-content: flex-end;
  gap: 6px;
  font-weight: 500;
  font-size: 1.1rem;
  font-family: "El Messiri", sans-serif;
  color: #104155;
  transition: color 0.25s ease;
}
.card:hover .card-footer {
  color: #006c9a;
}
.geom-circle,
.geom-circle2 {
  border-radius: 50%;
  filter: blur(0.3px);
  animation: geomSpin 200s linear infinite;
}
.geom-circle {
  width: 420px;
  height: 420px;
  top: -180px;
  left: -150px;
  border: 1.58px dashed rgba(138, 181, 57, 1);
}
.geom-circle2 {
  width: 260px;
  height: 260px;
  bottom: -120px;
  right: -100px;
  border: 1.58px dashed rgba(255, 138, 61, 1);
  animation-duration: 35s;
}
.day {
  font-family: "Amatic SC";
  font-weight: 700;
  font-size: 36px;
  color: #000;
}
.today {
  font-family: "El Messiri";
  font-size: 18px;
  color: #8ab539;
}

/* Анимации */
@keyframes pulseGlow {
  0%,
  100% {
    opacity: 0.6;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
}
@keyframes spinBorder {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes geomSpin {
  0% {
    transform: rotate(0deg);
    opacity: 0.8;
  }
  50% {
    transform: rotate(180deg);
    opacity: 1;
  }
  100% {
    transform: rotate(360deg);
    opacity: 0.8;
  }
}
@media (max-width: 960px) {
  h2 {
    font-size: 1.3rem;
  }
  .numbers {
    font-size: 60px;
  }
}
</style>
