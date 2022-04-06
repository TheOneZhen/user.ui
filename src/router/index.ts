import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: '',
      component: () => import('@/components/layout/ZLayout.vue')
    }
  ]
})

export default router
