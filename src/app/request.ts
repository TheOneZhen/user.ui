import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { requestConfig } from './net.config'
import { getCurrentTask } from '@/utils/record'
export class Request {
  protected _request: AxiosInstance

  constructor () {
    this._request = axios.create(requestConfig)
    this.interceptorsRequest()
    this.interceptorsResponse()
  }

  /** 请求拦截 */
  protected interceptorsRequest () {
    this._request.interceptors.request.use(
      (request) => {
        const { token } = app.store.get('UseUserStore')
        if (token) request.headers.Authorization = token
        return request
      }
    )
  }

  /** 响应拦截 */
  protected interceptorsResponse () {
    this._request.interceptors.response.use(
      (response) => JSON.parse(response.data),
      ({ response }) => {
        if (!response) return Promise.reject(500)
        let content = ''
        if (response.status === 530) content = '您未登录，点击进行三方登录'
        else if (response.status === 521) content = '登录过期，点击重新登录'
        else if (response.status === 522) content = '三方登录失败，点击重新登录'
        if (content !== '') {
          const message = app.$message({
            duration: 0,
            message: h('div', { onClick: () => {
              app.user.loginByGithub()
              message.close()
            }, class: 'g-pointer' }, content)
          })
        }
        return Promise.reject(response.status)
      }
    )
  }

  /** 为任务队列添加control */
  private addControl (config: AxiosRequestConfig) {
    const task = getCurrentTask()
    if (task !== null) {
      const control = new AbortController()
      config.signal = control.signal
      task.controls.push(control)
    }
  }

  public post<T = any, D = {}> (url: string, data: D, config: AxiosRequestConfig<D> = {}) {
    this.addControl(config)
    return this._request.post<T, T>(url, JSON.stringify(data), config)
  }

  public get<T = any, D extends {} = {}> (url: string, param: D, config: AxiosRequestConfig<D> = {}) {
    this.addControl(config)
    const pin = Object
      .entries(param)
      .map(([k, v]) => `${k}=${v}`)
      .join('&')
    if (pin) url += '?' + pin
    return this._request.get<T, T, D>(url, config)
  }
}
