import Mock from 'mockjs'
/**
 * mockjs原理
 * - 通过重写XMLHttpRequest对象的open和send方法实现请求拦截
 */
class FakerService {
  init () {
    Mock.mock(/\/blog\/catalogs/, function () {
      return Mock.mock(
        {
          code: 200,
          msg: 'success',
          'data|10': [() => {
            return Mock.mock({
              date: Mock.Random.date('yyyy-MM-dd HH:mm:ss'),
              title: Mock.Random.ctitle(),
              'tags|10': [() => Mock.Random.ctitle(2)],
              description: `
                - ${Mock.Random.csentence()}
                - ${Mock.Random.csentence()}
                - ${Mock.Random.csentence()}
                - ${Mock.Random.csentence()}
              `
            })
          }]
        }
      )
    })

    Mock.mock(/\/blog\/comment/, function () {
      return Mock.mock({
        code: 200,
        msg: 'success',
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
/**
 * 服务拦截，为无服务环境提供假数据
 */
export const fakerService = new FakerService()
