declare namespace Header {
  declare type SubMenu = {
    title: string
    icon: string
    showIcon?: boolean
    desc?: string
    disabled?: boolean
    children?: SubMenu[]
    isRight?: boolean
  }
}
