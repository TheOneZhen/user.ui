export namespace Header {
  /**
   * interface与type区别（俩之间的区别主要表现在语法上）
   *  1 interface只能表示对象结构类型，对于js基本类型还得type
   *  2 type可以动态计算属性
   *    type Keys = "小王" | "小文"
   *    type X = {
   *      [key in Keys]: string
   *    }
   *    const test: X = {
   *      '小王': '肌肉男',
   *      '小文': '也是肌肉男'
   *    }
   *  3 type类型不能重名，interface可以对系统的变量进行重命名
   */
  export type SubMenu = {
    title: String
    icon: String
    disabled: Boolean
    children?: Menu
  }

  export type Menu = Array<SubMenu>
}