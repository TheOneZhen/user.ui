import { Tokens, Token, marked } from 'marked'
import { VNode, h } from 'vue'
import { ZPreviewCarouselImage, ZPreviewCarouselVideo, PackageAsyncComponentToVNode } from './preview'
import { uniqueId } from 'lodash-es'
/**
 * # markdown marked解析模块
 * ## 背景
 * 之前使用marked直接将markdown解析为HTML文本再渲染，无法实现组件的复用，不利于theme模块以及后续其他模块构建。
 * ## 解决方案
 * 使用`marked.lexer`生成markdown AST，通过状态机转换
 * ## 结构设计
 * 1. 状态机设计：所有状态机返回`VNode`，main返回`VNode[]`
 * 2. 解析外功能设计：
 *    1. catalog：通过中间结构记录heading实现，最后在parse中输出
 *    2. 阅读模式：parse最后输出一个组件，组件中包含状态转换
 * 3. 异步解析设计：所有状态机和parse都是同步的，异步内容需要`defineAsyncComponent`包裹。
 * 4. 样式设计：组件外层使用自定义DOM包裹（外层样式），内层样式不允许使用全局，最后的样式统一在`markdown.scss`中进行管理
 */
export class CustomMarked {

  catalog: Array<SectionNavType> = []
  prefix = 'z-markdown'

  parse (markdown: string, isGenerateCatalog = false) {
    const tokens = marked.lexer(markdown)
    /** 还有是否生成目录 */
    return h(
      'div',
      { class: `markdown-body ${this.prefix}` },
      this.main(tokens).filter(Boolean)
    )
  }

  private main (tokens: Token[]) {
    const children = Array<VNode>()
    for (let i = 0; i < tokens.length; ++i) {
      let token = tokens[i]
      /** 如果是联播内容，需要向下检索 */
      const carousesItems: Tokens.Code[] = []
      while (token.type === 'code' && /\[\]/.test(token.lang)) {
        /** 移除标识性字符，转为code类型 */
        if (token.lang) token.lang = token.lang.replaceAll(/\[\]\s/g, '')
        carousesItems.push(token as Tokens.Code)
        i++
        token = tokens[i]
      }
      const type = token.type as keyof this
      /** 如果是联播内容 */
      if (carousesItems.length > 0) (children.push(this.carouse(carousesItems)), --i)
      /** 如果存在对应状态机 */
      else if (this[type] !== undefined) children.push((this[type] as any).call(this, token))
      else {
        /** 没有children，直接渲染 */
        if (['hr', 'br'].includes(token.type)) children.push(this.generateVNode(token.type))
        /** 存在children，使用main渲染 */
        else if ([
          'blockquote',
          'strong',
          'em',
          'del'
        ].includes(token.type))
          children.push(this.generateVNode(token.type, undefined, this.main((token as Token & { tokens: [] }).tokens)))
        /** 内容检索 */
        else console.log('method is not exist!', token)
      }
    }
    return children
  }
  /** 解析生成联播组件 */
  carouse (tokens: Tokens.Code[]) {
    // 和src\components\findme\ZPreviewCarousel.vue组件联合
    return h(
      'div',
      {
        class: this.concatPrefix('carouse')
      },
      tokens.map(this.code)
    )
  }
  /** 解析生成代码组件 */
  code ({ lang, text, type }: Tokens.Code) {
    const language = window.hljs.getLanguage(lang) ? lang : 'plaintext'
    if (lang === 'image ') return ZPreviewCarouselImage({ src: text })
    if (lang === 'video') return ZPreviewCarouselVideo({ src: text })
    if (lang === 'mermaid') return PackageAsyncComponentToVNode(
      () => window.mermaid
        .render(uniqueId('z-mermaid-'), text)
        .then(svg => h('div', { innerHTML: svg }))
    )
    return h(
      'div',
      {
        class: this.concatPrefix(type),
        style: 'position: relative;'
      },
      [
        PackageAsyncComponentToVNode(
          () => Promise
            .resolve(window.hljs.highlight(text, { language }))
            .then(res => h('pre', h('code', { innerHTML: res.value })))
        ),
        /** 这里不应该写内联样式或引用全局样式 */
        h(
          'span',
          {
            class: 'g-position-absolute g-top-10px g-right-10px g-pointer',
            style: 'top: 10px; right: 10px',
            'icon-carbon:copy': '',
            onClick () {
              navigator.clipboard.writeText(text)
            }
          }
        )
      ]
    )
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
    props: Record<string, any> = { class: this.concatPrefix(tagName) },
    children: string | VNode[] = ''
  ) {
    return h(tagName, props, children)
  }
  /** 拼接前缀 */
  private concatPrefix (text: string) {
    return `${this.prefix} ${text}`
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
    while (level !== 1) {
      middle = middle[middle.length - 1].children
      level--
    }
    middle.push({ title: text, children: [] })
    return this.generateVNode(
      `h${depth}`,
      { class: this.concatPrefix('heading') },
      [
        this.generateVNode('a', { class: this.concatPrefix('a'), href: `#${text}`, target: '_blank' }, '#'),
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
        class: `${this.concatPrefix('list')} ${this.concatPrefix(tag)}`,
        start: token.start // 开始的序号
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
        class: this.concatPrefix('p'),
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
        class: this.concatPrefix('code'),
        innerHTML: token.text
      }
    )
  }
  /** 链接 */
  link (token: Tokens.Link) {
    return this.generateVNode(
      'a',
      {
        class: this.concatPrefix('a'),
        href: token.href,
        target: '_blank'
      },
      this.main(token.tokens)
    )
  }
  /** 内联文本 */
  text ({ text, raw, tokens }: Tokens.Text) {
    return tokens === undefined
      ? this.generateVNode('span', undefined, text)
      : this.paragraph({
        type: 'paragraph',
        raw: raw,
        text,
        tokens
      })
  }
}