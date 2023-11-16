declare type StationDataType = {
  id: number
  title: string
  /** 演示内容，可能是图片也可能是动图 */
  preview: {
    type: 'code' | 'image' | 'video'
    content: string
  }[]
  /** 文案 */
  description: string
  /** 下面这三个类型在comment、article中都有出现，之后可以考虑复用 */
  views: number
  likes: number
  dislikes: number
  /** 后续可能还要添加评论等内容 */
}