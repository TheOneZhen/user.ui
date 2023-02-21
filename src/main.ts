import App from './App.vue'
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
  .use(router)
  .use(VMdPreview)

app.mount('#app')

window.app = app
