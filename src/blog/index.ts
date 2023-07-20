import { RouterName } from '@/router/router.config'
import dayjs from 'dayjs'
import showdown from 'showdown'
import { BLOGAPI } from './blog.api'
/**
 * 博客节点
 */
export class Blog {
  articleMap = new Map<ArticleType['id'], ArticleType>()
  tagMap = new Map<TagType['id'], TagType>()
  converter = new showdown.Converter()
  catalog = new Array<CatalogItemType>()

  init () {
    this.getCatalog()
    this.getBlogTags()
  }

  getCatalog () {
    app
      .request
      .post<Array<CatalogItemType>>(BLOGAPI.GET_CATALOG, {})
      .then(data => this.catalog.splice(
        0,
        this.catalog.length,
        ...data.sort((a, b) => -(dayjs(a.update_time) > dayjs(b.update_time)))
      ))
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

  /**
   * 获取指定文章引用指定评论的评论
   * @param blogId 如果为空，视为顶部评论
   * @param quoteId 如果为空，视为全局评论（弹幕，留言板评论）
   */
  getComment (blogId: ZComment['blogId'], quoteId: ZComment['quoteId']) {
    app.request.post<Array<ZComment>>(BLOGAPI.GET_COMMENT, { blogId, quoteId })
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

  highlight (content: string) {
    return `<span style='color: red'>${content}</span>`
  }

  /**
   * markown转html，放到中心组件中是为了统一处理markdown
   */
  converterMdToHTML (text: string) {
    return this.converter.makeHtml(text)
  }
}
