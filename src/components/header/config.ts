import { render } from 'vue'

export const NavigationMenu: Header.SubMenu[] = [
  {
    title: 'home',
    icon: render()
    // h('<i-ep-house />')
  },
  {
    title: 'blog',
    icon: h('<i-ep-folder />')
  },
  {
    title: 'lefting',
    icon: h('<i-ep-chat-square />')
  },
  {
    title: 'find me',
    icon: h('<i-ep-link />')
  }
]
