export namespace Header {
  export interface SubMenu {
    title: String
    icon: String
    disabled: Boolean
    children: Menu
  }

  export const Menu: Array<SubMenu>
}