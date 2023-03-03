import axios, { AxiosInstance, AxiosError, AxiosRequestConfig, AxiosResponse, CancelTokenStatic } from 'axios'
import { baseURL, contentType, requestTimeout } from './net.config'

interface response {
  code: number | string
  msg: string
  data: any
}

class Request {
  protected service: AxiosInstance
  protected pending: {url: string, cancel: Function}[] = []
  protected cancelToken: CancelTokenStatic = axios.CancelToken
  protected axiosRequestConfig: AxiosRequestConfig = {}
  public static _instance: any

  constructor () {
    this.initConfig()
    this.service = axios.create(this.axiosRequestConfig)
  }

  // 初始化配置
  protected initConfig (): void {
    this.axiosRequestConfig = {
      baseURL,
      headers: {
        timestamp: String(new Date().getTime()),
        'Content-Type': contentType
      },
      // transformRequest
      transformResponse: [
        (data: AxiosResponse) => { return data }
      ],
      paramsSerializer (params) {
        return JSON.stringify(params)
      },
      timeout: requestTimeout,
      withCredentials: false,
      responseType: 'json',
      xsrfCookieName: 'XSRF-TOKEN',
      xsrfHeaderName: 'X-XSRF-TOKEN',
      // 定义了在node.js中遵循的最大重定向数
      maxRedirects: 5,
      maxContentLength: 2000,
      validateStatus (status) {
        return status >= 200 && status <= 500
      }
    }
  }

  // 请求拦截
  protected interceptorsRequest () {
    this.service.interceptors.request.use(
      (config: AxiosRequestConfig) => {

      }
    )
  }

  /**
   * 响应拦截
   */
  protected interceptorsResponse () {

  }

  // 取消重复请求
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

  // 获取请求的key
  protected getKeyOfRequest (config: AxiosRequestConfig): string {
    let key = config.url || '<NULL>'
    if (config.params) key += JSON.stringify(config.params)
    if (config.data) key += JSON.stringify(config.data)
    key += `&request_type=${config.method}`
    return key
  }

  // 请求日志
  protected log (response: AxiosResponse) {
    if (import.meta.env.MODE === 'development') {
      const randomColor = `rgba(${Math.round(Math.random() * 255)},${Math.round(
        Math.random() * 255
      )},${Math.round(Math.random() * 255)})`
      console.log(
        '%c┍------------------------------------------------------------------┑',
        `color:${randomColor};`
      )
      console.log('| 请求地址：', response.config.url)
      console.log('| 请求参数：', JSON.parse(response.config.data))
      console.log('| 返回数据：', response.data)
      console.log(
        '%c┕------------------------------------------------------------------┙',
        `color:${randomColor};`
      )
    }
  }

  public post (url: string, data: any = '', config: object = {}): Promise<response> {
    return new Promise((resolve, reject) => {
      this.service.post(url, data, config)
        .then(result => {
          resolve({
            code: result.data.code,
            msg: result.data.msg,
            data: result.data.data
          })
        }, reject)
    })
  }

  public get (url: string, parmas: any = '', config: object = {}): Promise<response> {
    return new Promise((resolve, reject) => {
      this.service.get(`${url}?${JSON.stringify(parmas)}`, config)
        .then(result => {
          resolve({
            code: result.data.code,
            msg: result.data.msg,
            data: result.data.data
          })
        }, reject)
    })
  }

  // 创建单一实例
  public static getInstance (): Request {
    this._instance || (this._instance = new Request())
    return this._instance as Request
  }
}

export default Request.getInstance()
