"use client";

import { useRef } from "react";
import { useTimeline } from "@/hooks/useTimeLine";
import { useScrollYear } from "@/hooks/useScrollYear";
import { timelineData } from "@/data/timeline";
import MainScene from "@/components/MainScene";
import DashboardOverlay from "@/components/dashboard/DashboardOverlay";
import YearController from "@/components/dashboard/YearController";

const START_YEAR = timelineData[0].year;
const END_YEAR = timelineData[timelineData.length - 1].year;

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { year, setYear } = useScrollYear(containerRef, START_YEAR, END_YEAR);
  const { metrics, label, description, visuals } = useTimeline(year);

  return (
    <main ref={containerRef} className="relative bg-black h-[500vh]">
      <div className="fixed top-0 left-0 w-full h-screen overflow-hidden">
        {/* 비주얼 레이어 */}
        <div className="absolute inset-0 z-0">
          <MainScene hazardLevel={visuals.hazardLevel} co2={metrics.co2} />
          <div
            className="absolute inset-0 transition-colors duration-500 pointer-events-none"
            style={{
              backgroundColor: `rgba(${visuals.hazardLevel * 100}, 0, 0, 0.15)`,
            }}
          />
        </div>

        {/* UI 레이어 */}
        <div className="relative z-10 pointer-events-none h-full flex flex-col justify-center">
          <DashboardOverlay
            year={year}
            label={label}
            metrics={metrics}
            description={description}
          />
        </div>

        {/* 컨트롤 레이어 */}
        <div className="absolute bottom-0 w-full z-20">
          <YearController year={year} setYear={setYear} />
        </div>
      </div>
    </main>
  );
}
