import { blog } from './blog'
import { service } from '@/service'
import { theme } from '@/theme'
export class App {
  blog = blog
  service = service
  theme = theme

  constructor () {
    console.log('Welcome to zhen\'s space!')
  }

  async init () {
    await this.blog.init()
  }
}

export const app = new App()
