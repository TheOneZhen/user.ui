import { defineStore, DefineSetupStoreOptions, StoreDefinition } from 'pinia'
import { STATE } from '../global/state/stateCode'
import { Store, StoreKey } from './store'
import { UseEnterTimeStore } from './useEnterTimeStore'
import { UseStayingLocalStore } from './useStayingLocalStore'

const AllStore: Array<typeof Store> = [
  UseEnterTimeStore,
  UseStayingLocalStore
]

class StoreManage {
  storeMap: Map<StoreKey, StoreDefinition> = new Map()
  // 问题：如果使用function.name的方式进行ESM状态转换，其性能、安全如何
  init () {
    AllStore.forEach(UseStoreItem => {
      const instance = new UseStoreItem()
      if (instance.isLocal) {
        // 进入storage模块
      }
      this.add(instance.key, instance.option)
    })
  }

  add (key: Store['key'], option: Store['option']): boolean {
    if (!key || !option) return false
    const useStore = defineStore(key, option)
    if (!useStore) throw new Error(STATE.STATE_LACKED)
    this.storeMap.set(key, useStore)
    return true
  }

  get (key: StoreKey): StoreDefinition | undefined {
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

export const storeManage = new StoreManage()
