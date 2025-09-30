<template>
  <div class="home">
    <div class="home_bg">
      <v-container max-height="97vh">
        <div class="buttons-container">
          <div v-for="menu in menus.slice(-2)" :key="menu" class="buttons">
            <div @click="goRoute(menu.route)" class="button">
              <component v-if="menu.icon" :is="menu.icon" class="icon" />
              <div>{{ menu.name }}</div>
            </div>
          </div>
        </div>
        <h1 class="text-center">"Ромашка"</h1>
        <v-row no-gutters>
          <v-col cols="5">
            <div class="slogan">
              «Кемпинг у моря - природа, которой хочется делиться!»
            </div>
            <div v-for="menu in menus.slice(0, menus.length - 2)" :key="menu" class="buttons buttons_2">
              <div @click="goRoute(menu.route)" class="vintage-glass-green" >
                <component v-if="menu.icon" :is="menu.icon" class="icon" :color="'#4d702be7'" />
                <div> {{ menu.name }}</div>
              </div>
            </div>
          </v-col>
          <v-col>
            <!-- <component :is="homeSvg" class="home_svg" /> -->
            <img src="./../../../public/4.png" style="width: 105%;height: 85vh; margin-top: -8%;" />
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script setup>
import { router } from '@/router';
import HomeSvg from './../../svg/home.vue'
import RegistrationSvg from './../../svg/registration.vue'
import ListClientsSvg from './../../svg/listclients.vue'
import MapObjectSvg from './../../svg/map_object.vue'
import TripsSvg from './../../svg/trips.vue'
import ServicesSvg from './../../svg/services.vue'
import SettingsSvg from './../../svg/settings.vue'
import ExitSvg from './../../svg/exit.vue'

const homeSvg = HomeSvg
const registrationSvg = RegistrationSvg
const listClientsSvg = ListClientsSvg
const mapObjectSvg = MapObjectSvg
const tripsSvg = TripsSvg
const servicesSvg = ServicesSvg
const settingsSvg = SettingsSvg
const exitSvg = ExitSvg
const menus = [
  {
    icon: registrationSvg,
    name: 'Регистрация отдыхающих',
    route: '',
  },
  {
    icon: listClientsSvg,
    name: 'Список клиентов',
    route: 'ListClients',
  },
  {
    icon: mapObjectSvg,
    name: 'Карта полянок',
    route: 'MapObjects',
  },
  {
    icon: tripsSvg,
    name: 'Ближайшие выезды',
    route: '',
  },
  {
    icon: servicesSvg,
    name: 'Дополнительные расходы и настройки',
    route: 'AdditionalCosts',
  },
  {
    icon: settingsSvg,
    name: 'Настройки',
    route: 'Settings',
  },
  {
    icon: exitSvg,
    name: 'Выход',
    route: 'Exit',
  },
]
/**
 * Переход в покупку тренировкок (Доступные тренировки)
 */
function goRoute(name) {
  router.push({ name: name });
}
</script>

<style scoped>
.btn {
  font-family: "Georgia", serif;
  font-size: 1.6rem;
  display: flex;
  align-self: start;
}

.v-col-5 {
  padding-left: 5% !important;
}


.buttons-container .icon {
  width: 40px !important;
    margin: .5rem .5rem .5rem 2rem !important;
}

.buttons .icon {
  margin: .5rem 1rem;
  width: 55px;
}

.buttons-container {
  display: flex;
  justify-content: flex-end;
  /* выравнивание по правому краю */
  gap: 8px;
}

h1 {
  font-family: "Great Vibes", cursive;
  font-weight: 400;
  font-style: normal;
  font-size: 7rem;
  letter-spacing: 0.08em;
  color: #4d672c;
  -webkit-text-stroke: 1.5px #4d672c;
  margin-top: -3%;
  margin-bottom: 25px;
}

.button{
    position: relative;
  display: flex;
  align-items: center;
    font-family: "Georgia", serif;
  font-size: 1.6rem;
}

.vintage-glass-green {
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 2.5%;
  width: 90%;
  padding: 2px 4px;
  font-family: "Georgia", serif;
  font-size: 1.6rem;
  color: #2a3a1f;
  border: 3px solid #acb1967c;
  border-radius: 20px;
  backdrop-filter: blur(10px);
  /* размытие фона за элементом (поддержка в современных браузерах) */
  -webkit-backdrop-filter: blur(10px);
  /* для Safari */
  /* Добавим градиент для имитации блика */
  background: linear-gradient(to top,
      rgba(255, 255, 255, 0.6),
      rgba(255, 255, 255, 0.2));
  /* Тень и внутренний блеск для стеклянного эффекта */
  box-shadow: inset 0 0 10px rgba(255, 255, 255, 0.3),
    2px 2px 8px rgba(17, 44, 18, 0.1);
  transition: all 0.25s ease;
}
.vintage-glass-green:hover{
  cursor: pointer;
    background: linear-gradient(to top,
         rgba(197, 211, 149, 0.2),
      rgba(197, 211, 149, 0.2)); 
        box-shadow: inset 0 0 10px rgba(255, 255, 255, 0.4),
    10px 10px 8px rgba(17, 44, 18, 0.2);
}


.home_svg {
  margin-top: -7%;
  width: 100%;
  max-height: 80vh;

}

.buttons_2 {
  margin-left: 9%;
}

.slogan {
  font-family: "Pacifico", cursive;
  font-weight: 400;
  font-style: normal;
  font-size: 38px;
  width: 100%;
  line-height: 55px;
  color: rgba(0, 0, 0, 0.75);
  margin-top: -7%;
  margin-bottom: 4%;
  margin-left: 4%;
  letter-spacing: 1px;
}

.home {
  background: radial-gradient(circle,
      #ffffff 0%,
      #f4efd7 75%);
  height: 100vh;
}

img {
  transform: scale(1);
}

.home {
  background: radial-gradient(circle,
      #ffffff 0%,
      #f4efd7 75%);
  height: 100vh;
}

.home_bg {
  background: url(./../../../public/1111.png) 100% 100% no-repeat;
  background-size: 100% 100%;
  height: 100vh;
}
</style>