import dayjs from 'dayjs'
import showdown from 'showdown'

/**
 * 博客节点
 */
export class Blog {
  articleMap = new Map<ArticleType['id'], ArticleType>()
  tagMap = new Map<TagType['id'], TagType>()
  converter = new showdown.Converter()

  init () {
    app
      .service
      .mainService
      .getBlogArticles()
      .then(data => {
        data
          .sort((a, b) => -(dayjs(a.date) > dayjs(b.date)))
          .forEach(catalog => this.articleMap.set(catalog.id, catalog))
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
      .tags
      .forEach(tagId => {
        const tag = this.tagMap.get(tagId)
        tag && result.push(tag)
    })
    return result
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
