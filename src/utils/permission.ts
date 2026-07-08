
import { setLocalStorage } from '@/utils/storage'
/**
 * 根据菜单数据生成路由配置
 * @param {Array} menus - 菜单数据数组
 * @returns {Array} - 返回处理后的路由配置数组
 */
export function generateRoutes(menus: { path: string; name: string; component: string; meta: { title: string; }; }[]) {
  return menus.map((menu: { path: string; name: string; component: string; meta: { title: string; }; children?: [] }) => {
    return {
      path: menu.path, // 路由路径
      name: menu.name, // 路由名称
      // 关键：将字符串映射为动态导入函数
      // 使用动态导入实现组件的懒加载
      component: () => import(`@/views/${menu.component}/index.vue`),
      meta: { title: menu.meta.title }, // 路由元信息，包含标题等
      children: menu.children?.map((el: { path: string; name: string; parentLocal: string; component: string; meta: { title: string; }; }) => {
        return {
          path: el.path,
          name: el.name,
          component: () => import(`@/views/${el.parentLocal}/${el.component}.vue`),
          meta: { title: el.meta.title },
        }
      }),
    }
  })
}

export function fetchUserMenus() {
  // TODO: 实现获取用户菜单的逻辑
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
          parentLocal: "knowledgeBase",
          parentComponents: 'NamePage',
          component: 'NamePage',
          meta: { title: '首页', level: 1, icon: "HomeFilled", lastTitle: '' },
        },
        {
          path: '/html',
          name: 'html',
          parentLocal: "knowledgeBase",
          parentComponents: 'knowledgeBase',
          component: 'HtmlPage',
          meta: { title: '前端HTML', level: 2, icon: '', lastTitle: "基础知识", lastIcon: "InfoFilled", },
        },
        {
          path: '/css',
          name: 'css',
          parentLocal: "knowledgeBase",
          parentComponents: 'knowledgeBase',
          component: 'CssPage',
          meta: { title: '前端CSS', level: 2, lastTitle: "基础知识", lastIcon: "InfoFilled", },
        },
        {
          path: '/javascript',
          name: 'javascript',
          parentLocal: "knowledgeBase",
          parentComponents: 'knowledgeBase',
          component: 'JavaScriptPage',
          meta: { title: '前端JavaScript', level: 2, icon: '', lastTitle: "基础知识", lastIcon: "InfoFilled", },
        },
        {
          path: '/vue',
          name: 'vue',
          component: 'VuePage',
          parentLocal: "knowledgeBase",
          parentComponents: 'knowledgeBase',
          meta: { title: '前端Vue', level: 2, icon: '', lastTitle: "基础知识", lastIcon: "InfoFilled", },
        },
        {
          path: '/react',
          name: 'react',
          component: 'ReactPage',
          parentLocal: "knowledgeBase",
          parentComponents: 'knowledgeBase',
          meta: { title: '前端React', level: 2, icon: '', lastTitle: "基础知识", lastIcon: "InfoFilled", },
        },
        {
          path: '/nodejs',
          name: 'nodejs',
          component: 'NodeJsPage',
          parentLocal: "knowledgeBase",
          parentComponents: 'knowledgeBase',
          meta: { title: '前端Node.js', level: 2, icon: '', lastTitle: "基础知识", lastIcon: "InfoFilled", },
        },
        {
          path: '/mongodb',
          name: 'mongodb',
          component: 'MongoDBPage',
          parentLocal: "knowledgeBase",
          parentComponents: 'knowledgeBase',
          meta: { title: '前端MongoDB', level: 2, icon: '', lastTitle: "基础知识", lastIcon: "InfoFilled", },
        },
        {
          path: '/imageVIrtualScrolling',
          name: 'imageVIrtualScrolling',
          parentLocal: "VirtualScrolling",
          component: 'imageVIrtualScrolling',
          parentComponents: 'VirtualScrolling',
          meta: { title: '图片虚拟滚动', level: 2, icon: '', lastTitle: "虚拟滚动", lastIcon: "PictureFilled", },

        },
        {
          path: '/tableScrolling',
          name: 'tableScrolling',
          parentLocal: "VirtualScrolling",
          component: 'tableScrolling',
          parentComponents: 'VirtualScrolling',
          meta: { title: '表格虚拟滚动', level: 2, icon: '', lastTitle: "虚拟滚动", lastIcon: "PictureFilled", },
        },

        {
          path: "/threeLearning",
          name: "threeLearning",
          component: "threeLearning",
          parentLocal: "ThreeD",
          parentComponents: "ThreeD",
          meta: {
            title: 'three.js学习', level: 2, icon: '', lastTitle: "three.js学习", lastIcon: "Platform",
          }
        },

        {
          path: "/baseic3D",
          name: "baseic3D",
          component: "baseic3D",
          parentLocal: "ThreeD",
          parentComponents: "ThreeD",
          meta: {
            title: '士兵', level: 2, icon: '', lastTitle: "three.js学习", lastIcon: "Platform",
          }
        },
        {
          path: "/sceneLearning",
          name: "sceneLearning",
          component: "sceneLearning",
          parentLocal: "ThreeD",
          parentComponents: "ThreeD",
          meta: {
            title: 'scene', level: 2, icon: '', lastTitle: "three.js学习", lastIcon: "Platform",
          }
        },
        {
          path: "/material-glass",
          name: "materialGlass",
          component: "materialGlass",
          parentLocal: "ThreeD",
          parentComponents: "ThreeD",
          meta: {
            title: '玻璃材质', level: 2, icon: '', lastTitle: "three.js学习", lastIcon: "Platform",
          }
        },
      ],
    },
  ]
}

interface Children {
  path: string;
  name: string;
  component: string;
  parentComponents: string;
  parentLocal: string;
  meta: {
    title: string;
    level: number;
    lastTitle: string;
    icon: string;
    lastIcon?: string | undefined; // 建议明确类型
  };
}

interface Items {
  title: string;
  number: string;
  icon?: string;
  path: string;
  children: Items[]; // 明确子级类型
}

export function getMenuList(routerList: { children?: Children[] }[]): Items[] {

  const children = routerList[0]?.children;
  if (!(children && Array.isArray(children))) return [];
  console.log("children", children);
  // 定义时加上 [key: string]: Items
  const tempObj: Record<string, Items> & { [key: string]: Items } = {};
  let levelOneIndex = 1; // 专门用于记录一级菜单的序号

  // 1. 使用 forEach 替代 map，因为不需要返回新数组
  children.forEach((item) => {
    const { meta, parentComponents } = item;

    if (meta?.level === 1) {
      tempObj[parentComponents || item.name] = {
        title: meta.title,
        number: levelOneIndex + '-0',
        icon: meta.icon,
        path: '/name',
        children: [],
      };
      levelOneIndex++;

    } else if (meta?.level === 2) {
      const parentKey = parentComponents;
      let childIndex = 0;
      // 2. 使用 in 操作符判断键是否存在，比 Object.keys().includes() 更高效
      if (parentKey in tempObj) {
        // 在变量后加 !，强制移除 undefined 类型
        const parentItem = tempObj[parentKey]!;
        childIndex = parentItem.children.length + 1;

        parentItem.children.push({
          title: meta.title,
          number: `${parentItem.number}-${childIndex}`,
          icon: meta.lastIcon,
          path: item.path,
          children: [], // 保持结构一致性
        });
      } else {
        tempObj[parentKey] = {
          title: meta.lastTitle,
          number: `${levelOneIndex}-${childIndex}`,
          icon: meta.lastIcon,
          path: item.path,
          children: []
        }
        tempObj[parentKey].children.push({
          title: meta.title,
          number: `${levelOneIndex}-${childIndex}`,
          icon: meta.lastIcon,
          path: item.path,
          children: [], // 保持结构一致性
        })
        levelOneIndex++;
        // 处理找不到父级菜单的二级菜单（容错处理）
        // console.warn(`找不到父级菜单: ${parentKey}, 子菜单: ${meta.title}`);
      }
    }
  });
  console.log('000', Object.values(tempObj));
  setLocalStorage('menuList', JSON.stringify(Object.values(tempObj)));

  // 3. 必须返回处理后的结果
  return Object.values(tempObj);
}
