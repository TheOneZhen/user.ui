import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import { FcWaveFilter } from 'fancy-components'
import router from './router'

new FcWaveFilter()

const app = createApp(App)
app.use(ElementPlus)
app.use(router)
app.mount('#app')

