/**
 * 目录项类型
 */
declare type CatalogItemType = {
  id: number
  update_time: string
  title: string
  tagIds: Array<TagType['id']>
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
}
/**
 * 文章类型
 */
declare type ArticleType = {
  id: number
  create_time: string
  update_time: string
  title: string
  tagIds: TagType.id[]
  content: string
  description: string
  likes: number
  dislikes: number
  views: number
  isShow: boolean
}