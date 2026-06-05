"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface OverloadOverlayProps {
  overloadRate: number;
}

export default function OverloadOverlay({
  overloadRate,
}: OverloadOverlayProps) {
  const vignetteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const intensity = overloadRate / 100;

    gsap.to(vignetteRef.current, {
      opacity: intensity,
      duration: 0.8,
      ease: "power2.out",
    });
  }, [overloadRate]);

  return (
    <div className="fixed inset-0 z-40 w-full h-screen overflow-hidden pointer-events-none">
      {/* 붉은 안개 가장자리 */}
      <div
        ref={vignetteRef}
        className="absolute inset-0 opacity-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 45%, rgba(220, 20, 60, 0.15) 75%, rgba(255, 0, 0, 0.8) 100%)",
          boxShadow:
            "inset 0 0 100px rgba(255, 0, 0, 0.5), inset 0 0 250px rgba(220, 20, 60, 0.3)",
        }}
      />

      {/* 임계점(70% 이상) 도달 시: 심장 박동처럼 부드럽게 일렁이는 효과 */}
      {overloadRate >= 70 && (
        <div
          className="absolute inset-0 animate-[pulse_1.5s_ease-in-out_infinite]"
          style={{
            boxShadow: "inset 0 0 150px rgba(255, 0, 0, 0.4)",
          }}
        />
      )}
    </div>
  );
}
