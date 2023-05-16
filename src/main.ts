import App from './App.vue'
import router from './router'
import '@/global/scss/index.scss'
import 'css-doodle'
import microApp from '@micro-zoe/micro-app'
import { createPinia } from 'pinia'
import 'uno.css'
import { app } from './app'
import { ClickOutside } from 'element-plus'

microApp.start({
  plugins: {
    modules: {
      userEarthMap: [{
        loader (code) {
          if (process.env.NODE_ENV === 'development') {
            // 这里 basename 需要和子应用vite.config.js中base的配置保持一致
            code = code.replace(/(from|import)(\s*['"])(\/userEarthMap\/)/g, all => {
              return all.replace('/userEarthMap/', 'http://localhost:3050/userEarthMap/')
            })
          }
          return code
        }
      }]
    }
  }
})

createApp(App)
  .use(createPinia())
  .use(router)
  .directive('click-out-side', ClickOutside)
  .mount('#app')

window.app = app
app.init()
