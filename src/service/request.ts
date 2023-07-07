import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, CancelTokenStatic } from 'axios'
import { requestConfig } from './net.config'
class Request {
  protected _request: AxiosInstance
  protected pending: {url: string, cancel: Function}[] = []
  protected cancelToken: CancelTokenStatic = axios.CancelToken

  constructor () {
    this._request = axios.create(requestConfig)
    this.interceptorsResponse()
  }

  /**
   * 请求拦截
   */
  protected interceptorsRequest () {
    this._request.interceptors.request.use(
      // (request) => {
      //   const { xsrfCookieName, xsrfHeaderName } = request
      //   if (!xsrfCookieName || !xsrfHeaderName) throw STATE.DATA_NOT_EXIST
      //   const xsrf_token = cookie.get(xsrfCookieName)
      //   request.headers[xsrfHeaderName] = xsrf_token
      //   return request
      // }
    )
  }
  /**
   * 响应拦截
   */
  protected interceptorsResponse () {
    this._request.interceptors.response.use(
      (response) => JSON.parse(response.data),
      (error) => {
        console.error('请求错误！', error)
        throw error
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

  public get<T = any, D = {}> (url: string, param: D, config: AxiosRequestConfig<D> = {}) {
    let pin = Object
      .entries(param)
      .map(([k, v]) => `${k}=${v}`)
      .join('&')
    if (pin) pin = '?' + pin
    return this._request.get<T, T, D>(`${url}${pin}`, config)
  }
}

export default new Request()
