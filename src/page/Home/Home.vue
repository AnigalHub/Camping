<template>
  <div class="home">
    <v-container max-height="97vh">
      <div class="buttons-container">
        <v-btn v-for="menu in menus.slice(-2)" :key="menu" @click="goRoute(menu.route)">
          <component v-if="menu.icon" :is="menu.icon" class="icon" />
          {{ menu.name }}
        </v-btn>
      </div>
      <h1 class="text-center">Ромашка</h1>
      <v-row no-gutters>
        <v-col cols="5">
          <div class="slogan">
            «Кемпинг у моря - природа, которой хочется делиться!»
          </div>
          <div v-for="menu in menus.slice(0, menus.length - 2)" :key="menu" class="buttons">
            <v-btn @click="goRoute(menu.route)">
              <component v-if="menu.icon" :is="menu.icon" class="icon" />
              {{ menu.name }}
            </v-btn>
          </div>
        </v-col>
        <v-col>
          <component :is="homeSvg" class="home_svg" />
        </v-col>
      </v-row>
    </v-container>
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
    route: '',
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
.icon {
  margin: 10px;
}

.buttons-container .icon {
  width: 55px;
  height: 55px;
}

.buttons .icon {
  width: 70px;
  height: 70px;
}

.home {
  padding: 0 2%;
}

.v-btn {
  font-size: 2rem;
  text-transform: none;
  border: none;
  box-shadow: none;
  background: transparent;
  font-family: "El Messiri", sans-serif;
  font-weight: 200;
  letter-spacing: -.5px;
}
.buttons{
  margin-left: 10%;
}
.buttons .v-btn {
   margin-bottom: 10%;
}

.buttons-container {
  display: flex;
  justify-content: flex-end;
  /* выравнивание по правому краю */
  gap: 8px;
  /* отступ между кнопками (8px — можно настроить) */
}

h1 {
  font-family: "Great Vibes", cursive;
  font-weight: 400;
  font-style: normal;
  font-size: 7rem;
  letter-spacing: 0.08em;
  color: #5F8835;
  -webkit-text-stroke: 1.5px #5F8835;
  margin-top: -3%;
  margin-bottom: 25px;
}

.home_svg {
  margin-top: -7%;
  width: 100%;
  max-height: 80vh;

}

.slogan {
  font-family: "Pacifico", cursive;
  font-weight: 400;
  font-style: normal;
  font-size: 35px;
  width: 98%;
  line-height: 50px;
  color: rgba(0, 0, 0, 0.75);
  margin-top: -6%;
  margin-bottom: 4%;
}

.home{
  padding: 20px 20px 0;
}
</style>