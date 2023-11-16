import ZSignature from '@/components/signature/ZSignature.vue'
import { loadImageAsync, loadVideoAsync } from '@/utils/loadResourceAsync'

/** 通用加载等待组件 */
function CommonLoadingComp () {
  return h('div', { class: 'g-flex-center' }, h(ZSignature, { loading: true, style: 'width: 200px' }))
}

/** markdown-异步组件 */
export function ZMarkdownPreview ({ content, generateNav = false }: { content: string, generateNav?: boolean }) {
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
    loadingComponent: CommonLoadingComp
  })
}
/** 图片-轮播-异步组件 */
export function ZPreviewCarouselImage ({ src }: { src: string }) {
  return defineAsyncComponent({
    loader: () => loadImageAsync(src),
    delay: 200,
    loadingComponent: CommonLoadingComp,
    errorComponent: ZSignature
  })
}
/** 视频-轮播-异步组件 */
export function ZPreviewCarouselVideo ({ src }: { src: string }) {
  return defineAsyncComponent({
    loader: () => loadVideoAsync(src),
    delay: 200,
    loadingComponent: CommonLoadingComp,
    errorComponent: ZSignature
  })
}