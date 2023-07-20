import type { CreateAxiosDefaults } from 'axios'

export const requestConfig: CreateAxiosDefaults = {
  baseURL: '/dynamic',
  headers: {
    Timestamp: Date.now(),
    'Content-Type': 'application/json;charset=UTF-8',
    Authorization: ''
  },
  transformRequest: [],
  transformResponse: [],
  paramsSerializer: (param) => JSON.stringify(param),
  timeout: 1000 * 60,
  withCredentials: false,
  responseType: 'json',
  xsrfCookieName: 'CSRF-TOKEN',
  xsrfHeaderName: 'X-CSRF-TOKEN',
  maxRedirects: 5,
  maxContentLength: 2000,
  validateStatus: (status) => status < 400 // 个人定义的错误在[600, 700)
}