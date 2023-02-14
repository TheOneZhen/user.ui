import { defineStore, StoreDefinition } from 'pinia'
import { STATE } from '../global/state/stateCode'
import { UseEnterTimeStore } from './UseEnterTimeStore'

/**
 * enumerate the store key
 */
export enum StoreKey {
  UseEnterTimeStore = 'useEnterTimeStore',
  IsHorizontal = 'isHorizontal'
}

const relationMap = new Map<StoreKey, Object>([
  [StoreKey.UseEnterTimeStore, UseEnterTimeStore]
])
class StoreManage {
  storeMap: Map<StoreKey, StoreDefinition> = new Map()
  
  constructor (relationMap: Map<StoreKey, Object>) {
    relationMap.forEach((option, key) => this.add(key, option))
  }

  add (key: StoreKey, option: Object): boolean {
    if (!key || !option) return false
    const useStore = defineStore(key, option)
    if (!useStore) throw new Error(STATE.STATE_LACKED)
    this.storeMap.set(key, useStore)
    return true
  }

  get: typeof GetStore = (key: StoreKey) => {
    return this.storeMap.get(key)
  }

  delete (key: StoreKey): boolean {
    return this.storeMap.delete(key)
  }

  clear (): boolean {
    this.storeMap.clear()
    return true
  }
}

export const storeManage = new StoreManage(relationMap)
