import { createWebHistory, createRouter } from 'vue-router';

const Home = () => import('@/page/Home/Home.vue');
const AdditionalCosts = () => import('@/page/AdditionalCosts/AdditionalCosts.vue');
const MapObjects = () => import('@/page/MapObjects/MapObjects.vue');
const ListClients = () => import('@/page/ListClients/ListClients.vue');
const Trips = () => import('@/page/Trips/Trips.vue');

const routes = [
  { name: 'Home', path: '/', component: Home },
  { name: 'MapObjects', path: '/mapobjects', component: MapObjects },
  { name: 'AdditionalCosts', path: '/additionalcosts', component: AdditionalCosts },
  { name: 'ListClients', path: '/listclients', component: ListClients },
  { name: 'Trips', path: '/trips', component: Trips },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});