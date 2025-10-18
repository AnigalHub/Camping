<template>
  <div class="content_wrapper_home">
    <div class="wrapper">
      <v-container max-height="97vh">
        <div class="buttons_options">
          <div v-for="menu in menus.slice(-2)" :key="menu" class="buttons">
            <div @click="goRoute(menu.route)" class="button" v-tooltip:bottom="menu.name">
              <component v-if="menu.icon" :is="menu.icon" :color="'var(--fill-icon-home)'" class="icon" />
              <!-- <div>{{ menu.name }}</div> -->
            </div>
          </div>
        </div>
        <h1 class="text-center">"Ромашка"</h1>
        <!-- <hr style="width: 30%; display: block; margin: -4% auto 0%;  border: none;border-top: 1.8px solid #4d672c; "></hr> -->
        <div class="slogan" style="width: 50%; display: block; margin: .5% auto 3%;">
          «Кемпинг у моря - природа, которой хочется делиться!»
        </div>
        <v-row no-gutters>
          <v-col cols="5">
            <!-- <div class="slogan">
              «Кемпинг у моря - природа, которой хочется делиться!»
            </div> -->
            <div class="block_main_buttons">
              <div v-for="menu in menus.slice(0, menus.length - 2)" :key="menu" class="main_buttons">
                <div @click="goRoute(menu.route)" class="main_button">
                  <component v-if="menu.icon" :is="menu.icon" :color="'var(--fill-icon-home)'" class="icon" />
                  <div> {{ menu.name }}</div>
                </div>
              </div>
            </div>


          </v-col>
          <v-col>
            <div id="image-container" style="width:100%; position:relative;">
              <img id="img1" src="./../../../public/999.png"
                style="
    margin-left: 10%; border-radius: 15px; width: 82%; border: 2px dashed #4d672c; height: auto; margin-top: -.5%; padding: 15px; background: white; position: absolute; top: 0; left: 0;" />
              <img id="img2" src="./../../../public/990.png"
                style="
    margin-left: 10%; border-radius: 15px; width: 82%; border: 2px dashed #4d672c; height: auto; margin-top: -.5%; padding: 15px; background: white; position: absolute; top: 0; left: 0; display: none;" />
              <img id="img3" src="./../../../public/997.png"
                style="
    margin-left: 10%; border-radius: 15px; width: 82%; border: 2px dashed #4d672c; height: auto; margin-top: -.5%; padding: 15px; background: white; position: absolute; top: 0; left: 0; display: none;" />
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script setup>
const images = ['img1', 'img2', 'img3'];
let currentIndex = 0;

setInterval(() => {
  // Сначала скрываем все изображения
  images.forEach(id => {
    document.getElementById(id).style.display = 'none';
  });
  // Переключаемся на следующее изображение
  document.getElementById(images[currentIndex]).style.display = 'block';

  // Обновляем индекс для следующего переключения
  currentIndex = (currentIndex + 1) % images.length;
}, 6000);
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
    icon: tripsSvg,
    name: 'Ближайшие выезды',
    route: 'Trips',
  },
  {
    icon: mapObjectSvg,
    name: 'Карта полянок',
    route: 'MapObjects',
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

/* .wrapper_home {
  background: var(--background-img-page);
  background-size: var(--background-size-img-page);
  height: 100vh;
} */

h1 {
  color: var(--color-h1-home);
  -webkit-text-stroke: var(--text-stroke-h1-home);
  font-size: 4.5rem;
  letter-spacing: 0.08em;
  font-family: var(--font-family-h1-home);
  font-weight: 400;
  background: var(--background-h1-home);
  border-radius: var(--border-radius-h1-home);
  border-bottom: 2px solid #4d672c;
  width: max-content;
  height: 5.7rem;
  box-shadow: var(--box-shadow-h1-home);
  margin: -3% auto 5px;
}

.slogan {
  color: #4d672c;
  -webkit-text-stroke: 0.05px #4d672c;
  font-size: 1.3rem;
  line-height: 2rem;
  letter-spacing: 1px;
  font-family: var(--font-family-slogan-home);
  font-weight: 400;
  background: var(--background-slogan-home);
  border-radius: var(--border-radius-slogan-home);
  border: var(--border-slogan-home);
  border-color: var(--border-color-slogan-home);
  box-shadow: var(--box-shadow-slogan-home);
  width: 100%;
  /* margin: -10% 0 4% 4%; */
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
    margin: .5rem .25rem .5rem .25rem;
}

.block_main_buttons {

  padding: 15px 0;
  border-radius: 15px;
  margin-top: 0%;

}

.main_buttons {
  margin-left: 8%;
}

.main_button .icon {
  margin: .5rem 1rem;
  width: 35px;
}

.main_button {
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 3.4%;
  width: 100%;
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