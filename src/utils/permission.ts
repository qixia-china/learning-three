import { setLocalStorage } from '@/utils/storage'
import NotFound from '@/views/NotFound.vue'
// ========== 类型定义 ==========

/** 路由元信息 */
interface RouteMeta {
  title: string
  level?: number
  icon?: string
  lastTitle?: string
  lastIcon?: string
}

/** fetchUserMenus 返回的菜单项 */
interface MenuItem {
  path: string
  name: string
  component: string
  meta: RouteMeta
  children?: MenuItem[]
  parentLocal?: string
  parentComponents?: string
}

/** generateRoutes 输出的一级路由 */
interface GeneratedRoute {
  path: string
  name: string
  component: () => Promise<unknown>
  meta: { title: string }
  children?: GeneratedRoute[]
}

/** getMenuList 输出的菜单节点 */
interface MenuNode {
  title: string
  number: string
  icon?: string
  path: string
  children: MenuNode[]
}

// ========== 路由生成 ==========

/**
 * 根据菜单数据生成路由配置
 * @param menus - 菜单数据数组
 * @returns 处理后的路由配置数组
 */
export function generateRoutes(menus: MenuItem[]): GeneratedRoute[] {
  return menus.map((menu) => {
    return {
      path: menu.path,
      name: menu.name,
      // 关键：将字符串映射为动态导入函数，实现组件懒加载
      // 使用 try/catch 包裹，避免文件不存在时整个路由注册崩溃
      component: () =>
        import(`@/views/${menu.component}/index.vue`).catch((err) => {
          console.error(`[generateRoutes] 组件加载失败: @/views/${menu.component}/index.vue`, err)
          return NotFound
        }),
      meta: { title: menu.meta.title },
      children: menu.children?.map((child) => {
        return {
          path: child.path,
          name: child.name,
          component: () =>
            import(`@/views/${child.parentLocal}/${child.component}.vue`).catch((err) => {
              console.error(
                `[generateRoutes] 子组件加载失败: @/views/${child.parentLocal}/${child.component}.vue`,
                err,
              )
              return NotFound
            }),
          meta: { title: child.meta.title },
        }
      }),
    }
  })
}

// ========== Mock 数据 ==========

export function fetchUserMenus(): MenuItem[] {
  // TODO: 后续替换为后端 API 调用
  return [
    {
      path: '/home',
      name: 'home',
      component: 'HomePage',
      meta: { title: '首页' },
      children: [
        {
          path: '/name',
          name: 'name',
          parentLocal: 'knowledgeBase',
          parentComponents: 'NamePage',
          component: 'NamePage',
          meta: { title: '首页', level: 1, icon: 'HomeFilled', lastTitle: '' },
        },
        {
          path: '/html',
          name: 'html',
          parentLocal: 'knowledgeBase',
          parentComponents: 'knowledgeBase',
          component: 'HtmlPage',
          meta: {
            title: '前端HTML',
            level: 2,
            icon: '',
            lastTitle: '基础知识',
            lastIcon: 'InfoFilled',
          },
        },
        {
          path: '/css',
          name: 'css',
          parentLocal: 'knowledgeBase',
          parentComponents: 'knowledgeBase',
          component: 'CssPage',
          meta: { title: '前端CSS', level: 2, lastTitle: '基础知识', lastIcon: 'InfoFilled' },
        },
        {
          path: '/javascript',
          name: 'javascript',
          parentLocal: 'knowledgeBase',
          parentComponents: 'knowledgeBase',
          component: 'JavaScriptPage',
          meta: {
            title: '前端JavaScript',
            level: 2,
            lastTitle: '基础知识',
            lastIcon: 'InfoFilled',
          },
        },
        {
          path: '/vue',
          name: 'vue',
          component: 'VuePage',
          parentLocal: 'knowledgeBase',
          parentComponents: 'knowledgeBase',
          meta: {
            title: '前端Vue',
            level: 2,
            lastTitle: '基础知识',
            lastIcon: 'InfoFilled',
          },
        },
        {
          path: '/react',
          name: 'react',
          component: 'ReactPage',
          parentLocal: 'knowledgeBase',
          parentComponents: 'knowledgeBase',
          meta: {
            title: '前端React',
            level: 2,
            lastTitle: '基础知识',
            lastIcon: 'InfoFilled',
          },
        },
        {
          path: '/nodejs',
          name: 'nodejs',
          component: 'NodeJsPage',
          parentLocal: 'knowledgeBase',
          parentComponents: 'knowledgeBase',
          meta: {
            title: '前端Node.js',
            level: 2,
            lastTitle: '基础知识',
            lastIcon: 'InfoFilled',
          },
        },
        {
          path: '/mongodb',
          name: 'mongodb',
          component: 'MongoDBPage',
          parentLocal: 'knowledgeBase',
          parentComponents: 'knowledgeBase',
          meta: {
            title: '前端MongoDB',
            level: 2,
            lastTitle: '基础知识',
            lastIcon: 'InfoFilled',
          },
        },
        {
          path: '/three-js',
          name: 'three-js',
          component: 'ThreeJsPage',
          parentLocal: 'knowledgeBase',
          parentComponents: 'knowledgeBase',
          meta: {
            title: 'Three.js',
            level: 2,
            lastTitle: '基础知识',
            lastIcon: 'InfoFilled',
          }
        },
        {
          path: '/imageVIrtualScrolling',
          name: 'imageVIrtualScrolling',
          parentLocal: 'VirtualScrolling',
          component: 'imageVIrtualScrolling',
          parentComponents: 'VirtualScrolling',
          meta: {
            title: '图片虚拟滚动',
            level: 2,
            lastTitle: '虚拟滚动',
            lastIcon: 'PictureFilled',
          },
        },
        {
          path: '/tableScrolling',
          name: 'tableScrolling',
          parentLocal: 'VirtualScrolling',
          component: 'tableScrolling',
          parentComponents: 'VirtualScrolling',
          meta: {
            title: '表格虚拟滚动',
            level: 2,
            lastTitle: '虚拟滚动',
            lastIcon: 'PictureFilled',
          },
        },
        {
          path: "/tableTestScrolling",
          name: "tableTestScrolling",
          parentLocal: "VirtualScrolling",
          component: "tableTestScrolling",
          parentComponents: "VirtualScrolling",
          meta: {
            title: "虚拟列表",
            level: 2,
            lastTitle: "虚拟滚动",
            lastIcon: "PictureFilled",
          }
        }

      ],
    },
  ]
}

// ========== 菜单列表转换 ==========

/**
 * 将路由数据转换为前端侧边栏菜单结构
 * 按 meta.level 分两级：
 *   level=1 → 一级菜单项（如"首页"）
 *   level=2 → 挂载到对应 parentComponents 下的二级菜单项
 * @param routerList - fetchUserMenus 返回的原始路由数据
 * @returns 处理后的菜单树
 */
export function getMenuList(routerList: { children?: MenuItem[] }[]): MenuNode[] {
  const children = routerList[0]?.children
  if (!(children && Array.isArray(children))) return []

  const tempObj: Record<string, MenuNode> = {}
  let levelOneIndex = 1

  children.forEach((item) => {
    const { meta, parentComponents } = item

    if (meta?.level === 1) {
      tempObj[parentComponents || item.name] = {
        title: meta.title,
        number: `${levelOneIndex}-0`,
        icon: meta.icon,
        path: item.path,
        children: [],
      }
      levelOneIndex++
    } else if (meta?.level === 2) {
      const parentKey = parentComponents
      if (!parentKey) return

      if (parentKey in tempObj) {
        const parentItem = tempObj[parentKey]!
        const childIndex = parentItem.children.length + 1
        parentItem.children.push({
          title: meta.title,
          number: `${parentItem.number}-${childIndex}`,
          icon: meta.lastIcon,
          path: item.path,
          children: [],
        })
      } else {
        // 二级菜单先于一级菜单出现，兜底创建父节点
        const parentNumber = `${levelOneIndex}-0`
        tempObj[parentKey] = {
          title: meta.lastTitle || '',
          number: parentNumber,
          icon: meta.lastIcon,
          path: '',
          children: [],
        }
        tempObj[parentKey].children.push({
          title: meta.title,
          number: `${parentNumber}-1`,
          icon: meta.lastIcon,
          path: item.path,
          children: [],
        })
        levelOneIndex++
      }
    }
  })

  setLocalStorage('menuList', Object.values(tempObj))
  return Object.values(tempObj)
}
