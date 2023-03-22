import { createRouter, createWebHistory } from 'vue-router'

// hash路由只能加载hash路由的子应用，history路由俩种都能加载
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: '',
      component: () => import('@/components/layout/ZLayout.vue'),
      redirect: '/home',
      children: [
        {
          path: '/home',
          name: 'home',
          component: () => import('@/components/home/ZHome.vue')
        },
        {
          path: '/lefting',
          name: 'lefting',
          component: () => import('@/components/lefting/ZLefting.vue')
        },
        {
          path: '/blog',
          name: 'blog',
          component: () => import('@/components/blog/ZBlog.vue')
        },
        {
          path: '/find me',
          name: 'find me',
          component: () => import('@/components/findme/FindMe.vue')
        }
      ]
    },
    {
      path: '/userEarthMap*',
      name: 'microApp',
      component: () => import('@/components/home/PageTwo.vue')
    }
  ]
})

export default router
