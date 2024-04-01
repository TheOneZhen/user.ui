import { Tokens, Token, marked } from 'marked'
import { VNode, h } from 'vue'
import { ZPreviewCarouselImage, ZPreviewCarouselVideo, PackageAsyncComponentToVNode } from './preview'
import { uniqueId } from 'lodash-es'
import ZCarousel from './ZCarousel.vue'
import { ElMenu, ElMenuItem, ElSubMenu, ElText, ElTabs, ElTabPane } from 'element-plus'
import 'element-plus/es/components/tab-pane/style/css'
import 'element-plus/es/components/tabs/style/css'
/**
 * # markdown marked解析模块
 * ## 背景
 * 之前使用marked直接将markdown解析为HTML文本再渲染，无法实现组件的复用，不利于theme模块以及后续其他模块构建。
 * ## 解决方案
 * 使用`marked.lexer`生成markdown AST，通过自定义状态机转换为组件
 * ## 结构设计
 * - 状态机设计：所有状态机返回`VNode`，main返回`VNode[]`。parse为解析主体，负责包装组件
 *  - 代码块组件：当代码添加`[]`符号，代表代码块，会就近组合代码（同样也得带`[]`标识）为一个整体组件
 *    - 只能通过顶部的title切换内容，不支持各端其他设备操作
 *  - 联播组件：当代码添加`{}`符号，会触发分组。
 *    - 支持平板的左右滑动
 *    - 手机端采用向下布局
 *    - 只支持第一层级
 * - 样式设计：不允许写内联样式（不便维护），样式尽量集中到markdown.scss文件。
 * - 解析外功能设计：
 *    1. catalog：通过中间结构记录heading实现，最后在parse中输出
 *    2. 阅读模式：parse最后输出一个组件，组件中包含状态转换
 * 3. 异步解析设计：所有状态机和parse都是同步的，异步内容需要`defineAsyncComponent`包裹。
 * 4. 样式设计：组件外层使用自定义DOM包裹（外层样式），内层样式不允许使用全局（方便最后抽离），最后的样式统一在`markdown.scss`中进行管理
 */
export class CustomMarked {

  catalog: Array<SectionNavType> = []
  prefix = 'z-markdown'
  isReadingMode = false
  codes: Array<VNode> = []
  private CarouselImageModeRef = ref()

  /** 联播组件，组件标记只在最外层 */
  blocks: Array<VNode> = []
  notBlocks: Array<VNode> = []

  /** bug：hashurl变动时会触发重新渲染 */
  parse (markdown: string, isGenerateNavigation = false, isReadingMode = true) {
    this.isReadingMode = isReadingMode
    const tokens = marked.lexer(markdown)
    let readingModeNode = h(
      'div',
      { class: this.concatPrefix('reading-mode') }, // 暂时继续使用该样式，最后再微调
      [
        ...this.main(tokens)
      ].filter(Boolean)
    )

    if (!this.isReadingMode && this.codes.length > 0) {
      readingModeNode = h(
        'div',
        { class: `${this.concatPrefix('image-mode')}` },
        [
          h(
            ZCarousel,
            {
              class: this.concatPrefix('carousel'),
              data: this.codes.map(code => ({ title: '', node: code })),
              autoPlay: 4000,
              isDisplayTitle: false,
              ref: this.CarouselImageModeRef
            }
          ),
          readingModeNode
        ]
      )
    }

    return h('div', { class: `${this.prefix}` }, readingModeNode)
  }

  /** 最后会输出目录、阅读模式、图片模式组件 */
  middleParse (markdown: string) {
    const tokens = marked.lexer(markdown)
    const level1 = this.main(tokens).filter(Boolean) // ???不清楚为什么要filter
    const readingModeNode = h(
      'div',
      { class: `${this.prefix} ${this.concatPrefix('reading-mode')}` },
      level1
    )
    const navigation = this.navigation(this.catalog)
    const imageModeNode = this.generateImageMode(level1)

    return {
      readingModeNode,
      navigation,
      imageModeNode
    }
  }

  generateImageMode (level1: VNode[]) {
    type ImageModePartType = { image: VNode | null, content: VNode[] }
    /** 生成图片模式需要根据第一层级的节点和统计的block来拆分节点 */
    const parts = Array<ImageModePartType>()
    let index = 0
    let middle: ImageModePartType = { image: null, content: [] }

    level1.forEach((node, i) => {
      if (node !== this.blocks[index]) {
        middle.content.push(node)
        this.notBlocks.push(node)
      }
      if (node === this.blocks[index] || i === level1.length - 1) {
        index++
        parts.push(middle)
        middle = { image: node, content: [] }
      }
    })

    const related = new WeakMap()

    parts.forEach(item => {
      if (item.image !== null) related.set(item.image, item.content)
    })

    const imageSide = h(
      ZCarousel,
      {
        class: this.concatPrefix('image-mode-image'),
        data: parts.map(part => part.image).filter(Boolean),
        // 跳转
        jumpToContent: (node: VNode) => { }
      }
    )

    const contentSide = h(
      'div',
      { class: this.concatPrefix('image-mode-content') },
      parts.map(part => {
        h(
          'div',
          { class: this.concatPrefix('image-mode-content-part') },
          part.content
        )
      })
    )
    /** 还缺少内容：监听布局。 */
    return h(
      'div',
      { class: `${this.prefix} ${this.concatPrefix('image-mode')}` },
      [
        imageSide,
        contentSide
      ]
    )

  }

  private main (tokens: Token[]) {
    const children = Array<VNode>()

    while (tokens.length) {
      const token = tokens[0]

      if (token.type === 'code') {
        children.push(this.codeSchedular(tokens as Tokens.Code[]))
      } else {
        const type = token.type as keyof this
        /** 如果存在对应状态机，调用对应的方法 */
        if (this[type] !== undefined) children.push((this[type] as any).call(this, token))
        else {
          /** 没有children，直接渲染 */
          if (['hr', 'br'].includes(token.type)) children.push(this.generateVNode(token.type))
          /** 存在children，使用main渲染 */
          else if ([
            'blockquote',
            'strong',
            'em',
            'del'
          ].includes(token.type)) {
            children.push(this.generateVNode(token.type, undefined, this.main((token as Token & { tokens: [] }).tokens)))
          }
        }
        tokens.shift()
      }
    }
    return children
  }

  /** 解析生成联播组件 */
  carousel (tokens: Tokens.Code[]) {
    /** 这里必须要执行一下，不然无法捕获code */
    const children = tokens.map(token => ({ node: this.code(token), title: token.lang }))
    if (this.isReadingMode) return h(
      ZCarousel,
      {
        class: this.concatPrefix('carousel'),
        data: children,
        isDisplayTitle: true
      }
    )
    else return this.pointerWhenImageMode(this.codes.length - children.length)
  }

  /** 解析生成代码块组件 */
  codeSchedular (tokens: Tokens.Code[]) {
    let token = tokens.shift()
    const codeTokens: Tokens.Code[] = []

    /** 必须保证block内容在第一层级 */
    if (token && /\{\}/.test(token.lang || '')) {
      const { vnode } = this.code(token)

      vnode.props && (vnode.props['class'] = this.concatPrefix('image-mode-block'))
      this.blocks.push(vnode)

      return vnode
    } else { /** 普通的代码和代码块处理是一致的 */
      while (token && token.type === 'code' && /\[\]/.test(token.lang || '')) {
        codeTokens.push(token)
        token = tokens.shift()
      }
      if (token && token.type === 'code') codeTokens.push(token)
    }

    return h(
      ElTabs,
      {
        type: 'border-card'
      },
      {
        default: () => codeTokens.map(item => {
          const { vnode, lang } = this.code(item)
          return h(
            ElTabPane,
            {
              label: lang
            },
            {
              default: () => vnode
            }
          )
        })
      }
    )
  }

  /** 解析生成代码组件 */
  code ({ lang, text }: Tokens.Code) {
    /** 移除标记 */
    lang = lang?.replaceAll(/[\[\]\{\}\s]*/g, '')
    const language = window.hljs.getLanguage(lang) ? lang : 'plaintext'
    let vnode: VNode

    // 这里image、video静态资源没有添加类的标识！！！
    if (lang === 'image') vnode = ZPreviewCarouselImage({ src: text })
    else if (lang === 'video') vnode = ZPreviewCarouselVideo({ src: text })
    else if (lang === 'mermaid') vnode = PackageAsyncComponentToVNode(
      () => window.mermaid
        .render(uniqueId(this.concatPrefix('mermaid-')), text)
        .then(({ svg }) => h('div', { innerHTML: svg }))
    )
    else vnode = h(
      'pre',
      {},
      [
        PackageAsyncComponentToVNode(
          () => Promise
            .resolve(window.hljs.highlight(text, { language }))
            .then(res => h('code', { innerHTML: res.value }))
        ),
        h(
          'span',
          {
            class: this.concatPrefix('code-copy'),
            'icon-carbon:copy': '',
            onClick () {
              navigator.clipboard.writeText(text)
            }
          }
        )
      ]
    )

    return {
      vnode,
      lang
    }
  }

  /**
   * 创建VNode：自动创建映射名
   * @param tagName 标签名
   * @param props props。使用undefined会自动创建class，修改class时候需字符串拼接。
   * @param children children
   * @returns VNode
   */
  private generateVNode (
    tagName: string,
    props: Record<string, any> = {},
    children: string | VNode[] = ''
  ) {
    return h(tagName, props, children)
  }

  /** 拼接前缀 */
  private concatPrefix (text: string) {
    return `${this.prefix}-${text}`
  }
  /** 生成HTML VNode，这里使用了一个`div`包裹 */
  html ({ text }: Tokens.HTML) {
    return this.generateVNode(
      'div',
      {
        class: this.concatPrefix('html'),
        innerHTML: text
      }
    )
  }

  /** 生成heading，生成过程中需要记录（全局结构） */
  heading ({ depth, text, tokens }: Tokens.Heading) {
    let level = depth, middle = this.catalog
    while (level !== 1 && middle.length > 0) {
      middle = middle[middle.length - 1].children
      level--
    }
    middle.push({ title: text, children: [] })
    return this.generateVNode(
      `h${depth}`,
      { class: this.concatPrefix('heading') },
      [
        this.generateVNode(
          'a',
          { href: `#${text}`, name: `${text}` },
          '#'
        ),
        ...this.main(tokens)
      ]
    )
  }

  /** 列表。注意区分有序列表和无序列表，俩种使用相同class。 */
  list (token: Tokens.List) {
    const tag = token.ordered ? 'ol' : 'ul'
    return h(
      tag,
      {
        // class: `${this.concatPrefix('list')}`,
        start: token.start || undefined // 开始的序号
      },
      token.items.map(item => this.list_item(item))
    )
  }

  /** 列表项 */
  list_item ({ tokens }: Tokens.ListItem) {
    return this.generateVNode(
      'li',
      undefined,
      this.main(tokens)
    )
  }

  /** 段落 */
  paragraph ({ tokens }: Tokens.Paragraph) {
    return this.generateVNode(
      'p',
      {
        'slide-enter': ''
      },
      this.main(tokens)
    )
  }

  /** table复杂度太高，我个人不太会用到，这里不再解析 */
  /** inline代码。这里需要考虑是否需要highlight */
  codespan (token: Tokens.Codespan) {
    return this.generateVNode(
      'code',
      {
        innerHTML: token.text
      }
    )
  }

  /** 链接 */
  link (token: Tokens.Link) {
    return this.generateVNode(
      'a',
      {
        href: token.href,
        target: '_blank'
      },
      this.main(token.tokens)
    )
  }

  /** 内联文本 */
  text ({ text, tokens, raw }: Tokens.Text) {
    return tokens === undefined
      ? this.generateVNode('span', undefined, text)
      : this.paragraph({
        type: 'paragraph',
        raw: raw,
        text,
        tokens
      })
  }

  /** 导航 */
  navigation (catalog: typeof this.catalog) {
    const GenText = (title: string) => h(
      ElText,
      {
        truncated: true, onClick: () => {
          location.hash = `#${title}`
          document.getElementById(title)?.scrollIntoView()
        }
      },
      () => title
    )
    const GenSub = (list: SectionNavType[]) => {
      return list.map(
        ({ title, children }) => children.length > 0
          ? h(ElSubMenu, { index: title }, { default: () => GenSub(children), title: () => GenText(title) })
          : h(ElMenuItem, { index: title }, () => GenText(title))
      )
    }

    return h(
      ElMenu,
      {
        style: 'position: fixed; width: 12%; top: 5%; right: 5%'
      },
      () => GenSub(catalog.splice(0))
    )
  }

  /** 图片模式时左侧指向组件 */
  pointerWhenImageMode (index: number) {
    return h(
      'div',
      {
        class: `${this.concatPrefix('pointer')}`,
        onClick: () => this.CarouselImageModeRef.value?.jump(index)
      },
      [
        h('span', { 'icon-carbon:direction-loop-left': '' }),
        h('span', 'On the left!'),
        h('span', { 'icon-carbon:group-resource': '' })
      ]
    )
  }
}