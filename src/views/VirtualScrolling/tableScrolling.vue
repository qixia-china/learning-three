<template>
  <div class="table-scroll-root">
    <!-- ========== 顶部统计面板 ========== -->
    <div class="stats-panel">
      <div class="stat-item">
        <span class="stat-label">📊 今日已处理</span>
        <span class="stat-value">{{ formatNumber(processedCount) }} 条</span>
        <span class="stat-sub">/ {{ formatNumber(TOTAL) }} 条</span>
      </div>
      <div class="stat-divider" />
      <div class="stat-item">
        <span class="stat-label">⚡ 处理速率</span>
        <span class="stat-value">{{ formatNumber(THROUGHPUT_PER_SEC) }} 条/秒</span>
      </div>
      <div class="stat-divider" />
      <div class="stat-item">
        <span class="stat-label">📋 DOM 渲染</span>
        <span class="stat-value">{{ visibleRows.length }} 行</span>
      </div>
      <div class="stat-divider" />
      <div class="stat-item">
        <span class="stat-label">🖥️ 内存占用</span>
        <span class="stat-value">{{ memoryUsage }} MB</span>
      </div>
    </div>

    <!-- 进度条 -->
    <div class="progress-bar-wrap">
      <div class="progress-bar" :style="{ width: progressPercent + '%' }" />
      <span class="progress-text">{{ progressPercent.toFixed(2) }}%</span>
    </div>

    <!-- ========== 筛选栏 ========== -->
    <div class="filter-bar">
      <input
        v-model="filterText"
        class="filter-input"
        type="text"
        placeholder="🔍 搜索用户ID、IP、操作类型..."
      />
      <select v-model="statusFilter" class="filter-select">
        <option value="">全部状态</option>
        <option value="success">成功</option>
        <option value="pending">处理中</option>
        <option value="failed">失败</option>
      </select>
      <button class="filter-btn" @click="scrollToRandom">🎲 随机跳转</button>
      <button class="filter-btn" @click="scrollToTop">⬆ 回到顶部</button>
      <span class="filter-info">
        符合条件: {{ formatNumber(filteredCount) }} 条
      </span>
    </div>

    <!-- ========== 虚拟滚动表格 ========== -->
    <div
      ref="containerRef"
      class="table-container"
      @scroll="handleScroll"
    >
      <!-- 固定表头 -->
      <div class="table-header" ref="headerRef">
        <div
          v-for="col in columns"
          :key="col.key"
          class="th"
          :style="{ width: col.width + 'px', minWidth: col.width + 'px' }"
          :class="{ sortable: col.sortable }"
          @click="col.sortable && toggleSort(col.key)"
        >
          {{ col.title }}
          <span v-if="sortKey === col.key" class="sort-icon">
            {{ sortOrder === 'asc' ? '▲' : '▼' }}
          </span>
        </div>
      </div>

      <!-- 滚动体 -->
      <div
        class="table-body"
        :style="{ height: totalHeight + 'px' }"
      >
        <div
          class="visible-area"
          :style="{ transform: `translateY(${offsetY}px)` }"
        >
          <div
            v-for="row in visibleRows"
            :key="row.id"
            class="tr"
            :class="{
              'row-striped': row.index % 2 === 0,
              'row-selected': selectedRow === row.id,
            }"
            @click="selectedRow = row.id"
          >
            <div
              v-for="col in columns"
              :key="col.key"
              class="td"
              :style="{ width: col.width + 'px', minWidth: col.width + 'px' }"
            >
              <template v-if="col.key === 'status'">
                <span :class="['status-badge', row.status]">
                  {{ STATUS_LABELS[row.status] }}
                </span>
              </template>
              <template v-else-if="col.key === 'action'">
                <span :class="['action-tag', row.action]">
                  {{ row.action }}
                </span>
              </template>
              <template v-else>
                {{ row[col.key] }}
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 页脚 -->
    <div class="footer-bar">
      <span>
        虚拟滚动表格 · 模拟日均 {{ formatNumber(TOTAL) }} 条数据处理
        · 当日已运行 {{ elapsedTime }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue'

// ==================== 常量 ====================
const TOTAL = 1_000_000_000 // 10亿
const THROUGHPUT_PER_SEC = 11574 // ~10亿/天
const ROW_HEIGHT = 36 // 行高 px
const BUFFER_ROWS = 8 // 上下缓冲行数
const HEADER_HEIGHT = 38 // 表头高度

const STATUS_LABELS: Record<TableRow['status'], string> = {
  success: '成功',
  pending: '处理中',
  failed: '失败',
}

// ==================== 列定义 ====================
interface ColumnDef {
  key: string
  title: string
  width: number
  sortable: boolean
}

const columns: ColumnDef[] = [
  { key: 'index', title: '序号', width: 100, sortable: false },
  { key: 'timestamp', title: '时间戳', width: 170, sortable: true },
  { key: 'userId', title: '用户ID', width: 160, sortable: true },
  { key: 'action', title: '操作类型', width: 120, sortable: true },
  { key: 'status', title: '状态', width: 100, sortable: true },
  { key: 'dataSize', title: '数据量(KB)', width: 110, sortable: true },
  { key: 'duration', title: '耗时(ms)', width: 100, sortable: true },
  { key: 'ip', title: 'IP 地址', width: 150, sortable: true },
  { key: 'note', title: '备注', width: 200, sortable: false },
]

// ==================== 数据行类型 ====================
interface TableRow {
  id: number
  index: number
  timestamp: string
  userId: string
  action: string
  status: 'success' | 'pending' | 'failed'
  dataSize: number
  duration: number
  ip: string
  note: string
  [key: string]: string | number // 允许索引访问
}

// ==================== 伪随机生成器（种子随机，确保同一 index 数据一致） ====================
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9301 + 49297) * 49297
  return x - Math.floor(x)
}

const ACTIONS = ['INSERT', 'UPDATE', 'DELETE', 'QUERY', 'BATCH', 'SYNC']
const NOTES = [
  '数据同步完成',
  '批量写入成功',
  '缓存命中',
  '索引优化后执行',
  '分片路由至节点A',
  '事务提交',
  '异步回调处理',
  '定时任务触发',
  '跨区复制',
  '数据校验通过',
]

function generateRow(id: number): TableRow {
  const r = (offset: number) => seededRandom(id * 7 + offset * 13)

  const hours = Math.floor(r(1) * 24)
  const mins = Math.floor(r(2) * 60)
  const secs = Math.floor(r(3) * 60)
  const ms = Math.floor(r(4) * 1000)
  const timestamp = `2026-07-01 ${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}.${String(ms).padStart(3, '0')}`

  const userId = `USR${String(Math.floor(r(5) * 9999999)).padStart(7, '0')}`
  const action = ACTIONS[Math.floor(r(6) * ACTIONS.length)]
  const statusIdx = Math.floor(r(7) * 100)
  const status: TableRow['status'] =
    statusIdx < 85 ? 'success' : statusIdx < 95 ? 'pending' : 'failed'
  const dataSize = Math.floor(r(8) * 5000) + 1
  const duration = Math.floor(r(9) * 500) + 1
  const ip = `10.${Math.floor(r(10) * 255)}.${Math.floor(r(11) * 255)}.${Math.floor(r(12) * 255)}`
  const note = NOTES[Math.floor(r(13) * NOTES.length)]

  return { id, index: id, timestamp, userId, action, status, dataSize, duration, ip, note }
}

// ==================== 筛选逻辑 ====================
const filterText = ref('')
const statusFilter = ref('')
const sortKey = ref<string | null>(null)
const sortOrder = ref<'asc' | 'desc'>('asc')

// 在内存中缓存最近生成的 N 条记录，避免重复计算
const rowCache = new Map<number, TableRow>()
const CACHE_SIZE = 2000

function getCachedRow(id: number): TableRow {
  if (!rowCache.has(id)) {
    rowCache.set(id, generateRow(id))
    // 限制缓存大小
    if (rowCache.size > CACHE_SIZE) {
      const keys = rowCache.keys()
      for (let i = 0; i < 200; i++) {
        const k = keys.next()
        if (!k.done) rowCache.delete(k.value)
      }
    }
  }
  return rowCache.get(id)!
}

function matchesFilter(row: TableRow): boolean {
  if (statusFilter.value && row.status !== statusFilter.value) return false
  if (!filterText.value) return true
  const q = filterText.value.toLowerCase()
  return (
    row.userId.toLowerCase().includes(q) ||
    row.ip.includes(q) ||
    row.action.toLowerCase().includes(q) ||
    row.note.toLowerCase().includes(q)
  )
}

// ==================== 响应式状态 ====================
const containerRef = ref<HTMLElement | null>(null)
const scrollTop = ref(0)
const containerHeight = ref(600)
const selectedRow = ref<number | null>(null)

// 实时处理计数器
const pageLoadTime = Date.now()
const processedCount = ref(0)
const elapsedTime = ref('00:00:00')
let counterTimer: ReturnType<typeof setInterval> | null = null
let clockTimer: ReturnType<typeof setInterval> | null = null

function updateCounters() {
  const elapsed = (Date.now() - pageLoadTime) / 1000
  processedCount.value = Math.min(TOTAL, Math.floor(elapsed * THROUGHPUT_PER_SEC))
  const h = Math.floor(elapsed / 3600)
  const m = Math.floor((elapsed % 3600) / 60)
  const s = Math.floor(elapsed % 60)
  elapsedTime.value = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

// ==================== 内存估算 ====================
const memoryUsage = computed(() => {
  // 粗略估算：每行约 200 bytes * 缓存行数 + DOM 节点
  const mem = (rowCache.size * 200 + visibleRows.value.length * 500) / 1024 / 1024
  return mem.toFixed(1)
})

// ==================== 进度 ====================
const progressPercent = computed(() => (processedCount.value / TOTAL) * 100)

// ==================== 虚拟滚动计算 ====================
const totalHeight = computed(() => TOTAL * ROW_HEIGHT)

const startIndex = computed(() => {
  const idx = Math.floor(scrollTop.value / ROW_HEIGHT) - BUFFER_ROWS
  return Math.max(0, idx)
})

const endIndex = computed(() => {
  const idx =
    Math.ceil((scrollTop.value + containerHeight.value) / ROW_HEIGHT) + BUFFER_ROWS
  return Math.min(TOTAL, idx)
})

const offsetY = computed(() => startIndex.value * ROW_HEIGHT)

// 筛选后的可见行
const visibleRows = computed(() => {
  const rows: TableRow[] = []

  // 当无筛选条件时，直接按虚拟范围取数据
  if (!filterText.value && !statusFilter.value) {
    // 处理排序
    if (sortKey.value) {
      // 排序模式下仍需遍历全量（限制：仅虚拟窗口内排序无意义，跳过全量排序以避免卡顿）
      // 这里保持简单：大数据量下排序仅对可见窗口生效提示
      for (let i = startIndex.value + 1; i <= endIndex.value; i++) {
        rows.push(getCachedRow(i))
      }
    } else {
      for (let i = startIndex.value + 1; i <= endIndex.value; i++) {
        rows.push(getCachedRow(i))
      }
    }
    return rows
  }

  // 有筛选条件时：从当前可见范围+前后扩展来收集匹配项
  // 大数据下不做全量扫描，仅扫描可见窗口附近
  const scanStart = Math.max(0, startIndex.value - 200)
  const scanEnd = Math.min(TOTAL, endIndex.value + 200)
  for (let i = scanStart + 1; i <= scanEnd; i++) {
    const row = getCachedRow(i)
    if (matchesFilter(row)) {
      rows.push(row)
    }
  }
  return rows.slice(0, 200) // 最多展示 200 行匹配结果
})

// 筛选条件下的估算总数（简化：仅展示附近匹配数，不做全量）
const filteredCount = computed(() => {
  if (!filterText.value && !statusFilter.value) return TOTAL
  // 基于采样估算：扫描 1000 条算出命中率
  const sampleSize = 1000
  let hits = 0
  for (let i = 1; i <= sampleSize; i++) {
    if (matchesFilter(getCachedRow(i))) hits++
  }
  return Math.floor((hits / sampleSize) * TOTAL)
})

// ==================== 滚动处理 ====================
let rafId: number | null = null

function handleScroll() {
  if (rafId !== null) return
  rafId = requestAnimationFrame(() => {
    if (containerRef.value) {
      scrollTop.value = containerRef.value.scrollTop
    }
    rafId = null
  })
}

// ==================== 排序 ====================
function toggleSort(key: string) {
  if (sortKey.value === key) {
    if (sortOrder.value === 'asc') {
      sortOrder.value = 'desc'
    } else if (sortOrder.value === 'desc') {
      sortKey.value = null
      sortOrder.value = 'asc'
    }
  } else {
    sortKey.value = key
    sortOrder.value = 'asc'
  }
}

// ==================== 工具函数 ====================
function formatNumber(n: number): string {
  if (n >= 1_0000_0000) return (n / 1_0000_0000).toFixed(1) + ' 亿'
  if (n >= 1_0000) return (n / 1_0000).toFixed(1) + ' 万'
  return n.toLocaleString()
}

function scrollToRandom() {
  if (!containerRef.value) return
  const randomRow = Math.floor(Math.random() * TOTAL)
  containerRef.value.scrollTop = randomRow * ROW_HEIGHT
}

function scrollToTop() {
  if (containerRef.value) {
    containerRef.value.scrollTop = 0
  }
}

// ==================== ResizeObserver ====================
let resizeObserver: ResizeObserver | null = null

onMounted(() => {
  nextTick(() => {
    if (containerRef.value) {
      containerHeight.value = containerRef.value.clientHeight - HEADER_HEIGHT
    }
  })

  if (containerRef.value) {
    resizeObserver = new ResizeObserver(() => {
      if (containerRef.value) {
        containerHeight.value = containerRef.value.clientHeight - HEADER_HEIGHT
      }
    })
    resizeObserver.observe(containerRef.value)
  }

  // 启动实时计数器
  counterTimer = setInterval(updateCounters, 100)
  clockTimer = setInterval(updateCounters, 1000)
  updateCounters()
})

onBeforeUnmount(() => {
  if (rafId !== null) cancelAnimationFrame(rafId)
  resizeObserver?.disconnect()
  if (counterTimer) clearInterval(counterTimer)
  if (clockTimer) clearInterval(clockTimer)
})
</script>

<style scoped lang="scss">
.table-scroll-root {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

// ========== 统计面板 ==========
.stats-panel {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 10px 16px;
  background: var(--card-bg, #1e1e1e);
  border-radius: 8px;
  margin-bottom: 6px;
  flex-shrink: 0;
  flex-wrap: wrap;
}

.stat-item {
  display: flex;
  align-items: baseline;
  gap: 6px;
}

.stat-label {
  font-size: 12px;
  color: var(--card-content-color, #999);
}

.stat-value {
  font-size: 16px;
  font-weight: 700;
  color: #409eff;
  font-variant-numeric: tabular-nums;
}

.stat-sub {
  font-size: 11px;
  color: var(--card-content-color, #666);
}

.stat-divider {
  width: 1px;
  height: 28px;
  background: var(--content-border-color, #333);
}

// ========== 进度条 ==========
.progress-bar-wrap {
  position: relative;
  height: 6px;
  background: var(--content-bg, #1a1a1a);
  border-radius: 3px;
  margin-bottom: 8px;
  flex-shrink: 0;

  .progress-bar {
    height: 100%;
    background: linear-gradient(90deg, #409eff, #67c23a);
    border-radius: 3px;
    transition: width 0.3s ease;
  }

  .progress-text {
    position: absolute;
    right: 0;
    top: -18px;
    font-size: 10px;
    color: var(--card-content-color, #666);
  }
}

// ========== 筛选栏 ==========
.filter-bar {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 0;
  flex-shrink: 0;
  flex-wrap: wrap;
}

.filter-input {
  flex: 1;
  min-width: 200px;
  height: 32px;
  padding: 0 10px;
  border: 1px solid var(--content-border-color, #333);
  border-radius: 6px;
  background: var(--content-bg, #1a1a1a);
  color: var(--text-color, #fff);
  font-size: 13px;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: #409eff;
  }

  &::placeholder {
    color: var(--card-content-color, #666);
  }
}

.filter-select {
  height: 32px;
  padding: 0 8px;
  border: 1px solid var(--content-border-color, #333);
  border-radius: 6px;
  background: var(--content-bg, #1a1a1a);
  color: var(--text-color, #fff);
  font-size: 13px;
  outline: none;
  cursor: pointer;

  &:focus {
    border-color: #409eff;
  }
}

.filter-btn {
  height: 32px;
  padding: 0 14px;
  border: 1px solid var(--content-border-color, #333);
  border-radius: 6px;
  background: var(--card-bg, #1e1e1e);
  color: var(--text-color, #dadada);
  font-size: 12px;
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.15s;

  &:hover {
    background: #2a2a2a;
  }

  &:active {
    background: #333;
  }
}

.filter-info {
  font-size: 12px;
  color: var(--card-content-color, #999);
  margin-left: auto;
}

// ========== 表格容器 ==========
.table-container {
  flex: 1;
  overflow: auto;
  border: 1px solid var(--content-border-color, #333);
  border-radius: 8px;
  background: var(--content-bg, #1a1a1a);

  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--content-border-color, #333);
    border-radius: 3px;

    &:hover {
      background: #555;
    }
  }
}

// ========== 表头 ==========
.table-header {
  position: sticky;
  top: 0;
  z-index: 2;
  display: flex;
  background: var(--card-bg, #1e1e1e);
  border-bottom: 2px solid var(--content-border-color, #333);
  min-width: fit-content;

  .th {
    height: 38px;
    display: flex;
    align-items: center;
    padding: 0 10px;
    font-size: 13px;
    font-weight: 600;
    color: var(--card-title-color, #dadada);
    border-right: 1px solid var(--content-border-color, #333);
    box-sizing: border-box;
    user-select: none;
    flex-shrink: 0;

    &:last-child {
      border-right: none;
    }

    &.sortable {
      cursor: pointer;

      &:hover {
        background: rgba(64, 158, 255, 0.08);
      }
    }
  }

  .sort-icon {
    margin-left: 4px;
    font-size: 10px;
    color: #409eff;
  }
}

// ========== 表体 ==========
.table-body {
  position: relative;
  min-width: fit-content;
}

.visible-area {
  will-change: transform;
}

// ========== 行样式 ==========
.tr {
  display: flex;
  height: 36px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.03);
  cursor: pointer;
  transition: background 0.1s;

  &:hover {
    background: rgba(64, 158, 255, 0.06);
  }

  &.row-striped {
    background: rgba(255, 255, 255, 0.015);

    &:hover {
      background: rgba(64, 158, 255, 0.08);
    }
  }

  &.row-selected {
    background: rgba(64, 158, 255, 0.12) !important;
  }
}

.td {
  display: flex;
  align-items: center;
  padding: 0 10px;
  font-size: 13px;
  color: var(--text-color, #dadada);
  border-right: 1px solid rgba(255, 255, 255, 0.03);
  box-sizing: border-box;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex-shrink: 0;

  &:last-child {
    border-right: none;
  }
}

// ========== 状态/操作标签 ==========
.status-badge {
  display: inline-block;
  padding: 1px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;

  &.success {
    background: rgba(103, 194, 58, 0.15);
    color: #67c23a;
  }

  &.pending {
    background: rgba(230, 162, 60, 0.15);
    color: #e6a23c;
  }

  &.failed {
    background: rgba(245, 108, 108, 0.15);
    color: #f56c6c;
  }
}

.action-tag {
  font-size: 12px;
  font-weight: 500;

  &.INSERT {
    color: #409eff;
  }
  &.UPDATE {
    color: #e6a23c;
  }
  &.DELETE {
    color: #f56c6c;
  }
  &.QUERY {
    color: #67c23a;
  }
  &.BATCH {
    color: #a259ec;
  }
  &.SYNC {
    color: #17becf;
  }
}

// ========== 页脚 ==========
.footer-bar {
  padding: 6px 12px;
  font-size: 11px;
  color: var(--card-content-color, #666);
  text-align: right;
  flex-shrink: 0;
}
</style>
