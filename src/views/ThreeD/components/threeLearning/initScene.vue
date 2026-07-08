<template>
  <div class="init_scene_root">
    <canvas id="webGel"></canvas>
  </div>
</template>

<script lang="js" setup>
import { onMounted } from 'vue'

import { initScene, initCamera, initRenderer } from './initConfig'

import initControls from './OrbitControlsConfig'
// 物体
//
import { initMaterial } from './initMaterialConfig'

import { initGeometry } from './initGeometryConfig'

import { initMeshConfig } from './initMeshConfig'

// 灯光
import { initLightConfig } from './initLightConfig'

// 坐标系
import { initAxesHelper } from './initHelperConfig'
// GUI调试工具

import { createGui } from './initGatConfig'
const init = () => {
  const canvas = document.getElementById('webGel')
  const scene = initScene()
  const camera = initCamera()
  const renderer = initRenderer(canvas)

  // // 创建控制器-允许场景转动起来
  const controls = initControls(camera, renderer)

  // 创建物体
  const mesh = initMeshConfig(initGeometry(), initMaterial('MeshBasicMaterial'), {
    position: { x: 0, y: 0, z: 0 },
  })
  scene.add(mesh)

  // 添加灯光
  initLightConfig(scene)
  // GUI控制器
  createGui({ name: '', mesh, material: mesh.material })

  // 添加坐标系
  initAxesHelper(scene)
  function animate() {
    requestAnimationFrame(animate)
    controls.update()
    if (mesh.rotationBoolean) {
      mesh.rotation.x += 0.01
      mesh.rotation.y += 0.01
    }
    renderer.render(scene, camera)
  }
  animate()
}

onMounted(() => {
  init()
})
</script>

<style lang="scss" scoped></style>
