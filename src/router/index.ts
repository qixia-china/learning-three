import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { generateRoutes, fetchUserMenus, getMenuList } from '@/utils/permission'

// 引入登录页和404页面
// @ts-expect-error - LoginPage 无类型声明
import Login from '@/views/LoginPage.vue'
import NotFound from '@/views/NotFound.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
    },
    {
      path: '/404',
      name: 'NotFound',
      component: NotFound,
    },
  ],
})

// 全局捕获路由导航错误
router.onError((error) => {
  if (
    error.message.includes('Avoided redundant navigation') ||
    error.message.includes('Navigation cancelled')
  ) {
    return
  }
  console.error('路由导航发生错误:', error)
})

// 全局前置守卫
// 未登录 → 跳转登录页
// 已登录 + 路由未注册 → 获取菜单 + 动态添加路由
let isRouteAdded = false

router.beforeEach(async (to, _from) => {
  const token = localStorage.getItem('token')

  if (to.path === '/') {
    return undefined
  }

  if (!token) {
    return { path: '/' }
  }

  if (!isRouteAdded) {
    const routes = await fetchUserMenus()
    const routerList = generateRoutes(routes)

    isRouteAdded = true
    routerList.forEach((item: RouteRecordRaw) => {
      router.addRoute(item)
    })
    getMenuList(routes)

    // 兜底 404 路由
    router.addRoute({
      path: '/:pathMatch(.*)*',
      redirect: '/404',
    })

    // 首次进入 /home 重定向到默认首页
    if (to.path === '/home') {
      return { ...to, path: '/name', replace: true }
    }
    return { ...to, replace: true }
  } else {
    if (to.path === '/home') {
      return { ...to, path: '/name' }
    }
    return undefined
  }
})

export default router
