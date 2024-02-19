import { createRouter, createWebHistory } from 'vue-router'
import { RouterName } from './router.config'

// hash路由只能加载hash路由的子应用，history路由俩种都能加载
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('@/layout/ZLayout.vue'),
      redirect: '/home',
      children: [
        {
          path: '/home',
          name: RouterName.HOME,
          component: () => import('@/layout/ZHome.vue')
        },
        {
          path: '/lefting',
          name: RouterName.LEFTING,
          component: () => import('@/user/ZLefting.vue')
        },
        {
          path: '/blog',
          name: RouterName.BLOG,
          component: () => import('@/blog/ZBlog.vue'),
          children: [
            {
              path: 'article/:index',
              name: RouterName.ARTICLE,
              component: () => import('@/blog/ZArticle.vue'),
              props: true
            }
          ]
        },
        {
          path: '/stations',
          name: RouterName.STATIONS,
          component: () => import('@/stations/ZStations.vue')
        }
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      name: RouterName.NOTFOUND,
      component: () => import('@/router/404.vue')
    }
  ]
})

router.afterEach((to) => {
  const code = to.query['code']
  if (code) {
    window.opener.postMessage(code, window.location.origin)
    window.close()
  }
})

export default router
