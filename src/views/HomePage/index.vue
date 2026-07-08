<template>
  <div class="home_root">
    <!-- 左侧导航栏 -->
    <div class="left">
      <leftSider />
    </div>
    <!-- 右侧内容区域 -->
    <div class="right">
      <!-- 头部导航栏 -->
      <div class="top">
        <topHeader />
      </div>
      <!-- 标题部分 -->
      <div class="center" v-if="false">
        <centerTitle />
      </div>
      <!-- 主内容区域 -->
      <div class="bottom">
        <router-view />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import leftSider from './components/leftSider.vue'
// @ts-ignore
import topHeader from './components/topHeader.vue'
// @ts-ignore
import centerTitle from './components/centerTitle.vue'
</script>

<style scoped lang="scss">
.home_root {
  height: 100%;
  display: flex;
}

.left {
  height: 100%;
  background-color: var(--menu-bg-color);
}

.right {
  height: 100%;
  width: 100%;
  background: var(--main-bg);
  display: flex;
  flex-direction: column;

  .top {
    height: 48px;
  }

  .center {
    height: 24px;
  }

  .bottom {
    flex: 1;
    border: 1px solid var(--content-border-color);
    overflow: auto;
    margin: 12px;
    background: var(--content-bg);
    border-radius: 8px;
    padding: 12px;
    box-sizing: border-box;
  }
}
</style>
