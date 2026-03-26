"use client";

import { useState } from "react";
import { useTimeline } from "@/hooks/useTimeLine";
import MainScene from "@/components/MainScene";
import DashboardOverlay from "@/components/dashboard/DashboardOverlay";
import YearController from "@/components/dashboard/YearController";

export default function Home() {
  const [year, setYear] = useState(1850);
  const { metrics, label, description, visuals } = useTimeline(year);

  return (
    <main className="relative min-h-screen bg-black overflow-hidden">
      {/* 1. 비주얼 레이어: Three.js 장면 (배경) */}
      <div className="fixed inset-0 z-0">
        <MainScene hazardLevel={visuals.hazardLevel} co2={metrics.co2} />
        {/* hazardLevel에 따른 붉은 오버레이 효과도 유지 */}
        <div
          className="absolute inset-0 transition-colors duration-1000 pointer-events-none"
          style={{
            backgroundColor: `rgba(${visuals.hazardLevel * 100}, 0, 0, 0.15)`,
          }}
        />
      </div>

      {/* 2. UI 레이어: 정보 대시보드 */}
      {/* pointer-events-none을 통해 UI 뒤의 3D 씬을 클릭/드래그할 수 있게 합니다. */}
      <div className="relative z-10 pointer-events-none">
        <DashboardOverlay
          year={year}
          label={label}
          metrics={metrics}
          description={description}
        />
      </div>

      {/* 3. 컨트롤 레이어: 연도 조절 (클릭 가능해야 하므로 pointer-events-auto) */}
      <div className="relative z-20">
        <YearController year={year} setYear={setYear} />
      </div>
    </main>
  );
}
