import { defineStore } from 'pinia'
import type { Component } from 'vue'

export const UseDrawerStore = defineStore('UseDrawerStore', () => {
  const visible = ref(false)
  const title = ref('')
  const direction = ref('ltr')
  const content = ref<string | Component>('')
  function on (_title: string, _direction: 'ltr' | 'rtl' | 'ttb' | 'btt' = 'ltr', _content: string | Component) {
    visible.value = true
    title.value = _title
    direction.value = _direction
    content.value = _content
  }

  function off () {
    visible.value = false
  }

  return { visible, title, direction, content, on, off }
})