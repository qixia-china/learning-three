export const htmlPageConfig = {
  list: [
    {
      title: '1. HTML5 相比 HTML4 有哪些新特性？',
      content:
        '① 语义化标签：<header>、<footer>、<nav>、<article>、<section>、<aside> 等，提升可读性和 SEO。' +
        '② 表单增强：新增 input 类型（email、url、date、number、range、color 等）和属性（placeholder、required、autofocus、pattern）。' +
        '③ 多媒体：原生 <audio> 和 <video> 标签，无需 Flash 插件。' +
        '④ Canvas 和 SVG：2D/3D 绘图能力。' +
        '⑤ 本地存储：localStorage 和 sessionStorage，替代 cookie 存储大量数据。' +
        '⑥ Web Worker：多线程处理，不阻塞主线程。' +
        '⑦ WebSocket：全双工实时通信。' +
        '⑧ 地理定位：Geolocation API。' +
        '⑨ 拖拽 API：原生 Drag & Drop。' +
        '⑩ History API：pushState / replaceState 实现 SPA 路由。',
    },
    {
      title: '2. 什么是 HTML 语义化？为什么重要？',
      content:
        '语义化就是用正确的标签表达正确的内容含义，比如用 <nav> 表示导航、<article> 表示文章、<aside> 表示侧边栏，而不是全用 <div>。' +
        '好处：① 对 SEO 友好，搜索引擎能更好地理解页面结构；② 提升可访问性，屏幕阅读器能准确解读内容；③ 代码可读性高，便于团队维护；④ 移动端或 RSS 阅读器等场景下结构清晰。',
    },
    {
      title: '3. script 标签中 defer 和 async 有什么区别？',
      content:
        '两者都用于异步加载外部脚本，不会阻塞 HTML 解析。' +
        'defer：脚本下载与 HTML 解析并行，但执行要等到 HTML 解析完成后、DOMContentLoaded 事件之前；多个 defer 脚本按声明顺序依次执行。' +
        'async：脚本下载与 HTML 解析并行，但下载完成后立即执行（此时 HTML 解析可能还没结束），会阻塞解析；多个 async 脚本执行顺序不确定，谁先下载完谁先执行。' +
        '使用场景：依赖 DOM 或有顺序要求的脚本用 defer（如框架、业务代码）；独立第三方脚本用 async（如统计、广告）。',
    },
    {
      title: '4. src 和 href 属性有什么区别？',
      content:
        'src（source）用于替换/嵌入当前元素，浏览器会暂停 HTML 解析去加载资源，如 <script src="">、<img src="">、<iframe src="">。' +
        'href（hypertext reference）用于建立当前文档与引用资源之间的关联，不会阻塞解析，如 <link href="">、<a href="">。' +
        '本质区别：src 是"把资源拿过来嵌入这里"，href 是"这里引用了某个资源"。这也是为什么 <script> 放底部或用 defer/async、而 <link> 不会阻塞解析的原因。',
    },
    {
      title: '5. DOCTYPE 的作用是什么？严格模式和混杂模式有什么区别？',
      content:
        'DOCTYPE 声明告诉浏览器用哪个 HTML 版本规范来解析文档。不写或写错会触发浏览器的"怪异模式（Quirks Mode）"。' +
        '标准模式（Standards Mode）：浏览器按 W3C 规范严格渲染，不同浏览器表现一致。' +
        '怪异模式（Quirks Mode）：浏览器模拟老版本 IE 的渲染行为（盒模型、图片对齐等表现不同），为了兼容老旧网页。' +
        'HTML5 只需写 <!DOCTYPE html>，简洁且统一触发标准模式。',
    },
    {
      title: '6. 行内元素、块级元素、空元素各有哪些？区别是什么？',
      content:
        '块级元素：独占一行，可设宽高和 margin/padding。如 <div>、<p>、<h1>~<h6>、<ul>、<ol>、<li>、<header>、<footer>、<section>、<article>、<table>、<form>。' +
        '行内元素：不换行，宽高由内容决定，margin/padding 仅左右生效。如 <span>、<a>、<strong>、<em>、<b>、<i>、<label>、<img>（行内替换元素，可设宽高）。' +
        '行内块元素（inline-block）：不换行但可设宽高。如 <img>、<input>、<button>、<select>。' +
        '空元素（自闭合标签）：没有内容和结束标签。如 <br>、<hr>、<img>、<input>、<link>、<meta>、<source>、<area>、<base>、<col>。',
    },
    {
      title: '7. Canvas 和 SVG 的区别是什么？',
      content:
        'Canvas：位图（像素级），通过 JS 绘图，依赖分辨率，放大会失真；修改图形需要擦除重绘；适合游戏、图表、图像处理、大量对象的场景；性能取决于像素数量。' +
        'SVG：矢量图（XML 描述），不依赖分辨率，放缩不失真；每个图形都是 DOM 节点，可直接用 CSS/JS 操控，支持事件绑定；适合图标、地图、数据可视化等图形数量较少的场景；图形数量多时 DOM 开销大导致性能下降。',
    },
    {
      title: '8. localStorage、sessionStorage 和 cookie 的区别？',
      content:
        '存储大小：cookie 约 4KB；localStorage 和 sessionStorage 通常 5~10MB。' +
        '有效期：cookie 可设置过期时间（Expires/Max-Age）；localStorage 永久存储除非手动删除；sessionStorage 关闭标签页即清除。' +
        '作用域：cookie 和 localStorage 同源共享；sessionStorage 仅限同一标签页。' +
        '与服务器交互：cookie 每次 HTTP 请求自动携带到服务器；localStorage 和 sessionStorage 纯客户端存储，不自动发送。' +
        'API：cookie 操作繁琐（document.cookie）；Web Storage 有 setItem/getItem/removeItem/clear 简洁 API。',
    },
    {
      title: '9. meta 标签有哪些常用属性？viewport 的作用是什么？',
      content:
        '常用 meta 标签：charset（字符编码 UTF-8）、name="description"（页面描述，影响 SEO）、name="keywords"（关键词）、name="author"（作者）、http-equiv="X-UA-Compatible"（IE 兼容模式）、name="robots"（爬虫索引规则）、name="viewport"（移动端视口）。' +
        'viewport 详解：<meta name="viewport" content="width=device-width, initial-scale=1.0">。width=device-width 让页面宽度等于设备宽度；initial-scale=1.0 设置初始缩放比例；还可设置 minimum-scale、maximum-scale、user-scalable（是否允许用户缩放）。这是移动端适配的基础。',
    },
    {
      title: '10. title 与 h1、b 与 strong、i 与 em 的区别是什么？',
      content:
        'title vs h1：title 在 <head> 中，定义网页标题（浏览器标签页显示、搜索引擎结果标题），对 SEO 权重极高；h1 在 <body> 中，是页面内容的一级标题，一个页面建议只有一个 h1。' +
        'b vs strong：b（bold）纯视觉加粗，无语义；strong 表示"重要内容"，屏幕阅读器会加重朗读，有语义价值。' +
        'i vs em：i（italic）纯视觉斜体；em（emphasis）表示"强调"，屏幕阅读器会改变语调。HTML5 中 b 和 i 被重新定义为"样式偏移"标签，但仍无语义强调。',
    },
    {
      title: '11. label 标签的作用是什么？如何使用？',
      content:
        'label 为表单控件提供标注文本，提升可用性和可访问性：点击 label 文本会自动聚焦到关联的表单元素。' +
        '两种绑定方式：① 显式绑定——<label for="username">用户名</label><input id="username" type="text">' +
        '② 隐式绑定——<label>用户名 <input type="text"></label>（把 input 包在 label 里面）。' +
        '推荐显式绑定，兼容性和语义更清晰。',
    },
    {
      title: '12. img 的 srcset 属性有什么作用？',
      content:
        'srcset 实现响应式图片，让浏览器根据不同屏幕密度（DPR）或视口宽度选择最合适的图片资源，节省带宽并提升加载速度。' +
        '示例：<img src="photo-800.jpg" srcset="photo-400.jpg 400w, photo-800.jpg 800w, photo-1200.jpg 1200w" sizes="(max-width: 600px) 100vw, 50vw" alt="">。' +
        '其中 400w/800w 是图片实际宽度描述符；sizes 告诉浏览器在不同媒体条件下图片的显示尺寸。' +
        '配合 <picture> 标签和 source 元素可实现艺术指导（art direction）——不同断点显示不同裁剪的图片。',
    },
    {
      title: '13. iframe 有哪些优缺点？',
      content:
        '优点：① 嵌入第三方内容（地图、视频、广告）沙箱隔离；② 安全隔离，父子页面 JS 不互通（同源除外）；③ 可并行加载，不阻塞主页面解析。' +
        '缺点：① 阻塞主页面的 onload 事件；② SEO 不友好，搜索引擎对 iframe 内容索引能力弱；③ 每个 iframe 创建独立的渲染上下文，内存开销大；④ 跨域通信需 postMessage，增加复杂度；⑤ 移动端适配和响应式体验差。',
    },
    {
      title: '14. Web Worker 是什么？有哪些类型？',
      content:
        'Web Worker 让 JS 在后台线程运行，不阻塞主线程（UI 线程），解决 CPU 密集任务导致页面卡顿的问题。' +
        '类型：① Dedicated Worker（专用 Worker）——只能被创建它的页面使用；② Shared Worker——同源的多个页面/iframe 共享同一个 Worker 实例；③ Service Worker——充当网络代理，拦截请求，实现离线缓存、推送通知、后台同步。' +
        '限制：Worker 无法访问 DOM、window、document；与主线程通过 postMessage 通信（数据是拷贝的，大数据用 Transferable 对象提升性能）。',
    },
    {
      title: '15. data-* 自定义属性有什么用途？',
      content:
        'data-* 是 HTML5 提供的自定义数据属性，用于在 HTML 元素上存储与当前元素相关的额外信息，无需借助非标准属性或 DOM 隐藏节点。' +
        '示例：<div data-user-id="123" data-role="admin">。JS 读取：element.dataset.userId（注意连字符转驼峰）。CSS 也可通过属性选择器 [data-role="admin"] 匹配。' +
        '常见场景：前端框架（Vue/React）的 key/标识、埋点数据绑定、组件间传递元信息。注意不要存储敏感数据，用户可见。',
    },
    {
      title: '16. HTML5 离线存储怎么实现？',
      content:
        '方式一（已废弃）：Application Cache（AppCache），通过 manifest 文件声明缓存清单，已从 Web 标准中移除。' +
        '方式二（推荐）：Service Worker + Cache API。SW 拦截网络请求，优先从 Cache Storage 返回缓存内容，实现离线可用。' +
        '工作流程：注册 SW → install 事件预缓存关键资源 → activate 事件清理旧缓存 → fetch 事件策略（Cache First / Network First / Stale While Revalidate）。' +
        '结合 Web App Manifest 可实现 PWA，让 Web 应用像原生 App 一样离线运行。',
    },
    {
      title: '17. 重排（Reflow）和重绘（Repaint）的区别？如何减少？',
      content:
        '重排（Reflow）：元素的几何属性（位置、尺寸）发生变化，浏览器需重新计算布局，开销大。触发操作：增删 DOM、修改宽高/边距、改变字体、resize 窗口、读取 offsetHeight 等属性。' +
        '重绘（Repaint）：元素外观（颜色、背景、阴影）改变但不影响布局，只需重新绘制像素，开销相对较小。' +
        '减少策略：① 批量 DOM 操作用 documentFragment 或 display:none 离线处理；② 避免逐条修改样式，用 classList 切换类名；③ 动画用 transform/opacity（只触发合成，不触发重排）；④ 缓存需要反复读取的布局属性值（offsetTop 等）；⑤ 复杂动画用 position:absolute/fixed 脱离文档流。',
    },
    {
      title: '18. 什么是 Web Components？包含哪些核心技术？',
      content:
        'Web Components 是浏览器原生的组件化方案，允许创建可复用、封装的自定义 HTML 元素，不依赖任何框架。' +
        '三大核心技术：① Custom Elements——通过 customElements.define() 注册自定义标签（如 <my-dialog>），有生命周期回调（connectedCallback、disconnectedCallback、attributeChangedCallback）。' +
        '② Shadow DOM——创建隔离的 DOM 子树，内部样式和结构对外部不可见，做到真正的样式封装（类似 Vue 的 scoped）。' +
        '③ HTML Templates——<template> 和 <slot> 定义组件结构和内容分发。' +
        '各框架也在向 Web Components 靠拢或互操作，是前端组件化的未来标准方向。',
    },
    {
      title: '19. 浏览器如何解析和渲染 HTML？（从输入 URL 到页面展示）',
      content:
        '① 解析 HTML，生成 DOM 树。② 解析 CSS，生成 CSSOM 树。③ 将 DOM 和 CSSOM 合并成 Render 树（只含可见节点）。④ 布局（Layout/Reflow）：计算每个节点的位置和尺寸。⑤ 绘制（Paint）：将各节点绘制到屏幕像素。⑥ 合成（Composite）：分层合并显示。' +
        '关键点：CSS 会阻塞 Render 树的构建（所以才要把 CSS 放头部尽快加载）；JS 会阻塞 DOM 解析（所以 script 放底部或用 async/defer）；遇到没有 async/defer 的 script 时，HTML 解析暂停，等 JS 下载并执行完再继续。',
    },
  ],
}
