/** 评论（包括弹幕）样式 */
declare type CommentStyle = {
  fontSize: string
  fontFamily: string
  fontColor: string
  fontWeight: string
  lineHeight: string
  opacity: number
  background: string
  border: string
}
/** 评论 */
declare type ZComment = {
  id: string
  userId: string
  quote: string
  content: string
  likes: number
  dislikes: number
  createTime: srting
  updateTime: string
  blogId: string
}
/** 弹幕组件props */
declare interface BulletComment {
  commentStyle: CommentStyle
  direction: string
  skin: string
  /** the time it takes to reach the destination(s) */
  flowVelocity: number
  bulletComment: ZComment
}
