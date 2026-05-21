"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useTimeline } from "@/hooks/useTimeLine";
import { useScrollYear } from "@/hooks/useScrollYear";
import { timelineData } from "@/data/timeline";
import MainScene from "@/components/MainScene";
import DashboardOverlay from "@/components/main/DashboardOverlay";
import YearController from "@/components/main/YearController";
import IntroOverlay from "@/components/animation/IntroOverlay";
import { useIntroStore } from "@/store/useIntroStore";
import { useGameStore } from "@/store/useGameStore";
import { motion, AnimatePresence } from "framer-motion";

const START_YEAR = timelineData[0].year;
const END_YEAR = timelineData[timelineData.length - 1].year;

export default function Home() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  const { year, setYear } = useScrollYear(containerRef, START_YEAR, END_YEAR);
  const { metrics, label, description, visuals } = useTimeline(year);

  const stage = useIntroStore((state) => state.stage);
  const setStage = useIntroStore((state) => state.setStage);
  const changeMode = useGameStore((state) => state.changeMode);

  const [showModeSelect, setShowModeSelect] = useState(false);
  const [isWarping, setIsWarping] = useState(false);

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
      // 모드 선택 창이 떴을 때는 스크롤이 내려가지 않도록 잠금
      className={`relative bg-black min-h-screen ${showModeSelect ? "h-screen overflow-hidden" : "md:h-[500vh]"}`}
    >
      <div className={stage === "warp_in" ? "hidden" : "block"}>
        <IntroOverlay />
      </div>

      <div className="md:fixed relative top-0 left-0 w-full h-screen overflow-hidden">
        {/* 3D 비주얼 레이어 (언제나 맨 밑바닥 유지) */}
        <div className="fixed inset-0 z-0">
          <MainScene hazardLevel={visuals.hazardLevel} co2={metrics.co2} />
          <div
            className="absolute inset-0 transition-colors duration-500 pointer-events-none"
            style={{
              backgroundColor: `rgba(${visuals.hazardLevel * 100}, 0, 0, 0.15)`,
            }}
          />
        </div>

        {/* 화이트아웃(플래시뱅) 오버레이 */}
        <AnimatePresence>
          {isWarping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeIn" }}
              className="absolute inset-0 z-999 bg-white pointer-events-none"
            />
          )}
        </AnimatePresence>

        {stage === "finished" && (
          <AnimatePresence mode="wait">
            {!showModeSelect ? (
              // 화면 1: 타임라인 대시보드
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
                    // ✨ 버튼을 눌렀을 때 퀴즈 모드 선택 창을 띄우도록 연결!
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
              // 화면 2: 홀로그램 모드 선택 UI
              <motion.div
                key="mode_select"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  filter: isWarping ? "blur(10px)" : "blur(0px)",
                  transform: isWarping ? "scale(1.1)" : "scale(1)",
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm pointer-events-auto px-6"
              >
                {/* 뒤로가기 버튼 */}
                <button
                  onClick={() => setShowModeSelect(false)}
                  disabled={isWarping}
                  className="absolute top-8 left-8 text-zinc-400 hover:text-white transition-colors font-bold tracking-[0.2em] text-xs uppercase"
                >
                  타임라인
                </button>

                <div className="flex flex-col items-center w-full max-w-5xl">
                  <h1 className="text-2xl md:text-4xl font-black mb-4 tracking-widest text-center text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
                    모드 선택
                  </h1>
                  <p className="text-zinc-300 mb-12 text-center text-sm md:text-base tracking-wider">
                    인류의 운명을 결정할 방식을 선택하십시오
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
                    {/* Mode 1 */}
                    <button
                      onClick={() => handleModeSelect("scenario")}
                      disabled={isWarping}
                      className="group relative flex flex-col items-start p-10 bg-white/5 backdrop-blur-xl border border-cyan-500/30 rounded-3xl hover:bg-cyan-950/30 hover:border-cyan-400 transition-all duration-500 text-left overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_30px_rgba(6,182,212,0.1)] hover:shadow-[0_0_50px_rgba(6,182,212,0.3)]"
                    >
                      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(0,255,255,0)_50%,rgba(0,255,255,0.05)_50%)] bg-size-[100%_4px]" />
                      <span className="relative text-cyan-400 font-black tracking-[0.3em] text-xs mb-4 uppercase drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]">
                        Mode 1
                      </span>
                      <h2 className="relative text-3xl font-black mb-4 text-white group-hover:text-cyan-300 transition-colors">
                        비슷한 선택지
                      </h2>
                      <p className="relative text-zinc-400 leading-relaxed break-keep group-hover:text-zinc-200 transition-colors">
                        일상 속 환경 문제 상황. 주어진 2가지 선택지 중 지구를
                        위해 당장 실천해야 할 최선의 행동을 찾아냅니다.
                      </p>
                    </button>

                    {/* Mode 2 */}
                    <button
                      onClick={() => handleModeSelect("random")}
                      disabled={isWarping}
                      className="group relative flex flex-col items-start p-10 bg-white/5 backdrop-blur-xl border border-red-500/30 rounded-3xl hover:bg-red-950/30 hover:border-red-400 transition-all duration-500 text-left overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_30px_rgba(239,68,68,0.1)] hover:shadow-[0_0_50px_rgba(239,68,68,0.3)]"
                    >
                      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(255,0,0,0)_50%,rgba(255,0,0,0.05)_50%)] bg-size-[100%_4px]" />
                      <span className="relative text-red-500 font-black tracking-[0.3em] text-xs mb-4 uppercase drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]">
                        Mode 2
                      </span>
                      <h2 className="relative text-3xl font-black mb-4 text-white group-hover:text-red-300 transition-colors">
                        무작위 선택지
                      </h2>
                      <p className="relative text-zinc-400 leading-relaxed break-keep group-hover:text-zinc-200 transition-colors">
                        무작위로 맞붙는 친환경 행동. 데이터상으로 온실가스를 더
                        많이 감축하는 행동을 골라내십시오.
                      </p>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </main>
  );
}
