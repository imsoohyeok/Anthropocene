"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import useSound from "use-sound";
import { HologramCardProps, QuizOption } from "@/types/quiz";

export default function HologramCard({
  quiz,
  onAnswer,
  themeColor = "#00f2ff",
}: HologramCardProps) {
  const [selectedKey, setSelectedKey] = useState<string | null>(null);

  const [playHover] = useSound("/sounds/hover.mp3", { volume: 0.2 });
  const [playClick] = useSound("/sounds/click.mp3", { volume: 0.5 });

  useEffect(() => {
    const timer = setTimeout(() => {
      setSelectedKey(null);
    }, 0);

    return () => clearTimeout(timer);
  }, [quiz]);

  return (
    <motion.div
      // 카드 등장 애니메이션
      initial={{ y: 50, opacity: 0, rotateX: 20 }}
      animate={{ y: 0, opacity: 1, rotateX: 0 }}
      key={quiz.question}
      className="relative p-8 rounded-2xl border bg-white/5 backdrop-blur-xl overflow-hidden"
      style={{
        perspective: "1000px",
        borderColor: `${themeColor}4d`,
        boxShadow: `0 0 30px ${themeColor}26`,
      }}
    >
      {/* 홀로그램 스캔라인 효과 */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,255,255,0.05)_50%)] bg-size-[100%_4px]" />

      <p className="text-white text-xl md:text-2xl font-medium leading-snug mb-8 break-keep relative z-10">
        {quiz.question}
      </p>

      <div className="grid gap-4 relative z-10">
        {Object.entries(quiz.options).map(([key, option]) => {
          const currentOption = option as QuizOption;

          const isSelected = selectedKey === key;
          const isAnotherSelected = selectedKey !== null && selectedKey !== key;

          return (
            <motion.button
              key={key}
              onHoverStart={() => {
                if (selectedKey === null) playHover();
              }}
              // 동적 애니메이션: 선택 여부에 따라 크기, 투명도, 블러 효과 처리
              animate={{
                scale: isSelected ? 1.05 : isAnotherSelected ? 0.95 : 1,
                opacity: isAnotherSelected ? 0.4 : 1,
                filter: isAnotherSelected
                  ? "grayscale(100%) blur(2px)"
                  : "grayscale(0%) blur(0px)",
                borderColor: isSelected ? themeColor : "rgba(255,255,255,0.1)",
                backgroundColor: isSelected
                  ? `${themeColor}26`
                  : "rgba(255,255,255,0.05)",
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              // 아무것도 선택되지 않았을 때만 Hover/Tap 애니메이션 활성화
              whileHover={
                selectedKey === null
                  ? { scale: 1.02, backgroundColor: `${themeColor}1a` }
                  : {}
              }
              whileTap={selectedKey === null ? { scale: 0.98 } : {}}
              onClick={() => {
                // 중복 클릭 방지: 이미 무언가 선택되었다면 무시
                if (selectedKey !== null) return;

                playClick();
                setSelectedKey(key);
                onAnswer(currentOption.isCorrect, quiz.penalty);
              }}
              className="w-full p-4 rounded-xl border text-left text-white transition-colors group"
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
