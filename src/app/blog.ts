import { RouterName } from '@/router/router.config'
import dayjs from 'dayjs'
import showdown from 'showdown'

/**
 * 博客节点
 */
export class Blog {
  articleMap = new Map<ArticleType['id'], ArticleType>()
  tagMap = new Map<TagType['id'], TagType>()
  converter = new showdown.Converter()
  catalog = new Array<CatalogItemType>()

  init () {
    app
      .service
      .mainService
      .getBlogCatalog()
      .then(data => {
        this.catalog.splice(
          0,
          this.catalog.length,
          ...data
            .sort((a, b) => -(dayjs(a.update_time) > dayjs(b.update_time)))
        )
      })
    app
      .service
      .mainService
      .getBlogTags()
      .then(data => {
        data.forEach(tag => this.tagMap.set(tag.id, tag))
      })
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
      article = await app.service.mainService.getBlolgArticle(index)
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
