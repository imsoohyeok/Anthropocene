"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { MainSceneProps } from "@/types/MainScene";
import { Canvas } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import DustParticles from "./dashboard/DustParticles";

export default function MainScene({ hazardLevel, co2 }: MainSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

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
      {/* 백그라운드 타이포그래피 (시각적 효과용) */}
      <div
        ref={textRef}
        className="text-zinc-700 text-[10rem] md:text-[15rem] font-black tracking-tighter whitespace-nowrap select-none"
        style={{ opacity: 0.1 }} // 초기 상태
      >
        ANTHROPOCENE
      </div>

      {/* 나중에 이 위치에 Three.js <Canvas /> 가 들어오게 됩니다! */}
      {/* THREE.JS CANVAS 레이어 */}
      <div className="absolute inset-0 z-10">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 75 }}
          dpr={[1, 2]} // 고해상도 지원
        >
          {/* 어두운 우주 공간 분위기를 위한 안개(Fog) */}
          <fog attach="fog" args={["#0a0a0a", 2, 10]} />

          <ambientLight intensity={0.2} />

          {/* 우주 먼지 컴포넌트에 데이터 전달 */}
          <DustParticles hazardLevel={hazardLevel} co2={co2} />

          {/* 빛 효과(Bloom)를 추가하여 먼지들이 반짝이게 만듭니다. */}
          <EffectComposer>
            <Bloom
              luminanceThreshold={0.2}
              luminanceSmoothing={0.9}
              height={300}
              intensity={0.5}
            />
          </EffectComposer>
        </Canvas>
      </div>
    </div>
  );
}
