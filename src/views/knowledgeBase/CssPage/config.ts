export const cssPageConfig = {
  list: [
    {
      title: '1. 盒模型有哪两种？box-sizing 的区别？',
      content:
        '标准盒模型（content-box）：width/height 只包含内容区域。元素总宽度 = width + padding + border + margin。' +
        'IE 盒模型（border-box）：width/height 包含内容 + padding + border。元素总宽度 = width + margin。' +
        '实践中常用 *, *::before, *::after { box-sizing: border-box; } 全局重置，布局计算更直观。',
    },
    {
      title: '2. BFC（块级格式化上下文）是什么？如何触发？有什么作用？',
      content:
        'BFC 是独立的渲染区域，内部元素的布局不会影响外部。触发条件：① float 不为 none；② position 为 absolute/fixed；③ display 为 inline-block/table-cell/flex/inline-flex/grid；④ overflow 不为 visible。' +
        '作用：① 解决外边距折叠（父子/兄弟 margin 合并）；② 清除浮动（父元素包住浮动子元素）；③ 阻止元素被浮动元素覆盖（自适应两栏布局）。' +
        '面试常见追问：什么是外边距折叠？如何解决？（BFC、padding/border 隔开、flex/grid 布局不折叠）',
    },
    {
      title: '3. 居中一个 div 有哪些方式？（水平 + 垂直）',
      content:
        '水平居中：① 块级：margin: 0 auto（需定宽）；② 行内/文本：text-align: center；③ flex：justify-content: center。' +
        '垂直居中：① 单行文本：line-height = height；② flex：align-items: center；③ grid：place-items: center。' +
        '水平+垂直居中：① flex：justify-content: center + align-items: center；② grid：place-items: center；③ 绝对定位 + transform：position:absolute; top:50%; left:50%; transform:translate(-50%,-50%)（无需知宽高）；④ 绝对定位 + margin:auto（定宽高，四向设 0）。',
    },
    {
      title: '4. CSS 选择器优先级（权重）怎么计算？',
      content:
        '特异性（Specificity）四位值 (a, b, c, d)：a = 内联 style（1000）；b = ID 选择器数（100）；c = 类/属性/伪类选择器数（10）；d = 元素/伪元素选择器数（1）。' +
        '通用选择器 * 无权重。!important 强制最高优先级（但应避免滥用）。' +
        '示例：#nav .list li → (0,1,1,1)=111；.item:hover → (0,0,2,0)=20；div p → (0,0,0,2)=2。' +
        '注意：!important > 内联 > ID > 类 > 元素；同权重时靠后的样式覆盖靠前的。',
    },
    {
      title: '5. position 的五个值分别是什么？分别相对于谁定位？',
      content:
        'static（默认）：正常文档流，top/right/bottom/left/z-index 无效。' +
        'relative：相对自身原位置偏移，不脱离文档流，原占位保留。' +
        'absolute：脱离文档流，相对最近的已定位祖先（position 非 static），无则相对初始包含块（通常是视口）。' +
        'fixed：脱离文档流，相对浏览器视口定位，不随滚动移动。' +
        'sticky：相对滚动行为切换，滚动到阈值前为 relative，超过阈值后为 fixed（相对最近的滚动祖先）。常用做吸顶导航。',
    },
    {
      title: '6. Flexbox 布局核心属性有哪些？flex: 1 是什么的缩写？',
      content:
        '容器属性：display: flex；flex-direction（主轴方向）；justify-content（主轴对齐）；align-items（交叉轴对齐）；align-content（多行对齐）；flex-wrap（换行）；gap（间距）。' +
        '项目属性：flex-grow（放大比例，默认 0）；flex-shrink（缩小比例，默认 1）；flex-basis（初始大小，默认 auto）；align-self（单个项目覆盖 align-items）。' +
        'flex: 1 等价于 flex: 1 1 0%，即 flex-grow: 1; flex-shrink: 1; flex-basis: 0%。常与 flex: none（不伸缩）做对比。',
    },
    {
      title: '7. Grid 布局和 Flexbox 的区别？各自适用场景？',
      content:
        'Flexbox：一维布局，沿主轴排列，适合组件级别的排列（导航栏、按钮组、卡片列表的单行/单列）。内容驱动——由子元素大小决定布局。' +
        'Grid：二维布局，同时控制行列，适合页面级布局（整体骨架、仪表盘、复杂网格）。布局驱动——先定义网格结构再放置内容。' +
        '它们不是互斥的：页面骨架用 Grid，组件内部用 Flexbox。CSS 子网格（subgrid）进一步增强了组合能力。',
    },
    {
      title: '8. 响应式设计的实现方式有哪些？移动端适配方案？',
      content:
        '核心手段：① 媒体查询 @media（断点设计）；② 相对单位 rem/em/vw/vh/%；③ flex/grid 弹性布局；④ clamp()/min()/max() 流式尺寸；⑤ 响应式图片（srcset + sizes + <picture>）。' +
        '移动端适配方案：① viewport meta 标签；② rem + 动态设置根字体大小（flexible 方案）；③ vw/vh 单位直接适配（750 设计稿 1px→0.133vw）；④ 框架方案（postcss-px-to-viewport 等 postcss 插件）。' +
        '移动优先（Mobile First）：先写移动端样式，通过 min-width 媒体查询逐步增强大屏体验。',
    },
    {
      title: '9. CSS 动画：transition 和 animation 的区别？',
      content:
        'transition（过渡）：需要触发条件（hover、点击、class 变化），从状态 A 到状态 B 的平滑过渡。属性：property、duration、timing-function、delay。适合简单的交互反馈。' +
        'animation（动画）：无需触发，自动播放，可定义多个关键帧（@keyframes）实现复杂动画序列。属性：name、duration、timing-function、delay、iteration-count、direction、fill-mode、play-state。适合循环动画、入场动画。' +
        '性能提示：动画只涉及 transform 和 opacity 时，浏览器只在合成阶段处理，不触发重排重绘，性能最优。',
    },
    {
      title: '10. 伪类和伪元素的区别？常用有哪些？',
      content:
        '伪类（单冒号 :）：选择元素的特定状态。常用：:hover、:focus、:active、:visited、:first-child、:last-child、:nth-child(n)、:not()、:is()、:where()、:has()（父选择器，2024 全面支持）。' +
        '伪元素（双冒号 ::）：创建不存在于 DOM 中的虚拟元素并设置样式。常用：::before、::after（最常用，需配合 content）、::placeholder、::selection、::first-letter、::first-line。' +
        ':has() 是游戏规则改变者：parent:has(> .active) 可基于子元素状态设置父样式，以前要靠 JS 实现。',
    },
    {
      title: '11. 如何清除浮动？为什么需要清除？',
      content:
        '浮动元素脱离文档流，父元素会"高度塌陷"（不计算浮动子元素高度），影响后续布局。' +
        '清除方案：① 父元素设 overflow: hidden/auto（触发 BFC）；② 父元素末尾加空块级元素 clear: both；③ 父元素 ::after 伪元素 clearfix（经典方案）：.clearfix::after { content: ""; display: block; clear: both; }' +
        '④ 父元素设 display: flow-root（最简洁的现代方案，直接触发 BFC）。现代布局优先用 flex/grid 替代浮动。',
    },
    {
      title: '12. display: none、visibility: hidden、opacity: 0 的区别？',
      content:
        'display: none：元素从渲染树中完全移除，不占空间，触发重排；子元素无法显示；无法绑定事件。' +
        'visibility: hidden：元素占位保留，不触发重排（只重绘）；子元素设 visibility: visible 可显示；无法绑定事件。' +
        'opacity: 0：元素占位保留，视觉上透明；子元素无法单独显示；仍可绑定点击事件（除非配合 pointer-events: none）；可做动画过渡；触发合成层。',
    },
    {
      title: '13. CSS 层叠上下文（Stacking Context）是什么？z-index 失效的原因？',
      content:
        '层叠上下文是元素在 z 轴上的渲染层级概念。触发条件：position 非 static + z-index 非 auto；opacity < 1；transform、filter、perspective 非 none；will-change；isolation: isolate 等。' +
        '常见 z-index 失效原因：① 忘记设 position（z-index 仅对定位元素生效）；② 父元素层叠上下文层级低于目标覆盖元素（子元素 z-index 再大也只在父级层叠上下文内比较）；③ flex/grid 子项可直接用 z-index 无需定位（例外情况）。' +
        '调试技巧：给元素设 background 色查看覆盖关系，利用浏览器 DevTools Layers 面板分析。',
    },
    {
      title: '14. CSS 变量（自定义属性）怎么用？和 Sass 变量的区别？',
      content:
        'CSS 变量：通过 --name 定义，var(--name) 使用，在 :root 或任何选择器下声明。特性：① 继承——子元素可访问父元素定义的变量；② 动态——可通过 JS 修改（element.style.setProperty("--name", value)），Sass 变量编译后固定；③ 可结合 fallback：var(--color, red)。' +
        'Sass 变量：编译时处理，$ 前缀定义，编译后替换为实际值，无法在运行时修改。适合不需要运行时变化的常量。' +
        '最佳实践：主题色、间距等全局设计 tokens 用 CSS 变量（配合暗黑模式切换），构建时不变的配置用 Sass 变量。',
    },
    {
      title: '15. CSS 性能优化有哪些关键点？',
      content:
        '① 选择器优化：避免深层嵌套（浏览器从右向左匹配）、少用通配符 * 和标签+通用选择器组合。' +
        '② 渲染性能：动画只用 transform 和 opacity（跳过 Layout 和 Paint，直达 Composite）；用 will-change 或 transform:translateZ(0) 预先提升合成层（GPU 加速），但勿滥用（层爆炸增加内存）。' +
        '③ 加载性能：关键 CSS 内联到 <head>；非关键 CSS 异步加载（media="print" onload 切换）；使用 CSS containment（contain 属性）限制重排重绘范围。' +
        '④ 避免布局抖动（Layout Thrashing）：批量读写样式，不在循环中交替读写几何属性（offsetHeight 等强制同步布局）。',
    },
    {
      title: '16. Sass/SCSS 常用功能有哪些？@mixin 和 @extend 的区别？',
      content:
        '常用功能：变量（$）、嵌套（& 代表父选择器）、@mixin（带参数的可复用样式块）、@extend（继承选择器样式）、@function（自定义函数）、@each/@for/@while（循环）、@if/@else（条件）、@use/@forward（模块化）、内置函数（darken()、lighten() 等）。' +
        '@mixin vs @extend：@mixin 每次调用生成独立样式副本（体积大但清晰），可传参；@extend 将多个选择器合并输出（输出小但难以维护，选择器顺序不可控）。现代建议优选 @mixin，gzip 压缩后体积差异可忽略。',
    },
    {
      title: '17. 什么是 CSS Modules？和 Scoped CSS 的区别？',
      content:
        'CSS Modules：构建时将类名哈希化生成唯一类名（如 .title → .title_abc123），彻底隔离样式冲突。在 JS/TS 中 import styles from "./x.module.css"，通过 styles.title 使用。' +
        'Scoped CSS（Vue）：通过 data-v-xxx 属性选择器限定样式作用范围，组件内样式只对当前组件生效。' +
        '区别：CSS Modules 是构建方案，框架无关；Scoped 是 Vue 单文件组件的特性。CSS Modules 类名完全唯一化，Scoped 通过属性选择器增加权重来限制作用域。',
    },
    {
      title: '18. 回流（Reflow）和重绘（Repaint）什么 CSS 操作会触发？如何避免？',
      content:
        '触发回流的 CSS 操作：修改 width/height、padding/margin/border、display、position、font-size、text-align、float、overflow；读取 offsetHeight/offsetWidth/scrollTop/clientHeight 等（强制同步布局）。' +
        '触发重绘：修改 color、background、box-shadow、border-color、visibility、outline 等不影响布局的属性。' +
        '避免策略：① 动画用 transform + opacity；② 用 classList 批量修改样式而非逐条改 style；③ 离线 DOM 操作（documentFragment、display:none → 修改 → 恢复）；④ 对频繁变化的元素使用 position: absolute/fixed 使其脱离文档流，减少全局回流。',
    },
  ],
}
