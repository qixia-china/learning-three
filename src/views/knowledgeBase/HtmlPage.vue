<template>
  <div class="html_root">
    <div class="items" v-for="item in list" :key="item.title">
      <div class="title">{{ item.title }}</div>
      <div class="content">{{ item.content }}</div>
    </div>
  </div>
</template>
<script lang="ts">
import { htmlPageConfig } from './HtmlPage/config'
export default {
  name: 'HtmlPage',
  data() {
    return {
      list: htmlPageConfig.list,
    }
  },
}
</script>
<style scoped lang="scss">
.html_root {
  height: 100%;
  display: flex;
  justify-content: flex-start;
  gap: 1%;
  overflow-y: auto;
  flex-wrap: wrap;

  .items {
    width: 49.5%;
    min-height: 100px;
    background-color: var(--card-bg);
    border-radius: 8px;
    padding: 12px;
    box-sizing: border-box;

    .title {
      font-size: 14px;
      color: var(--card-title-color);
    }

    .content {
      font-size: 14px;
      color: var(--card-content-color);
      line-height: 1.2;
    }
  }
}
</style>
