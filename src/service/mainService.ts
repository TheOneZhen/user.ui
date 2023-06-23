import request from './request'
import { API } from '../api/api'

export class MainService {
  async test () {
    const result = await request.post(API.TEST)
    return result.data
  }

  async getBlogArticles () {
    const result = await request.post(API.GET_BLOG_ARTICLES)
    return result.data as Array<ArticleType>
  }

  async getBlogTags () {
    const result = await request.post(API.GET_BLOG_TAGS)
    return result.data as Array<TagType>
  }
  /**
   * 获取指定文章引用指定评论的评论
   * @param blogId 如果为空，视为顶部评论
   * @param quoteId 如果为空，视为全局评论（弹幕，留言板评论）
   */
  async getBlogComment (blogId: ZComment['blogId'], quoteId: ZComment['quoteId']) {
    const result = await request.post(API.GET_BLOG_COMMENT, { blogId, quoteId })
    return result.data as Array<ZComment>
  }
}