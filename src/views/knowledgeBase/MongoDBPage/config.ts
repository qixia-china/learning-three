export const mongoDBPageConfig = {
  list: [
    {
      title: '1. MongoDB 和 MySQL 的核心区别？什么时候选 MongoDB？',
      content:
        '数据模型：MongoDB 文档型（BSON，类似 JSON），Schema-less（灵活 schema）；MySQL 关系型，表+行+列，严格 Schema。' +
        '查询语言：MongoDB 用 MQL（面向文档的查询），如 db.users.find({age: {$gt: 18}})；MySQL 用 SQL。' +
        '事务：MongoDB 4.0+ 支持多文档 ACID 事务；MySQL 天然支持。JOIN：MongoDB 用 $lookup（聚合管道），MySQL 用 JOIN。扩展：MongoDB 原生支持水平扩展（Sharding），MySQL 更依赖垂直扩展或应用层分库分表。' +
        '选 MongoDB：① 数据结构不固定/频繁变化（快速迭代）；② 文档内嵌结构（1 对少关系无需 JOIN）；③ 高写入负载；④ JSON/BSON 数据天然匹配（日志/用户画像/IoT 数据）；⑤ 水平扩展是刚需。',
    },
    {
      title: '2. 文档嵌套 vs 引用（Embedded vs Reference）如何选择？',
      content:
        '嵌套（Embedded）：子文档直接存储在父文档中。优点：一次查询获取完整数据（无 JOIN 性能好），原子更新（单文档操作天然原子性）。缺点：文档大小膨胀（16MB 上限），子文档无法独立查询。' +
        '引用（Reference）：通过子文档 ID 关联。优点：数据不冗余，独立查询灵活，不突破单文档大小限制。缺点：需额外查询或 $lookup（性能成本），无法单文档原子操作。' +
        '选择原则：① 1 对 1 和 1 对少量（如用户地址、文章标签）→ 嵌入；② 1 对多且子数据经常独立访问（如用户-文章）→ 引用；③ 1 对海量（日志、事件流）→ 引用 + 分桶模式；④ 数据读取远多于写入 → 倾向嵌入（冗余换性能）。',
    },
    {
      title: '3. MongoDB 的索引类型有哪些？如何优化查询？',
      content:
        '索引类型：① 单字段索引；② 复合索引（字段顺序影响使用——ESR 规则：Equality 等值 → Sort 排序 → Range 范围）；③ 多键索引（数组字段索引）；④ 文本索引（全文搜索）；⑤ 地理空间索引（2d/2dsphere）；⑥ 哈希索引（用于分片键）；⑦ TTL 索引（自动过期删除数据）；⑧ 部分索引（只索引满足条件的文档，节省空间）；⑨ 稀疏索引（只索引有该字段的文档）；⑩ 通配符索引（索引所有字段或匹配模式的字段）。' +
        '优化：explain() 分析查询计划（关注 winningPlan 是否用索引 IXSCAN vs COLLSCAN 全表扫描）；用覆盖索引（查询字段全在索引中，无需回表）；监控慢查询（db.setProfilingLevel()）。',
    },
    {
      title: '4. 聚合管道（Aggregation Pipeline）是什么？常用阶段有哪些？',
      content:
        '聚合管道是数据处理流水线，文档依次经过多个阶段（stage），每个阶段对文档进行变换，最终输出结果。' +
        '常用阶段：$match（过滤，类似 find 条件，尽早放在管道前面利用索引）、$group（分组聚合，配合 $sum/$avg/$max/$min/$push/$addToSet）、$project（字段投影/新增/重命名）、$sort（排序）、$limit/$skip（分页）、$unwind（展开数组，每个元素生成一个文档）、$lookup（关联查询，类似 left outer join）、$facet（多维度分组，一次返回多个聚合结果）、$addFields（新增字段）、$replaceRoot（替换根文档）。' +
        '性能提示：$match 和 $sort 尽早放置；$match + $sort 在 $group 之前可利用索引。',
    },
    {
      title: '5. MongoDB 的副本集（Replica Set）和分片（Sharding）架构？',
      content:
        '副本集：一组维护相同数据集的 mongod 进程。包含一个 Primary（读写）+ 多个 Secondary（只读，异步复制 Primary 的 oplog）+ 可选的 Arbiter（仅投票，不存数据）。主要功能：高可用——Primary 故障时自动选举新 Primary（Raft 共识协议）；读写分离——读请求可路由到 Secondary（可能读到旧数据）。' +
        '分片集群：水平扩展方案。组件：① Config Server（存储集群元数据和路由信息，副本集）；② Mongos（路由代理，客户端连接，将请求路由到正确分片）；③ Shard（存储数据的副本集，数据按分片键分片存储）。' +
        '选择好的分片键（Shard Key）至关重要：高基数、均匀分布、查询模式覆盖。',
    },
    {
      title: '6. 分片键（Shard Key）如何选择？',
      content:
        '好的 Shard Key 特征：① 高基数（Cardinality）——值足够分散才能均匀分片；② 查询隔离——多数查询能路由到单个分片（避免 scatter-gather 广播查询）；③ 写入分散——避免热点（hotspot）。' +
        '策略：① 哈希分片（Hashed Shard Key）——对字段值做哈希，写入均匀但范围查询需要广播（_id 的哈希分片很常见）；② 范围分片（Ranged Shard Key）——按字段范围分配分片，范围查询高效但可能产生热点。' +
        '反例：用 "country" 做分片键——基数低，数据倾斜；自增 "userId" 做范围分片——最新数据全写入同一个分片。',
    },
    {
      title: '7. 事务（Transaction）在 MongoDB 中如何使用？有哪些限制？',
      content:
        'MongoDB 4.0+ 支持多文档事务（副本集），4.2+ 支持跨分片事务（分片集群）。与关系型数据库类似：startSession() → session.startTransaction() → 执行操作 → session.commitTransaction() / session.abortTransaction()。' +
        '限制：① 单事务默认最长 60 秒（可调 transactionLifetimeLimitSeconds）；② 事务中修改的文档不能超过 1000 个（可扩展但影响性能）；③ 对性能有显著影响（加写锁），不应在热路径大量使用；④ 事务不能用于创建/删除集合。' +
        '最佳实践：优先用文档模型设计避免事务（嵌套文档）；仅在必须保证多文档原子性时才使用事务；保持事务小而短。',
    },
    {
      title: '8. MongoDB Schema 设计模式有哪些？',
      content:
        '① 内嵌模式——直接嵌套，适合一对一或一对少量。② 引用模式——通过 ID 关联，适合多对多或经常独立查询。③ 桶模式（Bucket Pattern）——将流式数据（时序数据）分桶聚合（如每小时一桶），减少文档数量，适合 IoT/日志。' +
        '④ 多态模式（Polymorphic Pattern）——同集合不同结构的文档通过 type 字段区分，适合多种相关类型（如不同运动项目的存储）。⑤ 属性模式——将字段名转为数据（key-value 对），适合大量相似字段（如多语言属性、传感器特征）。⑥ 近似模式——少量精度损失换取大幅性能提升（如缓存统计值而非每次精确计算）。⑦ 树形模式——Parent Reference（指向父）/ Child Reference（子节点数组）/ Materialized Path（路径字符串）/ Nested Sets。',
    },
    {
      title: '9. MongoDB 中如何实现一对多和多对多关系？',
      content:
        '一对多（1:N）：① N 较小时——嵌入数组（如用户的多地址信息）；② N 较大时——引用（子文档存父 ID），例如 用户 → 博客文章，每篇文章存 authorId；③ N 海量时——引用 + 分桶，如用户 → 操作日志，日志按天桶聚合。' +
        '多对多（M:N）：通常使用双向引用。例如 学生 ↔ 课程：① 学生文档中存 courseIds 数组；② 课程文档中存 studentIds 数组；③ 或建中间集合（学生课程关联表）。选择取决于查询模式——如果总是通过学生查课程，只需学生存 courseIds 即可。',
    },
    {
      title: '10. Mongoose 的核心概念？Schema、Model、Document 的关系？',
      content:
        'Schema：定义文档结构（字段类型/默认值/校验规则等），类似关系数据库的表结构定义。Model：由 Schema 编译的构造函数，用于与特定集合（collection）交互（增删改查）。Document：Model 的实例，对应集合中的单个文档。' +
        '关系：Schema → 编译 → Model → 实例化 → Document。' +
        '常用功能：虚拟属性（virtual——不存入数据库的派生字段，如 fullName = firstName + lastName）、中间件（pre/post hooks——保存前/查询前等拦截操作）、populate（填充引用文档，类似 JOIN）、索引定义、自定义校验器、实例方法和静态方法。',
    },
    {
      title: '11. 如何优化 MongoDB 的写入性能？',
      content:
        '① 批量写入：用 bulkWrite() 或 insertMany() 替代逐条写入（减少网络往返）。② 写关注级别（write concern）：非关键数据降低 w 值（w: 0 不等待确认，最快但可能丢数据；w: "majority" 最安全但耗时长）。③ 合适的索引：索引虽加速查询，但每个索引都拖慢写入（每次写入需更新所有索引），删除不必要索引。④ SSD 存储：磁盘 I/O 是写入瓶颈。⑤ 分片：分散写入压力到多个分片。⑥ 预分配：避免频繁磁盘分配空间，可用 pad 提前占用空间。⑦ 合理使用嵌套：减少跨文档操作次数。⑧ 禁用 jounal（j: false）可提升写入但降低持久性保证。',
    },
    {
      title: '12. change streams 是什么？有什么用途？',
      content:
        'Change Streams 是 MongoDB 的实时数据变更监听机制，基于 oplog 实现。应用程序可以监听集合甚至整个数据库/集群的变更事件（insert/update/replace/delete），类似数据库级别的"触发器"通知。' +
        '特性：① 实时推送（非轮询）；② 可恢复（resume token——断连后从上次断开处继续）；③ 支持过滤（只监听特定操作或字段变更）；④ 副本集和分片集群均支持。' +
        '用途：跨服务数据同步、事件溯源（Event Sourcing）、实时通知/推送（新消息提醒）、缓存失效（数据变更时刷新 Redis）、审计日志。',
    },
    {
      title: '13. MongoDB 中 $lookup 和 populate（Mongoose）的执行机制和性能？',
      content:
        '$lookup（原生聚合）在 MongoDB 服务端执行，一次请求完成关联查询。性能：利用关联字段索引（$lookup 可走 foreignField 索引）；大结果集需要内存处理（可通过 allowDiskUse: true 使用磁盘缓存）。' +
        'populate（Mongoose）：本质是执行额外的 find 查询，实质上做了 N+1（先查主文档，再用 IDs 批量查关联文档）。非管道操作，从单个集合出发获取关联数据。' +
        '对比：$lookup 单次请求减少网络开销，适合大量关联数据；populate 逻辑分离清晰，适合少量关联。性能关键都是用索引。' +
        'MongoDB 5.0+ $lookup 支持 pipeline 语法，可在关联阶段进行更复杂的过滤和投影。',
    },
    {
      title: '14. 如何保证 MongoDB 数据安全与备份？',
      content:
        '认证与授权：启用 SCRAM 或 x.509 证书认证；基于角色的访问控制（RBAC——定义用户角色和权限级别；字段级加密（Client-Side Field Level Encryption））。' +
        '传输加密：TLS/SSL。审计日志：记录所有数据库操作。' +
        '备份策略：① mongodump/mongorestore（逻辑备份，慢但可跨版本恢复）；② 文件系统快照（快，需文件系统支持如 LVM）；③ MongoDB Atlas / Ops Manager 自动备份（支持 Point-in-Time Recovery 时间点恢复）。' +
        '生产环境最佳实践：副本集（至少 3 节点，奇数）+ 延迟备份节点（防人为误删）+ 异地备份 + 定期恢复演练。',
    },
    {
      title: '15. 如何处理 MongoDB 的数据迁移和版本升级？',
      content:
        'Schema 迁移（无 Schema Lock 数据库）：① 应用层处理——读取时兼容新旧格式；② 脚本批量迁移——在低峰期运行迁移脚本更新所有文档；③ 懒迁移——读取到旧文档时顺便更新（适合大量数据但不能一次性迁移的场景）。' +
        '数据库版本升级：查看 Release Notes 了解 Breaking Changes；先在非生产环境验证；通过副本集轮转升级（先升级 Secondary → 降级 Primary → 升级旧 Primary）实现零停机。' +
        '工具：migrate-mongo（Node.js 数据库迁移工具，类似 SQL 的 migration）。',
    },
    {
      title: '16. ODM（Mongoose）和原生驱动（Native Driver）的优缺点？',
      content:
        'Mongoose 优点：Schema 定义和校验；数据建模结构清晰；钩子（pre/post middleware）；虚拟属性和 getter/setter；populate 关联查询；插件生态（如 mongoose-paginate、mongoose-autopopulate）。' +
        'Mongoose 缺点：性能开销（抽象层）；学习曲线；灵活性受限（Schema 约束有时是负担）；复杂查询（聚合管道）不如原生驱动直观。' +
        '原生驱动优点：性能更高；完全使用 MongoDB 所有功能；学习成本低（MQL 即 API）；轻量无依赖。' +
        '选择：数据结构稳定、项目需要标准化约束 → Mongoose；追求高性能/灵活/直接控制 → 原生驱动；轻量替代 Prisma 对 MongoDB 支持也是好选择。',
    },
    {
      title: '17. MongoDB Atlas 是什么？有哪些关键特性？',
      content:
        'MongoDB Atlas 是官方云托管数据库服务（DBaaS），部署在 AWS/Azure/GCP。无需手动运维。' +
        '关键特性：自动备份与时间点恢复（PITR）、自动补丁升级、弹性扩展、全球集群（多区域分布，数据就近访问）、Atlas Search（基于 Lucene 的全文搜索引擎）、Atlas Charts（可视化报表）、Atlas Data Lake（直接查询 S3 中的 JSON/CSV/Parquet 数据）、Serverless 实例（按需付费，自动扩缩）、无服务器触发器 + Realm SDK（移动端实时同步）、免费 512MB M0 实例用于开发。',
    },
    {
      title: '18. 如何排查 MongoDB 慢查询？',
      content:
        '① 开启 Profiler：db.setProfilingLevel(1, {slowms: 100})，记录超过 100ms 的查询到 system.profile 集合。② 当前运行查询：db.currentOp() 查看正运行的长时间操作。③ explain("executionStats")：分析查询执行详情（扫描文档数 nReturned vs totalKeysExamined vs totalDocsExamined、是否全表扫描 COLLSCAN、是否使用索引 IXSCAN、查询执行时间）。' +
        '④ MongoDB Compass 可视化查看 Explain Plan。⑤ Atlas Performance Advisor：自动建议缺失索引。⑥ 监控指标：操作计数器（opcounters）、锁等待、连接数、WiredTiger 缓存命中率。' +
        '常见慢查询原因：缺少索引、复合索引字段顺序不匹配、$regex 左模糊（无法用索引）、大结果集未分页、聚合管道大内存消耗。',
    },
  ],
}
