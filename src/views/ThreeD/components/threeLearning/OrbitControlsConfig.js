// 让场景可转动
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export default function (camera, renderer) {
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.target.set(0, 0, 0)
  controls.update()
  return controls
}
