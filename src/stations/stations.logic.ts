import { CustomMarked } from '@/blog/customMarked'
import { random } from 'lodash-es'
import ZCarousel from '@/blog/ZCarousel.vue'
/**
 *
 * @param data 数据，等同于文章DS类型
 * @param width 容器宽度
 * @param height 容器高度
 * @param minSize 最小尺寸，长宽一致
 * @param unit 单位，建议使用rem以支持移动端
 * 以上尺寸不代表真实尺寸，仅用来参考以保持响应性和最佳视觉。
 */
export function GridContainer (
  data: ArticleType[],
  width: number,
  height: number,
  minSize: number,
  unit: string
) {
  const length = data.length
  let index = 0
  const rows: (VNode | null)[] = []

  function calc (containerWidth: number, containerHeight: number) {
    if (index > data.length - 1) {
      console.error('the index error', index)
    }
    const [currentWidth, currentHeight] = [random(minSize, containerWidth), random(minSize, containerHeight)]
    const vNodes: typeof rows = []
    const style = { 'display': 'grid', 'grid-template-rows': '', 'grid-template-columns': '', 'gap': '1rem' }

    containerWidth = containerWidth - currentWidth
    containerHeight = containerHeight - currentHeight

    vNodes.push(Card(data[index++]))

    if (index < length && containerWidth > minSize) {
      vNodes.push(calc(containerWidth, currentHeight))
      style['grid-template-columns'] = `${currentWidth}fr ${containerWidth}fr`
    } else {
      style['grid-template-columns'] = '1fr'
    }
    if (index < length && containerHeight > minSize) {
      vNodes.push(calc(currentWidth, containerHeight))
      style['grid-template-rows'] = `${currentHeight}fr ${containerHeight}fr`
    } else {
      style['grid-template-rows'] = '1fr'
    }
    if (index < length && containerWidth > minSize && containerHeight > minSize) {
      vNodes.push(calc(containerWidth, containerHeight))
    }

    /** 合并为一个node */
    return h(
      'div',
      {
        class: 'g-flex-auto',
        style
      },
      vNodes
    )
  }

  /** 生成尺寸值 + 单位 */
  function generateDimValue (value: number) {
    return `${value}${unit}`
  }

  while (index < length) rows.push(calc(width, height))

  return h('div', { class: 'g-fd-c', style: { 'gap': '1rem' } }, rows)
}
/** 和联播组件联立 */
function Card (article: ArticleType) {
  const customMarked = new CustomMarked()
  customMarked.parse(article.content, false, false)
  const codes = customMarked.codes.slice()
  return h(
    'div',
    { class: 'z-card g-fd-c' },
    [
      h(
        ZCarousel,
        {
          class: 'g-flex-auto',
          data: codes.map(code => ({ title: '', node: code })),
          autoPlay: random(10000, 20000),
          isDisplayControls: true,
          isDisplayTitle: false
        }
      ),
      customMarked.parse(article.description, false),
      `${Date()}` /** 后续再统一这边的内容 */
    ]
  )
}