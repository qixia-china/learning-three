import * as THREE from 'three'
const innerHeight = window.innerHeight - 200
const innerWidth = window.innerWidth - 450
// 场景、相机、渲染器
// 初始化场景
export function initScene() {
  const scene = new THREE.Scene()
  const loader = new THREE.CubeTextureLoader()
  const texture = loader.load([
    '/images/scene/1.png',
    '/images/scene/1.png',
    '/images/scene/1.png',
    '/images/scene/1.png',
    '/images/scene/1.png',
    '/images/scene/1.png',
  ])
  scene.background = texture

  // 颜色, 密度
  // scene.fog = new THREE.FogExp2(0x000000, 0.2)
  return scene
}
// 初始化相机
export function initCamera() {
  const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 3000)
  camera.position.set(100, 100, 100)
  camera.lookAt(0, 0, 0)

  return camera
}

// 初始化渲染器
export function initRenderer(canvas) {
  const renderer = new THREE.WebGLRenderer({
    antialias: true, // // 开启抗锯齿，使物体边缘更加柔和
    canvas: canvas,
  })
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(innerWidth, innerHeight)
  renderer.outputColorSpace = THREE.SRGBColorSpace
  // // 开启阴影支持
  // // 计算机渲染阴影非常耗费性能，所以默认是关闭的
  renderer.shadowMap.enabled = true
  // // 设置阴影类型
  renderer.shadowMap.type = THREE.PCFSoftShadowMap

  renderer.setClearColor(0x262626)

  return renderer
}
