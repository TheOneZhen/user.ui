import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import { FcWaveFilter } from 'fancy-components'

new FcWaveFilter();

const app = createApp(App)
app.use(ElementPlus)
app.mount('#app')

