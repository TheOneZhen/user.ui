import Mock from 'mockjs'
/**
 * mockjs原理
 * - 通过重写XMLHttpRequest对象的open和send方法实现请求拦截
 */
export class FakerService {
  init () {
    Mock.mock(/\/blog\/articles/, function () {
      return Mock.mock({
        code: 200,
        message: 'success',
        'data|10': [() => {
          return Mock.mock({
            id: Mock.Random.increment(1),
            date: Mock.Random.date('yyyy-MM-dd HH:mm:ss'),
            title: Mock.Random.ctitle(),
            'tags|10': [() => Mock.Random.ctitle(2)],
            description: `- ${Mock.Random.csentence()}
- ${Mock.Random.csentence()}
- ${Mock.Random.csentence()}
- ${Mock.Random.csentence()}`
          })
        }]
      })
    })

    Mock.mock(/\/blog\/tags/, function () {
      return Mock.mock({
        code: 200,
        message: 'success',
        'data|20': [() => {
          return Mock.mock({
            id: Mock.Random.increment(1),
            title: Mock.Random.ctitle(),
            description: Mock.Random.csentence(),
            images: [
              'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
              'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
              'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
              'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
              'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
              'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
              'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg'
            ],
            articles: Mock.Random.range(0, 100, 1)
          })
        }]
      })
    })

    Mock.mock(/\/blog\/comment/, function () {
      return Mock.mock({
        code: 200,
        message: 'success',
        'data|5': [
          Mock.mock({
            id: Mock.Random.guid(),
            userId: Mock.Random.guid(),
            quoteId: Mock.Random.guid(),
            content: Mock.Random.sentence(),
            likes: Mock.Random.range(),
            dislikes: Mock.Random.range(),
            create_time: Mock.Random.date('yyyy-MM-dd HH:mm:ss'),
            update_time: Mock.Random.date('yyyy-MM-dd HH:mm:ss'),
            blogId: Mock.Random.guid()
          })
        ]
      })
    })
  }

}
