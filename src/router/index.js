import { createWebHistory, createRouter } from 'vue-router'

const Home = () => import('@/page/Home/Home.vue')
const AdditionalCosts = () => import('@/page/AdditionalCosts/AdditionalCosts.vue')
const MapObjects = () => import('@/page/MapObjects/MapObjects.vue')
const AddClients = () => import('@/page/AddClients/AddClients.vue')
const ListClients = () => import('@/page/ListClients/ListClients.vue')
const Trips = () => import('@/page/Trips/Trips.vue')
const TariffManagement = () => import('@/page/TariffManagement/TariffManagement.vue')
const Settings = () => import('@/page/Settings/Settings.vue')

const routes = [
  // {
  //   path: '/',
  //   redirect: () => {
  //     if (typeof window !== 'undefined' && window.innerWidth < 1100) {
  //       return { name: 'ListClients' }
  //     }
  //     return { name: 'Home' }
  //   }
  // },
  { name: 'Home', path: '/', component: Home },
  { name: 'MapObjects', path: '/mapobjects', component: MapObjects },
  { name: 'AdditionalCosts', path: '/additionalcosts', component: AdditionalCosts },
  { name: 'AddClients', path: '/addclients', component: AddClients },
  { name: 'ListClients', path: '/listclients', component: ListClients },
  { name: 'Trips', path: '/trips', component: Trips },
  { name: 'TariffManagement', path: '/tariffmanagement', component: TariffManagement },
  { name: 'Settings', path: '/settings', component: Settings },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0, left: 0 }
  },
})
