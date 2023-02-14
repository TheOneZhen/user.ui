type StoreKey = import('../src/store/index').StoreKey
type Pinia = import('pinia')
type UseEnterTimeStore = import ('../src/store/UseEnterTimeStore').UseEnterTimeStore
declare function GetStore(key: StoreKey.UseEnterTimeStore):
  Pinia.StoreDefinition<
    T,
    Pinia._ExtractStateFromSetupStore<UseEnterTimeStore>,
    Pinia._ExtractGettersFromSetupStore<UseEnterTimeStore>,
    Pinia._ExtractActionsFromSetupStore<UseEnterTimeStore>
  >
declare function GetStore(key: StoreKey.IsHorizontal):
  Pinia.StoreDefinition<
    T,
    Pinia._ExtractStateFromSetupStore<UseEnterTimeStore>,
    Pinia._ExtractGettersFromSetupStore<UseEnterTimeStore>,
    Pinia._ExtractActionsFromSetupStore<UseEnterTimeStore>
  >