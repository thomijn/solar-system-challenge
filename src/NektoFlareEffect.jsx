import { useFrame, useThree } from "@react-three/fiber"
import { LensFlarePass, Flare } from './NektoFlare'
import { EffectComposer, RenderPass, } from "postprocessing";
import * as THREE from "three";

const NektoFlareEffect = () => {
    const gl = useThree((state) => state.gl)
    const scene = useThree((state) => state.scene)
    const camera = useThree((state) => state.camera)

    const composer = new EffectComposer(gl, {
        stencilBuffer: true,
        depthBuffer: true,
        frameBufferType: THREE.HalfFloatType
    });
    composer.setSize(window.innerWidth, window.innerHeight);

    const renderPass = new RenderPass(scene, camera);
    renderPass.clearPass.setClearFlags(true, true, true);
    composer.addPass(renderPass);

    let flares = [];
    const MAX_FLARES = 512;
    let CURR_FLARES = 2;
    for (let i = 0; i < CURR_FLARES; i++) {
        const flare = new Flare({
            position: new THREE.Vector3(0, 0, 20),
            colorGain: new THREE.Color(Math.random(), Math.random(), Math.random()),
            angle: Math.random() * Math.PI * 2,
        });
        flares.push(flare);
    }

    const lensFlarePass = new LensFlarePass(scene, camera, flares, {
        coverageScale: 2.0
    });
    lensFlarePass.doTransparency = true;
    composer.addPass(lensFlarePass);
    useFrame((state, delta) => {
        composer.render(delta);
    });

    return null
}

export default NektoFlareEffect