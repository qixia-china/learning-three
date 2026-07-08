<template>
  <div class="virtual-scroll-root">
    <!-- 顶部统计栏 -->
    <div class="stats-bar">
      <span>📷 共 {{ totalCount.toLocaleString() }} 张图片</span>
      <span>👁️ 当前渲染 {{ visibleItems.length }} 张</span>
      <span>📐 {{ columns }} 列 × {{ totalRows.toLocaleString() }} 行</span>
    </div>

    <!-- 虚拟滚动容器 -->
    <div ref="containerRef" class="scroll-container" @scroll="handleScroll">
      <!-- 撑开总高度的占位层 -->
      <div class="scroll-content" :style="{ height: totalHeight + 'px' }">
        <!-- 可见区域渲染层，通过 transform 定位 -->
        <div
          class="grid-area"
          :style="{
            transform: `translateY(${offsetY}px)`,
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
          }"
        >
          <div v-for="item in visibleItems" :key="item.id" class="image-card">
            <div class="card-image">
              <img
                :src="item.url"
                :alt="`Image ${item.id}`"
                loading="lazy"
                @error="onImageError($event)"
              />
              <div class="image-placeholder" v-if="!item.loaded">
                <span class="loading-text">Loading...</span>
              </div>
            </div>
            <div class="card-footer">
              <span class="index">#{{ item.id }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue'

// ==================== 常量配置 ====================
const ITEM_WIDTH = 200 // 卡片宽度 (px)
const ITEM_HEIGHT = 210 // 卡片高度：图片150px + 间距 + footer 36px + padding
const GAP = 12 // 卡片间距 (px)
const BUFFER_ROWS = 3 // 上下各缓冲行数
const TOTAL_COUNT = 10000 // 万张图片

// ==================== 响应式状态 ====================
const containerRef = ref<HTMLElement | null>(null)
const scrollTop = ref(0)
const containerHeight = ref(600)
const containerWidth = ref(1200)
// ==================== 生成图片数据 ====================
interface ImageItem {
  id: number
  url: string
  loaded: boolean
}

// 使用 picsum 静态种子生成 10000 张不重复图片
// seed 确保同一 id 始终返回同一张图
function generateImageUrl(id: number): string {
  return `https://picsum.photos/seed/img${id}/200/150`
}

const imageList: ImageItem[] = Array.from({ length: TOTAL_COUNT }, (_, i) => ({
  id: i + 1,
  url: generateImageUrl(i + 1),
  loaded: false,
}))

const totalCount = TOTAL_COUNT

// ==================== 布局计算 ====================
const columns = computed(() => {
  if (containerWidth.value === 0) return 1
  const cols = Math.floor((containerWidth.value + GAP) / (ITEM_WIDTH + GAP))
  return Math.max(1, cols)
})

const totalRows = computed(() => Math.ceil(totalCount / columns.value))

const totalHeight = computed(() => {
  if (totalRows.value === 0) return 0
  return totalRows.value * (ITEM_HEIGHT + GAP) + GAP
})

// ==================== 可见范围计算 ====================
const startRow = computed(() => {
  const row = Math.floor(scrollTop.value / (ITEM_HEIGHT + GAP)) - BUFFER_ROWS
  return Math.max(0, row)
})

const endRow = computed(() => {
  const row =
    Math.ceil((scrollTop.value + containerHeight.value) / (ITEM_HEIGHT + GAP)) + BUFFER_ROWS
  return Math.min(totalRows.value, row)
})

const startIndex = computed(() => startRow.value * columns.value)

const endIndex = computed(() => {
  const idx = endRow.value * columns.value
  return Math.min(totalCount, idx)
})

const offsetY = computed(() => startRow.value * (ITEM_HEIGHT + GAP))

const visibleItems = computed(() => {
  return imageList.slice(startIndex.value, endIndex.value)
})

// ==================== 滚动处理（节流） ====================
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

// ==================== 容器尺寸监听 ====================
let resizeObserver: ResizeObserver | null = null

function updateContainerSize() {
  if (containerRef.value) {
    containerHeight.value = containerRef.value.clientHeight
    containerWidth.value = containerRef.value.clientWidth
  }
}

onMounted(() => {
  nextTick(() => {
    updateContainerSize()
  })

  if (containerRef.value) {
    resizeObserver = new ResizeObserver(() => {
      updateContainerSize()
    })
    resizeObserver.observe(containerRef.value)
  }
})

onBeforeUnmount(() => {
  if (rafId !== null) {
    cancelAnimationFrame(rafId)
  }
  resizeObserver?.disconnect()
})

// ==================== 图片加载/错误处理 ====================
function onImageError(event: Event) {
  const img = event.target as HTMLImageElement
  // 显示占位色块
  img.style.display = 'none'
  const placeholder = img.nextElementSibling as HTMLElement
  if (placeholder) {
    placeholder.innerHTML = '<span style="font-size:32px">🖼️</span><span>加载失败</span>'
    placeholder.style.display = 'flex'
  }
}
</script>

<style scoped lang="scss">
.virtual-scroll-root {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

// ---------- 统计栏 ----------
.stats-bar {
  display: flex;
  gap: 24px;
  padding: 8px 12px;
  font-size: 13px;
  color: var(--card-content-color, #999);
  background: var(--card-bg, #1e1e1e);
  border-radius: 6px;
  margin-bottom: 8px;
  flex-shrink: 0;
}

// ---------- 滚动容器 ----------
.scroll-container {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  border-radius: 8px;

  // 美化滚动条
  &::-webkit-scrollbar {
    width: 6px;
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

.scroll-content {
  position: relative;
  width: 100%;
}

// ---------- 网格区域 ----------
.grid-area {
  display: grid;
  gap: 12px;
  padding: 0 12px 12px;
  will-change: transform;
}

// ---------- 图片卡片 ----------
.image-card {
  background: var(--card-bg, #1e1e1e);
  border-radius: 8px;
  overflow: hidden;
  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
  }
}

.card-image {
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  background: var(--content-bg, #1a1a1a);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
}

.image-placeholder {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  color: var(--card-content-color, #666);
  font-size: 12px;
}

.loading-text {
  animation: pulse 1.2s ease-in-out infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 0.4;
  }
  50% {
    opacity: 1;
  }
}

// ---------- 卡片底部 ----------
.card-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px 8px;

  .index {
    font-size: 12px;
    color: var(--card-content-color, #999);
  }
}
</style>
