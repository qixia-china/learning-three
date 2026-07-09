export const reactPageConfig = {
  list: [
    {
      title: '1. React 的 Fiber 架构是什么？解决了什么问题？',
      content:
        'React 16 之前用 Stack Reconciler 递归遍历 VDOM，更新一旦开始无法中断，长任务阻塞主线程导致卡顿（掉帧）。' +
        'Fiber 的核心是可中断的异步渲染：将渲染任务拆成小的工作单元（Fiber Node），每个单元执行完后检查是否有更高优先级任务（用户输入、动画），有则暂停并让出主线程，空闲时恢复。' +
        '双缓存机制：current Fiber（当前屏幕显示的树）和 workInProgress Fiber（后台构建的新树），完成后替换（commit 阶段不可中断）。实现了时间切片（Time Slicing）和任务优先级调度（lane 模型）。',
    },
    {
      title: '2. useState 和 useReducer 的区别？各自适用场景？',
      content:
        'useState：简单的状态管理。更新是异步批处理的，多次 setState 可能被合并。函数式更新 setCount(prev => prev + 1) 基于最新值状态。' +
        'useReducer：适合复杂状态逻辑（多个子值、下一状态依赖上一状态）。dispatch 不会因组件重新渲染而变化引用（稳定）。' +
        '选择：单一独立状态 → useState；多个状态相互关联（如表单多字段）→ useReducer；状态逻辑跨组件复用 → useReducer + Context 或状态库。',
    },
    {
      title: '3. useEffect 和 useLayoutEffect 的区别？',
      content:
        'useEffect：异步执行，浏览器绘制完成后触发，不阻塞渲染。适合数据请求、订阅/取消订阅、DOM 无关的副作用。' +
        'useLayoutEffect：同步执行，在 DOM 变更后但浏览器绘制之前触发。阻塞渲染，适合需要同步读取/修改 DOM 的场景（获取元素尺寸、调整滚动位置、避免闪烁）。' +
        '流程：组件渲染 → React 更新 DOM → useLayoutEffect 同步执行 → 浏览器绘制屏幕 → useEffect 异步执行。大多数场景用 useEffect，有视觉闪烁问题才用 useLayoutEffect。',
    },
    {
      title: '4. useCallback 和 useMemo 的区别？什么时候需要/不需要？',
      content:
        'useMemo(fn, deps)：缓存计算结果（值）。避免每次渲染都执行昂贵的计算。useCallback(fn, deps)：缓存函数引用（useMemo(() => fn, deps) 的语法糖）。' +
        '真正需要的场景：① 传给子组件用 React.memo 包裹时，引用不变跳过重渲染；② 作为 useEffect 等的依赖项时传稳定引用。' +
        '不要过度使用：大部分场景下引用变化不会引起性能问题，加 useCallback 本身也有开销（创建函数 + 比较依赖）。React 19 编译器（React Compiler）会自动决定何时缓存，手动优化的需求将大幅减少。',
    },
    {
      title: '5. React.memo、useMemo、useCallback 实现原理？',
      content:
        '核心都是浅比较（shallowEqual）：比较新旧依赖数组中的每个值（Object.is）。' +
        'React.memo：高阶组件，props 浅比较相同则跳过渲染（不进入 render 阶段），props 中有引用类型变化则渲染。可使用第二个参数自定义比较函数。' +
        'useMemo/useCallback：deps 浅比较，相同则返回上次缓存值，不同则重新计算/创建。缓存存在 Fiber 节点的 memoizedState 链表上。' +
        'React 19 的自动记忆化（Auto Memoization）：编译器在编译阶段分析依赖并自动添加 memo/useMemo/useCallback 等效内容，减少样板代码。',
    },
    {
      title: '6. 什么是 HOC（高阶组件）与 Hooks 的区别？Render Props 呢？',
      content:
        'HOC：接收组件返回新组件的函数，用于逻辑复用（withRouter、connect）。问题：props 命名冲突、多层包裹造成"嵌套地狱"、来源不清。' +
        'Hooks：在函数组件中复用状态逻辑，不改变组件层级。比 HOC 轻量，逻辑来源清晰。只能用于函数组件。' +
        'Render Props：组件通过 prop 接收一个函数来渲染内容（<DataProvider render={data => <UI />} />）。灵活但代码嵌套。Hooks 出现后大部分场景可替代。',
    },
    {
      title: '7. 受控组件和非受控组件的区别？',
      content:
        '受控组件：表单值由 React state 控制（value + onChange）。数据源唯一，实时验证/格式化方便，但每次都重渲染。' +
        '非受控组件：表单值由 DOM 自身维护，通过 ref 在需要时获取（defaultValue 设初始值）。渲染次数少，性能好，适合简单表单或与第三方非 React 表单库集成。' +
        '选择：复杂表单交互（实时校验、联动）→ 受控；简单表单只提交时取值 → 非受控；大量表单项 → react-hook-form（非受控方式 + 极少的渲染）。',
    },
    {
      title: '8. Context API 的使用场景和性能问题？如何优化？',
      content:
        'Context 用于跨层级传递数据（主题、语言、用户信息、路由）。问题：Context 值变化时，所有使用该 Context 的组件都会重新渲染（不论是否用到了值中变化的部分）。' +
        '优化方案：① 拆分 Context（ThemeContext、UserContext），每个只提供相关的一组值，减少不相关数据变动引起的不必要渲染；② 将 Context value 用 useMemo 稳定引用；③ 组件本身用 React.memo 包裹；④ 中间层组件跳过消费（Consumer 只在最需要的叶子节点使用）；⑤ 对于高频更新的状态（如动画值），考虑用 Zustand/Jotai 等外部状态库替代 Context。',
    },
    {
      title: '9. React 18/19 并发特性（Concurrent Features）有哪些？',
      content:
        'React 18 引入并发模式：① useTransition——将某些状态更新标记为非紧急（被高优先级任务中断不会白屏）；② useDeferredValue——延迟更新某个值，保持 UI 响应；③ Suspense——声明式等待异步数据/组件；④ Automatic Batching——自动批处理（之前只在事件回调中批处理，现在异步操作中也批处理）。' +
        'React 19（2024.12）：① React Compiler（自动记忆化）；② Server Components（RSC）稳定；③ Actions（表单处理用 action 属性替代手动 onSubmit + fetch）；④ use() hook（读取 Promise/Context 在渲染中）；⑤ useOptimistic（乐观更新）；⑥ ref 可直接作为 prop；⑦ Document Metadata 原生支持（<title> 等可直接写在组件中）。',
    },
    {
      title: '10. React 的合成事件（SyntheticEvent）是什么？和原生事件的区别？',
      content:
        '合成事件是 React 封装的事件系统，跨浏览器统一事件对象。实现了事件委托：所有事件绑定到 root 节点（React17 前是 document，17 后是 root），通过事件冒泡分发到目标组件。' +
        '区别：① 命名驼峰式 onClick 而非 onclick；② 合成事件对象在回调完成后会被回收重用（如需异步访问需调用 e.persist()，React 17+ 不再需要）；③ 阻止原生事件用 e.nativeEvent.stopPropagation()（阻止合成事件冒泡用 e.stopPropagation()）。' +
        'React 17 更改 root 节点委托的原因：便于微前端场景下多个 React 版本共存时事件隔离。',
    },
    {
      title: '11. React 的 Diff 算法（Reconciliation）原理？',
      content:
        '三条策略：① 同类型比较——同层同类型节点，保留 DOM，只更新变化的属性；② 类型改变——不同类型节点及子树全部重新创建（即使子树内容相同也全部卸载+挂载）；③ key 属性——同层节点列表通过 key 匹配，key 相同则视为同一节点，key 不同则卸载旧节点+创建新节点。' +
        '不要用索引当 key：列表顺序改变会导致 key 错位，React 错误的复用 DOM（但内容错位）或不必要的创建销毁。列表操作频繁时 key 最好用不变的唯一 ID。',
    },
    {
      title: '12. React 状态管理库有哪些？如何选择？',
      content:
        '轻量选择：① Zustand——极简 API、体积小、无 Provider 包裹、支持中间件、内置浅比较优化。② Jotai——原子化状态，类似 Recoil 替代方案，支持衍生状态（computed atom）、异步。' +
        '中等方案：③ Redux Toolkit（RTK）——Redux 官方推荐方案，createSlice 简化模板代码，内置 immer（不可变更新）、RTK Query（数据请求+缓存）。' +
        '选择建议：简单的全局状态（主题/语言/用户）→ Context 或 Zustand；复杂应用、多人协作 → RTK；原子化/组合式 → Jotai；服务端状态优先直接用 React Query（TanStack Query）管理 API 缓存。',
    },
    {
      title: '13. 如何实现一个自定义 Hook？举三个常用案例？',
      content:
        '自定义 Hook 是以 use 开头、内部可调用其他 Hooks 的函数，实现状态逻辑复用。' +
        '常用案例：① useDebounce(value, delay)——用 useState + useEffect 创建防抖值，搜索框输入防抖；② useLocalStorage(key, initialValue)——读写 localStorage，状态同步；③ usePrevious(value)——用 useRef 保存上一次的值，用于对比变化。' +
        '规则：必须以 use 开头（React 检测规则依赖于此）；只能在函数组件或自定义 Hook 中调用 Hooks；不能在条件/循环中调用（Hooks 靠调用顺序匹配状态）。',
    },
    {
      title: '14. 服务端渲染（SSR/NEXT.js）和客户端渲染（CSR）的区别？',
      content:
        'CSR：浏览器下载空白 HTML + JS，JS 执行后渲染页面。首屏慢（白屏时间长），SEO 差（爬虫可能不执行 JS），交互流畅（SPA 体验）。' +
        'SSR：服务端生成完整 HTML 返回浏览器，然后 hydration（水合——客户端 JS 接管交互）。首屏快，SEO 友好，但服务器压力大，TTFB 高。' +
        'React Server Components (RSC)：在 SSR 基础上分离服务端组件和客户端组件。服务端组件在服务器运行（可直接访问数据库/文件系统），没有 bundle 大小开销，天然流式渲染。客户端组件标记 "use client"。这是 Next.js 13+ App Router 的核心。',
    },
    {
      title: '15. useEffect 的清理函数（cleanup）在什么时候执行？',
      content:
        '清理函数在两种情况下执行：① 组件卸载时；② 下一次 effect 执行前（deps 变化时）。React 先执行上一次的清理函数，再执行本次的 effect。' +
        '常见用途：清除定时器、取消订阅、取消 fetch 请求（AbortController）、移除事件监听。' +
        '注意：Strict Mode 下 React 会执行两次 effect（mount → cleanup → mount），用于暴露缺少 cleanup 的问题。这仅在开发模式下生效，生产模式正常。',
    },
    {
      title: '16. React 中如何做性能优化？',
      content:
        '① 避免不必要的渲染：React.memo + useCallback/useMemo 组合使用；拆分 Context；列表用 key。' +
        '② 代码分割：React.lazy + Suspense 路由级和组件级懒加载。' +
        '③ 大列表：虚拟列表（react-window/react-virtuoso），仅渲染可视区域 DOM。' +
        '④ 图片：懒加载（loading="lazy"、Intersection Observer）、WebP 格式、CDN 图片处理。' +
        '⑤ 状态管理：避免滥用全局状态，尽量状态就近存放；频繁更新状态用 useRef（不触发渲染）。' +
        '⑥ 分析工具：React DevTools Profiler 定位慢组件、Chrome Performance 面板找长任务。' +
        '⑦ React 19 编译器：自动完成大部分优化（内联函数不再引发不必要的渲染）。',
    },
    {
      title: '17. Error Boundary（错误边界）怎么用？有什么局限？',
      content:
        'Error Boundary 是 React 组件，通过 getDerivedStateFromError（渲染备用 UI）和 componentDidCatch（记录错误日志）捕获子组件渲染过程中的 JS 错误，防止整个应用白屏。' +
        '定义方式：class 组件实现上述两个生命周期（函数组件无法直接定义，但 react-error-boundary 等库提供了封装）。' +
        '不能捕获的场景：① 事件处理中的错误（用 try/catch）；② 异步代码中的错误（setTimeout/Promise）；③ 服务端渲染中的错误；④ Error Boundary 自身的错误。' +
        '推荐：在根组件使用 react-error-boundary 包裹，搭配 error fallback UI。',
    },
    {
      title: '18. JSX 的本质是什么？为什么 React 要用 JSX？',
      content:
        'JSX 是 React.createElement(type, props, ...children) 的语法糖。Babel/Vite 在编译时将 JSX 转为嵌套的 createElement 调用（React 17+ 用 jsx 函数，由 import { jsx } from "react/jsx-runtime" 自动注入，无需手动 import React）。' +
        '返回结果是 VDOM 对象（{type, props, key, ref}），最终通过 ReactDOM 渲染为真实 DOM。' +
        'JSX 的优势：声明式 UI（UI = f(state)），比手动 createElement 更直观，支持 JS 表达式（{} 插值），比模板（Vue/Angular）更灵活。',
    },
  ],
}
