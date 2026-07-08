/**
 * 设置几何体
 */
import * as THREE from 'three'

export const initGeometry = (type = 'sphere') => {
  switch (type) {
    case 'sphere':
      return initSphereGeometry()
    case 'box':
      return initBoxGeometry()
    case 'circle':
      return initCircleGeometry()
    case 'cone':
      return initConeGeometry()
    default:
      return initSphereGeometry()
  }
}
// 立方体

export const initBoxGeometry = () => {
  const geometry = new THREE.BoxGeometry(4, 4, 4)
  return geometry
}

// 圆
export const initCircleGeometry = () => {
  const geometry = new THREE.CircleGeometry(3, 64)
  return geometry
}

// 圆锥
export const initConeGeometry = () => {
  const geometry = new THREE.ConeGeometry(3, 3, 64)
  return geometry
}

export const initSphereGeometry = () => {
  const geometry = new THREE.SphereGeometry(3, 64, 64)
  return geometry
}
