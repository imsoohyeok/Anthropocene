"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface RisingSeaProps {
  waterLevel: number; // 0 ~ 100 사이의 수치
}

export default function RisingSea({ waterLevel }: RisingSeaProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wave1Ref = useRef<SVGPathElement>(null);
  const wave2Ref = useRef<SVGPathElement>(null);

  // 1. 파도의 일렁임 애니메이션 (Looping)
  useEffect(() => {
    // GSAP Timeline으로 두 파도를 서로 다른 속도로 움직여 겹쳐 보이게 만듭니다.
    const tl = gsap.timeline({ repeat: -1, defaults: { ease: "none" } });

    // 첫 번째 파도 (앞쪽, 좀 더 빠름)
    tl.to(
      wave1Ref.current,
      {
        duration: 4,
        attr: {
          d: "M0,60 C300,30 600,90 900,60 C1200,30 1500,90 1800,60 V120 H0 V60 Z",
        },
      },
      0,
    );

    tl.to(
      wave1Ref.current,
      {
        duration: 4,
        attr: {
          d: "M0,60 C300,90 600,30 900,60 C1200,90 1500,30 1800,60 V120 H0 V60 Z",
        },
      },
      4,
    );

    // 두 번째 파도 (뒤쪽, 좀 더 느리고 어두움)
    tl.to(
      wave2Ref.current,
      {
        duration: 6,
        attr: {
          d: "M0,60 C400,90 800,30 1200,60 C1600,90 2000,30 2400,60 V120 H0 V60 Z",
        },
      },
      0,
    );

    tl.to(
      wave2Ref.current,
      {
        duration: 6,
        attr: {
          d: "M0,60 C400,30 800,90 1200,60 C1600,30 2000,90 2400,60 V120 H0 V60 Z",
        },
      },
      6,
    );

    // 컴포넌트 언마운트 시 애니메이션 정리
    return () => {
      tl.kill();
    };
  }, []);

  // 2. waterLevel 수치에 따른 vertical(Y축) 위치 이동 애니메이션
  useEffect(() => {
    // waterLevel이 0이면 화면 아래(100%), 100이면 화면 위(0%)로 타겟팅합니다.
    const targetY = 100 - waterLevel;

    // 수치가 변할 때마다 부드럽게 1초 동안 이동합니다.
    gsap.to(containerRef.current, {
      top: `${targetY}%`,
      duration: 1,
      ease: "power2.out", // 자연스러운 감속 효과
    });
  }, [waterLevel]);

  return (
    // 전체 컨테이너: 화면 맨 뒤에 고정(`fixed inset-0 z-0`)
    <div className="fixed inset-0 z-0 w-full h-screen bg-black overflow-hidden pointer-events-none">
      {/* 움직이는 파도 래퍼 */}
      <div
        ref={containerRef}
        className="absolute left-0 w-full h-[120vh] transition-colors duration-500"
        style={{ top: "100%" }} // 초기 위치: 화면 아래
      >
        <svg
          viewBox="0 0 1800 120"
          preserveAspectRatio="none"
          className="w-full h-32 absolute top-0 -translate-y-full" // 파도 윗부분만 보이게 처리
        >
          {/* 뒤쪽 파도 (탁한 녹조색) */}
          <path
            ref={wave2Ref}
            d="M0,60 C400,30 800,90 1200,60 C1600,30 2000,90 2400,60 V120 H0 V60 Z"
            className="fill-zinc-900" // 매우 어두운 회색 (녹조 느낌)
          />
          {/* 앞쪽 파도 (약간 더 밝은 탁한 색) */}
          <path
            ref={wave1Ref}
            d="M0,60 C300,90 600,30 900,60 C1200,90 1500,30 1800,60 V120 H0 V60 Z"
            className="fill-zinc-800" // 약간 밝은 회색 (탁한 물 느낌)
          />
        </svg>

        {/* 파도 아래를 가득 채우는 심해 영역 */}
        <div className="w-full h-full bg-linear-to-b from-zinc-800 to-black" />
      </div>
    </div>
  );
}
