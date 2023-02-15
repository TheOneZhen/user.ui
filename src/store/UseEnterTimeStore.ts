import { ref } from 'vue'
import { defineStore } from 'pinia'

export const UseEnterTimeStore = defineStore(StoreKey.UseEnterTimeStore, () => {
  const time = ref(Date.now())

  function update () {
    time.value = Date.now()
  }

  return { time, update }
})
