<template>
  <div class="content_wrapper_home">
    <div class="wrapper">
      <v-container class="container_home" max-height="97vh">
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
        <div class="slogan">
          «Кемпинг у моря - природа, которой хочется делиться!»
        </div>
        <v-row no-gutters class="main_row">

          <v-col cols="5" class="left_col">
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
          <v-col class="right_col">
            <div id="image-container" class="image_container">
              <img id="img1" src="./../../../public/999.png" class="image" />
              <img id="img2" src="./../../../public/990.png" class="image hidden" />
              <img id="img3" src="./../../../public/997.png" class="image hidden" />
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script setup>
import { router } from '@/router';
import RegistrationSvg from './../../svg/registration.vue';
import ListClientsSvg from './../../svg/listclients.vue';
import MapObjectSvg from './../../svg/map_object.vue';
import TripsSvg from './../../svg/trips.vue';
import ServicesSvg from './../../svg/services.vue';
import SettingsSvg from './../../svg/settings.vue';
import ExitSvg from './../../svg/exit.vue';

const menus = [
  { icon: RegistrationSvg, name: 'Регистрация отдыхающих', route: '' },
  { icon: ListClientsSvg, name: 'Список клиентов', route: 'ListClients' },
  { icon: TripsSvg, name: 'Ближайшие выезды', route: 'Trips' },
  { icon: MapObjectSvg, name: 'Карта полянок', route: 'MapObjects' },
  { icon: ServicesSvg, name: 'Дополнительные расходы и настройки', route: 'AdditionalCosts' },
  { icon: SettingsSvg, name: 'Настройки', route: 'Settings' },
  { icon: ExitSvg, name: 'Выход', route: 'Exit' },
];

function goRoute(name) {
  router.push({ name });
}

const images = ['img1', 'img2', 'img3'];
let currentIndex = 0;

setInterval(() => {
  images.forEach((id) => (document.getElementById(id).style.display = 'none'));
  document.getElementById(images[currentIndex]).style.display = 'block';
  currentIndex = (currentIndex + 1) % images.length;
}, 6000);
</script>

<style scoped>
.content_wrapper_home {
  background: var(--background-color-page);
  height: 100vh;
}

.container_home {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

/* Верхние кнопки */
.buttons_options {
  display: flex;
  justify-content: flex-end;
  gap: 15px;
}

.button {
  display: flex;
  align-items: center;
}

.button .icon {
  width: 25px;
  margin: 0.5rem;
}

/* Заголовок и слоган */
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
  font-size: 1.3rem;
  letter-spacing: 1px;
  font-family: var(--font-family-slogan-home);
  text-align: center;
  margin: 0.5% auto 3%;
  width: 50%;
}

/* Основной ряд */
.main_row {
  display: flex;
  align-items: stretch; /* колонки одинаковой высоты */
}

/* Левая колонка */
.left_col {
  display: flex;
  flex-direction: column;
}

.block_main_buttons {
  flex: 1; /* растягиваем на всю высоту колонки */
  display: flex;
  flex-direction: column;
  justify-content: space-evenly; /* равномерно распределяем кнопки */
  padding: 15px 0;
  border-radius: 15px;
  height: 100%;
}

.main_buttons {
  margin-left: 8%;
}

.main_button {
  display: flex;
  align-items: center;
  margin-bottom: 3.4%;
  width: 100%;
  padding: 6px 8px;
  color: var(--color-main-buttons-home);
  font-family: var(--font-family-btn);
  font-size: 1.25rem;
  background: var(--background-main-buttons-home);
  border-radius: var(--border-radius-main-buttons-home);
  border: var(--border-main-buttons-home);
  box-shadow: var(--box-shadow-main-buttons-home);
  transition: all 0.25s ease;
}

.main_button .icon {
  margin: 0.5rem 1rem;
  width: 35px;
}

.main_button:hover {
  cursor: pointer;
  color: var(--color-main-buttons-home-hover);
  background: var(--background-main-buttons-home-hover);
  border-color: var(--border-color-main-buttons-home-hover);
  box-shadow: var(--box-shadow-main-buttons-home-hover);
}

/* Правая колонка */
.right_col {
  display: flex;
  align-items: stretch;
}

.image_container {
  position: relative;
  width: 100%;
  height: 100%;
}

.image {
  position: absolute;
  top: 0;
  left: 10%;
  width: 82%;
  border: 2px dashed #4d672c;
  border-radius: 15px;
  padding: 15px;
  background: white;
}

.hidden {
  display: none;
}
</style>