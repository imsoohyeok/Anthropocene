"use client";

import { useState } from "react";
import Link from "next/link";
import ScenarioQuizWrapper from "@/components/quiz/ScenarioQuizWrapper";
import RandomQuizWrapper from "@/components/quiz/RandomQuizWrapper";
import { useGameStore } from "@/store/useGameStore";
import { useIntroStore } from "@/store/useIntroStore";
import { motion, AnimatePresence } from "framer-motion";

export default function QuizPage() {
  const mode = useGameStore((state) => state.mode);
  const changeMode = useGameStore((state) => state.changeMode);
  const setStage = useIntroStore((state) => state.setStage);

  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleModeSelect = (selectedMode: "scenario" | "random") => {
    setIsTransitioning(true);
    setStage("warp_in");

    setTimeout(() => {
      changeMode(selectedMode);
    }, 1500);
  };

  if (mode === "scenario") return <ScenarioQuizWrapper />;
  if (mode === "random") return <RandomQuizWrapper />;

  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen px-6 text-white overflow-hidden pointer-events-none">
      {/* 워프 시네마틱 오버레이 (화이트아웃) */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeIn" }}
            className="absolute inset-0 z-100 bg-white/20 backdrop-blur-xl pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* 3D 배경이 너무 튀지 않도록 살짝 눌러주는 은은한 비네팅 오버레이 */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/80 pointer-events-none" />

      {/* 상단 네비게이션 */}
      <motion.div
        animate={{
          opacity: isTransitioning ? 0 : 1,
          y: isTransitioning ? -20 : 0,
        }}
        className="absolute top-6 w-full max-w-6xl flex justify-between items-center px-4 z-20 pointer-events-auto"
      >
        <Link
          href="/"
          className="text-zinc-400 hover:text-white transition-colors font-bold tracking-[0.2em] text-xs uppercase"
        >
          메인 페이지
        </Link>
      </motion.div>

      {/* 중앙 홀로그램 UI 컨테이너 */}
      <motion.div
        animate={{
          opacity: isTransitioning ? 0 : 1,
          scale: isTransitioning ? 1.1 : 1, // 워프 시 UI는 앞으로 다가오며 사라짐
          filter: isTransitioning ? "blur(10px)" : "blur(0px)",
        }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center w-full max-w-5xl pointer-events-auto"
      >
        <h1 className="text-2xl md:text-4xl font-black mb-4 tracking-widest text-center drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
          SELECT OPERATION MODE
        </h1>
        <p className="text-zinc-300 mb-12 text-center text-sm md:text-base tracking-wider">
          인류의 운명을 결정할 방식을 선택하십시오
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
          {/* 시나리오 모드 (Blue Hologram) */}
          <button
            onClick={() => handleModeSelect("scenario")}
            disabled={isTransitioning}
            style={{ perspective: "1000px" }}
            className="group relative flex flex-col items-start p-10 bg-white/5 backdrop-blur-md border border-cyan-500/30 rounded-3xl hover:bg-cyan-950/30 hover:border-cyan-400 transition-all duration-500 text-left overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_30px_rgba(6,182,212,0.1)] hover:shadow-[0_0_50px_rgba(6,182,212,0.3)]"
          >
            {/* 스캔라인 효과 */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(0,255,255,0)_50%,rgba(0,255,255,0.05)_50%)] bg-size-[100%_4px]" />

            <span className="relative text-cyan-400 font-black tracking-[0.3em] text-xs mb-4 uppercase drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]">
              Mode 1
            </span>
            <h2 className="relative text-3xl font-black mb-4 text-white group-hover:text-cyan-300 transition-colors">
              비슷한 선택지
            </h2>
            <p className="relative text-zinc-400 leading-relaxed break-keep group-hover:text-zinc-200 transition-colors">
              일상 속 환경 문제 상황. 주어진 2가지 선택지 중 지구를 위해 당장
              실천해야 할 최선의 행동을 찾아냅니다.
            </p>
          </button>

          {/* 랜덤 모드 (Red Hologram) */}
          <button
            onClick={() => handleModeSelect("random")}
            disabled={isTransitioning}
            style={{ perspective: "1000px" }}
            className="group relative flex flex-col items-start p-10 bg-white/5 backdrop-blur-md border border-red-500/30 rounded-3xl hover:bg-red-950/30 hover:border-red-400 transition-all duration-500 text-left overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_30px_rgba(239,68,68,0.1)] hover:shadow-[0_0_50px_rgba(239,68,68,0.3)]"
          >
            {/* 스캔라인 효과 */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(255,0,0,0)_50%,rgba(255,0,0,0.05)_50%)] bg-size-[100%_4px]" />

            <span className="relative text-red-500 font-black tracking-[0.3em] text-xs mb-4 uppercase drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]">
              Mode 2
            </span>
            <h2 className="relative text-3xl font-black mb-4 text-white group-hover:text-red-300 transition-colors">
              무작위 선택지
            </h2>
            <p className="relative text-zinc-400 leading-relaxed break-keep group-hover:text-zinc-200 transition-colors">
              무작위로 맞붙는 친환경 행동. 데이터상으로 온실가스를 더 많이
              감축하는 행동을 골라내십시오.
            </p>
          </button>
        </div>
      </motion.div>
    </main>
  );
}
