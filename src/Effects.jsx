import { useThree } from "@react-three/fiber";
import {
  EffectComposer,
  Vignette,
  Bloom,
  ToneMapping,
  SMAA,
} from "@react-three/postprocessing";
import { folder, useControls } from "leva";
import React from "react";
import { Color } from "three";
import LensFlare from "./UltimateLensFlare";
import * as THREE from "three";
import { BlendFunction } from "postprocessing";

const Effects = () => {
  const { scene } = useThree();
  const lensFlareProps = useControls({
    LensFlare: folder(
      {
        enabled: { value: true, label: "enabled?" },
        opacity: { value: 0.05, min: 0.0, max: 1.0, label: "opacity" },
        position: {
          value: { x: 50, y: 6, z: -160 },
          step: 1,
          label: "position",
        },
        glareSize: {
          value: 0.35,
          // step : 10,
          min: 0.01,
          max: 1.0,
          label: "glareSize",
        },
        starPoints: {
          value: 2.0,
          step: 1.0,
          min: 0,
          max: 32.0,
          label: "starPoints",
        },
        animated: {
          value: true,
          label: "animated?",
        },
        followMouse: {
          value: false,
          label: "followMouse?",
        },
        anamorphic: {
          value: false,
          label: "anamorphic?",
        },
        colorGain: {
          value: new Color(70, 70, 70),
          label: "colorGain",
        },
        Flare: folder({
          flareSpeed: {
            value: 0.4,
            step: 0.001,
            min: 0.0,
            max: 1.0,
            label: "flareSpeed",
          },
          flareShape: {
            value: 0.1,
            step: 0.001,
            min: 0.0,
            max: 1.0,
            label: "flareShape",
          },
          flareSize: {
            value: 0.005,
            step: 0.001,
            min: 0.0,
            max: 0.01,
            label: "flareSize",
          },
        }),

        SecondaryGhosts: folder({
          secondaryGhosts: {
            value: true,
            label: "secondaryGhosts?",
          },
          ghostScale: {
            value: 0.1,
            // step : 10,
            min: 0.01,
            max: 1.0,
            label: "ghostScale",
          },
          aditionalStreaks: {
            value: true,
            label: "aditionalStreaks?",
          },
        }),
        StartBurst: folder({
          starBurst: {
            value: false,
            label: "starBurst?",
          },
          haloScale: {
            value: 0.5,
            step: 0.01,
            min: 0.3,
            max: 1.0,
          },
        }),
      },
      {
        collapsed: true,
      }
    ),
  });

  return (
    <EffectComposer
    renderPriority={12}
    multisampling={1}
      resolution={[1024, 1024]}>
      <LensFlare {...lensFlareProps} />
      <Vignette eskil={false} offset={0.1} darkness={1.1}
        blendFunction={BlendFunction.NORMAL}
        />
      <Bloom
        mipmapBlur
        radius="0.7"
        luminanceThreshold="0.90"
        intensity="2"
        levels="4"
      />
    </EffectComposer>
  );
};

export default Effects;
