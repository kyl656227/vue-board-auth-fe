import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PiniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'

const app = createApp(App)

const pinia = createPinia();
pinia.use(PiniaPluginPersistedstate);

app.use(pinia)
app.use(router)

app.mount('#app')
