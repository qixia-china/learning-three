import * as THREE from 'three'

export function initAxesHelper(scene) {
  const axesHelper = new THREE.AxesHelper(30)
  scene.add(axesHelper)

  const gridHelper = new THREE.GridHelper(50, 10)
  scene.add(gridHelper)
}
