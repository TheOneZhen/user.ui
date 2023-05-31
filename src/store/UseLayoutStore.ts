import { defineStore } from 'pinia'

export const UseLayoutStore = defineStore('UseLayoutStore', () => {
  const isHorizontal = ref(window.innerHeight < window.innerWidth)

  function update () {
    isHorizontal.value = window.innerHeight < window.innerWidth
  }
  return { isHorizontal, update }
})
