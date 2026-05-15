"use client";

import { useRef } from "react";
import { useTimeline } from "@/hooks/useTimeLine";
import { useScrollYear } from "@/hooks/useScrollYear";
import { timelineData } from "@/data/timeline";
import MainScene from "@/components/MainScene";
import DashboardOverlay from "@/components/main/DashboardOverlay";
import YearController from "@/components/main/YearController";
import IntroOverlay from "@/components/animation/IntroOverlay";
import { useIntroStore } from "@/store/useIntroStore";

const START_YEAR = timelineData[0].year;
const END_YEAR = timelineData[timelineData.length - 1].year;

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { year, setYear } = useScrollYear(containerRef, START_YEAR, END_YEAR);
  const { metrics, label, description, visuals } = useTimeline(year);
  const stage = useIntroStore((state) => state.stage);

  return (
    <main
      ref={containerRef}
      className="relative bg-black md:h-[500vh] min-h-screen"
    >
      <IntroOverlay />

      <div className="md:fixed relative top-0 left-0 w-full h-screen overflow-hidden">
        {/* 비주얼 레이어 */}
        <div className="fixed inset-0 z-0">
          <MainScene hazardLevel={visuals.hazardLevel} co2={metrics.co2} />
          <div
            className="absolute inset-0 transition-colors duration-500 pointer-events-none"
            style={{
              backgroundColor: `rgba(${visuals.hazardLevel * 100}, 0, 0, 0.15)`,
            }}
          />
        </div>

        {stage === "finished" && (
          <>
            {/* UI 레이어 */}
            <div className="relative z-10 pointer-events-none h-full flex flex-col justify-center w-full max-w-4xl mx-auto px-4">
              <DashboardOverlay
                year={year}
                label={label}
                metrics={metrics}
                description={description}
              />
            </div>

            {/* 컨트롤 레이어 */}
            <div className="absolute bottom-0 w-full z-20 pb-8">
              <div className="w-full max-w-4xl mx-auto px-4">
                <YearController year={year} setYear={setYear} />
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
