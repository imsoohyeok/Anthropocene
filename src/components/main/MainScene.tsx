"use client";

import { Suspense, useEffect, useRef } from "react";
import gsap from "gsap";
import { MainSceneProps } from "@/types/MainScene";
import { Canvas } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import EarthModel from "../animation/EarthModel";
import DustParticle from "../animation/DustParticle";
import CameraHandler from "../animation/CameraHandler";
import { useIntroStore } from "@/store/useIntroStore";

export default function MainScene({ hazardLevel, co2 }: MainSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const stage = useIntroStore((state) => state.stage);

  const displayHazard =
    stage === "idle" ||
    stage === "zooming" ||
    stage === "warp_in" ||
    stage === "return_warp"
      ? 0
      : hazardLevel;

  useEffect(() => {
    gsap.to(textRef.current, {
      scale: 1 + displayHazard * 0.5,
      opacity: 0.1 + displayHazard * 0.3,
      duration: 0.8,
      ease: "power2.out",
    });

    gsap.to(containerRef.current, {
      backgroundColor: `rgba(${displayHazard * 60}, 10, 10, 1)`,
      duration: 0.8,
      ease: "power2.out",
    });
  }, [displayHazard, co2]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full bg-zinc-950 flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 z-10 pointer-events-none">
        <Canvas
          camera={{ position: [0, 0, 7], fov: 60 }}
          dpr={[1, 1.2]}
          shadows={false}
          gl={{
            antialias: false,
            powerPreference: "high-performance",
          }}
        >
          <CameraHandler />
          <fog attach="fog" args={["#0a0a0a", 5, 15]} />

          <ambientLight intensity={0.1} />
          <directionalLight
            position={[5, 5, 5]}
            intensity={1.5}
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />

          <Suspense fallback={null}>
            <EarthModel hazardLevel={displayHazard} />
            <DustParticle count={2000} />
          </Suspense>

          <EffectComposer>
            <Bloom
              luminanceThreshold={0.1}
              mipmapBlur
              intensity={0.2 + displayHazard * 1.5}
            />
          </EffectComposer>
        </Canvas>
      </div>
    </div>
  );
}
