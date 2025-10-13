<template>
  <div class="content_wrapper_home">
    <div class="wrapper_home">
      <v-container max-height="97vh">
        <div class="buttons_options">
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
            <div v-for="menu in menus.slice(0, menus.length - 2)" :key="menu" class="main_buttons">
              <div @click="goRoute(menu.route)" class="main_button">
                <component v-if="menu.icon" :is="menu.icon" :color="'var(--fill-icon-home)'" class="icon" />
                <div> {{ menu.name }}</div>
              </div>
            </div>
          </v-col>
          <v-col>
            <img src="./../../../public/4.png" style="width: 105%;height: 82vh; margin-top: -12%;" />
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
  font-size: 5rem;
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
  font-size: 1.8rem;
  line-height: 3rem;
  letter-spacing: 1px;
  font-family: var(--font-family-slogan-home);
  font-weight: 400;
  background: var(--background-slogan-home);
  border-radius: var(--border-radius-slogan-home);
  border: var(--border-slogan-home);
  border-color: var(--border-color-slogan-home);
  box-shadow: var(--box-shadow-slogan-home);
  width: 100%;
  margin: -10% 0 4% 4%;
}

.buttons_options {
  display: flex;
  justify-content: flex-end;
  gap: 15px;
}

.button {
  position: relative;
  display: flex;
  align-items: center;
  font-family: var(--font-family-btn);
  font-size: 1.25rem;
}

.button .icon {
  width: 25px;
  margin: .5rem .5rem .5rem 2rem;
}

.main_buttons {
  margin-left: 5%;
}

.main_button .icon {
  margin: .5rem 1rem;
  width: 35px;
}

.main_button {
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 2.5%;
  width: 90%;
  padding: 2px 4px;
  color: var(--color-main-buttons-home);
  -webkit-text-stroke: var(--text-stroke-main-buttons-home);
  font-family: var(--font-family-btn);
  font-size: 1.25rem;
  background: var(--background-main-buttons-home);
  border-radius: var(--border-radius-main-buttons-home);
  border: var(--border-main-buttons-home);
  border-color: var(--border-color-main-buttons-home);
  box-shadow: var(--box-shadow-main-buttons-home);
  backdrop-filter: var(--filter-main-buttons-home);
  -webkit-backdrop-filter: var(--filter-main-buttons-home);
  transition: all 0.25s ease;
}

.main_button:hover {
  cursor: pointer;
  color: var(--color-main-buttons-home-hover);
  -webkit-text-stroke: var(--text-stroke-main-buttons-home-hover);
  background: var(--background-main-buttons-home-hover);
  border-radius: var(--border-radius-main-buttons-home-hover);
  border: var(--border-main-buttons-home-hover);
  border-color: var(--border-color-main-buttons-home-hover);
  box-shadow: var(--box-shadow-main-buttons-home-hover);
  backdrop-filter: var(--filter-main-buttons-home-hover);
  -webkit-backdrop-filter: var(--filter-main-buttons-home-hover)
}
</style>