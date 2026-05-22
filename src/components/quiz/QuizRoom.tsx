"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import HologramCard from "./HologramCard";
import { THEME_CONFIG } from "@/data/QuizRoom";
import { QuizRoomProps } from "@/types/quiz";
import { useGameStore } from "@/store/useGameStore";

export default function QuizRoom({ quiz, onAnswer }: QuizRoomProps) {
  const config = THEME_CONFIG[quiz.theme];
  const waterLevel = useGameStore((state) => state.waterLevel);

  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* 배경 이미지 레이어 */}
      <AnimatePresence mode="wait">
        <motion.div
          key={quiz.theme}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="absolute inset-0 z-0 flex items-center justify-center"
        >
          <Image
            src={config.bg}
            alt={`${quiz.theme} background`}
            fill
            priority
            className="object-cover opacity-60"
          />

          {/* 영구적 엠비언스: 수치가 높을수록 방 전체가 붉게 달아오름 */}
          <div
            className="absolute inset-0 pointer-events-none transition-colors duration-1000"
            style={{
              backgroundColor: `rgba(220, 38, 38, ${waterLevel * 0.004})`,
            }}
          />

          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(circle at center, ${config.glow} 0%, transparent 80%)`,
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* 퀴즈 카드 레이어 */}
      <div className="relative z-20 w-full max-w-xl px-6">
        <HologramCard
          quiz={quiz}
          onAnswer={onAnswer}
          themeColor={config.color}
        />
      </div>

      <div className="absolute inset-0 pointer-events-none bg-[url('/images/noise.png')] opacity-[0.03] mix-blend-overlay z-30" />
    </div>
  );
}
