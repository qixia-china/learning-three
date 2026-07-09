export const vuePageConfig = {
  list: [
    {
      title: '1. Vue 2 和 Vue 3 的主要区别？',
      content:
        '响应式系统：Vue2 用 Object.defineProperty（无法检测属性新增/删除，需 Vue.set）；Vue3 用 Proxy（代理整个对象，可检测所有操作，惰性代理性能更好）。' +
        'API 风格：Vue2 以 Options API 为主；Vue3 新增 Composition API（setup/ref/reactive/watch/computed），逻辑复用更灵活。' +
        '性能：Vue3 编译优化（静态提升、PatchFlag 动态标记、Block Tree 靶向更新、事件缓存），渲染更快，包体积更小（Tree Shaking 友好）。' +
        '生命周期：destroyed → unmounted，beforeDestroy → beforeUnmount。新增：onRenderTracked/onRenderTriggered（调试用）。' +
        '其他：Teleport（传送门）、Suspense（异步组件加载状态）、Fragment（多根节点）、TS 支持更完善、createApp 替代 new Vue()。',
    },
    {
      title: '2. Vue 响应式原理？（Vue3 Proxy 实现）',
      content:
        '核心三件套：① reactive() 基于 Proxy 创建响应式对象，拦截 get/set/deleteProperty/has 等操作。② track()——get 时收集依赖（将当前 effect 副作用函数加入该属性的依赖集合）。③ trigger()——set/deleteProperty 时触发依赖执行（通知所有订阅该属性的 effect 重新运行）。' +
        'ref()：对基本类型的响应式包装，内部 new Proxy({value: xxx})。.value 访问触发 track，赋值触发 trigger。在模板中自动解包（不需要 .value）。' +
        'effect()：创建副作用函数并立即执行一次，执行过程中访问到的响应式数据会自动收集该副作用作为依赖。Vue 的 watch/watchEffect/computed 内部都基于 effect 实现。',
    },
    {
      title: '3. watch 和 watchEffect 和 computed 的区别？',
      content:
        'computed：声明式描述派生状态，有缓存（依赖不变不重新计算），必须 return 值，不能有副作用。异步计算需要用 watch + 手动赋值。' +
        'watch：侦听一个或多个响应式数据源，数据变化时执行回调，可获取 oldValue 和 newValue，支持 deep（深度侦听）和 immediate（立即执行）。适合：请求数据、操作 DOM、存储状态。' +
        'watchEffect：自动追踪回调中的响应式依赖，依赖变化则重新执行。无需显式指定数据源，无 oldValue。适合：无需对比新旧值的副作用。停止侦听：const stop = watchEffect(...); stop()。',
    },
    {
      title: '4. ref 和 reactive 的区别？什么时候用哪个？',
      content:
        'ref：包装任意类型（基本类型和引用类型），.value 访问/修改（模板中自动解包）。重新赋值整个对象不会丢失响应式。' +
        'reactive：仅用于引用类型（对象/数组），直接访问属性（不需 .value）。局限性：① 不能重新赋值整体（obj = newVal 会丢失响应式）；② 解构赋值会丢失响应式（需用 toRefs 解决）。' +
        '建议：基本类型用 ref；对象类型两种都行，ref 更灵活（可整体替换）；需要解构的响应式对象配合 toRefs。在 Composition API 中优先 ref 的趋势更明显。',
    },
    {
      title: '5. Vuex 和 Pinia 的区别？Pinia 有哪些优势？',
      content:
        'Pinia（Vue 官方推荐的状态管理库）：① API 简洁，无 mutations（actions 直接提交变更），取消 modules 扁平化设计（每个 store 是独立函数）；② 完整 TS 支持，无需额外类型声明；③ 可通过 useXxxStore() 直接引用，无需注入；④ 支持 $patch 批量更新；⑤ 可同时使用多个 store，天然支持组合。' +
        'Vuex：较重，有 state/mutations/actions/getters/modules 概念；mutations 和 actions 分离（mutation 同步，action 异步）；TypeScript 支持弱；module 命名空间复杂。' +
        '迁移建议：新项目直接使用 Pinia，Vue2 项目也可用 Pinia 替代 Vuex。',
    },
    {
      title: '6. Vue Router 路由守卫有哪些？导航解析流程？',
      content:
        '全局守卫：beforeEach（进入前，常用于权限验证）、beforeResolve（解析完成后触发）、afterEach（进入后，无 next）。' +
        '路由独享守卫：beforeEnter（路由配置中定义）。' +
        '组件内守卫：beforeRouteEnter（不能访问 this，通过 next(vm) 回调）、beforeRouteUpdate（路由参数变化复用组件时）、beforeRouteLeave（离开当前路由，可阻止导航）。' +
        '完整流程：触发导航 → 失活组件 beforeRouteLeave → 全局 beforeEach → 复用组件 beforeRouteUpdate → 路由 beforeEnter → 解析异步组件 → 激活组件 beforeRouteEnter → 全局 beforeResolve → 导航确认 → 全局 afterEach → DOM 更新 → beforeRouteEnter 的 next 回调。',
    },
    {
      title: '7. Vue 组件通信方式有哪些？',
      content:
        '① props + emit（父子）：父传子 props（单向数据流），子传父 $emit。② v-model（语法糖）：props.modelValue + emit("update:modelValue")，可绑定多个 v-model:title。③ provide/inject（跨层级）：祖先 provide，后代 inject，适合深层嵌套传值（主题、语言），非响应式需配合 computed 或 ref。④ Pinia/Vuex（全局状态）。⑤ 事件总线（Vue3 推荐 mitt 或自定义 EventEmitter 替代已移除的 $on/$off）。⑥ $refs + defineExpose（父调用子方法）。⑦ $attrs（获取父组件传递但未被 props 声明的属性）。⑧ slot（作用域插槽传递数据给父组件渲染）。',
    },
    {
      title: '8. v-if 和 v-show 的区别？v-for 中 key 的作用？',
      content:
        'v-if：条件不满足时元素完全不渲染（DOM 不存在），切换开销大，适合运行时条件很少改变的场景（如权限控制、是否登录）。' +
        'v-show：始终渲染（DOM 存在），仅切换 display: none/block，初始渲染开销大，切换开销小，适合频繁切换的场景（Tab 切换、弹窗显隐）。' +
        'v-for 的 key：Vue 用 key 标识每个节点的唯一性，diff 时复用和重排 DOM。推荐用唯一 ID 而非索引。用索引当 key 时，若列表顺序改变（增删、排序），DOM 复用可能错位导致状态错误（如输入框内容错位）。',
    },
    {
      title: '9. Vue 的生命周期有哪些？（Vue3）每个阶段能做什么？',
      content:
        '创建阶段：setup()（取代 beforeCreate 和 created，此时还没创建组件实例，不能用 this）。' +
        '挂载阶段：onBeforeMount → DOM 编译渲染 → onMounted（可访问 DOM、发 API 请求、初始化第三方库、设置定时器）。' +
        '更新阶段：onBeforeUpdate（DOM 更新前，可获取旧 DOM 状态）→ 重新渲染 → onUpdated（DOM 更新后，谨慎在此改数据防死循环）。' +
        '卸载阶段：onBeforeUnmount（清除定时器、事件监听、取消订阅）→ onUnmounted。' +
        '调试钩子（Vue3.5+）：onRenderTracked（依赖被追踪时）、onRenderTriggered（重新渲染被触发时）。keep-alive 额外：onActivated/onDeactivated。',
    },
    {
      title: '10. computed 和 watch 的实现原理？',
      content:
        'computed 基于 effect + 懒执行 + 缓存标记（dirty 标志）。内部创建一个 ComputedRefImpl，get 时检查 dirty：若 true 则执行计算函数更新缓存值并将 dirty 置 false；若 false 直接返回缓存值。依赖变化时 trigger 将 dirty 置 true（不会立即重新计算，等下次 get 才计算——惰性求值）。' +
        'watch 内部也是 effect，标记为 scheduler 模式。依赖变化时不是直接执行 effect.run()，而是将回调放入 scheduler 调度队列，在 nextTick 批处理中异步执行。deep 模式通过递归遍历属性在 get 时收集所有嵌套依赖。',
    },
    {
      title: '11. 虚拟 DOM 是什么？Vue 的 Diff 算法？',
      content:
        '虚拟 DOM 是真实 DOM 的 JS 对象抽象（{tag, props, children}），通过对比新旧 VNode 找差异，最小化真实 DOM 操作。' +
        'Vue3 Diff 优化：① 同层比较（只比较同层级，不跨层）；② 双端对比——头头、尾尾、头尾、尾头四向比较，快速排除不变的头尾节点；③ 最长递增子序列——剩余中间节点找出不需移动的最长子序列，最小化 DOM 移动次数；④ 静态标记（PatchFlag）——编译阶段标记动态节点类型（文本/属性/样式），diff 时只检查对应部分跳过静态节点。',
    },
    {
      title: '12. nextTick 的原理和用途？',
      content:
        'Vue 的 DOM 更新是异步批处理的：同一轮事件循环中多次修改数据，Vue 会将更新任务收集到队列中，在下一次事件循环的微任务或宏任务中统一执行，避免重复渲染。' +
        'nextTick 回调在 DOM 更新完成后执行，用于需要操作最新 DOM 的场景。实现：优先使用 Promise.then（微任务），降级到 MutationObserver → setImmediate → setTimeout。' +
        '常见场景：修改数据后需要获取更新后的 DOM 尺寸、聚焦输入框、滚动到底部。',
    },
    {
      title: '13. keep-alive 的原理？如何实现缓存？',
      content:
        'keep-alive 是内置抽象组件，包裹动态组件时缓存不活动的组件实例而非销毁。' +
        '原理：内部维护一个缓存 Map（key → VNode），根据组件名和 max 属性控制缓存数量（超出 max 则 LRU 淘汰最久未访问）。组件被切换时触发 deactivated 钩子（而非 destroyed），切换回来触发 activated 钩子。' +
        '配置项：include/exclude（按组件名匹配，逗号分隔或正则或数组）、max（最大缓存数）。配合路由：在路由 meta 中标记 keepAlive: true 动态控制。',
    },
    {
      title: '14. Vue 的插槽（Slot）有哪些类型？作用域插槽怎么用？',
      content:
        '默认插槽：<slot />，父组件分发的内容替换此处。具名插槽：<slot name="header" /> 配合 <template v-slot:header>（简写 #header）。作用域插槽：子组件在 slot 上绑定数据 <slot :item="item">，父组件通过 <template v-slot:default="{ item }"> 获取子组件数据，实现父组件决定渲染但子组件提供数据的模式。' +
        '本质：插槽编译成函数，参数为子传递的数据。作用域插槽常用于组件库（Table 列自定义渲染、List 自定义单项）。',
    },
    {
      title: '15. 如何封装一个 Vue 自定义指令？有哪些钩子？',
      content:
        '自定义指令通过 app.directive("name", options) 注册，用于直接操作 DOM。' +
        'Vue3 钩子（与组件生命周期对齐）：created（绑定元素属性初始化前）、beforeMount（首次绑定到元素）、mounted（元素插入 DOM）、beforeUpdate（组件更新前）、updated（组件更新后）、beforeUnmount（卸载前）、unmounted（卸载后）。' +
        '参数：el（元素）、binding（{value, oldValue, arg, modifiers, instance, dir}）、vnode、prevVnode。' +
        '案例：v-permission（权限控制）、v-loading（加载状态）、v-lazy（图片懒加载）、v-click-outside（点击外部关闭）。',
    },
    {
      title: '16. Vue 中如何实现"高性能"表单？',
      content:
        '① v-model.lazy（change 而非 input 更新，减少更新频率）；② 表单项级封装组件避免整体重渲染；③ 大量表单项避免用 v-model 双向绑定所有字段，考虑提交时统一收集；④ 动态表单按需渲染（v-for 渲染的字段用 key 优化）。' +
        '⑤ 使用浅层响应式 shallowRef/shallowReactive（对不需要深度监听的表单大量数据提升性能）；⑥ 防抖搜索输入；⑦ 组件使用 v-memo 缓存子树（Vue3.2+），在依赖不变时跳过该子树 diff。',
    },
    {
      title: '17. Vue3 编译优化做了哪些？',
      content:
        '① 静态提升（Static Hoisting）：将静态 VNode 提升到 render 函数外部（只创建一次，每次渲染复用）。② PatchFlag（动态标记）：编译时标记节点动态部分的类型（TEXT/PROPS/STYLE 等），diff 时只检查标记的部分，静态直接跳过。③ Block Tree：将 VNode 按动态节点组织成"块"，diff 时通过 dynamicChildren 直接到达动态节点，跳过中间静态层级。④ 事件缓存：onClick 等事件回调缓存在 cache 数组，避免每次渲染重新创建函数对象触发不必要的更新。⑤ v-memo：手动控制子树跳过 diff。',
    },
    {
      title: '18. Vue 项目中如何做性能优化？',
      content:
        '编码层面：① 合理使用 v-if/v-show；② computed 代替模板中复杂表达式；③ v-for 加 key 且不与 v-if 同层使用；④ 大列表用虚拟滚动（vue-virtual-scroller）；⑤ 组件异步加载（defineAsyncComponent + Suspense）；⑥ keep-alive 缓存路由组件；⑦ 事件销毁（onUnmounted 清理）。' +
        '构建层面：① 代码分割/路由懒加载；② Tree Shaking（ESM 按需导入）；③ CDN 加载大库（echarts/monaco）；④ vite-plugin-compression gzip 压缩。' +
        '运行时：① 避免大量响应式数据（非必须用 shallowRef）；② 列表事件委托；③ Web Worker 处理计算密集任务。',
    },
  ],
}
