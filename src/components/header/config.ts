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
        title: '资源文档',
        icon: 'DocumentCopy.svg'
      },
      {
        title: '源码',
        icon: 'Crop.svg'
      }
    ]
  },
  {
    title: '学习记录',
    icon: 'Document.svg',
    children: [
      {
        title: '问题记录',
        icon: 'DocumentCheck.svg'
      },
      {
        title: '源码分析',
        icon: 'FullScreen.svg'
      },
      {
        title: '原理及业务实现',
        icon: 'FullScreen.svg'
      }
    ]
  },
  {
    title: '留言',
    icon: 'ChatSquare.svg'
  },
  {
    title: '发现另外的我',
    icon: 'Link.svg',
    showIcon: false,
    isRight: true
  }
]
