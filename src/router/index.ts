import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { generateRoutes, fetchUserMenus, getMenuList } from '@/utils/permission'

// 引入登录页和404页面
// @ts-ignore
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
    // {
    //   path: '/home',
    //   name: 'home',
    //   component: () => import('@/views/HomePage/index.vue'),
    //   meta: { title: '首页' },
    //   children: [],
    // },
    {
      path: '/404',
      name: 'NotFound',
      component: NotFound,

    },
    // {
    //   path: '/:pathMatch(.*)*',
    //   redirect: '/404',
    // },
  ],
})

// 全局捕获路由导航错误
router.onError((error, to, from) => {
  // 如果是重复导航到当前路由的错误，直接忽略（静默处理）
  if (
    error.message.includes('Avoided redundant navigation') ||
    error.message.includes('Navigation cancelled')
  ) {
    return
  }
  // 其他类型的错误可以打印或上报
  console.error('路由导航发生错误:', error)
})

// 全局前置守卫，判断是否登录，如果未登录则跳转到登录页
// 如果已登录但未获取菜单，则先获取菜单并动态添加路由
// 其他情况跳转到404页面
let isRouteAdded = false // 标志位，防止重复添加路由

router.beforeEach(async (to, from) => {
  console.log("测试路由守卫", to.path)
  const token = localStorage.getItem('token')
  if (to.path === '/') {
    return undefined
  }
  // 1. 无token时，跳转到登录页
  if (!token) {
    return { path: '/' }
  }

  // 2. 有token时，判断是否已获取菜单
  if (!isRouteAdded) {
    const routes = await fetchUserMenus()
    const routerList = generateRoutes(routes)

    isRouteAdded = true
    routerList.forEach((item: RouteRecordRaw) => {
      router.addRoute(item)
    })
    getMenuList(routes);// 获取菜单列表

    router.addRoute({
      path: '/:pathMatch(.*)*',
      redirect: '/404',
    })
    if (to.path == '/home') {
      return { ...to, path: '/name', replace: true }
    }
    console.log('9999', router.options.routes)
    // next({ ...to, replace: true }) // 确保路由被正确添加后重新导航
    return { ...to, replace: true }
  } else {
    if (to.path == '/home') {
      return { ...to, path: '/name', }
    }
    return undefined
  }
})

export default router
