import { blog } from './blog'
import { service } from '@/request/service'

export class App {
  blogModel: typeof blog = blog
  serviceModel: typeof service = service

  constructor () {
    console.log('welcome to zhen space')
  }

  async init () {
    await this.blogModel.init()
  }
}

export const app = new App()
