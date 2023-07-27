import { defineStore } from 'pinia'

export const UseReplyStore = defineStore('UseReplyStore', () => {
  const visible = ref(false)
  const quotedComment = ref<null | CommentType>(null)

  function on (quoted: CommentType) {
    visible.value = true
    quotedComment.value = quoted
  }

  return { visible, quotedComment, on }
})