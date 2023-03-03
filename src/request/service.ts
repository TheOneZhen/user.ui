import request from './request'
import { API } from '../api/api'

class Service {
  async test () {
    const res = await request.post(API.TEST)
    return res.data
  }

  async getBlogCatalogs () {
    const res = await request.post(API.GET_BLOG_CATALOGS)
    return res.data as Array<CatalogType>
  }
}

export const service = new Service()
