import { Blog } from '@/blog/'
import { Theme } from '@/theme'
import { Store } from '@/store'
import { LSStorage } from '@/storage'
import { User } from '@/user'
import { APPAPI } from './app.api'
import { Request } from '@/app/request'
import { ElMessage } from 'element-plus'
import type { Router } from 'vue-router'
import 'element-plus/es/components/message/style/css'

export class App {
  blog = new Blog()
  storage = new LSStorage()
  store = new Store()
  theme = new Theme()
  router: Router | undefined
  user = new User()
  request = new Request()
  $message = ElMessage

  constructor () {
    console.log('Welcome to zhen\'s space!')
  }

  async init () {
    await this.checkCsrfToken()
    this.blog.init()
    this.user.login()
  }

  async checkCsrfToken () {
    await this.request.post<Boolean>(APPAPI.CHECK_CSRF_TOKEN, {})
  }
  // 代理请求
  async proxyRequest<T> (url: string, params = {}, method = 'GET', headers = {}) {
    return this.request.post<T>(APPAPI.PROXY_REQUEST, { url, params, method, headers })
  }

  jsonp (url: string) {
    const script = document.createElement('script')
    script.src = url
    document.body.appendChild(script)
  }
}

export const app = new App()