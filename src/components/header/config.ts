import { Header } from '../../DS/menu'

export const NavigationMenu: Header.SubMenu[] = [
  {
    title: '首页',
    icon: 'House.svg'
  },
  {
    title: '资源',
    icon: 'Folder.svg',
    children: [
      {
        title: '插件｜脚本',
        icon: 'CPU.svg'
      },
      {
        title: '素材',
        icon: 'Cherry.svg'
      },
      {
        title: '文档翻译',
        icon: 'DocumentCopy.svg'
      },
      {
        title: '我的源码',
        icon: 'Crop.svg'
      }
    ]
  },
  {
    title: '阶段总结',
    icon: 'Document.svg',
    children: [
      {
        title: '问题记录',
        icon: 'DocumentCheck.svg'
      },
      {
        title: '源码分析',
        icon: 'FullScreen.svg'
      }
    ]
  },
  {
    title: '留言',
    icon: 'ChatSquare.svg',
    children: [
      {
        title: '留言区',
        icon: 'ChatDotSquare.svg'
      }
    ]
  },
  {
    title: '发现另外的我',
    icon: 'Link.svg',
    showIcon: false,
    isRight: true
  }
]
