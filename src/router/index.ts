import { createRouter, createWebHistory } from 'vue-router'
import { RouterName } from './router.config'

// hash路由只能加载hash路由的子应用，history路由俩种都能加载
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('@/components/layout/ZLayout.vue'),
      redirect: '/home',
      children: [
        {
          path: '/home',
          name: RouterName.HOME,
          component: () => import('@/components/home/ZHome.vue')
        },
        {
          path: '/lefting',
          name: RouterName.LEFTING,
          component: () => import('@/components/lefting/ZLefting.vue')
        },
        {
          path: '/blog',
          name: RouterName.BLOG,
          component: () => import('@/components/blog/ZBlog.vue'),
          children: [
            {
              path: 'article/:index',
              name: RouterName.ARTICLE,
              component: () => import('@/components/blog/ZArticle.vue'),
              props: true
            }
          ]
        },
        {
          path: '/find me',
          name: RouterName.FINDME,
          component: () => import('@/components/findme/FindMe.vue')
        },
        {
          path: 'user',
          name: RouterName.USER,
          component: () => import('@/components/user/login.vue')
        },
        {
          path: '/:pathMatch(.*)*',
          name: RouterName.NOTFOUND,
          component: () => import('@/components/error/404.vue')
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

router.afterEach((to) => {
  const code = to.query['code']
  if (code) {
    window.opener.postMessage(code, window.location.origin)
    window.close()
  }
})

export default router
