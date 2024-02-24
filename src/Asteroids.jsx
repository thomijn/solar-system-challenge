import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Instances, Instance, useGLTF } from "@react-three/drei";
import { useControls } from "leva";
import * as THREE from "three";
const randomRange = (min, max) => Math.random() * (max - min) + min;

function Asteroids() {
  const {
    numParticles,
    radius,
    positionZ,
    positionY,
    positionX,
    minScale,
    maxScale,
  } = useControls({
    numParticles: {
      value: 400,
      min: 100,
      max: 1000,
      step: 100,
    },
    radius: {
      value: 80,
      min: 10,
      max: 100,
      step: 10,
    },
    positionZ: {
      value: -90,
      min: -100,
      max: -50,
      step: 10,
    },
    positionY: {
      value: -40,
      min: -100,
      max: 0,
      step: 10,
    },
    positionX: {
      value: 0,
      min: -100,
      max: 100,
      step: 10,
    },
    minScale: {
      value: 0.5,
      min: 0.1,
      max: 1,
      step: 0.1,
    },
    maxScale: {
      value: 1.5,
      min: 1,
      max: 5,
      step: 0.1,
    },
  });
  const ref = useRef();

  const particles = Array.from({ length: numParticles }, (_, index) => {
    const angle = (index / numParticles) * Math.PI * 2;
    const xPosition = Math.cos(angle) * radius + randomRange(-20, 20);
    const yPosition = Math.sin(angle) * radius + randomRange(-20, 20);
    const zPosition = (Math.random() - 0.5) * 20 - 30; // Adjust z-position as needed
    const scale = randomRange(minScale, maxScale);
    const rotation = Math.random() * Math.PI;
    return { xPosition, yPosition, zPosition, scale, rotation };
  });

  const { nodes, materials } = useGLTF("/asteroid.glb");

  useFrame((state, delta) => {
    ref.current.rotation.z = ref.current.rotation.z += delta / 50;
  });

  materials.Asteroid_01.envMapIntensity = 0.2;

  return (
    <Instances
      geometry={nodes.Asteroid_Mob_01_Asteroid_01_0.geometry}
      material={materials.Asteroid_01}
      limit={particles.length}
      ref={ref}
      castShadow
      receiveShadow
      rotation={[Math.PI * 0.5, 0, 0]}
      position={[positionX, positionY, positionZ]}
    >
      {/* <mesh  /> */}
      {particles.map((data, i) => (
        <Asteroid key={i} {...data} />
      ))}
    </Instances>
  );
}

function Asteroid({ scale, xPosition, yPosition, zPosition, rotation }) {
  const ref = useRef();
  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime() + rotation * 10;

    ref.current.position.x = xPosition + Math.cos(t / 2) * delta;
    ref.current.position.y = yPosition + Math.sin(t / 2) * delta;
    ref.current.position.z = zPosition + Math.sin(t / 2) * delta;

    ref.current.rotation.x = rotation * Math.sin(t / 9);
    ref.current.rotation.y = rotation * Math.cos(t / 9);
    ref.current.rotation.z = rotation * Math.sin(t / 9);
  });
  return (
    <Instance
      rotation={[rotation, rotation, rotation]}
      ref={ref}
      scale={[scale, scale, scale]}
      position={[xPosition, yPosition, zPosition]}
    />
  );
}

export default Asteroids;
