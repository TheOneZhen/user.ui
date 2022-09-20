import { createRouter, createWebHistory } from 'vue-router'

// hash路由只能加载hash路由的子应用，history路由俩种都能加载
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: '',
      component: () => import('@/components/layout/ZLayout.vue')
    },
    {
      path: '/userEarthMap*',
      name: 'microApp',
      component: () => import('@/components/home/PageTwo.vue')
    }
  ]
})

export default router
