import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router";

const app = createApp(App).use(router);

app.config.globalProperties.versao = '2.0.0'


app.mount('#app')
