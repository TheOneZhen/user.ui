import Mock from 'mockjs'

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
  }
}
/**
 * 服务拦截，为无服务环境提供假数据
 */
export const fakerService = new FakerService()
