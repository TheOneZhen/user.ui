import { Blog } from './blog'
import { Service } from '@/service'
import { Theme } from '@/theme'
import { Store } from '@/store'
export class App {
  blog = new Blog()
  service
  theme = new Theme()
  store = new Store()

  constructor () {
    this.service = new Service(this)
    console.log('Welcome to zhen\'s space!')
  }

  async init () {
    await this.blog.init()
  }
}

export const app = new App()
