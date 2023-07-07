import { Blog } from './blog'
import { Service } from '@/service'
import { Theme } from '@/theme'
import { Store } from '@/store'
import { LSStorage } from '@/storage'
import type { Router } from 'vue-router'

export class App {
  service = new Service()
  blog = new Blog()
  storage = new LSStorage()
  store = new Store()
  theme = new Theme()
  router: Router | undefined

  constructor () {
    console.log('Welcome to zhen\'s space!')
  }

  async init () {
    this.blog.init()
  }
}

export const app = new App()
