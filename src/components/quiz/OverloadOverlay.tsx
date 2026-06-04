"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface OverloadOverlayProps {
  overloadRate: number; // 0 ~ 100 사이의 과부하 수치
}

export default function OverloadOverlay({
  overloadRate,
}: OverloadOverlayProps) {
  const vignetteRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // 상시 작동하는 사이버펑크 노이즈 & 디지털 엠비언스 (Looping)
  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1, yoyo: true });

    // 격자 무늬가 미세하게 지직거리는 플리커(Flicker) 효과 연출
    tl.to(gridRef.current, {
      opacity: 0.12,
      duration: 0.15,
      ease: "none",
    }).to(gridRef.current, {
      opacity: 0.04,
      duration: 0.2,
      ease: "none",
    });

    return () => {
      tl.kill();
    };
  }, []);

  // overloadRate 수치 변화에 반응하는 위기감 연출 (Reactive)
  useEffect(() => {
    // 과부하율(0~100)을 투명도 값(0~1)으로 치환
    const intensity = overloadRate / 100;

    // 수치가 높아질수록 화면 사방에서 붉은 경고 레이어가 좁혀오며 투명도가 진해짐
    gsap.to(vignetteRef.current, {
      opacity: intensity,
      scale: 1 + intensity * 0.03, // 과부하가 심할수록 화면이 미세하게 조여드는 효과
      duration: 0.8,
      ease: "power2.out",
    });
  }, [overloadRate]);

  return (
    <div className="fixed inset-0 z-0 w-full h-screen bg-black overflow-hidden pointer-events-none">
      {/* 베이스 디지털 메트릭스 격자 레이어 */}
      <div
        ref={gridRef}
        className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-size-[50px_50px]"
      />

      {/* 과부하 수치에 비례해 화면 전체를 잠식하는 붉은색 경고 필터 (Vignette) */}
      <div
        ref={vignetteRef}
        className="absolute inset-0 opacity-0"
        style={{
          background:
            "radial-gradient(circle at center, transparent 20%, rgba(220, 38, 38, 0.3) 60%, rgba(153, 27, 27, 0.8) 100%)",
          boxShadow: "inset 0 0 120px rgba(220, 38, 38, 0.6)",
        }}
      />

      {/* 임계점 돌파 경고 (과부하 70% 이상일 때 백그라운드 맥박 연출) */}
      {overloadRate >= 70 && (
        <div className="absolute inset-0 border-4 border-red-600/20 animate-pulse" />
      )}
    </div>
  );
}
