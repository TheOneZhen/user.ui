import { UseDrawerStore } from './UseDrawerStore'
import { UseEnterTimeStore } from './UseEnterTimeStore'
import { UseLayoutStore } from './UseLayoutStore'
import { UseColorSchemeStore } from './UseColorSchemeStore'
import { StoreDefinition } from 'pinia'

/**
 * ## 状态管理说明
 * 1. 每个文件代表一种状态，普通状态文件名以useXXXStore.ts格式，长效状态文件名以useXXXLocalStore.ts格式
 *    - 普通状态在app启动过程中创建
 *    - 长效状态在app启动时被创建，会自动加载配置文件，读取本地存储
 */
export class Store {
  private _map: Record<string, StoreDefinition> = {
    'UseDrawerStore': UseDrawerStore,
    'UseEnterTimeStore': UseEnterTimeStore,
    'UseLayoutStore': UseLayoutStore,
    'UseColorSchemeStore': UseColorSchemeStore
  }
  /**
   * 所有数据都是默认响应式解构
   */
  get (key: 'UseDrawerStore'): ReturnType<typeof UseDrawerStore>
  get (key: 'UseEnterTimeStore'): ReturnType<typeof UseEnterTimeStore>
  get (key: 'UseLayoutStore'): ReturnType<typeof UseLayoutStore>
  get (key: 'UseColorSchemeStore'): ReturnType<typeof UseColorSchemeStore>
  get (key: string) {
    return this._map[key]()
  }
}