import { STATE, WARNSTATE } from '../global/state/stateCode'

enum StorageType {
  SESSION = 1,
  LOCAL = 2
}

export class LSStorage {
  private localStorage: Storage = window.localStorage
  private sessionStorage: Storage = window.sessionStorage

  private getStorage (storageType: StorageType) {
    return storageType === StorageType.LOCAL
      ? this.localStorage
      : this.sessionStorage
  }

  set (key: string, value: any, storageType = StorageType.LOCAL) {
    if (!key) throw new Error(STATE.PARAM_NULL)
    const mid = JSON.stringify(value)
    if (!mid) console.warn(WARNSTATE.VALUE_IS_NULL)
    const storage = this.getStorage(storageType)
    storage.setItem(key, mid)
  }

  get (key: string, storageType = StorageType.LOCAL) {
    const storage = this.getStorage(storageType)
    return JSON.parse(storage.getItem(key) as string)
  }

  // 展示存储视图
}
