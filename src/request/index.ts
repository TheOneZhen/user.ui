import axios, { AxiosInstance, AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'

const config: AxiosRequestConfig = {
  baseURL: 'localhost',
  timeout: 2000,
  withCredentials: true
}

class Request {
  service: AxiosInstance
  constructor (config: AxiosRequestConfig) {
    this.service = axios.create(config)
  }
}

export default new Request(config)
