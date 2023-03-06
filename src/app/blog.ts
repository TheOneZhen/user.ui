import dayjs from 'dayjs'

class BlogModel {
  catalogs: Array<CatalogType> = []
  tagMap: Map<string, typeof this.catalogs> = new Map()
  dateCatalogs: Array<DateCatalogType> = []

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
      catalog.tags.forEach(tag => {
        const sameTagCat: typeof this.catalogs = this.tagMap.get(tag) || []
        sameTagCat.push(catalog)
        this.tagMap.set(tag, sameTagCat)
      })
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
}

export const blog = new BlogModel()
