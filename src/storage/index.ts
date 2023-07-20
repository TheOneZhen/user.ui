/**
 * 本地存储，暂定只能保存基本数据类型
 */
export class LSStorage {
  private localStorage: Storage = window.localStorage
  private sessionStorage: Storage = window.sessionStorage

  setLocal (key: 'token', value: string): void
  setLocal (key: 'blogListDisplay', value: boolean): void
  setLocal (key: 'colorScheme', value: number): void
  setLocal (key: string, value: string | boolean | number) {
    this.localStorage.setItem(key, JSON.stringify(value))
  }

  getLocal (key: 'token', _default: string): string
  getLocal (key: 'blogListDisplay', _default: string): boolean
  getLocal (key: 'colorScheme', _default: string): number
  getLocal (key: string, _default: string) {
    return JSON.parse(this.localStorage.getItem(key) || JSON.stringify(_default))
  }

  setSession (key: string, value: string) {
    this.localStorage.setItem(key, value)
  }

  getSession (key: string, _default = '') {
    return this.sessionStorage.getItem(key) || _default
  }
}