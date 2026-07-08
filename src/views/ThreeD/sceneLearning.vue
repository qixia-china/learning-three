<template>
  <div class="scene_root">
    <canvas id="webgl"></canvas>
  </div>
</template>
<script setup>
import { onMounted } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
const initControls = function (camera, renderer) {
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true // 启用阻尼效果，让旋转更平滑
  controls.dampingFactor = 0.05
  controls.screenSpacePanning = false // 禁用屏幕空间平移，避免视角错乱
  controls.minDistance = 1 // 最小缩放距离
  controls.maxDistance = 100 // 最大缩放距离
}
const init = function () {
  // 1. 获取画布并创建场景
  const canvas = document.getElementById('webgl')
  const scene = new THREE.Scene()

  // 2. 加载天空盒（全景背景）
  const loader = new THREE.CubeTextureLoader()
  loader.load(
    [
      '/images/scene/1.png',
      '/images/scene/2.png',
      '/images/scene/3.png',
      '/images/scene/4.png',
      '/images/scene/5.png',
      '/images/scene/6.png',
    ],
    function (texture) {
      // 【添加这几行代码】
      texture.generateMipmaps = false // 禁止生成多级渐远纹理，防止格式报错
      texture.minFilter = THREE.LinearFilter // 设置过滤模式，避免 mipmap 问题
      texture.magFilter = THREE.LinearFilter
      // 加载完成后，将天空盒应用到场景的背景上
      scene.background = texture
      animate()
    },
    undefined,
    function (err) {
      console.error('An error happened', err)
    },
  )
  // scene.background = texture

  // 3. 创建透视相机
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  // 将相机沿 Z 轴向后移动，确保能拍到场景中的物体
  camera.position.z = 5

  // 4. 创建渲染器
  const renderer = new THREE.WebGLRenderer({
    antialias: true, // 开启抗锯齿
    canvas: canvas,
  })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(window.devicePixelRatio)

  initControls(camera, renderer)
  // 5. 【核心修复】添加环境光，解决物体纯黑问题
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.8) // 柔和白光，强度0.8
  scene.add(ambientLight)

  // 6. 创建一个立方体作为测试物体
  const geometry = new THREE.BoxGeometry(1, 1, 1)
  const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 }) // 绿色标准材质
  const cube = new THREE.Mesh(geometry, material)
  scene.add(cube)

  // 7. 启动渲染循环
  function animate() {
    requestAnimationFrame(animate)

    // 让立方体缓慢旋转，方便观察
    cube.rotation.x += 0.01
    cube.rotation.y += 0.01

    renderer.render(scene, camera)
  }
  animate()
}
onMounted(() => {
  init()
})
</script>
