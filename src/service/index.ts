import { mainService } from './mainService'
import { fakerService } from './fakerService'
import type { App } from '@/app'
/**
 * 服务节点
 */
export class Service {
  mainService = mainService
  fakerService = fakerService

  constructor (public app: App) {
    if (app.env === 'dev') this.fakerService.init()
  }
}
