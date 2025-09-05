<template>
  <div class="d-flex justify-space-between">
    <v-card
      v-for="(button, index) in buttons"
      :key="index"
      class="d-flex flex-column justify-space-between position-relative card"
      :class="`card-${index + 1}`"
      elevation="4"
      rounded="xl"
      @click="goRoute(button.route)"
    >
      <div class="position-absolute dashed-ring"></div>
      <div class="d-flex position-relative card-header">
        <div class="d-flex align-center justify-center position-relative visual-area">
          <div class="position-absolute orbit-ring"></div>
          <div class="position-absolute pulse-ring"></div>
          <div class="d-flex align-center justify-center position-relative icon-wrap">
            <component
              :is="button.icon"
              class="icon"
              :color="button.colorIcon"
            />
          </div>
        </div>
        <div>
          <div class="card-text">{{ button.name }}</div>
          <v-btn class="card-btn btn-home">{{ button.btn }}</v-btn>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import RegistrationSvg from "./../../../svg/registration.vue";
import ListClientsSvg from "./../../../svg/listclients.vue";

const buttons = [
  {
    icon: RegistrationSvg,
    colorIcon: "#f0ad29",
    name: "Добавляйте новых гостей, заполняйте их данные и распределяйте по зонам проживания с учётом всех деталей — количества людей, наличия транспорта и глэмпинга.",
    btn: "Регистрация",
    route: "AddClients"
  },
  {
    icon: ListClientsSvg,
    colorIcon: "#8ab539",
    name: "Вся информация о клиентах в одном месте: личные данные, питомцы, глэмпинги и выбранные поляны. Просматривайте профили гостей и обновляйте сведения.",
    btn: "Список клиентов",
    route: "ListClients"
  },
];

const router = useRouter();
function goRoute(name) {
  if (name) router.push({ name });
}
</script>

<style scoped>
.card {
  width: 100%;
  padding: 18px;
  cursor: pointer;
  overflow: hidden;
  border-radius: 15px !important;
  border: 1.5px solid #fff;
  background: linear-gradient(165deg, rgba(255, 255, 255, .96), rgba(255, 255, 255, .92)) !important;
  transition: transform .3s ease, filter .3s ease, box-shadow .3s ease;
}

.card:hover {
  transform: scale(1.025);
  filter: contrast(110%);
  box-shadow: 0 4px 12px rgba(0, 0, 0, .1);
}

.card-header {
  gap: 12px;
  align-items: flex-start;
}

.visual-area {
  width: 200px;
  height: 160px;
  position: relative;
}

.icon-wrap {
  position: relative;
  animation: floatAnim 4.5s ease-in-out infinite;
  z-index: 3;
}

.icon {
  width: 60px;
  height: 60px;
  transition: .3s;
}

.card:hover .icon {
  transform: scale(1.07);
  filter: drop-shadow(0 3px 4px rgba(138, 181, 57, .2));
}

.pulse-ring,
.orbit-ring,
.dashed-ring {
  position: absolute;
  border-radius: 50%;
}

.pulse-ring {
  width: 130px;
  height: 130px;
  background: radial-gradient(circle, rgba(138, 181, 57, .17), transparent);
  filter: blur(15px);
  animation: pulseAnim 3s ease-in-out infinite;
}

.orbit-ring {
  width: 160px;
  height: 160px;
  border: 1.58px dashed rgba(0, 107, 153, .7);
  animation: orbitAnim 50s linear infinite;
}

.dashed-ring {
  width: 360px;
  height: 200px;
  top: 50%;
  right: -180px;
  transform: translateY(-50%);
  border: 1.58px dashed rgba(0, 107, 153, 1);
  opacity: .6;
  pointer-events: none;
  animation: dashedAnim 120s linear infinite;
  filter: blur(.2px);
}

.card-text {
  font-family: "Poppins", sans-serif;
  font-size: .93rem;
  color: #505050;
  line-height: 1.45;
  margin: 20px 0 0 0;
  width: 75%;
}

.card-btn {
  width: 60%;
  float: right;
}

/* Анимации */
@keyframes pulseAnim {

  0%,
  100% {
    transform: scale(1);
    opacity: .6;
  }

  50% {
    transform: scale(1.2);
    opacity: 1;
  }
}

@keyframes orbitAnim {
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(-360deg);
  }
}

@keyframes dashedAnim {

  0%,
  100% {
    transform: translateY(-50%) rotate(0);
    opacity: .6;
  }

  50% {
    transform: translateY(-50%) rotate(180deg);
    opacity: .8;
  }
}

@keyframes floatAnim {

  0%,
  100% {
    transform: translateY(0) scale(1);
    opacity: .7;
  }

  50% {
    transform: translateY(-3px) scale(1.15);
    opacity: 1;
  }
}

.card-1 .orbit-ring {
  border-color: rgba(240, 173, 41, .9);
}

.card-1 .pulse-ring {
  background: radial-gradient(circle, rgba(243, 142, 74, .2), transparent);
}

.card-1 {
  margin-right: 30px;
}

.card-2 .orbit-ring {
  border-color: rgba(128, 153, 81, 1);
}

.card-2 .icon-wrap {
  border: 1.7px solid #afd568d3;
  border-radius: 50%;
  padding: 2.5px;
}

.card-2 .icon-wrap .icon {
  width: 53px;
  height: 53px;
}

.card-2 .dashed-ring {
  border-color: rgba(240, 173, 41, .9);
}
</style>
