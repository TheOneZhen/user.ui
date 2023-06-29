type NetConfigSuccessCode = 200 | '200' | '000000'

export const baseURL: string = import.meta.env.DEV
  ? '/dev'
  : import.meta.env.BASE_URL
// 配后端数据的接收方式application/json;charset=UTF-8 或 application/x-www-form-urlencoded;charset=UTF-8
export const contentType: string = 'application/json;charset=UTF-8'
// 最长请求时间
export const requestTimeout: number = 10000
// 超时尝试次数
export const timeoutNum: number = 3
// 超时重新请求间隔
export const intervalTime: number = 1000
// 操作正常code，支持String、Array、int多种类型
export const successCode: NetConfigSuccessCode[] = [200, '200', '000000']
// 数据状态的字段名称
export const statusName: string = 'code'
// 状态信息的字段名称
export const messageName: string = 'message'
