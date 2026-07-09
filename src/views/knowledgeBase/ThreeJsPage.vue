<template>
  <div class="goods-root">
    <canvas id="goods"></canvas>
    <div id="gui" class="gui"></div>
  </div>
  <div class="goods-root">
    <canvas id="bolls"></canvas>
    <div id="gui" class="gui"></div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import TestThree from './ThreeJsPage/initConfig'
onMounted(() => {
  new TestThree('goods')
  new TestThree('bolls')
})
</script>
<style lang="scss" scoped>
.goods-root {
  position: relative;
  border: 1px solid #ccc;
}
.gui {
  position: absolute;
  top: 0;
  right: 0;
}
</style>
