<script setup lang="ts"></script>

<template>
  <svg style="position: absolute; width: 0; height: 0" aria-hidden="true">
    <filter id="color-weakness-filter" color-interpolation-filters="sRGB">
      <feColorMatrix
        type="matrix"
        values="
        0.625 0.375 0     0 0
        0.7   0.3   0     0 0
        0     0.3   0.7   0 0
        0     0     0     1 0
      "
      />
    </filter>
  </svg>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<style>
@import '@/assets/font/iconfont.css';
@import '@/assets/theme_table.scss';

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: '微软雅黑';
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans',
    sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
}

.app {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

/* ========== 暗黑主题（默认） ========== */
:root {
  --el-menu-item-height: 36px !important;
  --menu-bg-color: #121212;
  --bg-color: #121212;
  --text-color: #ffffff;

  --main-bg: #141414;
  --content-bg: #1a1a1a;
  --content-border-color: #333333;

  --header-bg: #1e1e1e;
  --header-icon-color: #dadada;

  --card-bg: #1e1e1e;
  --card-title-color: #dadada;
  --card-content-color: #999999;

  --title-bg: #1e1e1e;
  --title-text-color: #dadada;
  --center-title-text-color: #999999;
  --svg-icon-color: #dadada;

  --el-menu-bg-color: #010b14;
  --el-menu-text-color: #dadada;
  --el-menu-active-color: #ffffff;
}

/* ========== 浅色主题 ========== */
html.light {
  --bg-color: #ffffff;
  --text-color: #333333;
  --menu-bg-color: #121212;
  --main-bg: rgba(240, 242, 245, 1);
  --content-bg: #ffffff;
  --content-border-color: #e5e5e5;

  --header-bg: #ffffff;
  --header-icon-color: #333333;

  --card-bg: #f6f6f6;
  --card-title-color: #333333;
  --card-content-color: #666666;

  --title-bg: #ffffff;
  --title-text-color: #333333;
  --center-title-text-color: #cccccc;
  --svg-icon-color: #333333;

  --el-menu-bg-color: #001529;
  --el-menu-text-color: rgba(255, 255, 255, 0.65);
  --el-menu-active-color: #409eff;
}

/* ========== 色弱模式（红绿色盲矫正滤镜） ========== */
html.weak-mode {
  filter: url('#color-weakness-filter');
}
</style>
