/**
 * enumerate the store key
 */
export enum StoreKey {
  UseStore = 'useStore',
  UseEnterTimeStore = 'useEnterTimeStore',
  UseStayingLocalStore = 'useStayingLocalStore'
}

export class Store {
  isLocal = false
  key = StoreKey.UseStore
  option () {
    return {}
  }
}
