import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router'
import '@/global/scss/index.scss'
import 'css-doodle'
import microApp from '@micro-zoe/micro-app'
import { createPinia } from 'pinia'
import Hljs from 'highlight.js'
import VMdPreview from '@kangc/v-md-editor/lib/preview'
import '@kangc/v-md-editor/lib/style/preview.css'
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js'
import '@kangc/v-md-editor/lib/theme/style/github.css'

VMdPreview.use(githubTheme, { Hljs })

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

const app = createApp(App)
  .use(createPinia())
  .use(ElementPlus)
  .use(router)
  .use(VMdPreview)
// register all icon components globally
// for (const [key, component] of Object.entries(ElementPlusIconsVue)) app.component(key, component)

app.mount('#app')

window.app = app
