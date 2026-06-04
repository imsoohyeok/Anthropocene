"use client";

import { motion } from "framer-motion";
import { QuizItem, QuizOption } from "@/types/quiz";

interface FeedbackBatteryProps {
  quiz: QuizItem;
  isUserCorrect: boolean;
}

export default function FeedbackBattery({
  quiz,
  isUserCorrect,
}: FeedbackBatteryProps) {
  const entries = Object.entries(quiz.options);
  if (entries.length < 2) return null;

  const [keyA, optA] = entries[0] as [string, QuizOption];
  const [keyB, optB] = entries[1] as [string, QuizOption];

  // 유저가 선택한 키 역추적
  const correctKey = optA.isCorrect ? keyA : keyB;
  const wrongKey = !optA.isCorrect ? keyA : keyB;
  const userSelectedKey = isUserCorrect ? correctKey : wrongKey;

  const renderBatteryBox = (key: string, option: QuizOption) => {
    const isSelected = key === userSelectedKey;
    const isWrongAnswer = !option.isCorrect;

    // 배터리 상태에 따른 시각적 변수들
    const isOverload = isSelected && isWrongAnswer;
    const isOptimized = isSelected && !isWrongAnswer;
    const isIgnored = !isSelected;

    return (
      <motion.div
        animate={
          isOverload
            ? { x: [-4, 4, -5, 5, -3, 3, 0] }
            : isOptimized
              ? { y: [-5, 5, -5] }
              : { opacity: 0.3, scale: 0.95 }
        }
        transition={
          isOverload
            ? { duration: 0.5 }
            : isOptimized
              ? { duration: 3, repeat: Infinity, ease: "easeInOut" }
              : { duration: 0.5 }
        }
        className={`relative w-52 h-48 rounded-xl border-2 flex flex-col items-center justify-center text-center backdrop-blur-md overflow-hidden transition-colors
          ${
            isOverload
              ? "border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.4)]"
              : isOptimized
                ? "border-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.4)]"
                : "border-zinc-700 bg-zinc-900/40"
          }
        `}
      >
        {/* 배터리 내부 플라즈마 에너지 (Fill Animation) */}
        {isSelected && (
          <motion.div
            className={`absolute bottom-0 left-0 right-0 z-0 opacity-80 ${
              isOverload
                ? "bg-linear-to-t from-red-600 via-red-500 to-red-400/50"
                : "bg-linear-to-t from-cyan-600 via-cyan-500 to-cyan-400/50"
            }`}
            initial={{ height: "0%" }}
            animate={{
              height: isOverload ? ["0%", "120%", "90%", "105%"] : "100%",
            }}
            transition={{ duration: isOverload ? 0.6 : 1, ease: "easeOut" }}
          >
            {/* 액체/플라즈마 질감을 위한 빛 반사 라인 */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-white/40 blur-[1px]" />
          </motion.div>
        )}

        {/* 텍스트 콘텐츠 (에너지 위에 띄워짐) */}
        <div className="relative z-10 flex flex-col items-center px-4">
          <div
            className={`px-3 py-1 mb-3 rounded-sm text-[10px] font-black tracking-widest uppercase border bg-black/60 backdrop-blur-sm ${
              isIgnored
                ? "text-zinc-500 border-zinc-700"
                : isOptimized
                  ? "text-cyan-300 border-cyan-400/50 shadow-[0_0_10px_#22d3ee]"
                  : "text-red-300 border-red-500/50 shadow-[0_0_10px_#ef4444] animate-pulse"
            }`}
          >
            {option.isCorrect ? "에너지 절약" : `환경 오염`}
          </div>

          <span
            className={`text-sm font-medium break-keep leading-snug ${isIgnored ? "text-zinc-600" : "text-white drop-shadow-md"}`}
          >
            {option.text}
          </span>
        </div>

        {/* 오답일 때 배터리 겉면에 흐르는 글리치 스캔라인 */}
        {isOverload && (
          <div className="absolute inset-0 pointer-events-none bg-[url('/images/noise.png')] opacity-30 mix-blend-overlay z-20" />
        )}
      </motion.div>
    );
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto flex items-center justify-center gap-12 mb-8">
      {renderBatteryBox(keyA, optA)}
      {renderBatteryBox(keyB, optB)}
    </div>
  );
}
