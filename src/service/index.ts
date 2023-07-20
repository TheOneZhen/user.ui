import { FakerService } from './fakerService'
/**
 * 服务节点
 */
export class Service {
  fakerService = new FakerService()

  constructor () {
    // if (import.meta.env.DEV) this.fakerService.init()
  }
}
