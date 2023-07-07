import request from './request'
import { API } from './api'

export class MainService {

  checkCsrfToken () {
    request.post<Boolean>(API.CHECK_CSRF_TOKEN, {})
  }

  async getBlolgArticle (index: number) {
    return request.post<ArticleType>(API.GET_BLOG_ARTICLE, { index })
  }

  async getBlogCatalog () {
    const result = await request.post<Array<CatalogItemType>>(API.GET_BLOG_CATALOG, {})
    return result
  }

  async getBlogTags () {
    const result = await request.get<Array<TagType>>(API.GET_BLOG_TAGS, {})
    return result
  }
  /**
   * 获取指定文章引用指定评论的评论
   * @param blogId 如果为空，视为顶部评论
   * @param quoteId 如果为空，视为全局评论（弹幕，留言板评论）
   */
  async getBlogComment (blogId: ZComment['blogId'], quoteId: ZComment['quoteId']) {
    const result = await request.post<Array<ZComment>>(API.GET_BLOG_COMMENT, { blogId, quoteId })
    return result
  }
}