"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import HologramCard from "./HologramCard";
import { THEME_CONFIG, SPOTLIGHT_COORDS } from "@/data/QuizRoom";
import { QuizRoomProps, SpotlightTarget } from "@/types/quiz";
import { useGameStore } from "@/store/useGameStore";

export default function QuizRoom({ quiz, onAnswer }: QuizRoomProps) {
  const config = THEME_CONFIG[quiz.theme];
  const waterLevel = useGameStore((state) => state.waterLevel);

  const targetObj = quiz.highlightObject
    ? SPOTLIGHT_COORDS[quiz.highlightObject as SpotlightTarget]
    : null;

  const cardPosition = targetObj?.cardPos || "center";

  const layoutClasses = {
    center: "items-center justify-center",
    left: "items-center justify-start pl-8 md:pl-24",
    right: "items-center justify-end pr-8 md:pr-24",
  };

  return (
    <div
      className={`relative w-full h-screen flex ${layoutClasses[cardPosition]} overflow-hidden bg-black transition-all duration-700`}
    >
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
            className="object-cover"
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

      {/* 스포트라이트 조명 레이어 */}
      <AnimatePresence mode="wait">
        {targetObj && (
          <motion.div
            key={`spotlight-${quiz.id}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: [0.3, 0.8, 0.3], scale: [0.95, 1.05, 0.95] }}
            exit={{
              opacity: 0,
              scale: 0.8,
              transition: { duration: 0.5, ease: "easeIn" },
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute z-10 pointer-events-none rounded-full"
            style={{
              top: targetObj.top,
              left: targetObj.left,
              width: targetObj.width,
              height: targetObj.height,
              background: `radial-gradient(circle, ${config.color}80 0%, transparent 70%)`,
              mixBlendMode: "screen",
              boxShadow: `0 0 40px 10px ${config.color}4d`,
            }}
          />
        )}
      </AnimatePresence>

      {/* 퀴즈 카드 레이어 */}
      <div className="relative z-20 w-full max-w-md px-6">
        <HologramCard
          quiz={quiz}
          onAnswer={onAnswer}
          themeColor={config.color}
        />
      </div>
    </div>
  );
}
