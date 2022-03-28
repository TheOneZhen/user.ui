import { createRouter, createWebHashHistory } from 'vue-router'

import header from '@/components/header/Header.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: '',
      component: header
    }
  ]
})

export default router
