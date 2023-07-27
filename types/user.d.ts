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