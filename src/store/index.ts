import { defineStore, StoreDefinition } from 'pinia'
// import { STATE } from '../global/state/stateCode'
// import { UseEnterTimeStore } from './UseEnterTimeStore'
// import { UseLayoutStore } from './UseLayoutStore'
// /**
//  * enumerate the store key
//  */
export enum StoreKey {
  UseEnterTimeStore = 'useEnterTimeStore',
  UseLayoutStore = 'useLayoutStore',
  UseDrawerStore = "UseDrawerStore"
}

// const relationMap = new Map<StoreKey, Object>([
//   [StoreKey.UseEnterTimeStore, UseEnterTimeStore],
//   [StoreKey.UseLayoutStore, UseLayoutStore]
// ])
// class StoreManage {
//   storeMap: Map<StoreKey, StoreDefinition> = new Map()

//   constructor (relationMap: Map<StoreKey, Object>) {
//     relationMap.forEach((option, key) => this.add(key, option))
//   }

//   add (key: StoreKey, option: Object): boolean {
//     if (!key || !option) return false
//     const useStore = defineStore(key, option)
//     if (!useStore) throw new Error(STATE.STATE_LACKED)
//     this.storeMap.set(key, useStore)
//     return true
//   }

//   get: typeof GetStore = (key: StoreKey) => {
//     return this.storeMap.get(key)
//   }

//   getStore<T = StoreKey.UseEnterTimeStore>(key: T) {
//     const useStore = this.storeMap.get(key)
//   }

//   delete (key: StoreKey): boolean {
//     return this.storeMap.delete(key)
//   }

//   clear (): boolean {
//     this.storeMap.clear()
//     return true
//   }
// }

// export const storeManage = new StoreManage(relationMap)
/**
 * 现阶段状态都通过pinia官方示例形式进行，之后注解搞懂后再摄入manage
 */
