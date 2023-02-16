import { defineStore } from 'pinia'
import { ref } from 'vue'
import { StoreKey } from '.'

export const UseLayoutStore = defineStore(StoreKey.UseLayoutStore, () => {
  const isHorizontal = ref(window.innerHeight < window.innerWidth)
  function update () {
    isHorizontal.value = window.innerHeight < window.innerWidth
  }
  return { isHorizontal, update }
})
