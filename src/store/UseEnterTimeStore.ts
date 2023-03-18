import { defineStore } from 'pinia'
import { StoreKey } from '.'

export const UseEnterTimeStore = defineStore(StoreKey.UseEnterTimeStore, () => {
  const time = ref(Date.now())

  function update () {
    time.value = Date.now()
  }

  return { time, update }
})
