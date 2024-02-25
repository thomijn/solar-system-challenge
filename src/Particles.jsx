import { useThree, useFrame } from "@react-three/fiber";
import System, {
  Debug,
  SpriteRenderer,
  BoxZone,
  CrossZone,
} from "three-nebula";
import * as THREE from "three";
import React from "react";
import particlesJson from "./particles.json";
import useSound from 'use-sound';

const createZone = () => {
  const zone = new BoxZone(80);
  zone.x = 1.2;
  zone.y = 0;
  zone.z = 25;

  zone.friction = 0.95;
  // zone.max = 7;

  return zone;
};

const createDebugger = ({ THREE: three, system, scene, zone }) => {
  Debug.drawZone(three, system, scene, zone);
};

function Particles() {
  const { scene } = useThree();
  const system = React.useRef(null);
  let OBJ = new THREE.Group();

  React.useEffect(() => {
    System.fromJSONAsync(particlesJson.particleSystemState, THREE).then(
      (sys) => {
        const nebulaRenderer = new SpriteRenderer(OBJ, THREE);
        let nebula = sys.addRenderer(nebulaRenderer);
        system.current = nebula;
        const zone = createZone();
        nebula.emitters[0].addBehaviours([new CrossZone(zone, "bound")]);
        OBJ.scale.set(0.06, 0.06, 0.06);
        OBJ.position.set(1.2, 0, 25);
      
        scene.add(OBJ);
      
      
        // createDebugger({
        //   THREE,
        //   system: nebula,
        //   scene,
        //   zone: zone,
        // });
      }
    );
  }, [scene]);

  useFrame((state,delta) => {
    if (system.current) system.current.update(delta * 2.8);
  });

  return null;
}

export default Particles;
