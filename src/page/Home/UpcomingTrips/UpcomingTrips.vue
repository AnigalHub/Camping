<template>
  <v-card
    class="card position-relative"
    elevation="4"
    rounded="xl"
    @click="goRoute"
    >
    <div class="d-flex align-center card-header">
      <v-icon color="#debe7e" size="33">mdi-calendar-clock-outline</v-icon>
      <h2>Ближайшие выезды</h2>
    </div>
    <div class="card-text">
      Общее количество гостей, транспортных средств и глэмпингов, покидающих
      территорию лагеря в течение дня:
    </div>
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
          <div class="date-info">
            <div class="day">{{ today[0] }} {{ months[today[1]] }}</div>
            <div class="today">Сегодня</div>
          </div>
        </v-card>
      </v-col>
    </v-row>
    <div class="d-flex align-center card-footer mt-4">
      <span>Подробнее</span>
      <v-icon size="20">mdi-arrow-right</v-icon>
    </div>
    <div class="geom-circle position-absolute"></div>
    <div class="geom-circle2 position-absolute"></div>
  </v-card>
</template>

<script setup>
import { useRouter } from "vue-router";
import CalendarSvg from "./../../../svg/calendar.vue";

const today = new Date().toLocaleDateString("ru-RU").split(".");

const goRoute = () => router.push({ name: "Trips" });

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

</script>

<style scoped>
.card {
  overflow: hidden;
  padding: 15px !important;
  border-radius: 15px !important;
  border: 1.5px solid #fff;
  background: linear-gradient(165deg, rgba(255, 255, 255, .96), rgba(255, 255, 255, .92)) !important;
  cursor: pointer;
  transition: transform .3s ease, filter .3s ease, box-shadow .3s ease;
  position: relative;
}

.card:hover {
  filter: contrast(110%);
  transform: scale(1.025);
  box-shadow: 0 4px 12px rgba(0, 0, 0, .1);
}

.card::before {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 60% 30%, rgba(138, 181, 57, .07), transparent 65%);
  animation: pulseGlow 6s ease-in-out infinite;
}

.card-header {
  gap: 12px;
}

h2 {
  font-family: var(--font-family-title);
  font-size: 1.45rem;
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
  background: #f0ad29;
  border-radius: 3px;
}

.card-text {
  font-family: var(--font-family-text);
  font-size: .93rem;
  color: #505050;
  width: 60%;
  line-height: 1.45;
  margin: 20px;
}

.numbers {
  font-family: "Smooch Sans", sans-serif;
  font-size: 72px;
  color: #4b707f;
  transition: color .3s ease;
}

.card:hover .numbers {
  color: #e28a00;
}

.numbers-text {
  font-family: "Amatic SC", cursive;
  font-size: 33px;
  color: #000;
  margin-top: -20%;
}

.card-footer {
  justify-content: flex-end;
  gap: 6px;
  font-size: 1.1rem;
  font-weight: 500;
  font-family: var(--font-family);
  color: #104155;
  transition: color .25s ease;
}

.card:hover .card-footer {
  color: #006c9a;
}

/* Блок даты */
.date-block {
  position: relative;
  border-radius: 15px;
  width: 100%;
  background: #fff;
  box-shadow: 1px 1px 1px 1px #d9d8d8 !important;
  padding: 16px !important;
  transition: transform .4s ease, box-shadow .4s ease;
}

.date-block::before,
.date-block::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
}

.date-block::before {
  inset: -3px;
  background: conic-gradient(rgba(138, 181, 57, .8),
      rgba(255, 138, 61, .6),
      rgba(0, 107, 153, .6),
      rgba(138, 181, 57, .8));
  animation: spinBorder 12s linear infinite;
}

.date-block::after {
  inset: 1.5px;
  background: #fff;
  z-index: 1;
}

.date-block>* {
  position: relative;
  z-index: 2;
}

.card:hover .date-block {
  transform: translateY(-3px) scale(1.04);
  box-shadow: 0 6px 18px rgba(138, 181, 57, .3);
}

/* Геометрия */
.geom-circle,
.geom-circle2 {
  position: absolute;
  border-radius: 50%;
  border: 1.58px dashed;
  filter: blur(.3px);
  animation: geomSpin 200s linear infinite;
}

.geom-circle {
  width: 420px;
  height: 420px;
  top: -180px;
  left: -150px;
  border-color: rgba(138, 181, 57, 1);
}

.geom-circle2 {
  width: 260px;
  height: 260px;
  bottom: -120px;
  right: -100px;
  border-color: rgba(255, 138, 61, 1);
  animation-duration: 35s;
}

.day {
  font-family: "Amatic SC", cursive;
  font-weight: 700;
  font-size: 36px;
  color: #000;
}

.today {
  font-family: var(--font-family);
  font-size: 18px;
  color: #8ab539;
}

/* Анимации */
@keyframes pulseGlow {

  0%,
  100% {
    opacity: .6;
    transform: scale(1);
  }

  50% {
    opacity: 1;
    transform: scale(1.025);
  }
}

@keyframes spinBorder {
  to {
    transform: rotate(360deg);
  }
}

@keyframes geomSpin {

  0%,
  100% {
    transform: rotate(0deg);
    opacity: .8;
  }

  50% {
    transform: rotate(180deg);
    opacity: 1;
  }
}

.date-block {
  position: relative;
  border-radius: 15px;
  margin-top: -45%;
  width: 100%;
  background: #fff;
  box-shadow: 1px 1px 1px 1px #d9d8d8 !important;
  padding: 16px;
  transition: transform .4s ease, box-shadow .4s ease;
}

@media (max-width: 960px) {
  h2 {
    font-size: 1.3rem;
  }

  .card-text {
    width: 65%;
  }

  .numbers {
    font-size: 60px;
  }

  .numbers-text {
    font-size: 30px;
  }

  .day {
    font-size: 30px;
  }
}


@media (max-width: 767px) {

  .v-row {
    flex-direction: column-reverse;
    align-items: center !important;
    text-align: center;
  }

  .v-col-8,
  .v-col-4 {
    max-width: 100% !important;
    flex: 0 0 100% !important;
    justify-content: center;
  }

  .card-text {
    width: 100%;
    text-align: left;
    margin: 20px 0;
  }

  .numbers {
    font-size: 50px;
  }

  .numbers-text {
    font-size: 26px;
    margin-top: -5%;
  }

  .day {
    font-size: 24px;
    width: 110%;
  }

  .date-block {
    width: max-content;
    margin: 0 auto;
    padding: 14px 30px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    text-align: center;
    gap: 25px;
  }

  .date-block svg {
    flex-shrink: 0;
    width: 50px !important;
  }

  .date-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}

@media (max-width: 500px) {

  .numbers {
    font-size: 44px;
  }

  .numbers-text {
    font-size: 22px;
    margin-top: -3%;
  }

  .day {
    font-size: 22px;
    width: 130%;
  }

  .today {
    font-size: 16px;
  }
}
</style>
