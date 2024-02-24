/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useEffect, useRef } from "react";
import { useAnimations, useGLTF, useTexture } from "@react-three/drei";

export default function Model({ ...props }) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/spaceship-transformed.glb");
  const { actions } = useAnimations(animations, group)

  const bakedTexture = useTexture("/baked.jpg");
  const bakedAstronaut = useTexture("/baked-astronaut.jpg");
  bakedAstronaut.channel = 1;
  const bakedTexture2 = bakedTexture.clone();
  bakedTexture2.channel = 1;

  useEffect(() => {
    console.log(actions)
    actions['Armature|mixamo.com|Layer0'].play();
  }
  , []);

  return (
    <group ref={group} {...props} dispose={null}>
      <mesh geometry={nodes.ship.geometry} material={nodes.ship.material}>
        <meshBasicMaterial map={bakedTexture2} map-flipY={false} />
      </mesh>
      <mesh geometry={nodes.screws.geometry} material={nodes.screws.material}>
        <meshBasicMaterial map={bakedTexture} map-flipY={false} />
      </mesh>
      <mesh geometry={nodes.vents.geometry} material={nodes.vents.material}>
        <meshBasicMaterial map={bakedTexture} map-flipY={false} />
      </mesh>
      <mesh geometry={nodes.buttons.geometry} material={nodes.buttons.material}>
        <meshBasicMaterial map={bakedTexture} map-flipY={false} />
      </mesh>
      <mesh geometry={nodes.cables.geometry} material={nodes.cables.material}>
        <meshBasicMaterial map={bakedTexture} map-flipY={false} />
      </mesh>
      <mesh
        geometry={nodes.controlpanels.geometry}
        material={nodes.controlpanels.material}
      >
        <meshBasicMaterial map={bakedTexture} map-flipY={false} />
      </mesh>
      <mesh geometry={nodes.lever1.geometry} material={nodes.lever1.material}>
        <meshBasicMaterial map={bakedTexture} map-flipY={false} />
      </mesh>
      <mesh geometry={nodes.lever2.geometry} material={nodes.lever2.material}>
        <meshBasicMaterial map={bakedTexture} map-flipY={false} />
      </mesh>
      <mesh geometry={nodes.light.geometry} material={nodes.light.material}>
        <meshBasicMaterial map={bakedTexture} map-flipY={false} />
      </mesh>

      <group name="Armature" position={[-0.48, -2.63, 1.88]} rotation={[Math.PI / 2, 0, Math.PI]} scale={0.035}>
          <primitive object={nodes.mixamorigHips} />
          <skinnedMesh name="LOD_0" geometry={nodes.LOD_0.geometry} material={nodes.LOD_0.material} skeleton={nodes.LOD_0.skeleton} >
            <meshBasicMaterial map={bakedAstronaut} map-flipY={false} />
          </skinnedMesh>
        </group>
    </group>
  );
}

useGLTF.preload("/spaceship-transformed.glb");
