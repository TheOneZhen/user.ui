import { Blog } from '@/blog/'
import { Theme } from '@/theme'
import { Store } from '@/store'
import { LSStorage } from '@/storage'
import { User } from '@/user'
import { APPAPI } from './app.api'
import { Request } from '@/app/request'
import { record } from '@/utils/record'
import type { Router } from 'vue-router'

export class App {
  blog = new Blog()
  storage = new LSStorage()
  store = new Store()
  theme = new Theme()
  router: Router | undefined
  user = new User()
  request = new Request()

  constructor () {
    console.log('Welcome to zhen\'s space!')
  }

  async init () {
    // this.checkCDNResource()
    await this.checkCsrfToken()
    this.blog.init()
    this.user.login()
  }

  async checkCsrfToken () {
    await this.request.post<Boolean>(APPAPI.CHECK_CSRF_TOKEN, {})
  }

  @record('代理请求')
  async proxyRequest<T> (url: string, params = {}, method = 'GET', headers = {}) {
    return this.request.post<T>(APPAPI.PROXY_REQUEST, { url, params, method, headers })
  }

  jsonp (url: string) {
    const script = document.createElement('script')
    script.src = url
    document.body.appendChild(script)
  }

  /** 检查CDN资源，这些资源目前都是挂在到window上的 */
  @record('加载外部资源中！', '外部资源加载成功！', '外部资源加载失败，请尝试刷新页面或检查网络问题。')
  checkCDNResource () {
    const generate = (name: string) => {
      return new Promise((resolve) => {
        while (!window[name]);
        resolve(true)
      })
    }
    return Promise.all([
      generate('mermaid'),
      generate('hljs')
    ])
  }
}

export const app = new App()