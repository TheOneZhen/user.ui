import request from './request'
import { API } from '../api/api'

class MainService {
  async test () {
    const res = await request.post(API.TEST)
    return res.data
  }

  async getBlogCatalogs () {
    const res = await request.post(API.GET_BLOG_CATALOGS)
    return res.data as Array<CatalogType>
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
/**
 * 博客主服务
 */
export const mainService = new MainService()
