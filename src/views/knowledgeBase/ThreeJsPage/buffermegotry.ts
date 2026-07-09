import * as THREE from "three";

export default class BuGeometry extends THREE.Object3D {
  constructor() {
    super();
    // for debug
    // this.initAxesHelper();

    const geometry = this.initCustomGeometry();

    const material = new THREE.MeshBasicMaterial({
      vertexColors: true,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.9,
      color: 0x00ffff, // 这里的颜色值会和顶点颜色叠加
      depthWrite: false,
    });

    const mesh = new THREE.Mesh(geometry, material);
    this.add(mesh);
  }

  // 创建自定义几何体
  initCustomGeometry() {
    const data = [
      [-15, 15],
      [15, 15],
      [15, -15],
      [0, -15],
    ];
    const height = 20; // y 方向高度，可按需暴露为参数
    const numSegments = data.length - 1; // 线段数
    const positions: number[] = [];
    const indices: number[] = [];
    const colors: number[] = [];

    // 顶点颜色渐变（下->上）
    const bottomColor = new THREE.Color(0xffff00);
    const topColor = new THREE.Color(0x0000ff);

    for (let i = 0; i < numSegments; i++) {
      const [x0, z0] = data[i] ?? [0, 0];
      const [x1, z1] = data[i + 1] ?? [0, 0];

      // 为每段创建 4 个顶点：
      // v0(x0, 0, z0), v1(x0, h, z0), v2(x1, 0, z1), v3(x1, h, z1)
      const baseIndex = (positions.length / 3) | 0;
      if (x0 == undefined || z0 == undefined || x1 == undefined || z1 == undefined) {
        return;
      }
      // v0
      positions.push(x0, 0, z0);
      colors.push(bottomColor.r, bottomColor.g, bottomColor.b);
      // v1
      positions.push(x0, height, z0);
      colors.push(topColor.r, topColor.g, topColor.b);
      // v2
      positions.push(x1, 0, z1);
      colors.push(bottomColor.r, bottomColor.g, bottomColor.b);
      // v3
      positions.push(x1, height, z1);
      colors.push(topColor.r, topColor.g, topColor.b);

      // 两个三角形： (v0, v2, v1) 和 (v2, v3, v1)
      indices.push(baseIndex + 0, baseIndex + 2, baseIndex + 1, baseIndex + 2, baseIndex + 3, baseIndex + 1);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geometry.setIndex(indices);
    geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
    geometry.computeVertexNormals();
    return geometry;
  }

  initAxesHelper() {
    const axesHelper = new THREE.AxesHelper(250);
    axesHelper.position.set(0, 0, 0);
    this.add(axesHelper);
  }

  update() { }
}
