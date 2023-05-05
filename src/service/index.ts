import { mainService } from './mainService'
import { fakerService } from './fakerService'

class Service {
  mainService = mainService
  fakerService = fakerService

  constructor () {
    if (process.env.NODE_DEV === 'development') this.fakerService.init()
  }
}
/**
 * 服务支点
 */
export const service = new Service()
