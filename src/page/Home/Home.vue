<template>
  <div class="content_wrapper_home">
    <div class="wrapper">
      <v-container class="container_home" min-height="100vh" style="padding-top:35px;">
        <div class="d-flex justify-content-between">
          <v-card v-for="(button, index) in buttons" :key="button" class="card_menu MAIN"
            :class="['card_menu', `card_menu_${index + 1}`]" elevation="4" rounded="xl">
            <div class="main_dashed_right"></div>
            <div class="menu_header">
              <div class="manage_visual">
                <div class="circle_orbit"></div>
                <div class="pulse_glow"></div>
                <div class="gear_icon_wrap">
                  <component :is="button.icon" class="menu_icon_" :color="button.colorIcon" />
                </div>
              </div>
              <div>
                <div class="menu_descr" style="width: 75%;">{{ button.name }}</div>
                <v-btn style="width: 60%; float: right;">{{ button.btn }}</v-btn>
              </div>
            </div>
          </v-card>
        </div>
        <!-- <h2 class="main_h2">Ближайшие выезды</h2> -->
        <div class="d-flex justify-content-between">
          <v-card class="card_menu CARD" elevation="4" rounded="xl" style="margin-top: 30px;">
            <div class="menu_header">
              <v-icon color="#debe7e" size="33">mdi-calendar-clock-outline</v-icon>
              <h2 class="section_title" style="margin-top: -5px !important; width: 90%;">Ближайшие выезды</h2>
            </div>
            <div class="menu_descr mb-4" style="width: 60%;">
              Общее количество гостей, транспортных средств и глэмпингов, покидающих территорию лагеря в течение
              дня:
            </div>
            <v-row dense align="center">
              <v-col cols="8">
                <div class="d-flex justify-space-around text-center">
                  <div>
                    <div class="numbers">15</div>
                    <div class="numbers_text">Человек</div>
                  </div>
                  <div>
                    <div class="numbers">4</div>
                    <div class="numbers_text">Машин</div>
                  </div>
                  <div>
                    <div class="numbers">0</div>
                    <div class="numbers_text">Глэмпинг</div>
                  </div>
                </div>
              </v-col>
              <v-col cols="4" class="d-flex justify-center">
                <v-card flat class="pa-4 text-center date_block" style=" border-radius: 15px; width: 100%;">
                  <img src="./../../../public/calendar.png" style="width: 50px; margin: 0 auto;" />
                  <div class="day mt-2">29 Октября</div>
                  <div class="today">Сегодня</div>
                </v-card>
              </v-col>
            </v-row>
            <div class="menu_footer mt-4">
              <span class="go_text">Подробнее</span>
              <v-icon class="arrow_icon" size="20">mdi-arrow-right</v-icon>
            </div>
            <div class="geom_circle"></div>
            <div class="geom_circle2"></div>
          </v-card>
          <v-card style="width: 40%; margin-left: 30px; margin-top: 30px;" class="card_menu DOP " elevation="4"
            rounded="xl">
            <div class="menu_header">
              <v-icon color="#debe7e" size="33">mdi-cash-multiple</v-icon>
              <h2 class="section_title" style="margin-top: -5px !important; width: 90%;">Учет расходов</h2>
            </div>
            <div class="menu_descr">
              Учитывайте все аспекты содержания лагеря — аренду, уборку, обслуживание
              территории и любые иные услуги.
            </div>
            <v-btn style="margin-top: 34px;">
              Добавить траты
            </v-btn>
          </v-card>
        </div>
        <v-card class="card_menu modern_places_v2 card_menu__" elevation="4" rounded="xl">
          <div class="menu_header">
            <v-icon color="#debe7e" size="33"> mdi-tent</v-icon>
            <h2 class="section_title" style="margin-top: -5px !important; width: 90%; margin-bottom: 25px;">
              Свободные
              поляны</h2>
          </div>
          <div class="places_visual_bg">
            <svg class="decor_wave" viewBox="0 0 400 120" preserveAspectRatio="none">
              <path d="M0,80 Q150,10 300,70 T400,60" stroke="rgb(240 ,173 ,41 , .4)" stroke-width="3" fill="none"
                stroke-linecap="round" />
            </svg>
            <div class="orbit_bg orbit1"></div>
            <div class="orbit_bg orbit2"></div>
          </div>
          <v-row dense>
            <v-col v-for="(place, index) in places" :key="index" cols="12" md="4" class="place_card_v2">
              <div :class="['place_inner_v2', `place_${index + 1}`]">
                <!-- Верхняя часть -->

                <div class="place_header_v2">
                  <div class="place_number_v2">{{ index + 1 }}</div>
                  <div style="display: flex;">
                    <div class="place_icon_wrap">
                      <v-icon :color="place.color" size="35" class="animated_icon_v4">
                        {{ place.icon }}
                      </v-icon>
                    </div>
                    <div class="place_info">
                      <h3 class="place_name_v2">{{ place.name }}</h3>
                    </div>
                  </div>
                </div>
                <div class="menu_descr">{{ place.caption }}</div>
                <!-- Прогресс-блок -->
                <div class="progress_block_v2">
                  <div class="progress_row_v2">
                    <img src="./../../../public/people.png" style="width: 25px; margin-right: 5px; margin-top: -5px;" />
                    <span class="progress_text_v2">{{ place.textPerson }}</span>
                    <v-progress-linear :model-value="place.percentPerson" color="#8AB539" height="7" rounded
                      class="flex-grow-1 line_1"></v-progress-linear>

                  </div>
                  <div class="progress_row_v2">
                    <img src="./../../../public/car.png" style="width: 25px; margin-right: 5px; margin-top: -5px;" />
                    <span class="progress_text_v2">{{ place.textCar }}</span>
                    <v-progress-linear :model-value="place.percentCar" color="#AEAEAE" height="7" rounded
                      class="flex-grow-1 line_2"></v-progress-linear>
                  </div>
                </div>
              </div>
            </v-col>
          </v-row>
          <div class="menu_footer">
            <span class="go_text">Подробнее</span>
            <v-icon class="arrow_icon" size="20">mdi-arrow-right</v-icon>
          </div>
        </v-card>
        <!-- <h2 class="main_h2">Управление лагерем и тарифами</h2> -->
        <v-card class="card_menu manage_card_modern_v3" elevation="4" rounded="xl" style="margin-top: 30px;">
          <div class="menu_header">
            <v-icon color="#debe7e" size="33">mdi-cog-outline</v-icon>
            <h2 class="section_title" style="margin-top: -5px !important; width: 90%;">Управление лагерем и тарифами
            </h2>
          </div>
          <div class="manage_wrapper">
            <!-- Левая часть -->
            <div class="manage_visual">
              <div class="circle_orbit"></div>
              <div class="pulse_glow"></div>
              <div class="gear_icon_wrap">
                <component :is="SettingsSvg" :color="'#93b5c4'" style="width: 45px;" class="gear_icon spin" />
              </div>
              <svg class="decor_line" viewBox="0 0 200 100" preserveAspectRatio="none">
                <path d="M0,80 Q100,10 200,70" stroke="rgb(0, 107, 153 , 0.2)" stroke-width="3" fill="none"
                  stroke-linecap="round" />
              </svg>
            </div>
            <!-- Правая часть -->
            <div class="manage_content_v3">
              <div class="header_block">
                <h3 class="manage_title_v3">Настройте лагерь под себя</h3>
                <p class="manage_text_v3">
                  Гибко управляйте всеми параметрами кемпинга: настройками, тарифами и инфраструктурой.
                  Все изменения мгновенно применяются и синхронизируются с другими модулями.
                </p>
              </div>
              <div class="manage_points_grid">
                <div v-for="(item, i) in list" :key="i" class="point_item">
                  <v-icon size="22" color="#8AB539">mdi-check</v-icon>
                  <span>{{ item.name }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="menu_footer mt-3">
            <span class="go_text">Подробнее</span>
            <v-icon class="arrow_icon" size="20">mdi-arrow-right</v-icon>
          </div>
        </v-card>
      </v-container>
    </div>
  </div>

</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";


import RegistrationSvg from './../../svg/registration.vue'
import ListClientsSvg from './../../svg/listclients.vue'
import SettingsSvg from './../../svg/settings.vue'
import ExitSvg from './../../svg/exit.vue'

const router = useRouter();
const drawer = ref(false);
const isWideScreen = ref(window.innerWidth >= 1100);

// ширина бокового меню
const drawerWidth = computed(() => (isWideScreen.value ? 260 : 240));

const toggleDrawer = () => {
  drawer.value = !drawer.value;
};

const handleResize = () => {
  isWideScreen.value = window.innerWidth >= 1100;
  drawer.value = isWideScreen.value; // на широком экране меню всегда открыто
};

onMounted(() => {
  window.addEventListener("resize", handleResize);
  handleResize();
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});

const menus = [
  { icon: 'mdi-account-plus-outline', title: "Регистрация клиентов", route: "AddClients" },
  { icon: 'mdi-account-group-outline', title: "Список клиентов", route: "ListClients" },
  { icon: 'mdi-calendar-clock-outline', title: "Ближайшие выезды", route: "Trips" },
  { icon: 'mdi-tent', title: "Свободные поляны", route: "MapObjects" },
  { icon: 'mdi-cash-multiple', title: "Учет расходов", route: "AdditionalCosts" },
  { icon: 'mdi-cog-outline', title: "Настройки", route: "AdditionalCosts" },
];


const buttons = [
  { icon: RegistrationSvg, colorIcon: '#f0ad29', name: 'Добавляйте новых гостей, заполняйте их данные и распределяйте по зонам проживания с учётом всех деталей — количества людей, наличия транспорта и глэмпинга.', btn: 'Регистрация', route: '' },
  { icon: ListClientsSvg, colorIcon: '#8ab539', name: 'Вся информация о клиентах в одном месте: личные данные, питомцы, глэмпинги и выбранные поляны. Просматривайте профили гостей и обновляйте сведения.', btn: 'Список клиентов', route: '' },
]
const list = [
  { name: 'редактируйте основные параметры лагеря;' },
  { name: 'обновляйте действующие тарифы;' },
]

const places = [
  { name: 'У Песчаного Моря', caption: 'Тёплый песок, мягкий бриз и спокойные волны', icon: 'mdi-weather-sunny', color: '#f4b740', percentPerson: '13', textPerson: '2/15', percentCar: '50', textCar: '5/10' },
  { name: 'В Тени Сосен', caption: 'Аромат хвои, прохлада и шелест леса', icon: 'mdi-pine-tree', color: '#8ab45a', percentPerson: '24', textPerson: '7/30', percentCar: '10', textCar: '2/20' },
  { name: 'У Подножья Гор', caption: 'Величественные вершины и кристально чистый воздух', icon: 'mdi-image-filter-hdr', color: '#bca37f', percentPerson: '56', textPerson: '14/25', percentCar: '45', textCar: '7/15' },
];

const menus1 = [
  { icon: SettingsSvg, name: 'Настройки', route: 'Settings' },
  { icon: ExitSvg, name: 'Выход', route: 'Exit' },
]
function goRoute(name) {
  router.push({ name })
}

</script>
<style>
.v-toolbar__content>.v-toolbar-title {
  margin-inline-start: 6px !important;
}

.v-toolbar__content {
  height: 53px !important;
}

.bg-grey-lighten-4 {
  background-color: #fbfbfc !important;
  position: fixed !important;
}

.v-list-item-title {
  font-weight: 800 !important;
  letter-spacing: 0.009375em;
  font-size: 1.15rem !important;
  font-family: "Poiret One", sans-serif;
  color: #455e25;
  margin-top: 6px;
}

.v-list-item__prepend {
  display: block !important;
  margin-right: 5px;
  color: #233b06;
}
</style>

<style scoped>
/* === Верхняя панель === */
.top-bar-fixed {
  position: fixed !important;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
}

/* === Контейнер макета === */
.layout-container {
  background: #bbdefb;
  min-height: 100vh;
  padding-top: 64px;
  /* высота верхней панели */
}

/* === Боковое меню === */
.custom-drawer {
  background-color: #fff !important;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: none !important;
  transition: transform 0.3s ease;
}

/* убираем overlay и тени */
.v-navigation-drawer__scrim {
  display: none !important;
}

.v-navigation-drawer {
  box-shadow: none !important;
}

/* фиксированное меню */
.drawer-fixed {
  position: fixed !important;
  top: 64px;
  left: 0;
  height: calc(100vh - 64px);
  overflow-y: auto;
  z-index: 2;
}

/* === Контент === */
.main-content {
  background-color: #bbdefb;
  min-height: calc(100vh - 64px);
  padding: 40px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  transition: margin-left 0.3s ease;
  /* плавный сдвиг контента */
  position: relative;
  z-index: 1;
}

/* === Контентные элементы === */
.content-card {
  background-color: #e1f5fe;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 900px;
}

.long-content {
  margin-top: 20px;
  text-align: left;
}

/* === Адаптивность === */
@media (min-width: 1280px) {

  .custom-drawer,
  .drawer-fixed {
    width: 260px !important;
  }
}

@media (max-width: 1279px) {

  .custom-drawer,
  .drawer-fixed {
    width: 240px !important;
  }
}







.bg-grey-lighten-4 {
  background-color: #fbfbfc !important;
  position: fixed !important;
}

.v-list-item-title {
  font-weight: 800 !important;
  letter-spacing: 0.009375em;
  font-size: 1.15rem !important;
  font-family: "Poiret One", sans-serif;
  color: #455e25;
  margin-top: 6px;
}

.v-list-item__prepend {
  display: block !important;
  margin-right: 5px;
  color: #233b06;
}

/* Когда меню открыто — фиксируем его */
.fixed {
  position: fixed !important;
  top: 64px;
  /* высота AppBar */
  left: 0;
  height: calc(100vh - 64px);
  z-index: 100;
}

.v-main {
  transition: margin-left 0.3s ease;
  background: linear-gradient(135deg, #edeef0, #ffffff);
  min-height: 100vh;
}

/* Базовые стили меню */
.drawer {
  transition: transform 0.3s ease-in-out;
}


/* Плавность меню */
.drawer {
  transition: transform 0.3s ease-in-out;
}

.v-list-item--density-comfortable:not(.v-list-item--nav).v-list-item--one-line {
  padding-inline: 10px;
}

/* === Декоративный пунктирный полукруг справа для MAIN === */
.MAIN {
  position: relative;
  overflow: hidden;
  background: linear-gradient(165deg, rgba(255, 255, 255, 0.96), rgba(255, 255, 255, 0.92));
  border: 1.5px solid rgba(95, 136, 53, 0.25);
  transition: all 0.3s ease;
  z-index: 1;
}

/* .MAIN:hover {

  box-shadow: 0 10px 25px rgba(95, 136, 53, 0.15);
  border-color: rgba(95, 136, 53, 0.45);
} */

.MAIN:last-child .main_dashed_right {
  border: 1.58px dashed rgb(240, 173, 41, .9)
}

/* Пунктирный полукруг */
.MAIN .main_dashed_right {
  position: absolute;
  width: 360px;
  height: 200px;
  top: 50%;
  right: -180px;
  transform: translateY(-50%);
  border-radius: 50%;
  border: 1.58px dashed rgb(0, 107, 153, 1);
  border-left: none;
  border-top: none;
  opacity: 0.6;
  pointer-events: none;
  z-index: 0;
  animation: mainDashedOrbit 120s linear infinite;
  filter: blur(0.2px);
}

/* Анимация плавного вращения */
@keyframes mainDashedOrbit {
  0% {
    transform: translateY(-50%) rotate(0deg);
    opacity: 0.6;
  }

  50% {
    transform: translateY(-50%) rotate(180deg);
    opacity: 0.8;
  }

  100% {
    transform: translateY(-50%) rotate(360deg);
    opacity: 0.6;
  }
}

/* Контент всегда поверх орбиты */
.MAIN .menu_header,
.MAIN .menu_descr,
.MAIN .v-btn,
.MAIN .menu_icon_ {
  position: relative;
  z-index: 2;
}


/* === Современный обновлённый стиль блока “Ближайшие выезды” === */
.CARD {
  position: relative;
  overflow: hidden;
  padding: 35px !important;
  background: linear-gradient(165deg, rgba(255, 255, 255, 0.96), rgba(255, 255, 255, 1));
  border: 1.5px solid rgba(95, 136, 53, 0.3);
  box-shadow: 0 8px 20px rgba(95, 136, 53, 0.08);
  transition: all 0.4s ease;
  backdrop-filter: blur(6px);
}

/* .CARD:hover {
  box-shadow: 0 12px 28px rgba(95, 136, 53, 0.18);
  border-color: rgba(95, 136, 53, 0.6);
} */

/* ====== Плавное внутреннее свечение ====== */
.CARD::before {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 60% 30%, rgba(138, 181, 57, 0.07), transparent 65%);
  z-index: 1;
  animation: pulseGlow 6s ease-in-out infinite;
}

@keyframes pulseGlow {

  0%,
  100% {
    opacity: 0.6;
    transform: scale(1);
  }

  50% {
    opacity: 1;
    transform: scale(1.05);
  }
}

/* ====== Геометрические вращающиеся элементы ====== */
.CARD .geom_circle,
.CARD .geom_circle2 {
  position: absolute;
  border-radius: 50%;
  animation: geomSpinBright 200s linear infinite;
  z-index: 0;
  filter: blur(0.3px);
}

.CARD .geom_circle {
  width: 420px;
  border: 1.58px dashed rgba(138, 181, 57, 1);
  height: 420px;
  top: -180px;
  left: -150px;
}

.CARD .geom_circle2 {
  width: 260px;
  border: 1.58px dashed rgba(255, 138, 61, 1);
  height: 260px;
  bottom: -120px;
  right: -100px;
  animation-duration: 35s;
}

@keyframes geomSpinBright {
  0% {
    transform: rotate(0deg) scale(1);
    opacity: 0.8;
  }

  50% {
    transform: rotate(180deg) scale(1.05);
    opacity: 1;
  }

  100% {
    transform: rotate(360deg) scale(1);
    opacity: 0.8;
  }
}

.logo {
  transition: transform 1300ms ease;
  /* плавный переход */
  transform-origin: 50% 50%;
  /* центр поворота */
  will-change: transform;
  /* подсказка для оптимизации */
}

.logo:hover {
  transform: rotate(45deg);
}


/* ====== Элементы поверх анимации ====== */
.v-card,
.main_h2,
.buttons,
h1,
.slogan,
.logo {
  position: relative;
  z-index: 4;
  animation: fadeSlide 1.2s ease-in-out;
}

@keyframes fadeSlide {
  from {
    opacity: 0;
    transform: translateY(6px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}


/* --- Новый стиль блока "Свободные места" --- */
.modern_places_v2 {
  position: relative;
  padding: 40px 30px !important;
  background: linear-gradient(160deg, rgba(255, 255, 255, 0.94), rgba(255, 255, 255, 0.98));
  overflow: hidden;
}

/* Фоновые орбиты и волна */
.places_visual_bg {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.decor_wave {
  position: absolute;
  bottom: 0;
  left: -20px;
  width: 100%;
  height: 120px;
  opacity: 0.5;
  animation: moveWave 12s ease-in-out infinite alternate;
}

@keyframes moveWave {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(-40px);
  }
}

.orbit_bg {
  position: absolute;
  border-radius: 50%;
  border: 1.58px dashed rgba(138, 181, 57, 1);
  animation: orbitRotate 270s linear infinite;
  z-index: 0;
}

.orbit1 {
  width: 600px;
  height: 600px;
  top: -250px;
  right: -300px;
  border: 1.58px dashed rgb(0, 107, 153, 0.6);
}

.orbit2 {
  width: 400px;
  height: 400px;
  bottom: -150px;
  left: -200px;
  animation-duration: 160s;
}

@keyframes orbitRotate {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

/* Карточки */
.place_card_v2 {
  position: relative;
  z-index: 2;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.place_card_v2:hover {
  transform: translateY(-5px);
}

.place_1 {
  border: 1.58px solid rgb(240 173 41);
}

.place_1 .place_number_v2 {
  border: 1.55px solid rgb(240 173 41);
  color: rgb(151, 105, 15);
}


.place_2 {
  border: 1.58px solid rgb(125 172 71);
}

.place_2 .place_number_v2 {
  border: 1.55px solid rgb(125 172 71);
  color: rgb(84, 116, 24);
}


.place_3 {
  border: 1.58px solid rgb(0, 107, 153, .68);
}

.place_3 .place_number_v2 {
  border: 1.55px solid rgb(0, 107, 153, .68);
  color: rgb(0, 107, 153, 0.9);
}

/* Внутренний блок */
/* === Эффект мягкого живого свечения для place_inner_v2 === */
.place_inner_v2 {
  position: relative;
  background: rgba(255, 255, 255, 0.85);
  border-radius: 18px;
  padding: 10px 15px 30px;
  margin-right: 5px;
  transition: all 0.25s ease;
  backdrop-filter: blur(4px);
  box-shadow: 1px 1px 1px 1px #edeef0;
  overflow: hidden;
  z-index: 0;
}

.place_inner_v2:hover .place_number_v2 {
  transform: scale(1.15);
  background-color: #abadb114 !important;
}

/* Заголовок */
.place_header_v2 {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.place_icon_wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.icon_pulse {
  animation: iconPulse 3s ease-in-out infinite;
}

@keyframes iconPulse {

  0%,
  100% {
    transform: scale(1);
    filter: drop-shadow(0 0 3px rgba(138, 181, 57, 0.2));
  }

  50% {
    transform: scale(1.1);
    filter: drop-shadow(0 0 6px rgba(138, 181, 57, 0.35));
  }
}

.place_info {
  text-align: right;
}

.place_name_v2 {
  font-family: 'Amatic SC';
  font-size: 1.8rem;
  color: #2A2A2A;
}

.place_number_v2 {
  font-family: 'El Messiri';
  font-size: 1.4rem;
  box-shadow: 1px 1px 1px 1px #edeef0;
  margin-left: 30px;
  padding: 0 10px 5px;
  height: 35px;
  width: 35px;
  border-radius: 50%;

  opacity: 0.85;
}

/* Прогресс-блок */
.progress_block_v2 {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 10px;
}

.progress_row_v2 {
  display: flex;
  align-items: center;
  gap: 10px;
}

.progress_text_v2 {
  font-size: 0.9rem;
  font-weight: 500;
  color: #3A3A3A;
  text-align: right;
  margin-bottom: 6px;
}

.manage_card_modern_v3 {
  position: relative;
  overflow: hidden;
  padding: 45px 40px;
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.96), rgba(255, 255, 255, 0.85));
  border: 1.5px solid rgba(255, 255, 255, 0.75);
  box-shadow: 0 8px 18px rgba(95, 136, 53, 0.12), inset 0 0 12px rgba(255, 255, 255, 0.5);
  transition: all 0.35s ease;
}

.manage_card_modern_v3 .gear_icon_wrap {
  border-radius: 50%;
  padding: 15px;
}

.manage_wrapper {
  display: flex;
  align-items: center;
  gap: 36px;
}

/* Левая часть */
.manage_visual {
  position: relative;
  width: 200px;
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.gear_icon_wrap {
  position: relative;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
}

.spin {
  animation: spin 10s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}



.animated_icon_v4 {
  animation: rotateY 6s ease-in-out infinite;
  margin-right: 6px;
}

@keyframes rotateY {

  0%,
  100% {
    transform: rotateY(0);
  }

  25% {
    transform: rotateY(90deg);
  }

  50% {
    transform: rotateY(180deg);
  }
}

.pulse_icon_v4 {
  animation: pulseIcon 2.8s ease-in-out infinite;
}

.pulse_icon_gray_v4 {
  animation: pulseIconGray 3.2s ease-in-out infinite;
}

@keyframes pulseIcon {

  0%,
  100% {
    transform: scale(1);
    opacity: 0.85;
  }

  50% {
    transform: scale(1.2);
    opacity: 1;
  }
}

@keyframes pulseIconGray {

  0%,
  100% {
    transform: scale(1);
    opacity: 0.8;
  }

  50% {
    transform: scale(1.15);
    opacity: 0.9;
  }
}

/* Декоративные элементы */
.circle_orbit {
  position: absolute;
  width: 160px;
  height: 160px;
  border-radius: 50%;
  animation: orbit 50s linear infinite;
  border: 1.58px dashed rgb(0, 107, 153, 0.7);
}


.card_menu:nth-child(1) .circle_orbit {
  border: 1.58px dashed rgb(240, 173, 41, .9);
}

.card_menu:nth-child(2) .circle_orbit {
  border: 1.58px dashed rgb(128 153 81);
}

@keyframes orbit {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(-360deg);
  }
}

.card_menu_1 .pulse_glow {
  background: radial-gradient(circle, rgba(243, 142, 74, 0.1), transparent);
}

.manage_card_modern_v3 .pulse_glow {
  background: radial-gradient(circle, rgba(90, 200, 250, 0.1), transparent);
}

.pulse_glow {
  position: absolute;
  width: 130px;
  height: 130px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(138, 181, 57, 0.13), transparent);
  filter: blur(15px);
  animation: pulse 3s ease-in-out infinite;
}

@keyframes pulse {

  0%,
  100% {
    transform: scale(1);
    opacity: 0.6;
  }

  50% {
    transform: scale(1.2);
    opacity: 1;
  }
}

.decor_line {
  position: absolute;
  bottom: 5px;
  left: -20px;
  width: 240px;
  opacity: 0.6;
  z-index: 1;
}

/* Правая часть */
.manage_content_v3 {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.manage_title_v3 {
  color: #2A2A2A;
  margin-bottom: 6px;
  font-family: 'Amatic SC';
  font-size: 1.8rem;
}

.manage_text_v3 {
  font-family: 'Poppins', sans-serif;
  color: #444;
  font-size: 0.96rem;
  line-height: 1.6;
}

.manage_points_grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 10px 20px;
  padding-left: 10px;
  border-left: 3px solid rgba(138, 181, 57, 0.3);
}

.point_item {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #2e2e2e;
  font-size: 0.95rem;
  font-family: 'Poppins', sans-serif;
  transition: transform 0.2s ease;
}

.point_item:hover {
  color: #8AB539;
  transform: translateX(4px);
}

@media (max-width: 960px) {
  .manage_wrapper {
    flex-direction: column;
    align-items: flex-start;
  }

  .manage_visual {
    width: 100%;
    height: 120px;
  }

  .decor_line {
    display: none;
  }
}

/* Общий фон */
.content_wrapper_home {
  background: #edeef0;
  min-height: 100vh;
  height: auto;
  padding-bottom: 60px;
}

.container_home {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

/* Верхние кнопки */
.buttons_options {
  display: flex;
}

.button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  transition: all 0.25s ease;
  cursor: pointer;
  backdrop-filter: blur(4px);
}

.button:hover {
  background: rgba(138, 181, 57, 0.22);
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(138, 181, 57, 0.25);
}

.button .icon {
  width: 25px;
  color: #61656d;
}

/* Карточки */
.v-card {
  border: 1.5px solid rgba(255, 255, 255, 1);
  background: linear-gradient(to top, rgba(255, 255, 255, 0.78), rgba(255, 255, 255, 0.88)) !important;
  box-shadow: 0 4px 15px rgba(90, 110, 60, 0.08),
    inset 0 0 8px rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
  width: 100%;
  border-radius: 15px !important;
}

.card_menu {
  height: 100% !important;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 18px !important;
  margin: 8px 0;
  border: .5px solid rgba(255, 255, 255, 0.8) !important;
}

.card_menu_1 {
  margin-right: 30px !important;
}

.card_menu_2 .menu_icon_ {
  border-radius: 50%;
  border: 1.7px solid #afd568d3;
  padding: 2.5px;
}

.card_menu:hover {


  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2) !important;
  transition: box-shadow 0.3s ease;

}


/* Верх карточки */
.menu_header {
  display: flex;
  align-items: flex-start;
  text-align: left;
  gap: 12px;
}

.menu_icon_ {
  width: 60px;
  height: 60px;
  margin-right: 10px;
  flex-shrink: 0;
  transition: all 0.3s ease;
}

.card_menu:hover .menu_icon_ {
  transform: scale(1.07);
  filter: drop-shadow(0 3px 4px rgba(138, 181, 57, 0.2));
}

/* Текст в карточке */
.menu_descr {
  font-family: 'Poppins', sans-serif;
  font-size: 0.93rem;
  color: #505050;
  line-height: 1.45;
  margin: 20px;
}

.v-card .v-btn {
  background: #abadb122;
  border: 1.5px solid rgb(168 170 176 / 12%);
  color: #104155;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);

  font-weight: 800;
  font-family: 'El Messiri', sans-serif;
  font-size: 1.2rem;
  text-transform: none !important;
  letter-spacing: -.1px !important;
  border-radius: 14px;
  box-shadow: 0 2px 5px rgba(90, 130, 55, 0.08);
  transition: all 0.3s ease;
  padding: 11px 22px 11px !important;
  width: 100%;
  min-height: 46px;
}

.v-card:hover .v-btn {
  background: #abadb139;
  border-color: #8c8c8c91;
  color: #2b3d15;
  transform: translateY(-2px);

}


/* Нижняя часть карточки */
.menu_footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 6px;
  margin-top: 2%;
  font-weight: 500;
  font-size: 1.1rem;
  font-family: 'El Messiri', sans-serif;
  transition: color 0.25s ease;
}

.card_menu:hover .menu_footer {
  color: #006C9A;
}

.numbers_text {
  font-family: 'Amatic SC', cursive;
  font-weight: 400;
  font-size: 33px;
  line-height: 33px;
  text-align: center;
  color: #000;
  margin-top: -20%;
}

/* Дата */
.day {
  font-family: 'Amatic SC';
  font-weight: 700;
  font-size: 36px;
  line-height: 40px;
  color: #000;
}

.today {
  font-family: 'El Messiri';
  font-weight: 400;
  font-size: 18px;
  color: #8AB539;
}

/* Современный стиль блока “Свободные места” */
/* ====== СОВРЕМЕННЫЙ ВИЗУАЛ БЛОКА "Свободные места" ====== */

/* Заголовок — лёгкое сияние и гармония с другими блоками */
.places h2 {
  font-family: 'Amatic SC', cursive;
  font-size: 2.6rem;
  font-weight: 700;
  color: #0b2e13;
  letter-spacing: 1px;
  text-align: center;
  margin-bottom: 1.8rem;
  position: relative;
}

.places h2::after {
  content: "";
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 3px;
  border-radius: 4px;
  background: linear-gradient(90deg, #8ab539, #ff8a3d, #006b99);
}


/* Заголовок карточки */
.place_title {
  font-family: 'El Messiri';
  font-weight: 600;
  color: #0b2e13;
  font-size: 1.2rem;
}

/* Подзаголовок (даты, иконки) */
.place_subtitle {
  font-size: 0.95rem;
  color: #3c5531;
  opacity: 0.85;
  margin-bottom: 8px;
}

/* Прогресс-бар — тоньше, с плавным свечением */
.v-progress-linear {
  border-radius: 8px;
  background: rgba(138, 181, 57, 0.1) !important;
  overflow: hidden;
}

.v-progress-linear__determinate {
  background: linear-gradient(90deg, #8ab539, #ff8a3d, #006b99) !important;
  animation: progressGlow 3s ease-in-out infinite;
}

@keyframes progressGlow {

  0%,
  100% {
    filter: brightness(1);
  }

  50% {
    filter: brightness(1.3);
  }
}

/* Текст рядом с прогрессом */
.place_info {
  font-size: 0.9rem;
  color: #3a4a28;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 6px;
}


.img_list {
  float: left;
  width: 20px;
  margin-top: 2px;
  margin-left: 5px;
  margin-right: 5px;
}

.block_list {
  border: 1.6px solid #8AB539;
  padding: 15px;
  margin-top: 10px;
  height: auto;
  border: 2px solid rgba(95, 136, 53, 0.5);
  border-radius: 15px;
}

/* Добавим лёгкий адаптив */
@media (max-width: 960px) {
  .title {
    font-size: 2rem;
  }

  .numbers {
    font-size: 60px;
  }

  .menu_descr {
    font-size: 0.88rem;
  }
}

/* Заголовок */
.title {
  font-family: "Amatic SC", cursive;
  font-size: 2.25rem;
  font-weight: 700;
  letter-spacing: 3px;
  display: inline-block;
  color: #6F9233;
  text-align: center;
}

.slogan {
  -webkit-text-stroke: .04px #dfdfdf;
  font-family: "Pacifico", cursive;
  color: #767677;
  letter-spacing: 1px;
  font-size: 1rem;
  font-weight: 100;
  text-align: center;
  opacity: 1;
  margin-top: -8px;
  margin-left: -10px;
}

/* Заголовки секций */
h2 {
  font-family: "Poiret One", sans-serif;
  font-size: 1.5rem;
  color: #494c54;
  margin: 20px 0 10px;
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

/* Акценты */
.menu_footer,
.point_item:hover {
  color: #104155;
  transition: all 0.25s ease;
}

/* Цифры */
.numbers {
  font-family: "Smooch Sans", sans-serif;
  font-size: 72px;
  color: #4b707f;

  transition: all 0.3s ease;
}

.v-card:hover .numbers {
  color: #E28A00;
}

/* Адаптив */
@media (max-width: 960px) {
  .title {
    font-size: 2.2rem;
  }

  .numbers {
    font-size: 60px;
  }

  h2 {
    font-size: 1.3rem;
  }
}


/* === Вариант 2.1: вращающаяся + пульсирующая граница === */
.date_block {
  position: relative;
  overflow: hidden;
  border-radius: 15px;
  background: #fff;
  box-shadow: 1px 1px 1px 1px #edeef0 !important;
  transition: all 0.4s ease;
  margin-top: -45%;
}

/* Вращающаяся аура */
.date_block::before {
  content: "";
  position: absolute;
  inset: -3px;
  border-radius: 17px;
  background: conic-gradient(from 0deg,
      rgba(138, 181, 57, 0.8),
      rgba(255, 138, 61, 0.6),
      rgb(0, 107, 153, 0.6),
      rgba(138, 181, 57, 0.8));
  animation: spinBorder 12s ease-in-out infinite, pulseGlow 16s ease-in-out infinite;
  z-index: 0;
}

/* Внутренняя маска — чтобы центр оставался белым */
.date_block::after {
  content: "";
  position: absolute;
  inset: 1.5px;
  background: #fff;
  border-radius: 13px;
  z-index: 1;
}

/* Контент блока */
.date_block>* {
  position: relative;
  z-index: 2;
}

/* Плавное вращение по кругу */
@keyframes spinBorder {
  0% {
    transform: rotate(0deg) scale(1);
  }

  50% {
    transform: rotate(180deg) scale(1.02);
  }

  100% {
    transform: rotate(360deg) scale(1);
  }
}

/* Плавный пульс яркости и свечения */
@keyframes pulseGlow {

  0%,
  100% {
    filter: brightness(1) blur(0px);
    opacity: 0.9;
  }

  50% {
    filter: brightness(1.3) blur(1px);
    opacity: 1;
  }
}

/* Эффект при наведении */
.CARD:hover .date_block {
  transform: translateY(-3px) scale(1.04);
  box-shadow: 0 6px 18px rgba(138, 181, 57, 0.3);
}


/* === Анимация для маленьких иконок: мягкое дыхание === */
.card_menu_1 .gear_icon_wrap,
.card_menu_2 .gear_icon_wrap {
  animation: softFloat 4.5s ease-in-out infinite;
  transform-origin: center;
}

@keyframes softFloat {

  0%,
  100% {
    transform: translateY(0) scale(1);
    opacity: 0.7;
  }

  50% {
    transform: translateY(-3px) scale(1.15);
    opacity: 1;
  }
}

.place_inner_v2 .place_icon_wrap {
  animation: swayIcon 3.5s ease-in-out infinite;
  transform-origin: center;
}

@keyframes swayIcon {

  0%,
  100% {
    transform: rotate(0deg) translateY(0);
  }

  25% {
    transform: rotate(3deg) translateY(-3px);
  }

  75% {
    transform: rotate(-3deg) translateY(3px);
  }
}

.card_menu__ {
  margin-top: 30px;
}

.manage_card_modern_v3:hover .spin {
  transform: scale(1.05) !important;
}
</style>
