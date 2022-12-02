import { Store, StoreKey } from './store'

export class UseStayingLocalStore extends Store {
  isLocal: boolean = true
  key = StoreKey.UseStayingLocalStore

  option (): Object {
    return {}
  }
}
