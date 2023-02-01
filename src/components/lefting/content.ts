export type Content = {
  icon?: string
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'info'
  color?: string
  size?: string
  hollow?: boolean // 是否空心展示
  timestamp?: string
  content: string
}
export const content: Array<Content> = [
  {
    content: 'Custom icon',
    timestamp: '2018-04-12 20:46',
    size: 'large',
    type: 'primary'
  },
  {
    content: 'Custom color',
    timestamp: '2018-04-03 20:46',
    color: '#0bbd87'
  },
  {
    content: 'Custom size',
    timestamp: '2018-04-03 20:46',
    size: 'large'
  },
  {
    content: 'Custom hollow',
    timestamp: '2018-04-03 20:46',
    type: 'primary',
    hollow: true
  },
  {
    content: 'Default node',
    timestamp: '2018-04-03 20:46'
  }
]
