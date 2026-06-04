"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useTimeline } from "@/hooks/useTimeLine";
import { useScrollYear } from "@/hooks/useScrollYear";
import { timelineData } from "@/data/timeline";
import { useIntroStore } from "@/store/useIntroStore";
import { useGameStore } from "@/store/useGameStore";
import { motion, AnimatePresence } from "framer-motion";

import MainScene from "@/components/main/MainScene";
import DashboardOverlay from "@/components/main/DashboardOverlay";
import YearController from "@/components/main/YearController";
import IntroOverlay from "@/components/animation/IntroOverlay";
import ModeSelectMenu from "@/components/main/ModeSelectMenu";
import FlashBangOverlay from "@/components/animation/NameError";

const START_YEAR = timelineData[0].year;
const END_YEAR = timelineData[timelineData.length - 1].year;

export default function Home() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  const stage = useIntroStore((state) => state.stage);
  const setStage = useIntroStore((state) => state.setStage);
  const changeMode = useGameStore((state) => state.changeMode);

  const isReturningMode = stage === "return_warp";

  const { year, setYear } = useScrollYear(containerRef, START_YEAR, END_YEAR);
  const { metrics, label, description, visuals } = useTimeline(year);

  const [showModeSelect, setShowModeSelect] = useState(false);
  const [isWarping, setIsWarping] = useState(false);

  // 로직 핸들러
  const handleModeSelect = (selectedMode: "scenario" | "random") => {
    setIsWarping(true);
    setStage("warp_in");

    setTimeout(() => {
      changeMode(selectedMode);
      router.push("/quiz");
    }, 1500);
  };

  return (
    <main
      ref={containerRef}
      className={`relative bg-black min-h-screen ${showModeSelect ? "h-screen overflow-hidden" : "md:h-[500vh]"}`}
    >
      {/* 인트로 레이어: 워프 중이거나 복귀 중일 때는 숨김 */}
      <div
        className={stage === "warp_in" || isReturningMode ? "hidden" : "block"}
      >
        <IntroOverlay />
      </div>

      <div className="md:fixed relative top-0 left-0 w-full h-screen overflow-hidden">
        {/* 비주얼 레이어: 3D 배경 */}
        <div className="fixed inset-0 z-0">
          <MainScene hazardLevel={visuals.hazardLevel} co2={metrics.co2} />
          <div
            className="absolute inset-0 transition-colors duration-500 pointer-events-none"
            style={{
              backgroundColor: `rgba(${visuals.hazardLevel * 100}, 0, 0, 0.15)`,
            }}
          />
        </div>

        <FlashBangOverlay
          isWarping={isWarping}
          isReturning={stage === "return_warp"}
        />

        {!isReturningMode && !isWarping && stage === "finished" && (
          <AnimatePresence mode="wait">
            {!showModeSelect ? (
              // 대시보드 화면
              <motion.div
                key="dashboard"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 z-10 flex flex-col h-full pointer-events-none"
              >
                <div className="flex-1 flex flex-col justify-center w-full max-w-4xl mx-auto px-4">
                  <DashboardOverlay
                    year={year}
                    label={label}
                    metrics={metrics}
                    description={description}
                    onEnterQuiz={() => setShowModeSelect(true)}
                  />
                </div>
                <div className="absolute bottom-0 w-full z-20 pb-8 pointer-events-auto">
                  <div className="w-full max-w-4xl mx-auto px-4">
                    <YearController year={year} setYear={setYear} />
                  </div>
                </div>
              </motion.div>
            ) : (
              // 모드 선택 화면
              <ModeSelectMenu
                isWarping={isWarping}
                onClose={() => {
                  setShowModeSelect(false);
                  setYear(START_YEAR);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                onSelectMode={handleModeSelect}
              />
            )}
          </AnimatePresence>
        )}
      </div>
    </main>
  );
}
