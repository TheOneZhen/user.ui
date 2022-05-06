import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: '',
      component: () => import('@/components/layout/ZLayout.vue')
    },
    {
      path: '/micro/userEarthMap',
      name: 'microApp',
      component: () => import('@/components/home/PageTwo.vue')
    }
  ]
})

export default router
