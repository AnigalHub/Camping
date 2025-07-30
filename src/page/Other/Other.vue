<template>
  <div>
    <v-container>
      <Title :title="title"/>
      <div v-for="(block, i) in blocks" :key="i" class="block" @click="goRoute(block.route)">
        <div class="d-flex align-center card-header">
          <v-icon color="#debe7e" size="33">{{ block.icon }}</v-icon>
          <h2>{{ block.title }}</h2>
        </div>
        <div v-if="block.description" class="description">{{ block.description }}</div>
      </div>
    </v-container>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();


const title = "Прочее";
const blocks = [
  {
    icon: "mdi-grass",
    title: "Свободные поляны",
    description: "Уютные и просторные поляны, где можно разбить палаточный лагерь, насладиться отдыхом на свежем воздухе и провести разнообразные активности всей семьей.",
    route: "MapObjects"
  },
  { 
    icon: "mdi-tent", 
    title: "Арендуемые палатки", 
    description: "Полностью оборудованные места отдыха на природе, с защитой от непогоды и удобными зонами для сна, созданные для комфортного и приятного пребывания гостей.",
    route: "" 
  },
  {
    icon: "mdi-cash-multiple",
    title: "Учет расходов",
    description: "Фиксация всех затрат на содержание лагеря: аренда и уборка, уход за территорией и любые другие предоставляемые услуги и сервисы.",
    route: "AdditionalCosts"
  },
  {
    icon: "mdi-cog-outline",
    title: "Настройки, тарифы",
    description: "Управление всеми параметрами кемпинга — настройки, тарифы и объекты кемпинга. Все правки автоматически применяются во всех разделах системы.",
    route: "SettingsCompany"
  },
  {
    icon: "mdi-account-outline",
    title: "Учетная запись",
    description: "Настройка всех персональных данных, контактной информации и параметров безопасности вашего профиля для удобного и безопасного использования системы.",
    route: "Account"
  },
  {
    icon: "mdi-exit-to-app",
    title: "Выход",
    route: ""
  },
];
function goRoute(name) {
  router.push({ name });
}
</script>

<style scoped>
.block {
  width: 100%;
  min-height: 180px;
  margin: 15px 0 20px;
  padding: 18px;
  cursor: pointer;
  overflow: hidden;
  border-radius: 15px;
  border: 1.5px solid #fff;
  background: linear-gradient(165deg, rgba(255, 255, 255, .96), rgba(255, 255, 255, .92));
  transition: transform .3s ease, filter .3s ease, box-shadow .3s ease;
}

.block:hover {
  transform: scale(1.025);
  box-shadow: 0 4px 12px rgba(0, 0, 0, .1);
}

.block:last-child {
  min-height: 30px;
  background: #faf7f3;
  padding: 10px;
  border: 1.5px solid #f0ad29;
  margin-bottom: 30px;
}

.block:last-child:hover {
  background: #fff8ec;
  border: 1.5px solid #f0ad29;
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

.description {
  margin: 30px 0 10px;
  font-family: var(--font-family-text);
  font-size: .93rem;
  color: #505050;
  line-height: 1.45;
}
</style>
