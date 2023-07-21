import axios, { AxiosInstance, AxiosRequestConfig, CancelTokenStatic } from 'axios'
import { requestConfig } from './net.config'

export class Request {
  protected _request: AxiosInstance
  protected pending: {url: string, cancel: Function}[] = []
  protected cancelToken: CancelTokenStatic = axios.CancelToken

  constructor () {
    this._request = axios.create(requestConfig)
    this.interceptorsRequest()
    this.interceptorsResponse()
  }

  /**
   * 请求拦截
   */
  protected interceptorsRequest () {
    this._request.interceptors.request.use(
      (request) => {
        const user = app.store.get('UseUserStore')
        if (user.token) request.headers.Authorization = user.token
        return request
      }
    )
  }
  /**
   * 响应拦截
   */
  protected interceptorsResponse () {
    this._request.interceptors.response.use(
      (response) => JSON.parse(response.data),
      (error) => {
        // console.error('请求错误！', error)
      }
    )
  }
  /**
   * 取消重复请求
   */
  protected removePending (key: string, cancel: boolean = false): void {
    this.pending.some((item, index) => {
      if (item.url === key && cancel) {
        console.log('请求取消', key)
        item.cancel()
        this.pending.splice(index, 1)
        return true
      }
      return false
    })
  }

  public post<T = any, D = {}> (url: string, data: D, config: AxiosRequestConfig<D> = {}) {
    return this._request.post<T, T>(url, JSON.stringify(data), config)
  }

  public get<T = any, D extends {} = {}> (url: string, param: D, config: AxiosRequestConfig<D> = {}) {
    const pin = Object
      .entries(param)
      .map(([k, v]) => `${k}=${v}`)
      .join('&')
    if (pin) url += '?' + pin
    return this._request.get<T, T, D>(url, config)
  }
}
