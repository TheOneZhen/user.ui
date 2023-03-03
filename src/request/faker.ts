import Faker from '@faker-js/faker'
import Mock from 'mockjs'
/**
 * 一切通过前端确定了数据结构的接口，可以在这里定义假接口
 */
Mock.mock(/\/blog\/catalogs/, function () {
  return Mock.mock(
    {
      code: 200,
      msg: 'success',
      'data|10': {
        date: Mock.Random.date('yyyy-MM-dd HH:mm:ss'),
        title: Mock.Random.ctitle(),
        'tags|10': Mock.Random.ctitle(2),
        description: `
          - ${Mock.Random.csentence()}
          - ${Mock.Random.csentence()}
          - ${Mock.Random.csentence()}
          - ${Mock.Random.csentence()}
        `
      }
    }
  )
})
