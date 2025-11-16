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

// Styles
import 'unfonts.css'

// Vuetify locale
import { createVuetify } from 'vuetify'
import { ru } from 'vuetify/locale'

import { router } from './router'
import { store } from './store'

const app = createApp(App)

// Добавляем Vuetify с русской локалью
const vuetify = createVuetify({
  locale: {
    locale: 'ru',
    messages: { ru },
  },
})

registerPlugins(app)

app
  .use(router)
  .use(store)
  .use(vuetify)
  .mount('#app')
