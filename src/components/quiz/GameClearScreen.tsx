"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import useSound from "use-sound";
import { GameClearScreenProps } from "@/types/GameClearScreen";

export default function GameClearScreen({
  correctCount,
  totalQuizzes,
  overloadRate,
  onExit,
}: GameClearScreenProps) {
  const energySaveRate = Math.max(100 - overloadRate, 0);

  const [playGameClear] = useSound(
    "/sounds/freesound_community-success-fanfare-trumpets-6185.mp3",
    { volume: 0.3 },
  );

  // 버튼은 opacity:0으로 시작해 delay 1.5s 뒤에야 나타나는데, 그 전에도 클릭은 가능한
  // 상태라 이전 화면에서 이어진 광클이 안 보이는 버튼을 눌러버릴 수 있다.
  // 버튼이 실제로 보이기 시작하는 시점까지는 클릭을 막아둔다.
  const [canInteract, setCanInteract] = useState(false);

  useEffect(() => {
    playGameClear();
  }, [playGameClear]);

  useEffect(() => {
    const timer = setTimeout(() => setCanInteract(true), 1500);
    return () => clearTimeout(timer);
  }, []);

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
          className="w-full flex justify-center gap-6 sm:gap-10 md:gap-24 mb-10 md:mb-16 p-5 sm:p-6 md:p-8 border border-blue-500/20 bg-blue-950/20 backdrop-blur-xl rounded-3xl shadow-[0_0_40px_rgba(37,99,235,0.1)]"
        >
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1.5 text-[11px] font-bold tracking-[0.2em] mb-2 px-3 py-0.5 text-zinc-500">
              정답
              <span className="text-zinc-200">{correctCount}</span>
              <span className="text-zinc-600">/ {totalQuizzes}</span>
            </div>

            <span className="text-zinc-400 text-sm font-bold tracking-[0.2em] uppercase mb-2">
              에너지 절약률
            </span>
            <div className="text-3xl sm:text-4xl md:text-5xl font-black text-blue-400 tabular-nums">
              {energySaveRate}
              <span className="text-xl sm:text-2xl md:text-3xl">%</span>
            </div>
          </div>

          <div className="w-px bg-blue-500/20" />

          <div className="flex flex-col items-center relative">
            <div className="h-5 mb-2 opacity-0 pointer-events-none">spacer</div>

            <span className="text-zinc-400 text-sm font-bold tracking-[0.2em] uppercase mb-2">
              환경 오염률
            </span>
            <div className="text-3xl sm:text-4xl md:text-5xl font-black text-red-400 tabular-nums drop-shadow-[0_0_15px_rgba(239,68,68,0.3)]">
              {overloadRate}
              <span className="text-xl sm:text-2xl md:text-3xl">%</span>
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
            disabled={!canInteract}
            className="py-4 px-12 bg-blue-600 text-white font-black tracking-widest rounded-full hover:bg-blue-500 hover:scale-105 hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] transition-all duration-300 disabled:pointer-events-none"
          >
            다른 모드 즐기기
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
