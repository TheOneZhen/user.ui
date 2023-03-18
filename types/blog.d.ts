/**
 * blog page catalog type
 */
declare type CatalogType = {
  /**
   * article date
   */
  date: string
  /**
   * article title
   */
  title: string
  /**
   * article tags
   */
  tags: Array<string>
  /**
   * article description
   */
  description: string
}
/**
 * count article catalog pre months
 */
declare type DateCatalogType = {
  /**
   * year
   */
  year: DayjsObject['years']
  /**
   * month
   */
  month: DayjsObject['months']
  /**
   * sum of article pre months
   */
  count: number
}
