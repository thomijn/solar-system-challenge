import {
  Bvh,
  Cylinder,
  Environment,
  Lightformer,
  MeshTransmissionMaterial,
  OrbitControls,
  Stars,
  Stats,
  useTexture,
} from "@react-three/drei";
import Asteroids from "./Asteroids";
import { Canvas } from "@react-three/fiber";
import Effects from "./Effects";
import { Leva, useControls } from "leva";
import NektoFlareEffect from "./NektoFlareEffect";
import Model from "./Spaceship";
import CameraControls from "./CameraControls";
import * as THREE from "three";
import ParticleSystem from "./Particles";
function App() {
  const { sunColor } = useControls({
    sunColor: { value: "#ffff", label: "sunColor" },
  });

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  return (
    <>
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 30], fov: isMobile ? 70 : 55 }}>
        <Effects />
        {/* <Stats /> */}
        <Stars />
        <Bvh>
          <Asteroids />
          <Model position={[0, 0, 25]} />
          <Window />
        </Bvh>
        {/* <OrbitControls /> */}
        <CameraControls />
        <ParticleSystem />
        <Leva hidden />
      </Canvas>
    </>
  );
}

const Window = () => {

  const config = useControls({
    meshPhysicalMaterial: false,
    transmissionSampler: false,
    backside: false,
    samples: { value: 5, min: 1, max: 32, step: 1 },
    resolution: { value: 1024, min: 256, max: 2048, step: 256 },
    transmission: { value: 1, min: 0, max: 1 },
    roughness: { value: 0.0, min: 0, max: 1, step: 0.01 },
    thickness: { value: 4, min: 0, max: 10, step: 0.01 },
    ior: { value: 1.5, min: 1, max: 5, step: 0.01 },
    chromaticAberration: { value: 0.06, min: 0, max: 1 },
    anisotropy: { value: 0.1, min: 0, max: 1, step: 0.01 },
    distortion: { value: 0.0, min: 0, max: 1, step: 0.01 },
    distortionScale: { value: 0.3, min: 0.01, max: 1, step: 0.01 },
    temporalDistortion: { value: 0.5, min: 0, max: 1, step: 0.01 },
    clearcoat: { value: 1, min: 0, max: 1 },
    attenuationDistance: { value: 0.5, min: 0, max: 10, step: 0.01 },
    attenuationColor: "#ffffff",
    color: "#ffffff",
    bg: "#1d1d1d",
  });

  return (
    <Cylinder
      userData={{ lensflare: "no-occlusion" }}
      args={[2.15, 2.15, 0.1, 64]}
      position={[-0.1, -0.3, 23.5]}
      rotation={[Math.PI / 2, 0, 0]}
    >
      {config.meshPhysicalMaterial ? (
        <meshPhysicalMaterial {...config} />
      ) : (
        <MeshTransmissionMaterial
          background={new THREE.Color(config.bg)}
          {...config}
        />
      )}
    </Cylinder>
  );
};

export default App;
