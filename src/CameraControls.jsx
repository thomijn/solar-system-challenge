import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import * as THREE from "three";
const CameraControls = () => {
  let lookAt = new THREE.Vector3(5, 1, 0);
  useFrame((state, delta) => {
    easing.damp3(
      state.camera.position,
      [-0.4 + state.pointer.x / 2, (-1 + state.pointer.y) / 2, 30.5],
      0.5,
      delta
    );

    //lookat target
    easing.damp3(
      lookAt,
      new THREE.Vector3(
        (-5 * state.pointer.x) / 3,
        (1 * state.pointer.x) / 3,
        0
      ),
      0.5,
      delta
    );

    state.camera.lookAt(lookAt);
  });
  return null;
};

export default CameraControls;
