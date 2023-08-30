import { RouterName } from '@/router/router.config'
import dayjs from 'dayjs'
import { BLOGAPI } from './blog.api'
import mermaid from 'mermaid'
import { uniqueId } from 'lodash'
import hljs from 'highlight.js'
import javaScript from 'highlight.js/lib/languages/javascript'
import scss from 'highlight.js/lib/languages/scss'
import typeScript from 'highlight.js/lib/languages/typeScript'
import { Marked } from 'marked'
import { markedHighlight } from 'marked-highlight'

/**
 * 博客节点
 */
export class Blog {
  articleMap = new Map<ArticleType['id'], ArticleType>()
  tagMap = new Map<TagType['id'], TagType>()
  catalog = reactive(new Array<CatalogItemType>())
  marked: Marked

  constructor () {
    mermaid.initialize({ startOnLoad: false })
    hljs.registerLanguage('js', javaScript)
    hljs.registerLanguage('ts', typeScript)
    hljs.registerLanguage('scss', scss)

    this.marked = new Marked(
      markedHighlight({
        async: true,
        langPrefix: 'hljs language-',
        highlight (code, lang) {
          // 如果是mermaid，单独渲染
          if (/mermaid/.test(lang)) {
            return mermaid.render(uniqueId('z-mermaid-'), code).then(({ svg }) => svg)
          }
          const language = hljs.getLanguage(lang) ? lang : 'plaintext'
          return new Promise(resolve => resolve(hljs.highlight(code, { language }).value)).then(res => res as string)
        }
      })
    )
  }

  init () {
    this.getCatalog()
    this.getBlogTags()
  }

  getCatalog () {
    app
      .request
      .post<Array<CatalogItemType>>(BLOGAPI.GET_CATALOG, {})
      .then(data => {
        this.catalog.splice(
          0,
          this.catalog.length,
          ...data.sort((a, b) => -(dayjs(a.createTime) > dayjs(b.createTime)))
        )
      })
  }

  getBlogTags () {
    app
      .request.get<Array<TagType>>(BLOGAPI.GET_TAGS, {})
      .then(data => data.forEach(tag => this.tagMap.set(tag.id, tag)))
  }

  getArticleTags (id: ArticleType['id']) {
    const article = this.articleMap.get(id)
    const result: Array<TagType> = []
    if (!article) return result
    article
      .tagIds
      .forEach(tagId => {
        const tag = this.tagMap.get(tagId)
        tag && result.push(tag)
      })
    return result
  }

  async getArticle (index: ArticleType['id']) {
    let article = this.articleMap.get(index)
    if (!article) {
      article = await app.request.post<ArticleType>(BLOGAPI.GET_ARTICLE, { index })
      this.articleMap.set(article.id, article)
    }
    return article
  }

  toArticle (index: ArticleType['id']) {
    app.router?.push({ name: RouterName.ARTICLE, params: { index } })
  }

  /**
   * markown转html
   */
  async converterMdToHTML (text: string) {
    const html = await this.marked.parse(text) || ''
    return html
  }

  formatDate (date: string) {
    return dayjs(date).format('YYYY年MM月DD日')
  }
}
