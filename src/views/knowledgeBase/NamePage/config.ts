export const namePageConfig = {
  list: [
    {
      title: '1. 变量和函数命名规范有哪些？为什么好的命名很重要？',
      content:
        '命名是代码可读性的基石。好命名的原则：① 见名知意（意图揭示）——用动词+名词描述函数做什么，用名词描述变量是什么；② 避免缩写和单字母（除循环变量 i/j/k、约定俗成如 id/url/db）；③ 布尔值用 is/has/can/should 前缀。' +
        '常见规范：camelCase（JS/TS 变量和函数）、PascalCase（类/组件/接口/类型）、UPPER_SNAKE_CASE（常量/枚举值）、kebab-case（CSS 类名/文件名/URL）。' +
        '面试金句："代码读的次数远多于写的次数"，好命名减少注释需求，本身就是文档。',
    },
    {
      title: '2. CSS 类命名规则有哪些？BEM 规范是什么？',
      content:
        'BEM（Block Element Modifier）：Block（独立组件，如 .card）、Element（组件的组成部分，用 __ 连接，如 .card__title）、Modifier（状态/变体，用 -- 连接，如 .card--highlighted、.card__title--large）。' +
        '其他方案：① SMACSS——按类别分类（Base/Layout/Module/State/Theme）；② OOCSS——分离结构与皮肤（.btn + .btn-primary）；③ Atomic CSS/Utility-first（Tailwind 类名如 .flex .text-center .p-4）；④ CSS Modules（构建时唯一化类名）。' +
        '选择建议：组件化项目（Vue/React）天然隔离，不需要严格的 BEM；全局样式或大型非组件项目 BEM 仍然有效。',
    },
    {
      title: '3. Git 分支命名和 Commit Message 规范？',
      content:
        '分支命名：feature/add-login、bugfix/fix-login-error、hotfix/security-patch、release/v1.2.0、chore/update-deps。前缀清晰表达意图。' +
        'Commit Message：Conventional Commits 规范——<type>(<scope>): <description>。type：feat（新功能）、fix（修复）、docs（文档）、style（格式）、refactor（重构）、perf（性能）、test（测试）、chore（构建/工具）、ci（CI 配置）。' +
        '示例：feat(auth): add JWT token refresh mechanism。关联 issue 号放在 body 或 footer（Refs #123, Closes #456）。',
    },
    {
      title: '4. 文件和目录命名的最佳实践？',
      content:
        '文件和目录名全小写，单词间用连字符分隔（kebab-case），如 user-profile.ts、api-service.ts。' +
        '组件文件：Vue 推荐 PascalCase（UserProfile.vue）或多单词命名（避免与 HTML 元素冲突）。React 一般 PascalCase（UserProfile.tsx）。' +
        '目录结构按功能/模块组织而非按文件类型。如 user/（含 api.ts、components/、store.ts）优于 api/user.ts + components/UserCard.vue 这种分散结构。' +
        '测试文件：与被测文件同目录 + .test.ts 或 .spec.ts 后缀，或在 __tests__/ 子目录。',
    },
    {
      title: '5. 数据库表和字段命名规范？',
      content:
        '表名：复数或单数全小写，下划线分隔（snake_case），如 users、order_items。避免关键字（如 order 是 SQL 关键字）。' +
        '字段名：snake_case，如 created_at、updated_at、is_active。主键统一用 id（UUID 或自增整数）。外键：关联表名_字段名（user_id）。' +
        '索引命名：idx_表名_字段名（idx_users_email）。唯一索引：udx_表名_字段名。MongoDB 集合用小写复数 + 尽量简短（users 优于 user_collection）。',
    },
    {
      title: '6. API 端点（Endpoint）命名规范？',
      content:
        'RESTful 风格：资源名词复数形式，/api/users、/api/users/:id/articles。避免动词（/api/getUsers ❌）。' +
        '嵌套资源不超过 2 层：/api/users/:id/orders/:orderId/items（三层勉强可接受）。' +
        '版本控制：URL 路径版本 /api/v1/users 或请求头 Accept: application/vnd.api.v1+json。排序和过滤：查询参数 ?sort=-createdAt&status=active&page=1&limit=20。' +
        'GraphQL：类型用 PascalCase（User、Order），字段用 camelCase（isActive、createdAt），Query/Mutation 用动词+名词（getUserByEmail、createOrder）。',
    },
    {
      title: '7. 设计模式命名的"烂熟"词有哪些？',
      content:
        '日常编码中最常用的命名后缀：① *Service——业务逻辑层（UserService、PaymentService）；② *Controller——控制层/请求处理（UserController）；③ *Repository——数据访问层（UserRepository）；④ *Model——数据模型/实体。' +
        '前端常用：⑤ *Component——组件；⑥ *Hook（React 自定义 Hook——useXxx、Vue Composable——useXxx）；⑦ *Store——状态管理模块（Pinia/Zustand）；⑧ *Handler——事件/请求处理器；⑨ *Provider——Context/依赖提供者；⑩ *Util/*Helper——工具函数（命名要具体，避免万能杂物桶）。' +
        '反模式：DataProcessor、Manager、Common、Util、Misc（太通用，语义模糊）。',
    },
    {
      title: '8. TypeScript/JavaScript 中的命名约定？',
      content:
        '类型/接口：PascalCase（User、OrderItem、IUserService——接口的 I 前缀有争议，现代趋势是不加 I）。泛型参数：单字母 T 或描述性前缀（TData、TResponse）。' +
        '枚举：PascalCase 类型名 + PascalCase 值（enum Color { Red, Blue } 或字符串枚举 { Red = "red" }）。' +
        '私有属性：JS 原生私有使用 #（#count），TS 可用 private 关键字。约定上 _prefix 表示"外部不应访问"（非真私有，仅约定）。' +
        '函数：动词开头——getUser、setUserName、fetchData、handleClick、validateForm、createOrder。事件处理函数：handle + 事件描述（handleSubmit, handleInputChange）。React 事件回调 props 用 on 前缀（onClick, onSubmit），对应 HTML 事件属性。',
    },
    {
      title: '9. 中文互联网公司常见的面试命名题有哪些？',
      content:
        '① 手写代码让你"命名 5 个变量"——考核命名是否自然、语义准确；② 给一段变量名混乱的代码让你重构命名；③ 什么是匈牙利命名法？（类型前缀如 iCount、strName，现代 IDE 类型提示普及后已不推荐）；④ class="xxx" 的 xxx 怎么写（CSS 命名思路）；⑤ 用英文还是拼音？（绝对用英文——拼音是不可接受的，除非实在无法翻译的中文专有名词，如 微信→wechat 而非 weixin）。' +
        '面试要点：网上最常见的面试标题如"命名是编程中最难的事之一"就是考你对代码可维护性的理解。回答时强调——好命名的标准是"别人不用读注释就能理解代码意图"。',
    },
    {
      title: '10. 代码整洁之道（Clean Code）中的命名原则？',
      content:
        'Robert C. Martin《Clean Code》命名章节核心规则：① 名副其实——选能回答"为什么存在/做什么/怎么用"的名字；② 避免误导——accountList 不是 List 就不要叫 List；③ 有意义的区分——a1/a2/data/info 无意义，productInfo 和 productData 区别在哪？；④ 读得出来的名字——genymdhms（生成日期年月日时分秒）→ generationTimestamp；⑤ 可搜索的名字——单字母只在短小的局部作用域中使用；⑥ 类/对象用名词，方法用动词；⑦ 一词一义——不要 fetch/retrieve/get 在项目里混用指同一行为；⑧ 添加有意义的语境——不能仅靠前缀，通过有意义的容器类/命名空间提供语境。',
    },
  ],
}
