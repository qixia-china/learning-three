import * as THREE from "three";
import Application from './initConfig'


export default class Boll extends THREE.Object3D {
  app: Application;
  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2();
  pickables: THREE.Mesh[] = [];
  selected?: THREE.Mesh;
  originalColor = new THREE.Color();

  constructor(app: Application) {
    super();
    this.app = app;
    this.initScene();
    this.initPicking();
  }

  initScene() {
    this.app.scene.fog = new THREE.Fog(0x050510, 40, 120);

    const ambient = new THREE.AmbientLight(0xffffff, 0.45);
    const key = new THREE.DirectionalLight(0xffffff, 1.0);
    key.position.set(15, 30, 10);
    const fill = new THREE.DirectionalLight(0x88aaff, 0.6);
    fill.position.set(-20, 15, -10);
    this.add(ambient, key, fill);

    const baseMaterials = [
      new THREE.MeshStandardMaterial({
        color: 0xff8c5a,
        metalness: 0.4,
        roughness: 0.35,
      }),
      new THREE.MeshStandardMaterial({
        color: 0x5ab8ff,
        metalness: 0.3,
        roughness: 0.4,
      }),
      new THREE.MeshStandardMaterial({
        color: 0x6bde8a,
        metalness: 0.3,
        roughness: 0.35,
      }),
    ];

    const geometries = [
      new THREE.BoxGeometry(4, 4, 4),
      new THREE.SphereGeometry(2.6, 48, 48),
      new THREE.ConeGeometry(2.4, 5, 48),
    ];

    const count = 8;
    const radius = 11;

    for (let i = 0; i < count; i++) {
      const geo = geometries[i % geometries.length];
      if (!geo) return;
      const mat = baseMaterials?.[i % baseMaterials.length]?.clone() ?? new THREE.MeshStandardMaterial();
      mat.emissive = new THREE.Color(0x000000);
      mat.emissiveIntensity = 0;
      const mesh = new THREE.Mesh(geo, mat);
      const angle = (i / count) * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      mesh.position.set(x, geo.boundingSphere?.radius || 3, z);
      mesh.castShadow = true;
      mesh.receiveShadow = false;
      mesh.lookAt(0, mesh.position.y, 0);
      this.add(mesh);
      this.pickables.push(mesh);
    }
  }

  initPicking() {
    if (!this.app.renderer) return;
    const dom = this.app.renderer.domElement;
    // pointerdown：兼容所有指针设备，并且还能获取到按下的压力（pressure）、接触面积等高级属性。
    dom.addEventListener("pointerdown", (event) => {
      const rect = dom.getBoundingClientRect();
      this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      if (!this.app.camera) return;
      this.raycaster.setFromCamera(this.mouse, this.app.camera);
      const intersects = this.raycaster.intersectObjects(this.pickables, false);

      if (this.selected) {
        const material = this.selected.material as THREE.MeshStandardMaterial;
        material.color.copy(this.originalColor);
        material.emissive.set(0x000000);
        material.emissiveIntensity = 0;
        this.selected.scale.set(1, 1, 1);
        this.selected = undefined;
      }

      if (intersects.length > 0) {
        if (!intersects[0]) return;
        const mesh = intersects[0].object as THREE.Mesh;
        this.selected = mesh;
        const material = mesh.material as THREE.MeshStandardMaterial;
        this.originalColor.copy(material.color);
        material.emissive.set(material.color);
        material.emissiveIntensity = 0.7;
        mesh.scale.set(1.15, 1.15, 1.15);
      }
    });
  }

  update() { }
}
