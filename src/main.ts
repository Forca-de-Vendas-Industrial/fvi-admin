import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router";
import Notifications from '@kyvg/vue3-notification'

const app = createApp(App).use(router).use(Notifications);

app.config.globalProperties.versao = '2.0.0'

app.mount('#app')
