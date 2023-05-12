import dayjs from 'dayjs'
import { clone, isArray, isObject, isString } from 'lodash'
import showdown from 'showdown'
/**
 * 博客节点
 */
export class Blog {
  catalogs: Array<CatalogType> = []
  dateCatalogs: Array<DateCatalogType> = []
  filterTagMap: Map<string, typeof this.catalogs> = new Map()
  filterCatalogs: typeof this.catalogs = []
  converter = new showdown.Converter()

  async init () {
    const data = await app.service.mainService.getBlogCatalogs()
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
  async filter<T> (data: T, keyArr: Array<string>): Promise<{data: T, matched: boolean}> {
    if (isString(data)) {
      const exist = data.match(keyArr.join('.*'))
      if (!exist) return { data, matched: false }
      return {
        data: data.replaceAll(RegExp(keyArr.join('|'), 'g'), (sub) => this.highlight(sub)) as T,
        matched: true
      }
    }
    if (isArray(data)) {
      return Promise
        .all(data.map(item => this.filter(item, keyArr)))
        .then(res => {
          const mid = res.filter(item => item.matched).map(item => item.data)
          return {
            data: mid as T,
            matched: mid.length > 0
          }
        })
    }
    if (isObject(data)) {
      const mid = clone(data) as Record<string, T>
      let matched = false
      for (const key of Object.keys(mid)) {
        const res = await this.filter(mid[key], keyArr)
        mid[key] = res.data
        matched = res.matched || matched
      }
      return {
        data: mid as T,
        matched
      }
    }
    return { data, matched: false }
  }
  /**
   * markown转html，放到中心组件中是为了统一处理markdown
   */
  converterMdToHTML(text: string) {
    return this.converter.makeHtml(text)
  }
}
