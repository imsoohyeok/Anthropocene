"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import HologramCard from "./HologramCard";
import { THEME_CONFIG } from "@/data/QuizRoom";
import { QuizRoomProps } from "@/types/quiz";

export default function QuizRoom({ quiz, onAnswer }: QuizRoomProps) {
  const config = THEME_CONFIG[quiz?.theme] || THEME_CONFIG["kitchen"];

  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* 배경 레이어 */}
      <AnimatePresence mode="wait">
        <motion.div
          key={quiz.theme}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={config.bg}
            alt={`${quiz.theme} background`}
            fill
            priority
            className="object-cover"
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
      <div className="relative z-10 w-full max-w-xl px-6">
        <HologramCard
          quiz={quiz}
          onAnswer={onAnswer}
          themeColor={config.color}
        />
      </div>

      {/* 노이즈/먼지 효과 디테일 */}
      <div className="absolute inset-0 pointer-events-none bg-[url('/images/noise.png')] opacity-[0.02] mix-blend-overlay" />
    </div>
  );
}
