/**
 * 设置材质
 */
import * as THREE from 'three'

// 1.基础材质
export function initMeshBasicMaterial() {
  const material = new THREE.MeshBasicMaterial({
    color: '#ff6b6b',
    wireframe: false,
  })
  return material
}

// 2.非光泽表面的材质
export function initMeshLambertMaterial() {
  const material = new THREE.MeshLambertMaterial({
    color: 0x00ff00,
    emissive: 0x000000, // 自发光颜色
    emissiveIntensity: 0, // 自发光强度
    transparent: false,
    opacity: 1.0,
  })
  return material
}
// 3.具有镜面高光反射效果的材质
export function initMeshPhongMaterial() {
  const material = new THREE.MeshPhongMaterial({
    color: '#ff6b6b',
    shininess: 100, // 光泽度，值越大越亮
    specular: '#ffffff', // 镜面反射颜色
  })
  return material
}
// 4.具有物理基色的材质
export function initMeshStandardMaterial() {
  const material = new THREE.MeshStandardMaterial({
    color: '#ff6b6b',
    metalness: 0.3, // 金属度：0=非金属，1=完全金属
    roughness: 0.4, // 粗糙度：0=光滑镜面，1=完全粗糙
  })
  return material
}
// 5.物理材质
export function initMeshPhysicalMaterial() {
  const material = new THREE.MeshPhysicalMaterial({
    color: '#ff6b6b',
    metalness: 0.7,
    roughness: 0.2,
    clearcoat: 1.0, // 清漆层强度
    clearcoatRoughness: 0.1, // 清漆层粗糙度
    transmission: 0.1, // 透射程度
    thickness: 0.5, // 厚度（影响透射效果）
  })
  return material
}

// 贴图
export function initTexture(renderer) {
  const textureLoader = new THREE.TextureLoader()
  const albedo = textureLoader.load('/texture/6.png')
  albedo.colorSpace = THREE.SRGBColorSpace
  albedo.wrapS = THREE.RepeatWrapping
  albedo.wrapT = THREE.RepeatWrapping
  albedo.repeat.set(4, 4)
  albedo.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy())

  const material = new THREE.MeshStandardMaterial({
    map: albedo,
  })
  return material
}
export function initTexture1(renderer) {
  const textureLoader = new THREE.TextureLoader()
  const albedo = textureLoader.load('/texture/6.png')
  albedo.colorSpace = THREE.SRGBColorSpace
  albedo.wrapS = THREE.RepeatWrapping
  albedo.wrapT = THREE.RepeatWrapping
  albedo.repeat.set(4, 4)
  albedo.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy())

  const material = new THREE.MeshPhysicalMaterial({
    map: albedo,
  })
  return material
}

// 着色器材质

export function initShaderMaterial() {
  // 创建渐变材质
  const material = new THREE.ShaderMaterial({
    uniforms: {
      topColor: { value: new THREE.Color(0.5, 0.8, 1.0) },
      bottomColor: { value: new THREE.Color(0.1, 0.1, 0.5) },
    },
    vertexShader: `
    varying vec2 vUv;
    varying vec3 vNormal;
    void main() {
      vUv = uv;
      vNormal = normal;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
    fragmentShader: `
    uniform vec3 topColor;
    uniform vec3 bottomColor;
    varying vec2 vUv;
    varying vec3 vNormal;
    void main() {
      vec3 color;
      if (vNormal.y > 0.99) {
        color = bottomColor;  // 底部颜色
      } else if (vNormal.y < -0.99) {
        color = topColor;     // 顶部颜色
      } else {
        color = mix(topColor, bottomColor, vUv.y);
      }
      gl_FragColor = vec4(color, 1.0);
    }
  `,
  })
  return material
}
export function initMaterial(type, renderer) {
  switch (type) {
    case 'MeshBasicMaterial':
      return initMeshBasicMaterial()
    case 'MeshLambertMaterial':
      return initMeshLambertMaterial()
    case 'MeshPhongMaterial':
      return initMeshPhongMaterial()
    case 'MeshStandardMaterial':
      return initMeshStandardMaterial()
    case 'MeshPhysicalMaterial':
      return initMeshPhysicalMaterial()
    case 'initTexture':
      return initTexture(renderer)
    case 'initTexture1':
      return initTexture1(renderer)
    case 'ShaderMaterial':
      return initShaderMaterial()
    default:
      return initMeshBasicMaterial()
  }
}
