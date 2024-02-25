import {
  Bvh,
  Cylinder,
  Environment,
  MeshTransmissionMaterial,
  OrbitControls,
  Stars,
  useProgress,
} from "@react-three/drei";
import Asteroids from "./Asteroids";
import { Canvas } from "@react-three/fiber";
import Effects from "./Effects";
import { Leva, useControls } from "leva";
import Model from "./Spaceship";
import CameraControls from "./CameraControls";
import * as THREE from "three";
import ParticleSystem from "./Particles";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import useSound from "use-sound";
import audioSfx from '/audio.mp3';

function App() {
  const [entered, setEntered] = useState(false);
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const { progress } = useProgress();
  const [play] = useSound(audioSfx,{
    volume: 0.4,
    loop: true
  });

  useSound

  return (
    <>
      <AnimatePresence>
        {!entered && (
          <motion.div transition={{duration:1.2}} exit={{ opacity: 0 }} className="intro">
            <div className="progress-bar-wrapper">
              <motion.div
                className="progress-bar"
                initial={{ width: 0 }}
                animate={{
                  x: progress === 100 ? window.innerWidth * 0.31 : 0,
                  width: progress === 100 ? "100%" : progress + "%",
                }}
                transition={{
                  ease: [0.87, 0, 0.13, 1],
                  duration: 1,
                  x: {
                    type: "spring",
                    stiffness: 100,
                    damping: 20,
                    delay: 1,
                  },
                }}
              ></motion.div>
            </div>
            <motion.button
            exit={{ opacity: 0, transition: { duration: 0.1 }}}
              onClick={() => {
                setEntered(true);
                play();
              }}
              initial={{ opacity: 0 }}
              transition={{
                delay: 1.5,
                duration: 0.4,
                ease: [0.87, 0, 0.13, 1],
              }}
              animate={{
                opacity: progress === 100 ? 1 : 0,
              }}
            >
              Enter
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0
          -0.5, -1, 30.5], fov: isMobile ? 70 : 55 }}
      >
        <color attach="background" args={["#000009"]} />
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
    ior: { value: 0, min: 1, max: 5, step: 0.01 },
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
