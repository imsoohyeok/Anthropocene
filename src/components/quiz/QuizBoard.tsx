"use client";

import { useRouter } from "next/navigation";
import { useQuizFeedback } from "@/hooks/useQuizFeedback";
import GameOverScreen from "./GameOverScreen";
import GameClearScreen from "./GameClearScreen";
import { useIntroStore } from "@/store/useIntroStore";
import { useGameStore } from "@/store/useGameStore";
import { AnimatePresence, motion } from "framer-motion";
import QuizRoom from "./QuizRoom";
import { useState } from "react";

export default function QuizBoard() {
  const router = useRouter();

  const setStage = useIntroStore((state) => state.setStage);
  const [isReturning, setIsReturning] = useState(false);

  const {
    quizzes,
    currentIndex,
    waterLevel,
    score,
    isGameOver,
    isFinished,
    submitAnswer,
    resetGame,
    exitToMenu,
  } = useGameStore();

  const currentQuiz = quizzes?.[currentIndex];

  const { feedback, onOptionClick, onNextClick } = useQuizFeedback(
    currentQuiz?.explanation || "",
    submitAnswer,
  );

  const handleReturnToMain = () => {
    setIsReturning(true);
    setStage("return_warp");

    setTimeout(() => {
      exitToMenu();
      router.push("/");
    }, 1200);
  };

  if (!quizzes || !currentQuiz) return null;
  if (isGameOver)
    return <GameOverScreen resetGame={resetGame} onExit={exitToMenu} />;
  if (isFinished)
    return (
      <GameClearScreen
        score={score}
        waterLevel={waterLevel}
        onExit={exitToMenu}
      />
    );

  return (
    <main className="relative w-full h-screen bg-black">
      <AnimatePresence>
        {isReturning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 z-999 bg-white pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* HUD: 상단 정보 레이어 */}
      <div className="absolute top-0 left-0 w-full z-50 p-8 pointer-events-none">
        <div className="max-w-7xl mx-auto flex justify-between items-start pointer-events-auto">
          <div className="space-y-1">
            {/* 네비게이션 버튼 그룹 */}
            <div className="mb-4 flex items-center gap-6">
              <button
                onClick={handleReturnToMain}
                className="text-zinc-500 hover:text-black transition-colors text-sm font-black tracking-[0.2em] uppercase flex items-center"
              >
                메인 페이지
              </button>
              <button
                onClick={exitToMenu}
                className="text-zinc-500 hover:text-black transition-colors text-sm font-black tracking-[0.2em] uppercase"
              >
                모드 선택
              </button>
            </div>
            <div className="text-3xl font-black text-zinc-600 tracking-tighter">
              PHASE {currentIndex + 1}
              <span className="text-zinc-600 ml-2 text-xl">
                / {quizzes.length}
              </span>
            </div>
          </div>
          <div className="text-right space-y-1 mt-11">
            <div className="text-4xl font-black text-red-600 tabular-nums shadow-red-500/20 drop-shadow-lg">
              {waterLevel}%
            </div>
          </div>
        </div>
      </div>

      {/* 메인 3D 시네마틱 룸 */}
      <QuizRoom quiz={currentQuiz} onAnswer={onOptionClick} />

      {/* 피드백 모달 */}
      <AnimatePresence>
        {feedback && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-100 flex items-center justify-center bg-black/80 backdrop-blur-xl p-6 pointer-events-auto"
          >
            {/* 정답(오답) 팝업 */}
            <div
              className={`max-w-xl p-10 rounded-3xl border ${feedback.isCorrect ? "border-cyan-500 bg-cyan-950/20" : "border-red-500 bg-red-950/20"}`}
            >
              <h3 className="text-4xl font-black mb-4 uppercase">
                {feedback.isCorrect ? "정답" : "오답"}
              </h3>
              <p className="text-zinc-300 leading-relaxed mb-8">
                {feedback.text}
              </p>
              <button
                onClick={onNextClick}
                className="w-full py-4 bg-white text-black font-black uppercase tracking-widest hover:bg-cyan-400 transition-colors"
              >
                다음 문제
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
