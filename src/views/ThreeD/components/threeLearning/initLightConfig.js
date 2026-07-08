import * as THREE from 'three'

export function initLightConfig(scene) {
  // 创建环境光
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
  scene.add(ambientLight)

  // 创建主光源
  const mainLight = new THREE.DirectionalLight(0xffffff, 1)
  mainLight.position.set(5, 8, 5)
  mainLight.castShadow = true
  mainLight.intensity = 2
  scene.add(mainLight)

  // 创建辅助光源
  const secondaryLight = new THREE.DirectionalLight(0xffffff, 0.3)
  secondaryLight.position.set(-5, 5, -5)
  scene.add(secondaryLight)
}
