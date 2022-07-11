import { defineStore, StoreDefinition, DefineStoreOptions } from 'pinia'

type StoreKeyType = string

class StoreManage {
  storeMap: Map<StoreKeyType, StoreDefinition>

  constructor () {
    this.storeMap = new Map()
  }

  add (key: StoreKeyType, value: DefineStoreOptions) {
    if (!key || !value) throw new Error(`store can't set this k-v: ${key}-${value}`)
    const newStore = defineStore(key, value)
    this.storeMap.set(key, newStore)
  }

  delete (key: StoreKeyType) {
    this.storeMap.has(key) ? this.storeMap.delete(key) : console.warn(`store hasn't key with ${key}`)
  }

  get (key: StoreKeyType) {
    return this.storeMap.get(key)
  }
}

export default new StoreManage()
