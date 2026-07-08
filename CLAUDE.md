# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

「百科全书鸭」— Vue 3 + TypeScript + Vite 前端学习知识平台，Element Plus UI 组件库，默认暗黑主题，可配置light主题和暗黑主题，带权限路由的登录系统。

## 常用命令

```sh
npm run dev          # 开发服务器 (热更新)
npm run build        # 类型检查 + 生产构建
npm run preview      # 预览生产构建
npm run test:unit    # 运行 Vitest 单元测试
npm run lint         # ESLint + oxlint 检查并自动修复
npm run format       # Prettier 格式化 src/
npm run type-check   # 仅类型检查 (vue-tsc)
```

## 技术栈

- **Vue 3** (Composition API + Options API 混用，正在过渡中)
- **Vue Router 5** — 动态路由 + 权限守卫
- **Pinia 3** — 状态管理
- **Element Plus 2** — UI 组件库
- **Sass (sass-embedded)** — SCSS 样式
- **Vitest + jsdom** — 单元测试环境
- **ESLint + oxlint** — 双 linter
- **Node ≥22.18**

## 架构要点

### 路由与权限 ([src/router/index.ts](src/router/index.ts))

- 路由是**动态生成的**：初始只注册了 `/`(登录页) 和 `/404`
- `router.beforeEach` 守卫检查 `localStorage.token`，无 token 跳转登录页
- 有 token 时调用 `fetchUserMenus()` → `generateRoutes()` 生成路由并通过 `router.addRoute()` 动态注册
- `fetchUserMenus()` 当前是 mock 数据（[src/utils/permission.ts](src/utils/permission.ts)），返回菜单数组，`generateRoutes()` 将其中的 `component` 字符串转为 `() => import(...)` 懒加载路由
- `isRouteAdded` 标志位防止重复注册路由
- 重复导航错误被 `router.onError` 静默吞掉

### 布局结构

- **登录页**：`/` → [src/views/LoginPage.vue](src/views/LoginPage.vue)，纯独立页面
- **主布局**：`/home` → [src/views/HomePage/index.vue](src/views/HomePage/index.vue)，经典的「左导航 + 右内容」布局
  - 左侧：[leftSider.vue](src/views/HomePage/components/leftSider.vue) — Element Plus `el-menu`，菜单项硬编码在前端
  - 右侧顶部：[topHeader.vue](src/views/HomePage/components/topHeader.vue) — 折叠按钮
  - 右侧内容：`<router-view>` 嵌套路由出口
- **知识页面**：[src/views/](src/views/) 下的 `HtmlPage.vue`、`CssPage.vue`、`JavaScriptPage.vue` 等，作为 `/home` 的子路由

### 状态管理 ([src/stores/counter.ts](src/stores/counter.ts))

- 仅一个 Pinia store：`useCounterStore`
- 管理 `isCollapse`（侧边栏折叠状态）+ `toggleCollapse()` 方法
- `leftSider.vue` 读取 `isCollapse` 控制 `el-menu` 折叠；`topHeader.vue` 调用 `toggleCollapse()` 切换

### 路径别名

- `@` 映射到 `src/`（vite.config.ts + tsconfig.app.json 中配置）

### 暗黑主题

- [App.vue](src/App.vue) 定义了 `--bg-color`、`--text-color` CSS 变量和 `.dark-theme` 类
- 左侧导航栏使用 `var(--bg-color)` 背景色

### 代码风格

- 无分号，单引号，100 字符宽度（[.prettierrc.json](.prettierrc.json)）
- 2 空格缩进，LF 换行（[.editorconfig](.editorconfig)）
- ESLint 使用 flat config（[eslint.config.ts](eslint.config.ts)）
