import '@/stations/style.scss'
import { CustomMarked } from '@/blog/customMarked'
import { PackageAsyncComponentToVNode } from '@/blog/preview'
import { ElCarousel, ElCarouselItem } from 'element-plus'
import 'element-plus/es/components/carousel/style/css'
import 'element-plus/es/components/carousel-item/style/css'

/**
 * # 功能
 * - 鼠标按下时，跳转到指定内容（props），并执行XX（如果是视频，自动播放）。
 * - 鼠标放开时，跳转到详情页。
 * - 鼠标悬浮时，停止播放
 * - 动态内容自动播放，且内容播放完毕后再跳转
*/
export function ZCard (article: ArticleType) {
  const customMarkedImage = new CustomMarked()
  const customMarkedContent = new CustomMarked()
  const loader = () => new Promise(resolve => {
    customMarkedImage.middleParse(article.content)
    resolve(customMarkedContent.middleParse(article.description))
  }).then(({ readingModeNode }: any) => {
    const { blocks } = customMarkedImage

    return h(
      'div',
      {
        class: 'z-card z-markdown'
      },
      [
        h(
          ElCarousel,
          {
            arrow: 'never',
            interval: 10000,
            autoplay: false,
          },
          {
            default: () => blocks.map(block => h(ElCarouselItem, null, { default: () => block }))
          }
        ),
        h('h2', article.title),
        h(
          'div',
          { class: 'z-card-content' },
          readingModeNode
        )
      ]
    )
  })

  return PackageAsyncComponentToVNode(loader)
}