"use client";

import { Suspense, useEffect, useRef } from "react";
import gsap from "gsap";
import { MainSceneProps } from "@/types/MainScene";
import { Canvas } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import EarthModel from "./animation/EarthModel";
import DustParticle from "./animation/DustParticle";
import CameraHandler from "./animation/CameraHandler";
import { useIntroStore } from "@/store/useIntroStore";

export default function MainScene({ hazardLevel, co2 }: MainSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const stage = useIntroStore((state) => state.stage);

  useEffect(() => {
    gsap.to(textRef.current, {
      scale: 1 + hazardLevel * 0.5,
      opacity: 0.1 + hazardLevel * 0.3,
      duration: 0.8,
      ease: "power2.out",
    });

    gsap.to(containerRef.current, {
      backgroundColor: `rgba(${hazardLevel * 60}, 10, 10, 1)`,
      duration: 0.8,
      ease: "power2.out",
    });
  }, [hazardLevel, co2]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full bg-zinc-950 flex items-center justify-center overflow-hidden"
    >
      {/* THREE.JS CANVAS 레이어 */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <Canvas
          camera={{ position: [0, 0, 7], fov: 60 }} // 카메라 위치 조정
          shadows // 그림자
          dpr={[1, 1.5]}
        >
          <CameraHandler />

          <fog attach="fog" args={["#0a0a0a", 5, 15]} />

          {/* 조명 세팅 */}
          <ambientLight intensity={0.1} />
          <directionalLight
            position={[5, 5, 5]}
            intensity={1.5}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />

          <Suspense fallback={null}>
            <EarthModel hazardLevel={stage !== "finished" ? 0 : hazardLevel} />
            <DustParticle count={2000} />
          </Suspense>

          {/* 빛 효과 */}
          <EffectComposer>
            <Bloom
              luminanceThreshold={0.1}
              intensity={0.2 + hazardLevel * 1.5}
            />
          </EffectComposer>
        </Canvas>
      </div>
    </div>
  );
}
