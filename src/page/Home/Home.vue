<template>
  <div class="home">
    <v-container max-height="97vh">
      <div class="buttons-container">
        <v-btn>Настройки</v-btn>
        <v-btn>Выход</v-btn>
      </div>
      <h1 class="text-center">Ромашка</h1>
      <v-row no-gutters>
        <v-col>
          <div class="slogan">
            «Кемпинг у моря - природа, которой хочется делиться!»
          </div>
          <div v-for="menu in menus" :key="menu" class="buttons">
            <v-btn @click="goRoute(menu.route)">
              {{ menu.name }}
            </v-btn>
          </div>
        </v-col>
        <v-col cols="6">
          <component :is="homeSvg" class="home_svg" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import { router } from '@/router';
import home_svg from './../../svg/home.vue'
import { shallowRef } from 'vue'
const homeSvg = shallowRef(home_svg)

const menus = [
  {
    icon:'',
    name: 'Регистрация отдыхающих',
    route: '',
  },
  {
    icon:'',
    name: 'Список клиентов',
    route: '',
  },
  {
    icon:'',
    name: 'Карта полянок',
    route: 'MapObjects',
  },
  {
    icon:'',
    name: 'Ближайшие выезды',
    route: '',
  },
  {
    icon:'',
    name: 'Дополнительные расходы и настройки',
    route: 'AdditionalCosts',
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
 .home{
  padding: 0 2%;
 }
 .v-btn{
  font-size: 1.8rem;
  text-transform: none;
  margin-bottom: 1.25rem;
  border: none;
  box-shadow: none;
  background: transparent;
  font-family: "El Messiri", sans-serif;
  font-weight: 200;
  letter-spacing: -.5px;
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
  font-size: 85px;
  letter-spacing: 0.08em;
  color: #5F8835;
  -webkit-text-stroke: 1.5px #5F8835;
  margin-top: -4%;
}

.home_svg {
  margin-top: -10%;
  width: 100%;
  
}

.slogan {
  font-family: "Pacifico", cursive;
  font-weight: 400;
  font-style: normal;
  font-size: 35px;
  width: 98%;
  line-height: 50px;
  color: rgba(0, 0, 0, 0.64);
  margin-top: -3%;
  margin-bottom: 4%;
}
</style>