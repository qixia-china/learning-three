// 配置调试工具
// npm install dat.gui  / npm install @types/dat.gui
//
import * as dat from 'dat.gui'
import * as THREE from 'three'
// 创建 GUI 对象
export function createGui({ name = '立方体', mesh }) {
  // 创建 GUI 对象
  const gui = new dat.GUI()
  // 创建控制面板
  const cubeFolder = gui.addFolder(name)

  // 添加物体位置控制
  cubeFolder.add(mesh.position, 'x', -5, 5).name('X 位置')
  cubeFolder.add(mesh.position, 'y', -5, 5).name('Y 位置')
  cubeFolder.add(mesh.position, 'z', -5, 5).name('Z 位置')

  // 添加物体缩放控制
  cubeFolder.add(mesh.scale, 'x', 0.1, 5).name('X 缩放')
  cubeFolder.add(mesh.scale, 'y', 0.1, 5).name('Y 缩放')
  cubeFolder.add(mesh.scale, 'z', 0.1, 5).name('Z 缩放')

  // 添加物体旋转控制
  // 添加角度和颜色控制参数
  const params = {
    rotationX: 0,
    rotationY: 0,
    rotationZ: 0,
    color: mesh.material.color.getHex(),
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
      mesh.material.color.set(value)
    })

  // 控制物体的展示隐藏
  cubeFolder.add(mesh, 'visible').name('显示/隐藏')
  // 开启旋转
  let rotationBooleanParams = {
    rotationBoolean: false,
  }
  console.log(mesh.geometry)
  cubeFolder
    .add(rotationBooleanParams, 'rotationBoolean')
    .name('自动旋转')
    .onChange((value) => {
      mesh.rotationBoolean = value
    })
  // 换形状
  const shapes = {
    cube: new THREE.BoxGeometry(4, 4, 4),
    sphere: new THREE.SphereGeometry(3, 64, 64),
    cone: new THREE.ConeGeometry(3, 6, 32),
    torus: new THREE.TorusGeometry(3, 1, 16, 100),
  }
  const shapeParams = {
    shape: 'sphere', // 默认形状
  }
  gui
    .add(shapeParams, 'shape', ['cube', 'sphere', 'cone', 'torus'])
    .name('修改形状')
    .onChange((value) => {
      // 替换 mesh 的几何体
      const oldGeometry = mesh.geometry
      let currentGeometry = shapes[value]
      mesh.geometry = currentGeometry
      // 释放旧几何体资源
      oldGeometry.dispose()
    })
  // 换材质
  const materials = {
    basic: new THREE.MeshBasicMaterial({ color: mesh.material.color.getHex() }),
    lambert: new THREE.MeshLambertMaterial({
      color: mesh.material.color.getHex(),
      emissive: 0x000000, // 自发光颜色
      emissiveIntensity: 0, // 自发光强度
      transparent: false,
      opacity: 1.0,
    }),
    phong: new THREE.MeshPhongMaterial({
      color: mesh.material.color.getHex(),
      shininess: 100, // 光泽度，值越大越亮
      specular: '#ffffff', // 镜面反射颜色
    }),
    standard: new THREE.MeshStandardMaterial({
      color: mesh.material.color.getHex(),
      metalness: 0.3, // 金属度：0=非金属，1=完全金属
      roughness: 0.4, // 粗糙度：0=光滑镜面，1=完全粗糙
    }),
    physical: new THREE.MeshPhysicalMaterial({
      color: mesh.material.color.getHex(),
      metalness: 0.7,
      roughness: 0.2,
      clearcoat: 1.0, // 清漆层强度
      clearcoatRoughness: 0.1, // 清漆层粗糙度
      transmission: 0.1, // 透射程度
      thickness: 0.5, // 厚度（影响透射效果）
    }),
  }
  const materialParams = {
    material: 'basic',
  }
  gui
    .add(materialParams, 'material', ['basic', 'lambert', 'phong', 'standard', 'physical'])
    .name('材质类型')
    .onChange((value) => {
      console.log(value)
      // 替换 mesh 的材质
      const oldMaterial = mesh.material

      let currentMaterial = materials[value]
      console.log(currentMaterial)
      currentMaterial.color.set(mesh.material.color.getHex()) // 设置颜色
      mesh.material = currentMaterial
      // 释放旧材质资源
      oldMaterial.dispose()
    })
  // 开启阴影
  let shadowBooleanParams = {
    shadowBoolean: false,
  }
  cubeFolder
    .add(shadowBooleanParams, 'shadowBoolean')
    .name('开启阴影')
    .onChange((value) => {
      mesh.castShadow = value // 开启阴影
      mesh.receiveShadow = value // 接收阴影
    })
  cubeFolder.open()
}
