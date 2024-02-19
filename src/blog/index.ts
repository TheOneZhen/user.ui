import { RouterName } from '@/router/router.config'
import dayjs from 'dayjs'
import { BLOGAPI } from './blog.api'
import { record } from '@/utils/record'

/**
 * 博客节点
 */
export class Blog {
  articleMap = new Map<ArticleType['id'], ArticleType>()
  tagMap = new Map<TagType['id'], TagType>()
  catalog = reactive(new Array<CatalogItemType>())

  constructor () { }

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
    // await new Promise((res) => setTimeout(() => res(1), 10000))
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

  formatDate (date: string) {
    return dayjs(date).format('YYYY年MM月DD日')
  }

}
