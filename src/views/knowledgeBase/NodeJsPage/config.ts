export const nodeJsPageConfig = {
  list: [
    {
      title: '1. 事件循环（Event Loop）在 Node.js 中分哪几个阶段？',
      content:
        'Node.js 事件循环分为 6 个阶段，每个阶段有一个 FIFO 回调队列：① timers——执行 setTimeout/setInterval 到期回调；② pending callbacks——执行延迟到下一轮的 I/O 回调；③ idle, prepare——内部使用；④ poll——轮询获取新的 I/O 事件（epoll/kqueue），执行 I/O 回调（除 close 回调和定时器外）。若 poll 队列为空，检查是否有 setImmediate 或到期 timer，有则进入对应阶段，无则阻塞等待；⑤ check——执行 setImmediate 回调；⑥ close callbacks——执行 close 事件回调（socket.on("close")）。' +
        '每轮之间执行微任务：nextTick（优先级最高）→ Promise 微任务。process.nextTick 在任何微任务之前执行。',
    },
    {
      title: '2. process.nextTick 和 setImmediate 的区别？',
      content:
        'process.nextTick：在当前阶段结束后、进入下一阶段前立即执行（微任务最高优先级）。回调过多会阻塞事件循环（饥饿问题，一直执行 nextTick 永远不进入下一阶段）。' +
        'setImmediate：在 check 阶段执行（宏任务），在 poll 阶段之后。' +
        '调用时机影响：二者都在主模块中或都在 I/O 回调中时，setImmediate 先于 setTimeout(fn, 0)（因 poll → check 路径）；主模块中 setTimeout(fn, 0) 可能先于也可能后于 setImmediate（取决于进程启动时 timer 的注册时机，不稳定）。',
    },
    {
      title: '3. CommonJS 模块加载机制？require 的查找和缓存过程？',
      content:
        'require(X) 查找顺序：① 核心模块（fs/http/path 等）→ ② 相对路径（./X 或 ../X）→ ③ 目录（找 package.json main 字段或 index.js）→ ④ node_modules（从当前目录逐级向上查找直到根目录）。' +
        '缓存机制：require 第一次加载后模块被缓存到 require.cache 对象中，key 为模块绝对路径。之后再 require 同一模块直接返回缓存的 exports 对象（不重新执行模块代码）。' +
        '循环引用：a require b, b require a 时，a 拿到 b 的部分导出（b 未执行完的部分），可能为 undefined。解决方案：延迟调用（不立即使用导出的值）或将公共部分抽到第三个模块。',
    },
    {
      title: '4. Stream（流）是什么？有哪些类型？为什么比一次性读写好？',
      content:
        'Stream 是分块（chunk）处理数据的抽象接口，避免一次性将大数据全部读入内存。' +
        '四种类型：① Readable（可读流——fs.createReadStream、http.IncomingMessage）；② Writable（可写流——fs.createWriteStream、http.ServerResponse）；③ Duplex（双工流——同时可读可写，如 net.Socket）；④ Transform（转换流——读写中间做转换，如 zlib.createGzip）。' +
        '核心方法：pipe() 管道连接（readable.pipe(writable)）、pipeline()（自动处理错误和清理，推荐替代 pipe）、背压（backpressure）机制（写速度跟不上读速度时暂停读取）。' +
        '场景：文件拷贝、HTTP 响应大文件、日志处理、数据转换（CSV → JSON）、视频音频转码。',
    },
    {
      title: '5. Express 和 Koa 的区别？洋葱模型是什么？',
      content:
        'Express：老牌框架，生态成熟。中间件按顺序执行（线性模型），res.send() 后后续中间件无法执行。错误处理需手动 try/catch 或传给 next(err)。内置功能多（路由、静态文件、模板引擎等）。' +
        'Koa：Express 原班人马打造，更轻量。洋葱模型——请求从外到内穿过所有中间件，响应再从内到外依次返回，每个中间件可以两次处理（进入时和返回时）。用 async/await 处理异步，错误直接 try/catch。' +
        '选择：快速原型和已有 Express 生态 → Express；新项目追求现代异步风格 → Koa（或 Fastify，性能更好）。',
    },
    {
      title: '6. Buffer 是什么？有什么常用操作？',
      content:
        'Buffer 是 Node.js 处理二进制数据的类，在 TypedArray（Uint8Array）基础上封装。创建方式：Buffer.from(string)、Buffer.alloc(size)（安全清零）、Buffer.allocUnsafe(size)（快但不初始化，可能含旧敏感数据）。' +
        '场景：文件读写（fs.readFile 返回 Buffer）、网络数据收发、加密/解密、图片/视频处理、TCP 流。' +
        '注意：Buffer 实例在 Node.js 中是 Uint8Array 的子类，可在 TypedArray 上下文中使用。大 Buffer 分配在堆外内存（不占用 V8 堆限制）。',
    },
    {
      title: '7. 如何实现一个 EventEmitter？有哪些常用场景？',
      content:
        'EventEmitter 是发布-订阅模式的实现，Node.js 核心 events 模块内置。核心方法：on/once（订阅）、emit（发布）、off/removeListener（取消订阅）、removeAllListeners（取消全部订阅）、listenerCount（监听数）。' +
        '实现要点：内部维护事件名 → 回调数组的 Map；on 注册回调；emit 按顺序同步调用回调列表；once 包装回调（执行后自动移除）；error 事件特殊——无 error 监听器时 emit("error") 会直接抛出异常。' +
        '场景：服务端事件通知（http.createServer 继承自 EventEmitter）、自定义模块间通信、任务队列事件通知。',
    },
    {
      title: '8. cluster（集群）模块的工作原理？PM2 是怎么工作的？',
      content:
        'cluster 基于 Node.js 子进程实现多核利用。主进程（master）fork 多个工作进程（worker），共享同一端口（内部由主进程监听，通过 IPC 将连接句柄分发给 worker——Round-Robin 算法）。' +
        'PM2：基于 cluster 的生产级进程管理工具。功能：① 自动重启（崩溃/内存泄漏超限/定时）；② 负载均衡；③ 零停机重载（reload 逐个重启 worker）；④ 日志管理；⑤ 监控面板。' +
        '注意：状态不应在进程内存中保存（各 worker 内存独立），会话/状态需用 Redis 等外部存储。',
    },
    {
      title: '9. 中间件原理？JWT 和 Session 认证的区别？',
      content:
        '中间件是处理 HTTP 请求的函数链，每个中间件可获取 req/res 对象。可以实现：认证鉴权、日志记录、错误处理、CORS、请求限流、参数校验等。' +
        'Session 认证：服务器存储用户状态（内存/Redis），客户端带 cookie（sessionId），服务端查 session 获取用户信息。有状态，服务端压力大，不适合分布式（需共享 session 存储）。' +
        'JWT 认证：无状态，用户信息编码在 token 中（三部分：header.payload.signature），客户端在 Authorization 头携带。服务端仅需验证签名，无需存储。问题：token 签发后无法立即撤销（需黑名单或短过期+refresh token）；payload 不加密（仅 base64，敏感信息不放 jwt）。',
    },
    {
      title: '10. Node.js 的进程与线程：child_process 和 worker_threads 的区别？',
      content:
        'child_process（子进程）：创建独立的 V8 实例和内存空间。方式：spawn（流式输出，适合长时间运行）、exec（缓冲输出，适合短命令）、fork（专门创建 Node.js 子进程，自带 IPC 通道）、execFile（直接执行文件）。' +
        'worker_threads（工作线程）：同一进程内的多线程，共享内存（通过 SharedArrayBuffer），轻量级，通信开销小。' +
        '选择：CPU 密集型任务 → worker_threads（计算无需独立 Node 实例）；需要完全隔离或运行不同语言程序 → child_process。',
    },
    {
      title: '11. Node.js 错误处理最佳实践？',
      content:
        '同步错误：try/catch 捕获。异步错误：① 回调风格——错误优先回调（err, result），if (err) 处理；② Promise——.catch() 或 try/catch + await；③ EventEmitter——监听 error 事件。' +
        '全局兜底：process.on("uncaughtException")——未捕获同步异常；process.on("unhandledRejection")——未处理的 Promise 拒绝。但不要在这里"正常化"——记录日志后优雅退出（重启），因为 Node 可能处于不一致状态。' +
        'Express/Koa：统一错误处理中间件（最后一个中间件接收 err, req, res, next），返回统一错误响应格式。',
    },
    {
      title: '12. package.json 中的 dependencies 和 devDependencies 区别？peerDependencies 是什么？',
      content:
        'dependencies：生产环境运行时必需的包（express、axios、lodash）。npm install --save 或直接写入。' +
        'devDependencies：仅在开发/构建时需要的包（typescript、eslint、vite、测试工具）。npm install --save-dev。生产环境 npm install --production 时不安装。' +
        'peerDependencies：提示宿主项目也需要安装此包。用于插件开发（如 eslint-plugin-vue 声明 peerDependencies: { eslint: "^10" }），告诉用户"你需要安装 eslint，我才能正常工作"。npm 7+ 默认自动安装 peerDependencies。',
    },
    {
      title: '13. Node.js 的内存限制是多少？如何排查内存泄漏？',
      content:
        '默认内存限制（V8 堆）：64 位系统约 1.4GB（老生代），32 位约 0.7GB。可通过 --max-old-space-size（MB）和 --max-new-space-size（KB）调整。' +
        '排查工具：① process.memoryUsage()——查看 heapUsed/heapTotal/rss/external 内存使用；② Chrome DevTools——node --inspect 启动，Memory 面板做 Heap Snapshot（两次快照对比找增长对象）；③ clinic.js——性能分析套件；④ 堆转储（heapdump 包）配合 Chrome 分析。' +
        '常见泄漏原因：全局变量累积、闭包持有大对象引用、事件监听未移除、定时器未清除、流未正确关闭。',
    },
    {
      title: '14. 如何设计一个 RESTful API？',
      content:
        '核心原则：① URL 表示资源（名词复数形式），/api/users 而非 /api/getUsers；② HTTP 方法表达操作：GET（获取）、POST（创建）、PUT/PATCH（更新）、DELETE（删除）；③ 状态码语义化：200/201/204/400/401/403/404/500；④ 分页/过滤/排序通过查询参数：?page=1&limit=20&sort=createdAt&order=desc。' +
        '进阶：① 版本控制（/api/v1/... 或请求头版本）；② HATEOAS（响应中包含相关链接）；③ 字段过滤（?fields=id,name,email 减少传输）；④ 接口幂等性（GET/PUT/DELETE 幂等，POST 不幂等）；⑤ 限流（express-rate-limit）、防重放。',
    },
    {
      title: '15. 什么是微服务？Node.js 适合吗？如何通信？',
      content:
        '微服务：将单体应用拆分为多个独立部署的小服务，每个服务负责单一业务领域，独立开发/部署/扩容。' +
        'Node.js 适合微服务：① 轻量高性能（适合 I/O 密集型，API 网关/中间层）；② NPM 生态丰富；③ 快速迭代（脚本语言灵活性）。不适合：CPU 密集型计算。' +
        '通信方式：① HTTP/REST（简单通用）；② gRPC（高性能二进制协议，Protocol Buffers，支持流式，适合内部服务）；③ 消息队列（RabbitMQ/Kafka 异步解耦）；④ GraphQL（聚合多个服务数据）。服务发现用 Consul/etcd 或 K8s DNS。',
    },
    {
      title: '16. 如何实现文件上传？Multer 的原理？大文件怎么传？',
      content:
        'Multer 是 Express 的文件上传中间件，基于 busboy 解析 multipart/form-data。配置：存储引擎（DiskStorage 存磁盘/MemoryStorage 存内存）、文件大小限制、文件类型过滤。' +
        '大文件上传方案：① 分片上传——前端用 slice 切文件，并发上传分片，后端合并分片；② 断点续传——记录已上传分片，中断后从断开处继续；③ 秒传——计算文件 hash（MD5），后端已存在则跳过上传；④ 直接上传 OSS（前端拿签名直传阿里云/腾讯云 OSS，后端只处理回调通知）。',
    },
    {
      title: '17. Node.js 如何保证代码质量和安全？',
      content:
        '质量：TypeScript 类型约束、ESLint + Prettier 代码规范、单元测试（Vitest/Jest）+ 集成测试 + E2E（Playwright）、Git Hooks（husky + lint-staged）、CI/CD 自动检查。' +
        '安全：① 输入校验（XSS/SQL 注入防御，使用 express-validator/joi/zod 校验请求参数）；② 限流（rate-limit）；③ helmet 中间件（设置安全 HTTP 头）；④ CORS 白名单；⑤ 依赖安全审计（npm audit、Snyk/Dependabot）；⑥ 密钥不写代码中（环境变量 + .env 不入 git）；⑦ HTTPS 强制；⑧ 防御暴力破解（登录限流 + 账号锁定）；⑨ 安全的正则（防止 ReDoS——正则拒绝服务攻击）。',
    },
    {
      title: '18. 用过的 Node.js 设计模式有哪些？',
      content:
        '① 单例模式：模块系统天然单例（require 缓存），数据库连接、配置对象。② 观察者模式：EventEmitter（事件驱动），解耦组件间通信。③ 工厂模式：创建同一接口的不同实例（支付网关选择、存储引擎切换）。④ 中间件模式：Express/Koa 的请求处理链（责任链模式变体）。⑤ 策略模式：不同算法可互换（不同认证策略 JWT/OAuth/APIKey）。⑥ 代理模式：反向代理（http-proxy）、缓存代理。⑦ 装饰器模式：TypeScript 装饰器 + reflect-metadata（NestJS 大量使用）。⑧ 适配器模式：ORM（Prisma/TypeORM）统一接口兼容不同数据库。',
    },
  ],
}
