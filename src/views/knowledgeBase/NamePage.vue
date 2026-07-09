<template>
  <div class="knowledge-root">
    <div class="question-card" v-for="(item, index) in list1" :key="item.title">
      <div class="card-badge">{{ index + 1 }}</div>
      <div class="card-body">
        <div class="card-title">{{ item.title }}</div>
        <div class="card-divider"></div>
        <div class="card-content">{{ item.content }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { namePageConfig } from './NamePage/config'
export default {
  name: 'NamePage',
  data() {
    return {
      list1: namePageConfig.list,
    }
  },
}
</script>

<style scoped lang="scss">
.knowledge-root {
  height: 100%;
  display: flex;
  justify-content: flex-start;
  gap: 16px;
  overflow-y: auto;
  flex-wrap: wrap;
  padding: 4px;
  align-content: flex-start;
}

.question-card {
  width: calc(50% - 8px);
  min-height: 100px;
  background: var(--card-bg);
  border-radius: 10px;
  padding: 20px 20px 20px 16px;
  box-sizing: border-box;
  display: flex;
  gap: 16px;
  border-left: 3px solid var(--el-color-primary);
  transition: all 0.25s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 24px rgba(0, 0, 0, 0.12);
  }
}

.card-badge {
  width: 36px;
  height: 36px;
  min-width: 36px;
  border-radius: 8px;
  background: linear-gradient(135deg, var(--el-color-primary), var(--el-color-primary-light-3));
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 15px;
  flex-shrink: 0;
}

.card-body {
  flex: 1;
  min-width: 0;
}

.card-title {
  font-size: 15px;
  font-weight: 600;
  color: var(--card-title-color);
  line-height: 1.5;
}

.card-divider {
  width: 40px;
  height: 2px;
  background: var(--el-color-primary-light-5);
  border-radius: 1px;
  margin: 10px 0 12px;
}

.card-content {
  font-size: 13.5px;
  color: var(--card-content-color);
  line-height: 1.8;
}
</style>
