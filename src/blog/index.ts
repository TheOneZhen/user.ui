import { RouterName } from '@/router/router.config'
import dayjs from 'dayjs'
import { BLOGAPI } from './blog.api'
import { uniqueId } from 'lodash-es'
import { Marked } from 'marked'
import { markedHighlight } from 'marked-highlight'
import { record } from '@/utils/record'
/**
 * 博客节点
 */
export class Blog {
  articleMap = new Map<ArticleType['id'], ArticleType>()
  tagMap = new Map<TagType['id'], TagType>()
  catalog = reactive(new Array<CatalogItemType>())
  marked: Marked

  constructor () {
    this.marked = new Marked(
      markedHighlight({
        async: true,
        langPrefix: 'hljs language-',
        highlight (code, lang) {
          // 如果是mermaid，单独渲染
          if (/mermaid/.test(lang) && window.mermaid) {
            return window.mermaid.render(uniqueId('z-mermaid-'), code).then(({ svg }) => svg)
          }
          if (window.hljs) {
            const language = window.hljs.getLanguage(lang) ? lang : 'plaintext'
            return new Promise(resolve => resolve(window.hljs.highlight(code, { language }).value)).then(res => res as string)
          }
          return Promise.reject(new Error('代码格式化失败！'))
        }
      })
    )
  }

  init () {
    this.getCatalog()
    this.getBlogTags()
  }

  @record('正在加载博客目录！')
  getCatalog () {
    return app
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

  @record('正在获取标签内容！')
  getBlogTags () {
    return app
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

  @record('正在加载文章！', '', '文章加载失败，请尝试刷新页面！')
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

  /** markown转html */
  async converterMdToHTML (text: string): Promise<string> {
    if (!window.hljs) {
      return new Promise(
        resolve => setTimeout(() => resolve(this.converterMdToHTML(text)), 100)
        )
    }
    const html = await this.marked.parse(text) || ''
    return html
  }

  formatDate (date: string) {
    return dayjs(date).format('YYYY年MM月DD日')
  }

  /** 检查CDN资源，这些资源目前都是挂在到window上的 */
  @record('加载外部资源中！', '外部资源加载成功！', '外部资源加载失败，请尝试刷新页面或检查网络问题。')
  checkCDNResource () {
    const generate = (name: string) => {
      return new Promise((resolve) => {
        while (!window[name]);
        resolve(true)
      })
    }
    return Promise.all([
      generate('mermaid'),
      generate('hljs')
    ])
  }
}
