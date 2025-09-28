import { createWebHistory, createRouter } from 'vue-router';

const Home = () => import('@/page/Home/Home.vue');
const AdditionalCosts = () => import('@/page/AdditionalCosts/AdditionalCosts.vue');
const MapObjects = () => import('@/page/MapObjects/MapObjects.vue');

const routes = [
  { name: 'Home', path: '/', component: Home },
  { name: 'MapObjects', path: '/mapobjects', component: MapObjects },
  { name: 'AdditionalCosts', path: '/additionalcosts', component: AdditionalCosts },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});