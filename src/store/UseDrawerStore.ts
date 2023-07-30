import { defineStore } from 'pinia'
import { render, type VNode } from 'vue'
import ZMultiPai from '@/components/lefting/ZMultiPai.vue'

export const UseDrawerStore = defineStore('UseDrawerStore', () => {
  const body = document.querySelector('body')!
  const map = reactive(new Map<CommentType['id'], {
    node: VNode
    size: number
    visible: boolean
  }>())

  watch(() => map.size, (size) => {
    let diff = 10
    if (size > 8) {
      diff = 60 / (size - 1)
    }
    Array
      .from(map.values())
      .reverse()
      .forEach((item, index) => {
        item.size = 30 + index * diff
      })
  })

  function generate (comment: CommentType) {
    const middle = reactive({
      node: h(ZMultiPai, { comment }),
      size: 30,
      visible: true
    })
    map.set(comment.id, middle)
    const watcher = watch(() => middle.visible, (visible) => {
      if (visible === false) {
        map.delete(comment.id)
        _render()
        watcher()
      }
    })
  }

  function renderDrawer (comment: CommentType) {
    generate(comment)
    _render()
  }

  function _render () {
    render(
      h(
        'div',
        Array
          .from(map.values())
          .map(item => item.node)
      ),
      body
    )
  }

  function selection (comment: CommentType) {
    let isRun = false
    for (const id of map.keys()) {
      if (id === comment.id) isRun = true
      else if (isRun) map.get(id)!.visible = false
    }
  }

  return { map, renderDrawer, selection }
})