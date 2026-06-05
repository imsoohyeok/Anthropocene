"use client";

import { motion } from "framer-motion";
import { GameClearScreenProps } from "@/types/GameClearScreen";

export default function GameClearScreen({
  correctCount,
  totalQuizzes,
  overloadRate,
  onExit,
}: GameClearScreenProps) {
  const energySaveRate = Math.max(100 - overloadRate, 0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      className="relative w-full h-screen bg-black flex flex-col items-center justify-center overflow-hidden z-50"
    >
      {/* 정화된 푸른 엠비언스 배경 */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2.5, ease: "easeOut" }}
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, rgba(37, 99, 235, 0.2) 0%, rgba(0, 0, 0, 1) 70%)",
        }}
      />

      {/* 메인 콘텐츠 */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 w-full max-w-2xl">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          className="mb-12"
        >
          <h1 className="text-7xl md:text-8xl font-black text-blue-500 tracking-tighter mb-4 drop-shadow-[0_0_30px_rgba(37,99,235,0.6)]">
            SURVIVE
          </h1>
        </motion.div>

        {/* 결과 스탯 보드 (Glassmorphism) */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
          className="w-full flex justify-center gap-12 md:gap-24 mb-16 p-8 border border-blue-500/20 bg-blue-950/20 backdrop-blur-xl rounded-3xl shadow-[0_0_40px_rgba(37,99,235,0.1)]"
        >
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1.5 text-[11px] font-bold tracking-[0.2em] mb-2 px-3 py-0.5 bg-black/40 text-zinc-500 rounded-sm shadow-[0_0_10px_rgba(239,68,68,0.1)]">
              정답
              <span className="text-zinc-200">{correctCount}</span>
              <span className="text-zinc-600">/ {totalQuizzes}</span>
            </div>

            <span className="text-zinc-400 text-sm font-bold tracking-[0.2em] uppercase mb-2">
              에너지 절약률
            </span>
            <div className="text-5xl font-black text-blue-400 tabular-nums">
              {energySaveRate}
              <span className="text-3xl">%</span>
            </div>
          </div>

          <div className="w-px bg-blue-500/20" />

          <div className="flex flex-col items-center relative">
            <div className="h-5 mb-2 opacity-0 pointer-events-none">spacer</div>

            <span className="text-zinc-400 text-sm font-bold tracking-[0.2em] uppercase mb-2">
              환경 오염률
            </span>
            <div className="text-5xl font-black text-red-400 tabular-nums drop-shadow-[0_0_15px_rgba(239,68,68,0.3)]">
              {overloadRate}
              <span className="text-3xl">%</span>
            </div>
          </div>
        </motion.div>

        {/* 돌아가기 버튼 */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.5, ease: "easeOut" }}
        >
          <button
            onClick={onExit}
            className="py-4 px-12 bg-blue-600 text-white font-black tracking-widest rounded-full hover:bg-blue-500 hover:scale-105 hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] transition-all duration-300"
          >
            다른 모드 즐기기
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
