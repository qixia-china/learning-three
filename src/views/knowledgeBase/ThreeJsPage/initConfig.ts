import * as THREE from 'three'
// import { OrbitControls } from 'three/examples/js/controls/OrbitControls.js'
import { OrbitControls } from 'three/examples/jsm/Addons.js'
import Goods from './Goods'
import Boll from './boll'
import BuGeometry from './buffermegotry'
const cameraOptions = {
  position: { x: 16, y: 10, z: 18 },
  target: { x: 0, y: 2, z: 0 },
}
export default class TestThree {
  scene = new THREE.Scene()
  canvas?: HTMLElement
  innerWidth = 500
  innerHeight = 400
  camera?: THREE.PerspectiveCamera
  renderer?: THREE.WebGLRenderer
  controls?: OrbitControls
  goods?: Goods
  bolls?: Boll
  buGeometry?: BuGeometry
  constructor(id: string) {
    const el = document.getElementById(id)
    if (!el) return
    this.canvas = el;
    this.scene.background = new THREE.Color(0xfff)
    this.initCramera(); // 初始化相机
    this.initRender(); // 初始化渲染器
    this.initControls(); // 初始化控制器
    this.initGoods(); // 初始化物体
    this.initBoll(); // 初始化球
    this.initBuGeometry(); // 自定义形状
    this.addEventListener(); // 添加监听
    this.animate(); // 渲染

  }
  // 初始化照相机
  initCramera() {
    const aspect = this.innerWidth / this.innerHeight;
    this.camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000)
    this.camera.position.set(
      cameraOptions.position.x,
      cameraOptions.position.y,
      cameraOptions.position.z
    )
    console.log("照相机")
    this.camera.lookAt(cameraOptions.target.x, cameraOptions.target.y, cameraOptions.target.z)

  }
  // 渲染器
  initRender() {
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: this.canvas,
    })
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setSize(this.innerWidth, this.innerHeight)
    this.renderer.outputColorSpace = THREE.SRGBColorSpace
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping
    this.renderer.toneMappingExposure = 1
    console.log("渲染器");
  }
  // 设置控制器
  initControls() {
    if (this.camera && this.renderer) {
      this.controls = new OrbitControls(this.camera, this.renderer.domElement)
      this.controls.target.set(cameraOptions.target.x, cameraOptions.target.y, cameraOptions.target.z)
      this.controls.enableDamping = true
      this.controls.update()
    }
  }
  // 添加监听
  addEventListener() {
    window.addEventListener('resize', () => {
      if (this.camera && this.renderer) {
        this.camera.aspect = this.innerWidth / this.innerHeight
        this.camera.updateProjectionMatrix()
        this.renderer.setSize(this.innerWidth, this.innerHeight)
      }
    })

  }
  render = () => {
    if (this.renderer && this.camera) {
      this.renderer.render(this.scene, this.camera)
    }
  }
  initGoods() {
    this.goods = new Goods(this)
    this.scene.add(this.goods)
    console.log("物体", this.goods)
  }
  initBoll() {
    this.bolls = new Boll(this)
    this.scene.add(this.bolls)
    console.log("球", this.bolls)
  }
  initBuGeometry() {
    this.buGeometry = new BuGeometry()
    this.scene.add(this.buGeometry)
    console.log("球", this.buGeometry)
  }
  animate() {
    const renderLoop = () => {
      if (this.controls) { this.controls.update() }
      if (this.goods) { this.goods?.update() }
      this.render()
      requestAnimationFrame(renderLoop)
    }
    renderLoop()
  }
  // 初始化物体
  initObject() { }
}
