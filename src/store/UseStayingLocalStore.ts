import { Store, StoreKey } from './Store'

export class UseStayingLocalStore extends Store {
  isLocal: boolean = true
  key = StoreKey.UseStayingLocalStore

  option (): Object {
    return {}
  }
}
