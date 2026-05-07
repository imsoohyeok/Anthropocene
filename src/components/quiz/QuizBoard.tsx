"use client";

import Link from "next/link";
import { useQuizFeedback } from "@/hooks/useQuizFeedback";
import GameOverScreen from "./GameOverScreen";
import GameClearScreen from "./GameClearScreen";
import { useGameStore } from "@/store/useGameStore";
import { motion, AnimatePresence, Variants } from "framer-motion";

export default function QuizBoard() {
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

  // 부모 컨테이너 애니메이션: 자식 요소들을 0.2초 간격으로 순차적으로 등장시킴 (Stagger)
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  // 자식 요소 애니메이션: 아래에서 위로 살짝 올라오며 나타남
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  };

  if (!quizzes || quizzes.length === 0 || !currentQuiz) return null;

  // 게임 오버 화면
  if (isGameOver) {
    return <GameOverScreen resetGame={resetGame} onExit={exitToMenu} />;
  }

  // 게임 완료 화면
  if (isFinished) {
    return (
      <GameClearScreen
        score={score}
        waterLevel={waterLevel}
        onExit={exitToMenu}
      />
    );
  }

  // 퀴즈 진행 화면
  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center px-6 z-10 text-white">
      {/* 상단 네비게이션 바 (Home / Exit) */}
      <div className="absolute top-6 w-full max-w-4xl flex justify-between items-center px-4 z-20">
        <Link
          href="/"
          className="text-zinc-500 hover:text-white transition-colors flex items-center gap-2 font-bold tracking-widest text-sm uppercase"
        >
          메인 페이지
        </Link>
        <button
          onClick={exitToMenu}
          className="text-zinc-500 hover:text-white transition-colors font-bold tracking-widest text-sm uppercase"
        >
          모드 선택하기
        </button>
      </div>

      {/* 상단 상태 바 */}
      <div className="absolute top-20 w-full max-w-4xl flex justify-between items-end px-4">
        <div className="flex flex-col">
          <span className="text-zinc-500 text-sm font-bold tracking-widest uppercase mb-1">
            Question
          </span>
          <span className="text-3xl font-bold text-zinc-100">
            {currentIndex + 1}{" "}
            <span className="text-zinc-600 text-xl">/ {quizzes.length}</span>
          </span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-red-500/80 text-sm font-bold tracking-widest uppercase mb-1">
            Sea Level
          </span>
          <span className="text-3xl font-bold text-red-500">{waterLevel}%</span>
        </div>
      </div>

      <motion.div
        key={currentIndex}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full flex flex-col items-center max-w-4xl"
      >
        {/* 질문 영역 */}
        <motion.div
          variants={itemVariants}
          className="max-w-3xl text-center mb-16 mt-10 w-full"
        >
          <h2 className="text-2xl md:text-3xl font-bold leading-tight text-zinc-100 break-keep">
            {currentQuiz.question}
          </h2>
        </motion.div>

        {/* 2지선다 버튼 영역 */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-3xl"
        >
          <button
            onClick={() => onOptionClick(currentQuiz.options.A.isCorrect)}
            disabled={feedback !== null}
            className="group relative flex flex-col items-center justify-center p-10 md:p-12 bg-zinc-900 border border-zinc-800 rounded-2xl hover:bg-zinc-800 hover:border-zinc-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="absolute top-6 left-6 text-2xl font-bold text-zinc-700 group-hover:text-zinc-400 transition-colors">
              A
            </span>
            <span className="text-lg md:text-xl font-medium text-zinc-300 group-hover:text-white transition-colors break-keep text-center">
              {currentQuiz.options.A.text}
            </span>
          </button>

          <button
            onClick={() => onOptionClick(currentQuiz.options.B.isCorrect)}
            disabled={feedback !== null}
            className="group relative flex flex-col items-center justify-center p-10 md:p-12 bg-zinc-900 border border-zinc-800 rounded-2xl hover:bg-zinc-800 hover:border-zinc-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="absolute top-6 left-6 text-2xl font-bold text-zinc-700 group-hover:text-zinc-400 transition-colors">
              B
            </span>
            <span className="text-lg md:text-xl font-medium text-zinc-300 group-hover:text-white transition-colors break-keep text-center">
              {currentQuiz.options.B.text}
            </span>
          </button>
        </motion.div>
      </motion.div>

      {/* 피드백 팝업 (오버레이) */}
      <AnimatePresence>
        {feedback && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 15, stiffness: 300 }}
              className={`max-w-xl w-full p-8 rounded-2xl border ${feedback.isCorrect ? "bg-blue-950/50 border-blue-500" : "bg-red-950/50 border-red-500"} flex flex-col items-center text-center shadow-2xl`}
            >
              <h3
                className={`text-2xl md:text-4xl font-black mb-4 ${feedback.isCorrect ? "text-blue-400" : "text-red-500"}`}
              >
                {feedback.isCorrect ? "정답입니다!" : "오답입니다!"}
              </h3>
              <p className="text-sm md:text-lg text-zinc-200 mb-8 break-keep leading-relaxed whitespace-pre-wrap text-left w-full">
                {feedback.text}
              </p>
              <button
                onClick={onNextClick}
                className={`px-8 py-3 rounded-lg font-bold text-lg transition-colors ${feedback.isCorrect ? "bg-blue-600 hover:bg-blue-500 text-white" : "bg-red-600 hover:bg-red-500 text-white"}`}
              >
                다음 문제로
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
