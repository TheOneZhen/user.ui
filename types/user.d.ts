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
 * 综合用户数据结构
 */

declare type AllUserData = {
  userData: UserData
  likeComments: CommentType['id'][]
  dislikeComments: CommentType['id'][]
  likeArticles: ArticleType['id'][]
  dislikeArticles: ArticleType['id'][]
}