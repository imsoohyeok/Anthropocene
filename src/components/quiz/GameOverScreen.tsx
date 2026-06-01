"use client";

import { motion } from "framer-motion";
import { GameOverScreenProps } from "@/types/GameOverScreen";

export default function GameOverScreen({
  resetGame,
  onExit,
}: GameOverScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      className="relative w-full h-screen bg-black flex flex-col items-center justify-center overflow-hidden z-50"
    >
      {/* 절망적인 붉은 엠비언스 배경 */}
      <motion.div
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 3, ease: "easeOut" }}
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, rgba(153, 27, 27, 0.4) 0%, rgba(0, 0, 0, 1) 70%)",
        }}
      />

      {/* 시네마틱 노이즈 & 스캔라인 */}
      <div className="absolute inset-0 pointer-events-none bg-[url('/images/noise.png')] opacity-10 mix-blend-overlay z-0" />

      {/* 메인 콘텐츠 */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        <motion.div
          initial={{ y: -50, opacity: 0, filter: "blur(10px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
        >
          <h1 className="text-7xl md:text-9xl font-black text-red-600 tracking-tighter uppercase mb-4 drop-shadow-[0_0_30px_rgba(220,38,38,0.8)]">
            GAME OVER
          </h1>
          <p className="text-xl md:text-2xl text-red-400/80 tracking-widest mb-12 font-medium">
            해수면이 100% 차올라 인류가 위기에 처했습니다.
          </p>
        </motion.div>

        {/* 버튼 그룹 (순차적 등장) */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 1.2, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-6 w-full max-w-md"
        >
          <button
            onClick={resetGame}
            className="flex-1 py-4 px-8 bg-red-600/10 border border-red-600/50 text-red-500 font-bold tracking-widest uppercase hover:bg-red-600 hover:text-white transition-all duration-300 shadow-[0_0_20px_rgba(220,38,38,0.2)] hover:shadow-[0_0_30px_rgba(220,38,38,0.6)]"
          >
            다시 도전하기
          </button>
          <button
            onClick={onExit}
            className="flex-1 py-4 px-8 bg-transparent border border-zinc-700 text-zinc-500 font-bold tracking-widest uppercase hover:border-zinc-400 hover:text-zinc-300 transition-colors duration-300"
          >
            모드 선택으로
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
