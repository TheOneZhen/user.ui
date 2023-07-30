import { defineStore } from 'pinia'
import { ElDivider, ElDrawer } from 'element-plus'
import ZComment from '@/components/lefting/ZComment.vue'
import ZComments from '@/components/lefting/ZComments.vue'
import { render } from 'vue'


export const UseDrawerStore = defineStore('UseDrawerStore', () => {
  const stack: Ref<number>[] = []


  function generateDrawer (comment: CommentType) {
    const show = ref(true)
    const size = ref(30)
    const drawer = h(
      ElDrawer,
      {
        appendToBody: true,
        modelValue: show.value,
        direction: 'ltr',
        'onUpdate:modelValue': (value) => show.value = value,
        size: size.value + '%'

      },
      {
        default: () => [
          h(
            ZComment,
            {
              comment: comment,
              onlyReply: true
            }
          ),
          h(ElDivider),
          h(
            ZComments,
            {
              article: comment.article,
              quote: comment.quote
            }
          )
        ]
      }
    )
    const body = document.querySelector('body')
    stack.push(size)
    render(drawer, body!)
  }

  return { generateDrawer }
})