"use client";

import { motion } from "framer-motion";
import { QuizItem, QuizOption } from "@/types/quiz";

interface FeedbackScaleProps {
  quiz: QuizItem;
  isUserCorrect: boolean; // 유저가 정답을 맞혔는지 여부
}

export default function FeedbackScale({
  quiz,
  isUserCorrect,
}: FeedbackScaleProps) {
  const entries = Object.entries(quiz.options);
  if (entries.length < 2) return null;

  const [keyA, optA] = entries[0];
  const [keyB, optB] = entries[1];

  // 환경에 부담을 주는(오답인) 무거운 선택지 추적
  const heavyKey = !optA.isCorrect ? keyA : keyB;

  // 유저가 실제로 고른 선택지가 무엇인지 역추적
  const correctKey = optA.isCorrect ? keyA : keyB;
  const userSelectedKey = isUserCorrect ? correctKey : heavyKey;

  const rotateAngle = heavyKey === keyB ? 10 : -10;

  // 선택지 박스를 렌더링하는 내부 함수
  const renderOptionBox = (
    key: string,
    option: QuizOption,
    isLeft: boolean,
  ) => {
    const isSelected = key === userSelectedKey;

    return (
      <motion.div
        // 저울대가 기울어질 때, 박스는 반대 각도로 회전시켜 항상 수평을 유지(Counter-Rotation)
        animate={{ rotate: -rotateAngle }}
        transition={{ type: "spring", stiffness: 60, damping: 10 }}
        className={`absolute bottom-4 w-40 p-3 rounded-xl border-2 backdrop-blur-md flex flex-col items-center text-center shadow-lg transition-colors
          ${isLeft ? "-left-10" : "-right-10"}
          ${
            isSelected
              ? option.isCorrect
                ? "border-cyan-500 bg-cyan-950/80 shadow-cyan-500/20"
                : "border-red-500 bg-red-950/80 shadow-red-500/20"
              : "border-zinc-700 bg-zinc-900/80"
          }
        `}
        style={{ transformOrigin: "bottom center" }}
      >
        <span
          className={`text-xs font-black mb-1 ${option.isCorrect ? "text-cyan-400" : "text-red-500"}`}
        >
          선택지 {key}
        </span>
        <span className="text-sm text-white font-medium break-keep leading-snug">
          {option.text}
        </span>
      </motion.div>
    );
  };

  return (
    <div className="relative w-full max-w-sm mx-auto h-48 flex items-end justify-center mb-8">
      {/* 저울의 중심 지지대 (Fulcrum) */}
      <div className="absolute bottom-0 flex flex-col items-center z-10">
        <div className="w-0 h-0 border-l-12 border-r-12 border-b-24 border-transparent border-b-zinc-600" />
        <div className="w-24 h-1 bg-zinc-700 rounded-full mt-1" />
      </div>

      {/* 기울어지는 저울대 (Beam) */}
      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: rotateAngle }}
        transition={{ type: "spring", stiffness: 60, damping: 10 }}
        className="absolute bottom-6 w-full h-2 bg-zinc-500 rounded-full"
        style={{ transformOrigin: "center" }}
      >
        {/* 저울 양 끝의 고리 포인트 */}
        <div className="absolute -left-1 -top-1 w-4 h-4 rounded-full border-2 border-zinc-400 bg-zinc-800" />
        <div className="absolute -right-1 -top-1 w-4 h-4 rounded-full border-2 border-zinc-400 bg-zinc-800" />

        {/* 양팔 저울 접시 위 선택지 렌더링 */}
        {renderOptionBox(keyA, optA, true)}
        {renderOptionBox(keyB, optB, false)}
      </motion.div>
    </div>
  );
}
