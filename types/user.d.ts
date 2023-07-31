declare type UserData = {
  name: string
  icon: string
  platform: 'GitHub'
  home: string
  token: string
}

/**
 * 评论结构
 */
 declare type CommentType  = {
  id: number
  content: string
  quote: CommentType['id'] | null
  article: ArticleType['id'] | null
  user: UserData
  createTime: string
  likes: number
  dislikes: number
}

/**
 * 用户浏览数据
 */
declare type UserViewRecord = {
  LA: ArticleType['id'][]
  DLA: ArticleType['id'][]
  LC: CommentType['id'][]
  DLC: CommentType['id'][]
}