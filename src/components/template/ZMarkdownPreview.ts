import ZSignature from '@/components/signature/ZSignature.vue'

export function ZMarkdownPreview ({content, generateNav = false}: { content: string, generateNav?: boolean }) {
  return defineAsyncComponent({
    loader: () => app
      .blog
      .converterMdToHTML(content, generateNav)
      .then(
        innerHTML => {
          const vNode = h('div', {
            class: 'markdown-body g-background-transparent',
            innerHTML,
            'slide-enter': true
          })
          return vNode
        },
        error => {
          console.error(error)
          return h('文章内容加载失败，请重新尝试！')
        }
      ),
    delay: 200,
    loadingComponent: () => h('div', { class: 'g-flex-center' }, h(ZSignature, { loading: true, style: 'width: 200px' }))
  })
}