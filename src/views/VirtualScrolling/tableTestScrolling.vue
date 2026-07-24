<template>
  <div class="table-scrolling-root">
    <div class="table_container" ref="containerRef" @scroll="handleScroll">
      <!-- 固定表头 -->
      <div class="table_header">
        <div
          class="th"
          v-for="item in columns"
          :key="item.key"
          :data-key="item.key"
          :style="{
            height: HEADER_HEIGHT + 'px',
            minWidth: item.width + 'px',
            width: item.width + 'px',
          }"
        >
          <span>{{ item.title }}</span>
        </div>
      </div>
      <!-- 滚动体 -->
      <div class="table_body" :style="{ height: totalHeight + 'px' }">
        <div class="visible_area" :style="{ transform: `translateY(${offsetY}px)` }">
          <div v-for="row in visibleRows" :key="row.id" class="tr">
            <div
              v-for="col in columns"
              :key="col.key"
              class="td"
              ref="tableTdRef"
              :data-key="col.key"
              :style="{ width: col.width + 'px', minWidth: col.width + 'px' }"
            >
              <template v-if="col.key === 'status'">
                <span :class="['status-badge', row.status]">
                  {{ row.status }}
                </span>
              </template>
              <template v-else-if="col.key === 'action'">
                <span :class="['action-tag', row.action]">
                  {{ row.action }}
                </span>
              </template>
              <template v-else>
                <span>{{ row[col.key] }}</span>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, onMounted, nextTick, getCurrentInstance } from 'vue'

const instance = getCurrentInstance()
// 获取prop

const props = defineProps({
  defaultData: {
    type: Array,
    default: () => ['note', 'ip', 'action'],
  },
})

// ===========常量============
const TOTAL = 10000 // 总数据量
const ROW_HEIGHT = 50 // 每行高度
const HEADER_HEIGHT = 50 // 表头高度
const VIEWPORT_HEIGHT = 600 // 视口高度
const BUFFER_ROWS = 8 // 缓冲区大小

const STATUS_LABELS: Record<TableRow['status'], string> = {
  success: '成功',
  pending: '处理中',
  failed: '失败',
}
// ==========表头类型============
interface ColumDef {
  key: string
  title: string
  width: number
  minWidth: number
  sortable?: boolean
}
const columns = ref<ColumDef[]>([
  { key: 'index', title: '序号', width: 100, minWidth: 100, sortable: false },
  { key: 'timestamp', title: '时间戳', width: 170, minWidth: 170, sortable: true },
  { key: 'userId', title: '用户ID', width: 160, minWidth: 160, sortable: true },
  { key: 'action', title: '操作类型', width: 120, minWidth: 120, sortable: true },
  { key: 'status', title: '状态', width: 100, minWidth: 100, sortable: true },
  { key: 'dataSize', title: '数据量(KB)', width: 110, minWidth: 110, sortable: true },
  { key: 'duration', title: '耗时(ms)', width: 100, minWidth: 100, sortable: true },
  { key: 'ip', title: 'IP 地址', width: 150, minWidth: 150, sortable: true },
  { key: 'note', title: '备注', width: 200, minWidth: 200, sortable: false },
])

// ========数据行类型========
interface TableRow {
  id: number
  index: number
  userId: string
  timestamp: string
  action: string
  status: 'success' | 'pending' | 'failed'
  dataSize: number
  duration: number
  ip: string
  note: string
  [key: string]: string | number // 允许索引访问
}

// =======数据变量========
const totalHeight = computed(() => TOTAL * ROW_HEIGHT) // 总高度
const containerRef = ref<HTMLDivElement | null>(null) // 容器
const scrollTop = ref(0) // 滚动条位置
const containerHeight = ref(600)

// =======滚动处理方法=======
let rafId: number | null = null
const handleScroll = (e: Event) => {
  if (rafId !== null) return
  rafId = requestAnimationFrame(() => {
    if (containerRef.value) {
      scrollTop.value = containerRef.value.scrollTop
      calWidth()
    }
    rafId = null
  })
}
// =======可视区域位置=======
const startIndex = computed(() => {
  const idx = Math.floor(scrollTop.value / ROW_HEIGHT) - BUFFER_ROWS
  console.log('开始', Math.max(0, idx))
  return Math.max(0, idx)
})
const endIndex = computed(() => {
  const idx = Math.ceil((scrollTop.value + containerHeight.value) / ROW_HEIGHT) + BUFFER_ROWS
  return Math.min(TOTAL, idx)
})
const offsetY = computed(() => {
  console.log('平移', startIndex.value * ROW_HEIGHT)
  return startIndex.value * ROW_HEIGHT
})

const setWorkerData = function () {
  // 1. 创建 Worker 实例，传入 worker.js 的路径
  const myWorker = new Worker('/static/worker.js')

  // 2. 向 Worker 发送数据
  myWorker.postMessage([10, 20])

  // 3. 监听 Worker 返回的消息
  myWorker.onmessage = function (event) {
    console.log('收到 Worker 的计算结果:', event.data) // 输出: 200
  }

  // 4. 错误处理
  myWorker.onerror = function (error) {
    console.error('Worker 发生错误:', error.message)
  }
}
setWorkerData()
const totalRows: TableRow[] = [
  ...Array.from({
    length: 30,
  }).map((_, i) => {
    const row = {
      id: i,
      userId: 'u00' + i,
      index: i,
      timestamp: '2023-10-01 12:00:00' + i,
      action: '新增',
      status: 'success' as const,
      dataSize: 100,
      duration: 100,
      ip: '192.168.1.1',
      note: '备注信息',
    }
    return row
  }),
  ...Array.from({
    length: TOTAL - 10,
  }).map((_, i) => {
    const row = {
      id: i,
      index: i,
      userId: 'u00' + (i * 1 + 30),
      timestamp: '2023-10-01 12:00:00' + i,
      action: '新增新增新增新增新增新增新增新增新增新增新增',
      status: 'success' as const,
      dataSize: 100,
      duration: 100,
      ip: '192.168.1.1192.168.1.1192.168.1.1192.168.1.1192.168.1.1',
      note: '备注信息备注信息备注信息备注信息备注信息备注信息备注信息备注信息',
    }
    return row
  }),
]

const visibleRows = computed(() => {
  return totalRows.slice(startIndex.value, endIndex.value)
})

const calWidth = function () {
  if (!containerRef.value) return

  // 遍历需要自适应宽度的列（例如 note）
  const targetKeys = props.defaultData // 根据实际需要调整

  targetKeys.forEach((key) => {
    const cells = containerRef.value?.querySelectorAll<HTMLElement>(`[data-key="${key}"]`)
    if (!cells || cells.length === 0) return

    let maxWidth = 0
    cells.forEach((cell) => {
      const span = cell.querySelector('span')
      if (span) {
        maxWidth = Math.max(maxWidth, span.offsetWidth)
      }
    })

    // 将计算出的最大宽度更新到响应式的 columns 中
    const col = columns.value.find((c) => c.key === key)
    if (col) {
      col.width = col.minWidth > maxWidth + 20 ? col.minWidth : maxWidth + 20 // 加上 padding 余量
    }
  })
}
onMounted(async () => {
  await nextTick() // 确保隐藏容器渲染完毕
  calWidth()
})
</script>
<style scoped lang="scss">
.table-scrolling-root {
  width: 100%;
}
.table_container {
  // flex: 1;
  /* 关键属性：让表格布局固定 */
  table-layout: fixed;
  max-width: 100%;
  overflow: auto;
  position: relative;
  height: 500px;
  border: 1px solid var(--content-border-color, #333);
  border-radius: 8px;
  background: var(--content-bg, #1a1a1a);

  .table_header {
    position: sticky;
    top: 0;
    display: flex;
    min-width: fit-content;
    z-index: 2;
    background-color: var(--table-header-bg, #1a1a1a);
    .th {
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
    }
  }
  .table_body {
    position: relative;
    min-width: fit-content;
    .visible_area {
      will-change: transform;
    }
  }
}
// ========== 行样式 ==========
.tr {
  display: flex;
  height: 50px;
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
  text-overflow: ellipsis;
  flex-shrink: 0;

  &:last-child {
    border-right: none;
  }
}
</style>
