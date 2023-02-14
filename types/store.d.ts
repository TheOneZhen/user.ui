enum StoreKey {
  UseStore = 'useStore',
  UseEnterTimeStore = 'useEnterTimeStore',
  UseStayingLocalStore = 'useStayingLocalStore'
}

declare function ZGetStore<T = StoreKey.UseEnterTimeStore>(key: T): typeof import('../src/store/UseEnterTimeStore').UseEnterTimeStore
declare function ZGetStore<T = StoreKey.UseStayingLocalStore>(key: T): typeof import('../src/store/UseStayingLocalStore').UseStayingLocalStore
declare function ZGetStore<T = StoreKey.UseStore>(key: T): import('pinia').StoreDefinition
