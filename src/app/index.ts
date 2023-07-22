import { Blog } from '@/blog/'
import { Theme } from '@/theme'
import { Store } from '@/store'
import { LSStorage } from '@/storage'
import { User } from '@/user'
import { APPAPI } from './app.api'
import { Request } from '@/app/request'
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
    this.blog.init()
    this.user.login()
  }

  checkCsrfToken () {
    this.request.post<Boolean>(APPAPI.CHECK_CSRF_TOKEN, {})
  }
}

export const app = new App()
