import { defineStore } from 'pinia'

export const UseEnterTimeStore = defineStore('UseEnterTimeStore', () => {
  const time = ref(Date.now())

  function update () {
    time.value = Date.now()
  }

  return { time, update }
})
