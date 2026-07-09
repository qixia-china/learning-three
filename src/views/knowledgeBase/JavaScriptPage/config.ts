export const javaScriptPageConfig = {
  list: [
    {
      title: '1. 数据类型有哪些？typeof 和 instanceof 的区别？',
      content:
        '基本类型（7 种）：string、number、boolean、undefined、null、symbol、bigint。存储在栈内存，按值访问。' +
        '引用类型（1 种）：Object（含 Array、Function、Date、RegExp 等）。存储在堆内存，按引用访问。' +
        'typeof：检测基本类型，返回类型字符串。typeof null → "object"（历史 bug）；typeof function → "function"；typeof [] → "object"。' +
        'instanceof：检测构造函数的 prototype 是否出现在对象的原型链上，用于判断引用类型。[] instanceof Array → true。' +
        '更精确的方法：Object.prototype.toString.call(val) 返回 "[object Type]"；Array.isArray()。',
    },
    {
      title: '2. var、let、const 的区别？暂时性死区是什么？',
      content:
        'var：函数作用域，可重复声明，变量提升（声明提升但初始化为 undefined），全局作用域下会挂到 window 对象。' +
        'let/const：块级作用域 {}，不可重复声明，存在暂时性死区（TDZ——声明前访问会报 ReferenceError，不会初始化为 undefined），全局作用域下不挂 window。' +
        'const 额外要求：声明时必须初始化，且基本类型值不可重新赋值（引用类型内部属性可修改）。' +
        'TDZ 的本质：let/const 声明的变量在进入作用域时即被"绑定"，但在执行到声明语句之前不可访问，这段时间就是 TDZ。',
    },
    {
      title: '3. 原型和原型链是什么？',
      content:
        '每个 JS 对象都有一个内部属性 [[Prototype]]（通过 __proto__ 或 Object.getPrototypeOf() 访问），指向它的原型对象。构造函数的 prototype 属性指向实例的原型。' +
        '原型链：当访问对象属性时，先在自身查找，找不到则沿着 __proto__ 逐级向上查找，直到 Object.prototype（终点，__proto__ 为 null）。这是 JS 实现继承的机制。' +
        '经典关系：实例.__proto__ === 构造函数.prototype；构造函数.prototype.constructor === 构造函数；构造函数.prototype.__proto__ === Object.prototype。' +
        'ES6 class 本质是原型继承的语法糖。',
    },
    {
      title: '4. 闭包是什么？有哪些应用场景？会引起什么问题？',
      content:
        '闭包：函数能够访问其外部作用域中变量的能力，即使外部函数已经执行完毕。本质是内部函数引用外部函数的变量导致外部作用域无法被 GC 回收。' +
        '应用场景：① 数据私有化/模块模式（IIFE 创建私有变量）；② 函数工厂（创建定制函数，如 bind 的部分应用）；③ 事件回调保持状态；④ 防抖/节流中保存 timer；⑤ 循环中正确获取索引（或用 let 块级作用域更优雅）。' +
        '问题：① 内存泄漏——不需要的闭包引用阻止 GC；② 性能——闭包查找链比局部变量慢。解决：不需要时手动释放（置为 null）。',
    },
    {
      title: '5. this 指向规则有哪些？如何改变 this 指向？',
      content:
        'this 指向由调用方式决定（非定义时）：① 默认绑定——独立函数调用 this → window（严格模式 undefined）；② 隐式绑定——obj.fn()，this → obj；③ 显式绑定——call/apply/bind 指定 this；④ new 绑定——new Fn()，this → 新创建的空对象；⑤ 箭头函数——无自己的 this，继承外层作用域的 this（定义时确定，无法被改变）。' +
        '优先级：new > 显式绑定（bind）> 隐式绑定 > 默认绑定。' +
        '改变 this：fn.call(thisArg, arg1, arg2)、fn.apply(thisArg, [args])、fn.bind(thisArg)（返回新函数，永久绑定）。',
    },
    {
      title: '6. Promise 是什么？async/await 的原理？',
      content:
        'Promise 是异步编程方案，有三种状态：pending → fulfilled / rejected，状态不可逆。实例方法：then/catch/finally；静态方法：all/allSettled/race/any/resolve/reject。' +
        'Promise.all：全部成功才成功，一个失败即失败（失败不取消其他请求，只是不等待）。Promise.allSettled：等全部完成，返回每项 {status, value/reason}。Promise.race：第一个完成的决定结果。Promise.any：第一个成功即成功，全失败才 AggregateError 失败。' +
        'async/await 是 Promise 的语法糖。async 函数返回 Promise；await 暂停函数执行等待 Promise resolve，内部是 Generator + 自动执行器的语法糖。错误处理用 try/catch 包裹 await。',
    },
    {
      title: '7. 事件循环（Event Loop）机制？宏任务和微任务分别有哪些？执行顺序？',
      content:
        'JS 是单线程的，事件循环是异步调度的核心机制。一次循环：① 执行一个宏任务（从宏任务队列取一个）；② 清空所有微任务（微任务队列全部执行完，包括执行过程中新加的微任务）；③ 可能渲染更新（requestAnimationFrame）；④ 继续下一轮。' +
        '宏任务：script 整体、setTimeout、setInterval、I/O、UI 渲染、setImmediate(Node)、MessageChannel。' +
        '微任务：Promise.then/catch/finally、MutationObserver、queueMicrotask()、process.nextTick(Node)。' +
        '经典题：console.log(1); setTimeout(()=>console.log(2),0); Promise.resolve().then(()=>console.log(3)); console.log(4); → 1,4,3,2。',
    },
    {
      title: '8. 深浅拷贝的区别？如何实现？',
      content:
        '浅拷贝：只复制对象第一层属性，内部引用类型共享同一内存地址。方法：Object.assign({}, obj)、展开运算符 {...obj}、数组的 slice/concat。' +
        '深拷贝：递归复制所有层级，新旧对象完全独立。方法：① JSON.parse(JSON.stringify(obj))——简单但有局限（忽略 undefined/函数/Symbol/循环引用）；② structuredClone()——浏览器原生 API，支持循环引用、大部分内置类型，不支持函数和 Symbol；③ lodash _.cloneDeep()；④ 手写递归 + WeakMap 解决循环引用。',
    },
    {
      title: '9. 防抖（Debounce）和节流（Throttle）的区别？手写实现？',
      content:
        '防抖：连续触发只执行最后一次。场景：搜索框输入（等用户停止输入再发请求）、窗口 resize 完成后再计算。' +
        '节流：固定时间间隔只执行一次。场景：滚动加载更多、按钮高频点击限流。' +
        '核心实现——防抖：每次触发清空旧 timer，重新计时（最后一次生效）。节流：记录上次执行时间，间隔不够不执行（也可是第一次立即执行，间隔内忽略后续触发）。',
    },
    {
      title: '10. ES6+ 新增了哪些重要特性？',
      content:
        'let/const、箭头函数（无自己的 this/arguments/prototype）、模板字符串、解构赋值（数组/对象）、展开/剩余运算符（...）、class（含 extends/super/static/#私有字段）、模块化（ESM import/export）、Promise、Symbol、Map/Set/WeakMap/WeakSet、Proxy/Reflect、Generator/Iterator、for...of、可选链（?.）、空值合并（??）、BigInt、globalThis、Array.prototype.flat/flatMap、Object.fromEntries()、String.prototype.trimStart/trimEnd、Promise.allSettled/any、逻辑赋值运算符（&&=、||=、??=）、顶层 await（ES2022）、Array.prototype.toSorted/toReversed/toSpliced/with（ES2023 不可变数组方法）、Temporal（ES2025 新日期 API，取代 Date）。',
    },
    {
      title: '11. Map 和 WeakMap、Set 和 WeakSet 的区别？',
      content:
        'Map vs Object：Map 的键可以是任意类型（包括对象）；保持插入顺序；可直接迭代（forEach、for...of）；有 size 属性；频繁增删性能优。' +
        'WeakMap：键必须是对象；键是弱引用（当键对象被 GC 回收时对应条目自动移除）；不可枚举、无 size；适合存储与对象关联的私有/临时数据（如 DOM 节点元数据、私有属性）。' +
        'Set 类似 Map 的值集合；WeakSet 成员必须为对象且弱引用。使用场景：Set 去重、WeakSet 标记对象是否被访问过（DOM 遍历去重）。',
    },
    {
      title: '12. 跨域有哪些解决方案？CORS 原理？',
      content:
        '同源策略限制：协议、域名、端口三者相同才可访问。跨域方案：① CORS（后端设 Access-Control-Allow-Origin 等响应头，最正规方案）；② JSONP（利用 script 标签不受同源限制，只支持 GET，老旧方案）；③ 代理服务器（开发时 Vite proxy，生产 Nginx 反向代理）；④ postMessage + iframe（跨文档通信）；⑤ WebSocket（不受同源策略限制）；⑥ 浏览器插件/关闭安全策略（仅开发调试）。' +
        'CORS 简单请求：GET/HEAD/POST + 特定 Content-Type，直接发请求检查响应头；预检请求（Preflight）：OPTIONS 预检确认服务器允许后再发实际请求（复杂请求如 PUT/DELETE/自定义头/非简单 Content-Type）。',
    },
    {
      title: '13. 事件委托（事件代理）是什么？有什么优点？',
      content:
        '事件委托利用事件冒泡，在父元素上绑一个事件处理器，通过 event.target 判断实际触发元素来代理子元素的事件处理。' +
        '优点：① 减少事件绑定数量（列表有 1000 个 li 只需给 ul 绑一次），节省内存；② 动态添加的子元素自动具有事件响应（无需重新绑定）。' +
        '局限：focus/blur/scroll 等不冒泡的事件无法委托；事件委托中 event.target 可能不是期望元素（点击子元素内部的 span，target 是 span 而非 li，需用 closest 或 matches 判断）。',
    },
    {
      title: '14. 模块化：CommonJS 和 ES Module 的区别？',
      content:
        'CommonJS（Node.js 默认）：运行时加载，同步；require() 引入，module.exports 导出；输出值的拷贝（基本类型值拷贝，引用类型引用拷贝）；支持动态引入（require 可以在任何地方调用）。' +
        'ESM（浏览器标准）：编译时加载（静态分析），支持 Tree Shaking；import/export 语法；输出值的引用（实时绑定——导入方随导出方变化）；import 声明提升到模块顶部，import() 动态导入返回 Promise。' +
        'Node.js 中 .mjs 或 package.json "type":"module" 使用 ESM；__dirname/require 在 ESM 中需用 import.meta.url/createRequire 替代。',
    },
    {
      title: '15. 垃圾回收（GC）机制是怎样的？如何避免内存泄漏？',
      content:
        'V8 引擎 GC 策略：① 分代回收——新生代（Scavenge，半空间复制，存活对象晋升老生代）；② 老生代（Mark-Sweep 标记清除 + Mark-Compact 标记整理 解决碎片）。' +
        '核心算法：可达性分析——从根对象（全局对象、当前执行栈）出发，无法到达的对象被回收。' +
        '常见内存泄漏：① 未清理的定时器/事件监听；② 闭包中引用不再需要的变量；③ 全局变量/挂 window 对象的属性；④ 被遗忘的 DOM 引用（移除 DOM 但 JS 仍持有引用）；⑤ 循环引用（现代引擎通过标记清除已解决大部分）。' +
        '排查工具：Chrome DevTools Memory 面板（Heap Snapshot、Allocation Timeline）。',
    },
    {
      title: '16. for...in 和 for...of 的区别？',
      content:
        'for...in：遍历对象可枚举的键（key），包括原型链上的属性（可用 hasOwnProperty 过滤）。适合遍历普通对象。遍历数组拿到的是索引字符串。' +
        'for...of：遍历可迭代对象的值（value），通过 Symbol.iterator 接口获取迭代器。支持 Array、Map、Set、String、arguments、NodeList、Generator。不支持普通对象（除非手动实现 Symbol.iterator）。' +
        '建议：数组遍历用 forEach/map/filter 或 for...of 配合 entries()；对象遍历用 Object.keys()/values()/entries() 配合 for...of 或直接 for...in + hasOwnProperty。',
    },
    {
      title: '17. Proxy 和 Object.defineProperty 的区别？Vue3 为什么用 Proxy？',
      content:
        'Object.defineProperty：只能劫持对象已有属性的 get/set，无法监听新增/删除属性（Vue2 需 Vue.set/delete 弥补）；需递归遍历所有属性；对数组的监听需要重写 7 个数组方法（push/pop/shift/unshift/splice/sort/reverse）。' +
        'Proxy：代理整个对象，拦截 13 种操作（get/set/has/deleteProperty/ownKeys/apply/construct 等）；可监听新增/删除属性；不需要深度遍历（惰性代理，只在访问到嵌套对象时才创建子 proxy）；原生支持数组操作；不能 polyfill（这是 IE 不支持的原因）。' +
        'Vue3 用 Proxy 实现响应式，解决了 Vue2 的数组监听问题、新增属性检测问题，性能更好。',
    },
    {
      title: '18. 如何实现对象的深冻结（Deep Freeze）？',
      content:
        'Object.freeze() 只冻结对象自身第一层属性（浅冻结），嵌套对象仍可被修改。' +
        '深冻结实现：递归遍历所有属性，对每个对象类型调用 Object.freeze()。关键点：① 用 WeakSet 或 WeakMap 记录已冻结对象防止循环引用；② 只处理自有可枚举属性（Object.keys 或 getOwnPropertyNames）；③ 冻结后不可改的属性在严格模式下报错，非严格模式静默失败。' +
        '冻结对象常见用途：枚举常量、配置对象不可被意外修改（Vue3 中传递给组件的 props 在开发模式下会用 Proxy 包裹但不允许修改）。',
    },
    {
      title: '19. 说说你对函数式编程的理解？纯函数、高阶函数、柯里化？',
      content:
        '函数式编程（FP）核心：数据不可变（Immutability）+ 纯函数（Pure Function）。' +
        '纯函数：同样输入必定同样输出；无副作用（不修改外部状态、不操作 DOM、不发请求）。好处：可测试、可缓存（memoization）、可并行。' +
        '高阶函数：参数或返回值为函数的函数（如 map/filter/reduce、防抖节流、compose/pipe）。' +
        '柯里化：将多参数函数转化为单参数函数链。如 add(1,2,3) → curriedAdd(1)(2)(3)。核心：利用闭包收集参数，参数够用后执行原函数。好处：参数复用、延迟执行、函数组合。' +
        '函数组合（Compose/Pipe）：多个纯函数组合成新函数。compose(f,g,h)(x) = f(g(h(x)))（从右往左执行）。',
    },
  ],
}
