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
}
/**
 * 博客主服务
 */
export const mainService = new MainService()
