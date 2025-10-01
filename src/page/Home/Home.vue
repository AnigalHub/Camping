<template>
  <div class="content_wrapper_home">
    <div class="wrapper_home">
      <v-container max-height="97vh">
        <div class="buttons-container">
          <div v-for="menu in menus.slice(-2)" :key="menu" class="buttons">
            <div @click="goRoute(menu.route)" class="button">
              <component v-if="menu.icon" :is="menu.icon" :color="'var(--fill-icon-home)'" class="icon" />
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
              <div @click="goRoute(menu.route)" class="vintage-glass-green">
                <component v-if="menu.icon" :is="menu.icon" :color="'var(--fill-icon-home)'" class="icon" />
                <div> {{ menu.name }}</div>
              </div>
            </div>
          </v-col>
          <v-col>
            <img src="./../../../public/4.png" style="width: 105%;height: 85vh; margin-top: -8%;" />
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script setup>
import { router } from '@/router';
import RegistrationSvg from './../../svg/registration.vue'
import ListClientsSvg from './../../svg/listclients.vue'
import MapObjectSvg from './../../svg/map_object.vue'
import TripsSvg from './../../svg/trips.vue'
import ServicesSvg from './../../svg/services.vue'
import SettingsSvg from './../../svg/settings.vue'
import ExitSvg from './../../svg/exit.vue'

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
    route: 'Trips',
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
 * Переход по страницам
 */
function goRoute(name) {
  router.push({ name: name });
}
</script>

<style scoped>
.content_wrapper_home {
  background: var(--background-color-page);
  height: 100vh;
}
.wrapper_home {
  background: var(--background-img-page);
  background-size: var(--background-size-img-page);
  height: 100vh;
}
h1 {
  color: var(--color-h1-home);
  -webkit-text-stroke: var(--text-stroke-h1-home);
  font-size: 7rem;
  letter-spacing: 0.08em;
  font-family: var(--font-family-h1-home);
  font-weight: 400;
  background: var(--background-h1-home);
  border-radius: var(--border-radius-h1-home);
  border: var(--border-h1-home);
  border-color: var(--border-color-h1-home);
  box-shadow: var(--box-shadow-h1-home);
  margin-top: -3%;
  margin-bottom: 25px;
}
.slogan {
  color: var(--color-slogan-home);
  -webkit-text-stroke: var(--text-stroke-slogan-home);
  font-size: 38px;
  letter-spacing: 1px;
  font-family: var(--font-family-slogan-home);
  font-weight: 400;
  background: var(--background-slogan-home);
  border-radius: var(--border-radius-slogan-home);
  border: var(--border-slogan-home);
  border-color: var(--border-color-slogan-home);
  box-shadow: var(--box-shadow-slogan-home);
  width: 100%;
  line-height: 55px;
  margin: -7% 0 4% 4%;
}

.buttons-container {
  display: flex;
  justify-content: flex-end;
  gap: 15px;
}

.buttons-container .icon {
  width: 40px !important;
  margin: .5rem .5rem .5rem 2rem !important;
}

.buttons .icon {
  margin: .5rem 1rem;
  width: 55px;
}

.button {
  position: relative;
  display: flex;
  align-items: center;
  font-family: var(--font-family-btn);
  font-size: 1.6rem;
}

.vintage-glass-green {
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 2.5%;
  width: 90%;
  padding: 2px 4px;
  font-family: var(--font-family-btn);
  font-size: 1.6rem;
  color: #2a3a1f;
  border: 3px solid #acb1967c;
  border-radius: 20px;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  background: linear-gradient(to top,
      rgba(255, 255, 255, 0.6),
      rgba(255, 255, 255, 0.2));
  box-shadow: inset 0 0 10px rgba(255, 255, 255, 0.3),
    2px 2px 8px rgba(17, 44, 18, 0.1);
  transition: all 0.25s ease;
}

.vintage-glass-green:hover {
  cursor: pointer;
  background: linear-gradient(to top,
      rgba(197, 211, 149, 0.2),
      rgba(197, 211, 149, 0.2));
  box-shadow: inset 0 0 10px rgba(255, 255, 255, 0.4),
    10px 10px 8px rgba(17, 44, 18, 0.2);
}

.buttons_2 {
  margin-left: 9%;
}
</style>