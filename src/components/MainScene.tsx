"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { MainSceneProps } from "@/types/MainScene";

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
    </div>
  );
}
