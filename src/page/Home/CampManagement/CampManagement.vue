<template>
  <v-card
    class="d-flex flex-column justify-space-between card"
    elevation="4"
    rounded="xl"
    @click="goRoute"
  >
    <div class="d-flex align-start text-start card-header">
      <v-icon color="#debe7e" size="33">mdi-cog-outline</v-icon>
      <h2>Управление лагерем и тарифами</h2>
    </div>
    <div class="d-flex align-center card-wrapper">
      <div class="d-flex position-relative justify-center align-center svg-block">
        <div class="position-absolute dashed-ring"></div>
        <div class="position-absolute pulse-ring"></div>
        <div class="d-flex align-center justify-center position-relative icon-wrap">
          <SettingsSvg color="#547c8f" style="width: 45px" />
        </div>
        <svg class="position-absolute decor-line" viewBox="0 0 200 100" preserveAspectRatio="none">
          <path
            d="M0,80 Q100,10 200,70"
            stroke="rgb(0, 107, 153 , 0.2)"
            stroke-width="3"
            fill="none"
            stroke-linecap="round"
          />
        </svg>
      </div>
      <div class="d-flex flex-column flex-1-1-auto text-block">
        <div class="title-block">
          <h3 class="title">Настройте лагерь под себя</h3>
          <p class="card-text">
            Гибко управляйте параметрами кемпинга: настройками, тарифами и инфраструктурой.
            Все изменения мгновенно синхронизируются с другими модулями.
          </p>
        </div>
        <div class="list">
          <div v-for="item in list" :key="item" class="d-flex align-center list-item">
            <v-icon size="22" color="#006b99ad">mdi-check</v-icon>
            <span>{{ item }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex align-center card-footer mt-4">
      <span>Подробнее</span>
      <v-icon size="20">mdi-arrow-right</v-icon>
    </div>
  </v-card>
</template>

<script setup>
import SettingsSvg from "./../../../svg/settings.vue";
import { useRouter } from "vue-router";
const router = useRouter();

const goRoute = () => router.push({ name: "SettingsCompany" });

const list = [
  "редактируйте основные параметры лагеря;",
  "обновляйте действующие тарифы;",
];
</script>

<style scoped>
.card {
  cursor: pointer;
  padding: 15px !important;
  border: 1.5px solid #fff;
  border-radius: 15px !important;
  background: linear-gradient(165deg, #fffffff5, #ffffffeb) !important;
  margin-top: 30px;
  transition: transform .3s ease, filter .3s ease, box-shadow .3s ease;
}

.card-header {
  gap: 12px;
}

.card-wrapper {
  display: flex;
  gap: 36px;
}

.card-text {
  font-family: var(--font-family-text);
  font-size: 0.93rem;
  color: #505050;
  line-height: 1.45;
  width: 90%;
}

.card-footer {
  display: flex;
  justify-content: flex-end;
  gap: 6px;
  font-weight: 500;
  font-size: 1.1rem;
  font-family: var(--font-family);
  color: #104155;
  transition: color .25s ease;
}

.card:hover {
  filter: contrast(110%);
  transform: scale(1.025);
  box-shadow: 0 4px 12px rgba(0, 0, 0, .1);
}

.card:hover .card-footer {
  color: #006c9a;
}

.card:hover .icon-wrap {
  animation: floatAnim 4.5s ease-in-out infinite;
}

h2 {
  margin: -5px 0 20px;
  font-family: var(--font-family-title);
  font-size: 1.45rem;
  color: #494c54;
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

.icon-wrap {
  z-index: 3;
  animation: spin 10s linear infinite;
}

.dashed-ring {
  width: 160px;
  height: 160px;
  border-radius: 50%;
  border: 1.58px dashed #547c8f;
  opacity: .6;
  pointer-events: none;
  z-index: 0;
  animation: orbit 50s linear infinite;
  filter: blur(.2px);
}

.pulse-ring {
  width: 130px;
  height: 130px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(57, 125, 181, .18), transparent);
  filter: blur(15px);
  animation: pulse 3s ease-in-out infinite;
}

.text-block {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.title {
  color: #2a2a2a;
  margin-bottom: 6px;
  font-family: "Amatic SC", cursive;
  font-size: 1.8rem;
}

.list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 10px 20px;
  padding-left: 10px;
  border-left: 3px solid #42899248;
}

.list-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.95rem;
  font-family: var(--font-family-text);
  transition: transform .2s ease, color .2s ease;
}

.list-item:hover {
  color: #104155;
  transform: translateX(4px);
}

.svg-block {
  width: 200px;
  height: 160px;
  position: relative;
}

.decor-line {
  position: absolute;
  bottom: 5px;
  left: -20px;
  width: 240px;
  opacity: .6;
  z-index: 1;
}

/* Анимации */
@keyframes floatAnim {

  0%,
  100% {
    transform: translateY(0) scale(1);
    opacity: .7
  }

  50% {
    transform: translateY(-3px) scale(1.15);
    opacity: 1
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg)
  }

  100% {
    transform: rotate(360deg)
  }
}

@keyframes orbit {
  0% {
    transform: rotate(0deg)
  }

  100% {
    transform: rotate(-360deg)
  }
}

@keyframes pulse {

  0%,
  100% {
    transform: scale(1);
    opacity: .6
  }

  50% {
    transform: scale(1.2);
    opacity: 1
  }
}
@media (max-width: 960px) {
  h2 {
    font-size: 1.3rem;
  }
}
</style>
