import { registerMicroApps, start } from 'qiankun'

registerMicroApps([
  {
    name: 'childHomeGEarth',
    entry: '*',
    container: 'childHomeGEarth',
    activeRule: '/home/earth'
  }
])

start()
