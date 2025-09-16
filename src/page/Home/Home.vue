<template>
  <div class="content_wrapper_home">
    <div class="wrapper">
      <v-container class="container_home" min-height="100vh">
        <div style="display: flex; justify-content: space-between; margin-bottom: 35px;">
          <div>
            <div class="d-flex">
              <div style="width: 48px; margin-bottom: 5px; margin-right: 5px;">
                <img src="./../../../public/l3.png" style="width: 100%;" />
              </div>
              <div class="title">Ромашка</div>
            </div>
            <div class="slogan">
              «Кемпинг у моря — природа, которой хочется делиться!»
            </div>
          </div>
          <div class="buttons_options">
            <div v-for="menu in menus.slice(-2)" :key="menu" class="buttons">
              <div @click="goRoute(menu.route)" class="button" v-tooltip:bottom="menu.name">
                <component v-if="menu.icon" :is="menu.icon" :color="'var(--fill-icon-home)'" class="icon" />
                <!-- <div>{{ menu.name }}</div> -->
              </div>
            </div>
          </div>

        </div>
        <div class="main_row">
          <v-row align="stretch" justify="center" class="menu-grid">
            <v-col v-for="(menu, i) in menus.slice(0, menus.length - 2)" :key="i" cols="12" sm="6" lg="4"
              class="d-flex">
              <v-card class="pa-6 flex-grow-1 hover-elevate card_menu" elevation="4" rounded="xl"
                @click="goRoute(menu.route)">
                <div class="menu_header">
                  <component :is="menu.icon" class="menu_icon" :color="'var(--color-h1)'" />
                  <div class="menu_text">
                    <h3 class="menu_title">{{ menu.name }}</h3>
                    <p class="menu_descr">{{ menu.descr }}</p>
                  </div>
                </div>
                <div class="menu_footer">
                  <span class="go_text">Перейти</span>
                  <v-icon class="arrow_icon" size="20">mdi-arrow-right</v-icon>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </div>
      </v-container>
    </div>
  </div>
</template>

<script setup>
import { router } from '@/router'
import RegistrationSvg from './../../svg/registration.vue'
import ListClientsSvg from './../../svg/listclients.vue'
import MapObjectSvg from './../../svg/map_object.vue'
import TripsSvg from './../../svg/trips.vue'
import ServicesSvg from './../../svg/services.vue'
import SettingsSvg from './../../svg/settings.vue'
import SettingsMainSvg from './../../svg/settings_main.vue'
import ExitSvg from './../../svg/exit.vue'

const menus = [
  {
    icon: RegistrationSvg,
    name: 'Регистрация отдыхающих',
    descr:
      'Добавляйте новых гостей и быстро и комфортно размещайте их в лагере',
    route: '',
  },
  {
    icon: ListClientsSvg,
    name: 'Список клиентов',
    descr:
      'Вся информация об отдыхающих в одном месте: личные данные, питомцы, номера домиков и выбранные поляны',
    route: 'ListClients',
  },
  {
    icon: TripsSvg,
    name: 'Ближайшие выезды',
    descr:
      'Отслеживайте предстоящие отъезды гостей и планируйте размещение новых заранее',
    route: 'Trips',
  },
  {
    icon: MapObjectSvg,
    name: 'Карта полянок',
    descr:
      'Удобно просматривайте пространство лагеря, распределяйте гостей и контролируйте занятость мест',
    route: 'MapObjects',
  },
  {
    icon: ServicesSvg,
    name: 'Дополнительные расходы',
    descr:
      'Учитывайте все услуги: аренду, уборку и прочие дополнительные траты по лагерю',
    route: 'AdditionalCosts',
  },
  {
    icon: SettingsMainSvg,
    name: 'Настройки',
    descr:
      'Настройте кемпинг под себя: управляйте параметрами, пользователями и устанавливайте актуальные цены',
    route: 'AdditionalCosts',
  },
  { icon: SettingsSvg, name: 'Настройки', route: 'Settings' },
  { icon: ExitSvg, name: 'Выход', route: 'Exit' },
]

function goRoute(name) {
  router.push({ name })
}
</script>

<style scoped>
.logo {
  font-family: "Amatic SC", sans-serif;
  font-weight: 400;
  font-style: normal;
}

/* Контейнер */
.content_wrapper_home {
  background: var(--background-color-page);
  min-height: 100vh;
  height: auto;
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
  width: 22px;
  margin: 1.5rem 0.25rem 0.25rem;
}

/* Заголовок */
.title {
  color: var(--color-h1-home);
  -webkit-text-stroke: .7px #4d672c;
  font-size: 2.1rem;
  transform: scaleX(1.2);
  margin-top: -.2rem;
  letter-spacing: .15em;
  padding-left: 10px;
  font-weight: 400;
}

/* Слоган */
.slogan {
  color: #4d672c;
  -webkit-text-stroke: .08px #edeef0;
  font-size: 1.2rem;
  letter-spacing: 1px;
  margin-top: -2%;
  font-family: var(--font-family-slogan-home);
}

.main_row {
  display: flex;
  align-items: stretch;
}

.card_menu {
  height: 100% !important;
  cursor: pointer;
  transition: all 0.25s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.card_menu:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.menu_header {
  display: flex;
  align-items: flex-start;
  text-align: left;
}

.menu_icon {
  width: 40px;
  height: 40px;
  color: var(--fill-icon-home);
  margin-right: 12px;
  flex-shrink: 0;
}

.menu_text {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.menu_title {
  color: var(--color-h1);
  -webkit-text-stroke: 0.1px #4d672c;
  letter-spacing: .25px;
  font-family: var(--font-family);
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 8px;
}

.menu_descr {
  font-size: 0.9rem;
  color: var(--v-theme-on-surface-variant, #666);
  line-height: 1.4;
}

.menu_footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 6px;
  margin-top: 95px;
  color: #5e8835a2;
  font-weight: 500;
  font-size: 0.95rem;
  transition: color 0.2s ease;
}

.card_menu:hover .menu_footer {
  color: var(--color-main-buttons-home-hover);
}

.arrow_icon {
  vertical-align: middle;
}

.v-card {
  border: 1.5px solid white;
  background: linear-gradient(to top, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.8)) !important;
  box-shadow: inset 0 0 10px rgba(255, 255, 255, 0.3),
    2px 2px 8px rgba(17, 44, 18, 0.1) !important;
  transition: all 0.25s ease;
}
</style>
