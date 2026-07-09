import * as THREE from 'three'

import Application from './initConfig'
import { RGBELoader } from 'three/examples/jsm/Addons.js'
// 右侧控制面板
import { GUI } from 'dat.gui'
export default class Goods extends THREE.Object3D {
  app?: Application
  scene = new THREE.Scene()
  // 组
  base = new THREE.Group()
  gui?: GUI
  goods!: THREE.Mesh<THREE.SphereGeometry, THREE.MeshPhysicalMaterial>
  dot!: THREE.Mesh<THREE.CylinderGeometry, THREE.MeshLambertMaterial>
  params = {
    exposure: 1,
    transmission: 1,
    roughness: 0.05,
    thickness: 1.2,
    ior: 1.45,
    color: 0xffffff

  };
  constructor(app: Application) {
    super()
    // this.add()
    this.app = app
    this.initScene()
    this.loadHDRI();
    this.initGui()
  }
  // 调试工具
  initGui() {
    const container = document.getElementById("gui");
    const gui = new GUI();
    container?.appendChild(gui.domElement);
    this.gui = gui;
    /**
     * 1. 数值滑块 (Number)
          当你传入 3个或4个参数，且第3、4个参数为数字时，会生成一个拖动条。
          参数1：被控制的 JavaScript 对象。
          参数2：该对象的具体属性名（字符串）。
          参数3 (min)：允许修改的最小值。
          参数4 (max)：允许修改的最大值。
          参数5 (step) [可选]：步长，即每次拖动改变的数值间隔。
          示例：gui.add(this.params, "exposure", 0.2, 2.5, 0.01) 会生成一个范围在 0.2 到 2.5 之间，步长为 0.01 的滑块。



     * */
    gui
      .add(this.params, "exposure", 0.2, 2.5, 0.01)
      .name("曝光")
      .onChange((v: number) => {
        if (this.app && this.app.renderer) {
          this.app.renderer.toneMappingExposure = v
        }
      })

    const matFolder = gui.addFolder("玻璃材质");
    matFolder
      .add(this.params, "transmission", 0, 1, 0.01)
      .name("透射")
      .onChange(() => this.applyMaterialParams());
    matFolder
      .add(this.params, "roughness", 0, 1, 0.01)
      .name("粗糙度")
      .onChange(() => this.applyMaterialParams());
    matFolder
      .add(this.params, "thickness", 0, 5, 0.01)
      .name("厚度")
      .onChange(() => this.applyMaterialParams());
    matFolder
      .add(this.params, "ior", 1, 2.3, 0.01)
      .name("折射率")
      .onChange(() => this.applyMaterialParams());

    // 显示/隐藏
    /**
     * 2. 布尔开关 (Boolean)
            当对象的属性值为 true 或 false 时，GUI 会自动生成一个勾选框（Checkbox）。
            参数1：被控制的对象。
            参数2：布尔类型的属性名。
          示例：gui.add(mesh, 'visible').name('显示/隐藏')。
     */
    gui.add(this, "visible").name("显示/隐藏");

    /**
     * 3. 下拉菜单 (Select)
     *  当对象的属性为字符串，且你额外传入了一个字符串数组作为参数时，会生成下拉选择菜单。
        参数1：被控制的对象。
        参数2：属性名。
        参数3 (options)：包含可选字符串的数组。
      示例：gui.add(params, 'quality', ['low', 'medium', 'high']).name('画质')。
     */

    /**
     * 4. 颜色控制器
     *  控制颜色时，不使用 .add()，而是使用专用的 .addColor() 方法。
        参数1：被控制的对象。
        参数2：颜色属性名（支持十六进制如 0xff0000 或 CSS 字符串如 "#ff0000"）。
        示例：gui.addColor(colorParams, 'cubeColor').name('立方体颜色')。
     *  */
    gui.addColor(this.params, "color").name("底座颜色").onChange(() => {
      if (this.goods) {
        this.dot.material.color.set(this.params.color);
      }
    })
    /**
     *
     */
  }
  applyMaterialParams() {
    if (!this.goods) return;
    const mat = this.goods.material;
    mat.transmission = this.params.transmission;
    mat.roughness = this.params.roughness;
    mat.thickness = this.params.thickness;
    mat.ior = this.params.ior;
    mat.needsUpdate = true;
  }
  initScene() {
    const geometry = new THREE.CylinderGeometry(3.6, 4.2, 1.2, 48);
    const material = new THREE.MeshLambertMaterial(
      {
        color: 0xffffff
      }
    );
    const pedestal = new THREE.Mesh(geometry, material);

    pedestal.position.y = 0.6;
    this.dot = pedestal;
    this.base.add(pedestal);

    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0,
      roughness: this.params.roughness,
      transmission: this.params.transmission,
      thickness: this.params.thickness,
      ior: this.params.ior,
      transparent: true,
    });

    const glass = new THREE.Mesh(new THREE.SphereGeometry(2.8, 96, 96), glassMat);

    glass.position.y = 3.2;
    this.goods = glass;
    this.base.add(glass);
    this.add(this.base);
  }
  update() {
    this.base.rotation.y += 0.006;
  }

  // 设置背景色
  loadHDRI() {
    const loader = new RGBELoader();
    const url =
      "/texture/1.hdr";

    loader.load(
      url,
      (hdrTexture: THREE.Texture) => {
        hdrTexture.mapping = THREE.EquirectangularReflectionMapping;
        if (this.app && this.app.renderer) {
          const pmrem = new THREE.PMREMGenerator(this.app.renderer);
          pmrem.compileEquirectangularShader();
          const envMap = pmrem.fromEquirectangular(hdrTexture).texture;
          this.app.scene.environment = envMap;
          this.app.scene.background = envMap;
          hdrTexture.dispose();
          pmrem.dispose();
        }
      },
      undefined,
      (error: any) => {
        console.error("HDRI 加载失败", error);
      }
    );

  }


}
