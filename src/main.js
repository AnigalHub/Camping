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

import { vMaska } from 'maska/vue'

// Styles
import 'unfonts.css'

import { router } from './router'
import { store } from './store'

const app = createApp(App)

// Vue.use(VueTheMask)
app.directive('maska', vMaska)

registerPlugins(app)

app
  .use(router)
  // .use(VueTheMask)
  .use(store)
  .mount('#app')
