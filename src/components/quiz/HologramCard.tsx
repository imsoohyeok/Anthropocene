"use client";

import { motion } from "framer-motion";
import { HologramCardProps, QuizOption } from "@/types/quiz";

export default function HologramCard({
  quiz,
  onAnswer,
  themeColor = "#00f2ff",
}: HologramCardProps) {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0, rotateX: 20 }}
      animate={{ y: 0, opacity: 1, rotateX: 0 }}
      className="relative p-8 rounded-2xl border bg-white/5 backdrop-blur-xl overflow-hidden"
      style={{
        perspective: "1000px",
        borderColor: `${themeColor}4d`, // 30% 투명도
        boxShadow: `0 0 30px ${themeColor}26`, // 15% 투명도
      }}
    >
      {/* 홀로그램 스캔라인 효과 */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,255,255,0.05)_50%)] bg-size-[100%_4px]" />

      <p className="text-white text-xl md:text-2xl font-medium leading-snug mb-8 break-keep">
        {quiz.question}
      </p>

      <div className="grid gap-4">
        {Object.entries(quiz.options).map(([key, option]) => {
          const currentOption = option as QuizOption;

          return (
            <motion.button
              key={key}
              whileHover={{
                scale: 1.02,
                backgroundColor: `${themeColor}1a`, // 10% 투명도
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onAnswer(currentOption.isCorrect, quiz.penalty)}
              className="w-full p-4 rounded-xl border border-white/10 bg-white/5 text-left text-white transition-colors group"
              style={{
                borderColor: "rgba(255,255,255,0.1)",
              }}
            >
              <span
                className="inline-block w-8 font-bold group-hover:animate-pulse"
                style={{ color: themeColor }}
              >
                {key}
              </span>
              {currentOption.text}
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
