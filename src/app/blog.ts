import dayjs from 'dayjs'
import { clone, isArray, isObject, isString } from 'lodash'

class BlogModel {
  catalogs: Array<CatalogType> = []
  dateCatalogs: Array<DateCatalogType> = []
  filterTagMap: Map<string, typeof this.catalogs> = new Map()

  async init () {
    const data = await app.serviceModel.getBlogCatalogs()
    const mid = new Map<string, number>()
    data.forEach(catalog => {
      // 国际化的时候注意时间格式
      const date = dayjs(catalog.date)
      const yearMonth = date.format('YYYY-MM')
      const year = date.format('YYYY')
      const countYM = (mid.get(yearMonth) || 0) + 1
      const countY = (mid.get(year) || 0) + 1
      mid.set(yearMonth, countYM)
      mid.set(year, countY)
      this.catalogs.push(catalog)
    })
    Array
      .from(mid.keys())
      .sort((a, b) => b.localeCompare(a))
      .forEach(date => {
        const parsed = dayjs(date)
        this.dateCatalogs.push({
          year: parsed.format('YYYY'),
          month: date.length === 4 ? '' : parsed.format('MM'),
          count: mid.get(date) || 0
        })
      })
  }

  highlight (content: string) {
    return `<span style='color: red'>${content}</span>`
  }

  /**
   * - 过滤内容并替换内容
   *   - 顺序匹配
   */
  async filter (content: any, keyArr: Array<string>): Promise<any> {
    if (isString(content)) {
      let i = 0
      for (const char of content) if (char === keyArr[i]) ++i
      const reg = new RegExp(keyArr.join('|'), 'g')
      if (i === keyArr.length) return content.replaceAll(reg, (sub) => this.highlight(sub))
    } else if (isArray(content)) {
      return Promise
        .all(content.map(value => this.filter(value, keyArr)))
        .then(res => res.filter(Boolean))
    } else if (isObject(content)) {
      const mid: Record<string, any> = clone(content)
      const keys = Object.keys(mid)
      return Promise
        .all(keys.map(key => this.filter(mid[key], keyArr)))
        .then(res => {
          for (let i = 0; i < res.length; ++i) {
            const key = keys[i]
            mid[key] = res[i]
          }
          return mid
        })
    } else return undefined
  }
}

export const blog = new BlogModel()
