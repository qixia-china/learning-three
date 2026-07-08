import * as THREE from 'three'

export const initMeshConfig = (geometry, material, config = {}) => {
  const mesh = new THREE.Mesh(geometry, material)
  // 设置材质
  if (config.material) {
    mesh.material = config.material
  }
  // 设置位置
  if (config.position) {
    mesh.position.set(config.position.x, config.position.y, config.position.z)
  }
  // 设置缩放
  if (config.scale) {
    mesh.scale.set(config.scale.x, config.scale.y, config.scale.z)
  }
  // 设置旋转
  if (config.rotation) {
    mesh.rotation.set(config.rotation.x, config.rotation.y, config.rotation.z)
  }
  return mesh
}
