import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router'
import '@/global/scss/index.scss'
import 'css-doodle'
import microApp from '@micro-zoe/micro-app'

microApp.start()

createApp(App).use(ElementPlus).use(router).mount('#app')
