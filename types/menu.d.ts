declare namespace Header {
  declare type SubMenu = {
    title: string
    icon: VNode
    showIcon?: boolean
    desc?: string
    disabled?: boolean
    children?: SubMenu[]
    isRight?: boolean
  }
}
