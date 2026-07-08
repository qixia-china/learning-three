import * as THREE from 'three'
// 相机

export const perspectiveCameraConfig = function () {
  // // fov：垂直视角（度），aspect：宽高比，near：近截面，far：远截面
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  return camera
}

export const orthographicCameraConfig = function () {
  // // left: -1, right: 1, top: 1, bottom: -1, near: 0.1, far: 1000
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 1000)
  return camera
}
