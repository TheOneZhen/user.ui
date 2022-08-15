import http from './http'
import { API } from '../api/api'

class Service {
  async test () {
    const res = await http.post(API.TEST, {})
    return res.data
  }
}

export const service = new Service()
