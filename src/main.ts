import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import { useRegisterSW } from 'virtual:pwa-register/vue';

const intervalMS = 60 * 60 * 1000


const updateServiceWorker = useRegisterSW({
    onRegistered(r) {
      r && setInterval(() => {
        r.update()
      }, intervalMS)
    }
  })
createApp(App).use(createPinia()).mount("#app");
