<!--
使用 MeshPhysicalMaterial 实现玻璃/水晶等透射材质：
- transmission：透射强度（替代传统透明度透明）
- thickness：厚度，影响折射与吸收
- ior：折射率
- roughness：粗糙度，影响模糊折射

要点：
- 玻璃效果通常依赖环境贴图(scene.environment)
- 将背景与光照交给 HDRI，会更直观地看到折射与反射变化
-->

<script setup>
import { onMounted } from 'vue'
import Application from './components/materialGlass/initConfig'

onMounted(() => {
  const application = new Application('webgl')
})
</script>

<template>
  <canvas id="webgl"></canvas>
  <div id="gui"></div>
</template>

<style>
html {
  overflow: hidden;
}
html,
body,
#webgl {
  margin: 0px;
  padding: 0px;
}

#gui {
  position: absolute;
  top: 0;
  right: 0;
}
</style>
