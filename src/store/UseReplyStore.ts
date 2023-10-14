import { defineStore } from 'pinia'

export const UseReplyStore = defineStore('UseReplyStore', () => {
  const visible = ref(false)
  const reference = ref('')
  const comment: {
    content: CommentType['content']
    article: CommentType['article']
    quote: CommentType['quote']
  } = reactive({
    content: '',
    article: null,
    quote: null
  })
  const fresh = ref<Function[]>([])

  function on (quote: CommentType | null = null, article: ArticleType | null = null) {
    reference.value = '留言'
    if (article) {
      reference.value = `评论：${article.title}`
      comment.article = article.id
    }
    if (quote) {
      reference.value = `@ ${quote.user.name}`
      comment.quote = quote.id
    }
    visible.value = true
  }

  function off () {
    visible.value = false
  }

  function clear () {
    comment.content = ''
    comment.article = null
    comment.quote = null
  }

  return { visible, reference, comment, fresh, clear, on, off }
})