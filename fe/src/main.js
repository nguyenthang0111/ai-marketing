import './assets/css/main.css'
import 'primeicons/primeicons.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import i18n from './plugins/i18n'
import Antd from 'ant-design-vue';

const app = createApp(App)


app.use(createPinia())

app.use(router)
app.use(i18n)
app.use(Antd)

app.mount('#app')
