<template>
  <div>
    <canvas id="webgl" ref="canvas"></canvas>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

// 导入dat.gui
import * as dat from 'dat.gui'

const initDat = (scene: THREE.Scene, material: THREE.MeshBasicMaterial, mesh: THREE.Mesh) => {
  // 创建 GUI 对象
  const gui = new dat.GUI()
  // 几何体
  // const geometry = new THREE.BoxGeometry(1, 1, 1)
  // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
  // const mesh = new THREE.Mesh(geometry, material)

  scene.add(mesh)
  // 创建控制面板
  const cubeFolder = gui.addFolder('立方体')

  // 控制显示隐藏
  // gui.add(mesh, 'visible').name('显示/隐藏')

  // 添加位置控制
  cubeFolder.add(mesh.position, 'x', -5, 5).name('X 位置')
  cubeFolder.add(mesh.position, 'y', -5, 5).name('Y 位置')
  cubeFolder.add(mesh.position, 'z', -5, 5).name('Z 位置')

  // 添加缩放控制
  cubeFolder.add(mesh.scale, 'x', 0.1, 5).name('X 缩放')
  cubeFolder.add(mesh.scale, 'y', 0.1, 5).name('Y 缩放')
  cubeFolder.add(mesh.scale, 'z', 0.1, 5).name('Z 缩放')

  // 添加角度和颜色控制参数
  const params = {
    rotationX: 0,
    rotationY: 0,
    rotationZ: 0,
    color: '#00ff00',
  }

  // 添加旋转控制（使用角度）
  cubeFolder
    .add(params, 'rotationX', 0, 180)
    .name('X 旋转(度)')
    .onChange((value) => {
      mesh.rotation.x = THREE.MathUtils.degToRad(value)
    })
  cubeFolder
    .add(params, 'rotationY', 0, 180)
    .name('Y 旋转(度)')
    .onChange((value) => {
      mesh.rotation.y = THREE.MathUtils.degToRad(value)
    })
  cubeFolder
    .add(params, 'rotationZ', 0, 180)
    .name('Z 旋转(度)')
    .onChange((value) => {
      mesh.rotation.z = THREE.MathUtils.degToRad(value)
    })

  // 添加颜色控制
  cubeFolder
    .addColor(params, 'color')
    .name('颜色')
    .onChange((value) => {
      material.color.set(value)
    })

  // 默认展开文件夹
  cubeFolder.open()
}
// 初始化相机
const initCamera = () => {
  const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 3000)
  camera.position.set(100, 100, 100)
  camera.lookAt(0, 0, 0)

  return camera
}

// 初始化场景
const initScene = () => {
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0x262626)
  return scene
}
// 初始化渲染器
const initRenderer = (canvas: HTMLCanvasElement) => {
  const renderer = new THREE.WebGLRenderer({
    antialias: true, // // 开启抗锯齿，使物体边缘更加柔和
    canvas: canvas,
  })
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.outputColorSpace = THREE.SRGBColorSpace
  // // 开启阴影支持
  // // 计算机渲染阴影非常耗费性能，所以默认是关闭的
  renderer.shadowMap.enabled = true
  // // 设置阴影类型
  renderer.shadowMap.type = THREE.PCFSoftShadowMap

  renderer.setClearColor(0x262626)

  return renderer
}

// 初始化控制器
const initControls = (camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer) => {
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.target.set(0, 0, 0)
  controls.update()
  return controls
}

// 创建物体
const initGeometry = () => {
  const geometry = new THREE.BoxGeometry(10, 10, 10)
  return geometry
}
// 初始化材质
const initMaterial = () => {
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
  // const material = new THREE.MeshStandardMaterial({
  //   color: 0x2196f3,
  //   roughness: 0.3, // 表面比较光滑，会产生高光
  //   metalness: 0.2, // 带有轻微的金属质感
  // })
  return material
}

// 初始化网格，将几何体和材质结合在一起
const initCube = (
  geometry: THREE.BoxGeometry,
  material: THREE.MeshBasicMaterial,
  scene: THREE.Scene,
) => {
  const cube = new THREE.Mesh(geometry, material)

  // 设置为“投射阴影”，即该物体挡住光线时可以产生阴影
  cube.castShadow = true
  // 设置为“接收阴影”，即其他物体的影子可以投射在它身上
  cube.receiveShadow = true
  scene.add(cube)
  return cube
}

// 初始化辅助工具
const initaxesHelper = (scene: THREE.Scene) => {
  const axesHelper = new THREE.AxesHelper(30)
  scene.add(axesHelper)
}
// 初始化地面网格
const initGridHelper = (scene: THREE.Scene) => {
  const gridHelper = new THREE.GridHelper(50, 10)
  scene.add(gridHelper)
}
const init = () => {
  console.log('three', THREE)
  console.log('OrbitControls', OrbitControls)
  // 初始化相机、场景、渲染器等
  const canvas = document.getElementById('webgl')

  // 初始化相机
  const camera = initCamera()

  // // 创建场景
  const scene = initScene()
  // // 创建渲染器
  const renderer = initRenderer(canvas as HTMLCanvasElement)

  // // 创建控制器
  const controls = initControls(camera, renderer)

  // // 创建一个简单的立方体
  const geometry = initGeometry()
  // 材质
  const material = initMaterial()
  // 创建一个网格，将几何体和材质结合在一起
  initCube(geometry, material, scene)

  // 坐标系辅助工具
  initaxesHelper(scene)

  const mesh = new THREE.Mesh(geometry, material)

  // 创建一个地面网格
  // 参数1：网格的总长度和宽度，参数2：网格的细分线数
  initGridHelper(scene)

  initDat(scene, material, mesh)
  // 动画循环
  function animate() {
    requestAnimationFrame(animate)
    controls.update()
    // 让立方体旋转起来
    // cube.rotation.x += 0.01
    // cube.rotation.y += 0.01
    renderer.render(scene, camera)
  }

  animate()
}

onMounted(() => {
  init()
})
</script>

<style scoped lang="scss">
#webgl {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
</style>
