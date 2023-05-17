import { defineStore } from 'pinia'
import { StoreKey } from '.'
import type { VNode } from 'vue'

export const UseDrawerStore = defineStore(StoreKey.UseDrawerStore, () => {
  const visible = ref(false)
  const title = ref('')
  const direction = ref('ltr')
  const content = ref<VNode | null>(null)
  function on () {
    visible.value = true;
  }
  
  function update (_title: string, _direction: string, _content: VNode) {
    title.value = _title
    direction.value = _direction
    content.value = _content
  }

  function off () {
    visible.value = false;
  }

  return { visible, title, direction, content, on, off, update }
})