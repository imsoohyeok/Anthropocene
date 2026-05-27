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

  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* 1. 배경 이미지 레이어 */}
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

      {/* 스포트라이트 강조 레이어 (배경 위, 카드 뒤) */}
      <AnimatePresence>
        {quiz.highlightObject &&
          SPOTLIGHT_COORDS[quiz.highlightObject as SpotlightTarget] && (
            <motion.div
              key={quiz.highlightObject} // 타겟이 바뀌면 애니메이션 새로 시작
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: [0.3, 0.8, 0.3],
                scale: [0.95, 1.05, 0.95],
              }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute z-10 pointer-events-none rounded-full"
              style={{
                // 퀴즈 데이터가 지목한 사물의 좌표와 크기를 적용
                top: SPOTLIGHT_COORDS[quiz.highlightObject as SpotlightTarget]
                  .top,
                left: SPOTLIGHT_COORDS[quiz.highlightObject as SpotlightTarget]
                  .left,
                width:
                  SPOTLIGHT_COORDS[quiz.highlightObject as SpotlightTarget]
                    .width,
                height:
                  SPOTLIGHT_COORDS[quiz.highlightObject as SpotlightTarget]
                    .height,

                // 현재 테마의 메인 컬러(config.color)를 활용한 홀로그램 빛무리
                background: `radial-gradient(circle, ${config.color}80 0%, transparent 70%)`,
                mixBlendMode: "screen",
                boxShadow: `0 0 40px 10px ${config.color}4d`,
              }}
            />
          )}
      </AnimatePresence>

      {/* 퀴즈 카드 레이어 */}
      <div className="relative z-20 w-full max-w-xl px-6">
        <HologramCard
          quiz={quiz}
          onAnswer={onAnswer}
          themeColor={config.color}
        />
      </div>
    </div>
  );
}
