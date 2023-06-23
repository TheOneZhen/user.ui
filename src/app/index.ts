import { Blog } from './blog'
import { Service } from '@/service'
import { Theme } from '@/theme'
import { Store } from '@/store'
import { LSStorage } from '@/storage'
export class App {
  blog = new Blog()
  service = new Service()
  theme = new Theme()
  store = new Store()
  storage = new LSStorage()

  constructor () {
    console.log('Welcome to zhen\'s space!')
  }

  async init () {
    this.blog.init()
  }
}

export const app = new App()
