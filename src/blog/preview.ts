import ZSignature from '@/global/ZSignature.vue'
import { loadImageAsync, loadVideoAsync } from '@/utils/loadResourceAsync'
import { AsyncComponentLoader } from 'vue'

/** 通用加载等待组件 */
export function CommonLoadingComp () {
  return h('div', { class: 'g-flex-center' }, h(ZSignature, { loading: true, style: 'width: 200px' }))
}

/** 图片-轮播-异步组件 */
export function ZPreviewCarouselImage ({ src }: { src: string }) {
  return PackageAsyncComponentToVNode(
    () => loadImageAsync(src)
  )
}
/** 视频-轮播-异步组件 */
export function ZPreviewCarouselVideo ({ src }: { src: string }) {
  return PackageAsyncComponentToVNode(
    () => loadVideoAsync(src)
  )
}

export function PackageAsyncComponentToVNode (loader: AsyncComponentLoader) {
  return h(
    defineAsyncComponent({
      loader,
      delay: 200,
      loadingComponent: CommonLoadingComp,
      errorComponent: ZSignature
    })
  )
}