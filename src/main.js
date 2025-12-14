/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'
import 'maska'

// Styles
import 'unfonts.css'

import { router } from './router'
import { store } from './store'

const app = createApp(App)

// Vue.use(VueTheMask)


registerPlugins(app)

app
  .use(router)
  // .use(VueTheMask)
  .use(store)
  .mount('#app')
