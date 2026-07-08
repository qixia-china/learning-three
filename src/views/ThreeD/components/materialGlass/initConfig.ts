import * as THREE from 'three'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

import World from './world'


const cameraOptions = {
  position: { x: 16, y: 10, z: 18 },
  target: { x: 0, y: 2, z: 0 },
};
export default class Application {
  canvas?: HTMLElement;
  scene = new THREE.Scene();
  camera?: THREE.PerspectiveCamera
  renderer?: THREE.WebGLRenderer
  controls?: OrbitControls
  world?: World
  constructor(id) {
    const el = document.getElementById(id)
    if (!el) return
    this.canvas = el
    this.initCamera()
    this.initRenderer()
    this.initControls()
    this.initWorld()
    this.addListener()
    this.animate()
  }
  //相机
  initCamera() {
    const aspect = window.innerWidth / window.innerHeight
    this.camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 2000)
    this.camera.position.set(
      cameraOptions.position.x,
      cameraOptions.position.y,
      cameraOptions.position.z,
    )
    this.camera.lookAt(cameraOptions.target.x, cameraOptions.target.y, cameraOptions.target.z)
  }
  // 渲染器
  initRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: this.canvas,
    })
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.outputColorSpace = THREE.SRGBColorSpace
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping
    this.renderer.toneMappingExposure = 1
  }
  // 控制器
  initControls() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.target.set(cameraOptions.target.x, cameraOptions.target.y, cameraOptions.target.z)
    this.controls.enableDamping = true
    this.controls.update()
  }

  initWorld() {
    this.world = new World(this)
    this.scene.add(this.world)
  }

  addListener() {
    window.addEventListener('resize', () => {
      this.camera.aspect = window.innerWidth / window.innerHeight
      this.camera.updateProjectionMatrix()
      this.renderer.setSize(window.innerWidth, window.innerHeight)
    })
  }

  render = () => {
    this.renderer.render(this.scene, this.camera)
  }

  animate() {
    const renderLoop = () => {
      this.controls.update()
      this.world?.update()
      this.render()
      requestAnimationFrame(renderLoop)
    }
    renderLoop()
  }
}
