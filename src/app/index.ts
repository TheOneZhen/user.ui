import { Blog } from './blog'
import { Service } from '@/service'
import { Theme } from '@/theme'
export class App {
  blog = new Blog()
  service
  theme = new Theme()
  env: 'dev' | 'prod' = 'prod'

  constructor () {
    this.service = new Service(this)
    // process.env.Node_ENV === 'development' && (this.env = 'dev')
    console.log('Welcome to zhen\'s space!')
  }

  async init () {
    await this.blog.init()
  }
}

export const app = new App()
