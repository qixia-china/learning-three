//
// THREE.Object3D 是 Three.js 中所有三维对象的基类，它定义了物体在三维空间中的基本属性和行为，是构建复杂场景的基石。几乎所有你看到的 3D 元素，如网格、相机、光源、组等，都继承自 Object3D。
import * as THREE from 'three'

import Application from "./initConfig";
import { RGBELoader } from "three/addons/loaders/RGBELoader.js";
import { GUI } from "dat.gui";


export default class World extends THREE.Object3D {
  app?: Application;
  scene = new THREE.Scene()
  base = new THREE.Group();
  gui!: GUI;
  glass!: THREE.Mesh<THREE.SphereGeometry, THREE.MeshPhysicalMaterial>;
  params = {
    exposure: 1,
    transmission: 1,
    roughness: 0.05,
    thickness: 1.2,
    ior: 1.45,
  };
  constructor(app: Application) {
    super();
    this.app = app;
    this.initScene();
    this.initGUI();
    this.loadHDRI();
  }
  initGUI() {
    const container = document.getElementById("gui");
    const gui = new GUI();
    container?.appendChild(gui.domElement);
    this.gui = gui;

    gui
      .add(this.params, "exposure", 0.2, 2.5, 0.01)
      .name("曝光")
      .onChange((v: number) => (this.app.renderer.toneMappingExposure = v));

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
  }
  initScene() {
    const geometry = new THREE.CylinderGeometry(3.6, 4.2, 1.2, 48);
    const material = new THREE.MeshLambertMaterial({ color: 0xffffff, metalness: 1, roughness: 0.25 });
    const pedestal = new THREE.Mesh(geometry, material);

    pedestal.position.y = 0.6;
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
    this.glass = glass;
    this.base.add(glass);
    this.add(this.base);

  }
  applyMaterialParams() {
    if (!this.glass) return;
    const mat = this.glass.material;
    mat.transmission = this.params.transmission;
    mat.roughness = this.params.roughness;
    mat.thickness = this.params.thickness;
    mat.ior = this.params.ior;
    mat.needsUpdate = true;
  }
  loadHDRI() {
    const loader = new RGBELoader();
    const url =
      "https://threejs.org/examples/textures/equirectangular/venice_sunset_1k.hdr";

    loader.load(
      url,
      (hdrTexture: THREE.Texture) => {
        hdrTexture.mapping = THREE.EquirectangularReflectionMapping;
        const pmrem = new THREE.PMREMGenerator(this.app.renderer);
        pmrem.compileEquirectangularShader();
        const envMap = pmrem.fromEquirectangular(hdrTexture).texture;
        this.app.scene.environment = envMap;
        this.app.scene.background = envMap;
        hdrTexture.dispose();
        pmrem.dispose();
      },
      undefined,
      (error: any) => {
        console.error("HDRI 加载失败", error);
      }
    );
  }

  update() {
    this.base.rotation.y += 0.006;
  }
}
