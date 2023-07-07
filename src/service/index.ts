import { MainService } from './mainService'
import { FakerService } from './fakerService'
/**
 * 服务节点
 */
export class Service {
  mainService = new MainService()
  fakerService = new FakerService()

  constructor () {
    // if (import.meta.env.DEV) this.fakerService.init()
    this.mainService.checkCsrfToken()
  }
}
