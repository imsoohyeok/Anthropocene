'use client'; // 클라이언트 컴포넌트 선언

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function MainScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 여기에 스크롤 기반 애니메이션 로직이 들어갈 예정입니다.
    // 예: 스크롤에 따라 CO2 농도 수치가 변하거나 배경색이 붉게 변하는 효과
  }, []);

  return (
    <div ref={containerRef} className="relative w-full">
      {/* 1. 고정 배경 (3D 지구나 타임라인 배경) */}
      <div className="fixed top-0 left-0 w-full h-screen -z-10 bg-zinc-900">
        <div className="flex items-center justify-center h-full text-zinc-700 text-9xl font-bold opacity-10">
          ANTHROPOCENE
        </div>
      </div>

      {/* 2. 스크롤용 섹션들 */}
      <section className="h-screen flex items-center justify-center p-10">
        <h2 className="text-4xl font-light tracking-tist">1750: 산업화의 서막</h2>
      </section>
      
      <section className="h-screen flex items-center justify-center p-10">
        <h2 className="text-4xl font-light tracking-widest">1950: 대 가속 (Great Acceleration)</h2>
      </section>

      <section className="h-screen flex items-center justify-center p-10">
        <h2 className="text-4xl font-light tracking-widest text-red-500">2026: 임계점</h2>
      </section>
    </div>
  );
}