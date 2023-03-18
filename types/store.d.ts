// type StoreKey = import('../src/store/index').StoreKey
// type Pinia = typeof import('pinia')
// type UseEnterTimeStore = typeof import('../src/store/UseEnterTimeStore').UseEnterTimeStore
// type UseLayoutStore = typeof import('../src/store/UseLayoutStore').UseLayoutStore

// declare function GetStore<T = StoreKey.UseEnterTimeStore>(key: T):
//   Pinia.StoreDefinition<
//     T,
//     Pinia._ExtractStateFromSetupStore<UseEnterTimeStore>,
//     Pinia._ExtractGettersFromSetupStore<UseEnterTimeStore>,
//     Pinia._ExtractActionsFromSetupStore<UseEnterTimeStore>
//   >
// declare function GetStore<T = StoreKey.UseLayoutStore>(key: T):
//   Pinia.StoreDefinition<
//     T,
//     Pinia._ExtractStateFromSetupStore<UseLayoutStore>,
//     Pinia._ExtractGettersFromSetupStore<UseLayoutStore>,
//     Pinia._ExtractActionsFromSetupStore<UseLayoutStore>
//   >

// 因为现阶段注解有些耗时，故计划延后注解，在项目大致成形之后再进行
