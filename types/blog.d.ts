/**
 * blog page catalog type
 */
declare type ArticleType = {
  id: number
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
  tags: Array<TagType['id']>
  /**
   * article description
   */
  description: string
}
/**
 * 标签类型
 */
declare type TagType = {
  id: number
  title: string
  description: string
  images: string[]
  articles: Array<ArticleType['id']>
}