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
        const { token } = app.store.get('UseUserStore')
        if (token) request.headers.Authorization = token
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
      ({ response }) => {
        // console.error('请求错误！', error)
        let content = ''
        if (response.status === 520) content = '您未登录，点击我进行三方登录'
        else if (response.status === 521) content = '登录过期，点击我重新登录'
        else if (response.status === 522) content = '三方登录失败，点击我重新登录'
        const message = app.$message({
          duration: 0,
          message: h('div', { onClick: () => {
            app.user.loginByGithub()
            message.close()
          }, class: 'g-pointer' }, content)
        })
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
