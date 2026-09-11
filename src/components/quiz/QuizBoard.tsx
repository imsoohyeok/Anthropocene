"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useQuizFeedback } from "@/hooks/useQuizFeedback";
import { useGameStore } from "@/store/useGameStore";
import { useQuizAudio } from "@/hooks/useQuizAudio";
import { useAnswerFeedbackTiming } from "@/hooks/useAnswerFeedbackTiming";

import FeedbackScale from "./FeedbackBattery";
import GameOverScreen from "./GameOverScreen";
import GameClearScreen from "./GameClearScreen";
import QuizRoom from "./QuizRoom";

export default function QuizBoard() {
  const {
    quizzes,
    currentIndex,
    overloadRate,
    score,
    isGameOver,
    isFinished,
    submitAnswer,
    resetGame,
    exitToMenu,
    mode,
  } = useGameStore();

  const currentQuiz = quizzes?.[currentIndex];
  const { feedback, onOptionClick, onNextClick } = useQuizFeedback(
    currentQuiz?.explanation || "",
    submitAnswer,
  );

  const isEnded = isGameOver || isFinished;

  const { playCorrect, playWrong, playClick } = useQuizAudio(
    overloadRate,
    mode,
    isEnded,
  );

  const { showFeedbackModal, isFlashing, nextButtonRef } =
    useAnswerFeedbackTiming(feedback, playCorrect, playWrong);

  if (!quizzes || !currentQuiz) return null;

  if (isGameOver)
    return <GameOverScreen resetGame={resetGame} onExit={exitToMenu} />;

  if (isFinished) {
    return (
      <GameClearScreen
        correctCount={score}
        totalQuizzes={quizzes.length}
        overloadRate={overloadRate}
        onExit={exitToMenu}
      />
    );
  }

  return (
    <main className="relative w-full h-screen bg-black overflow-hidden">
      {/* 피드백 모달이 열려있는 동안 배경 콘텐츠는 포커스/상호작용 불가 처리 (모달 밖으로 Tab 이동 방지) */}
      <div inert={showFeedbackModal}>
        {/* HUD 레이어 */}
        <div className="absolute top-0 left-0 w-full z-50 p-4 sm:p-6 md:p-8 pointer-events-none">
          <div className="max-w-7xl mx-auto flex justify-between items-start pointer-events-auto">
            <div className="space-y-1">
              <div className="mb-4 flex items-center gap-6">
                <button
                  onClick={exitToMenu}
                  className="text-zinc-500 hover:text-white transition-colors text-sm font-black tracking-[0.2em] uppercase"
                >
                  모드 선택
                </button>
              </div>
              <div className="text-xl sm:text-2xl md:text-3xl font-black text-zinc-600 tracking-tighter">
                PHASE {currentIndex + 1}{" "}
                <span className="text-zinc-600 ml-2 text-sm sm:text-base md:text-xl">
                  / {quizzes.length}
                </span>
              </div>
            </div>
            <div className="text-right space-y-1 mt-6 sm:mt-8 md:mt-11">
              <div
                className="text-2xl sm:text-3xl md:text-4xl font-black text-red-600 tabular-nums shadow-red-500/20 drop-shadow-lg"
                aria-live="polite"
                aria-label={`환경 오염률 ${overloadRate}퍼센트`}
              >
                {overloadRate}%
              </div>
            </div>
          </div>
        </div>

        {/* 메인 3D 시네마틱 룸 */}
        <QuizRoom quiz={currentQuiz} onAnswer={onOptionClick} />
      </div>

      {/* 정답(or 오답) 시 플래시 */}
      <AnimatePresence>
        {isFlashing && feedback && (
          <motion.div
            initial={{ opacity: 0.8 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: feedback.isCorrect ? 0.4 : 0.6,
              ease: "easeOut",
            }}
            className={`absolute inset-0 mix-blend-overlay pointer-events-none z-90 
              ${feedback.isCorrect ? "bg-cyan-500" : "bg-red-600"}`}
          />
        )}
      </AnimatePresence>

      {/* 피드백 모달 */}
      <AnimatePresence>
        {showFeedbackModal && feedback && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 z-100 flex items-center justify-center bg-black/80 backdrop-blur-xl p-3 sm:p-6 pointer-events-auto"
            role="alertdialog"
            aria-modal="true"
            aria-live="assertive"
            aria-labelledby="quiz-feedback-title"
            aria-describedby="quiz-feedback-text"
          >
            <div
              className={`w-full max-w-xl p-5 sm:p-8 md:p-10 rounded-2xl md:rounded-3xl border ${feedback.isCorrect ? "border-cyan-500 bg-cyan-950/20" : "border-red-500 bg-red-950/20"}`}
            >
              <h3
                id="quiz-feedback-title"
                className="text-2xl sm:text-3xl md:text-4xl font-black mb-3 md:mb-4 uppercase"
              >
                {feedback.isCorrect ? "정답" : "오답"}
              </h3>

              <FeedbackScale
                quiz={currentQuiz}
                isUserCorrect={feedback.isCorrect}
              />

              <p
                id="quiz-feedback-text"
                className="whitespace-pre-wrap text-zinc-300 leading-relaxed mb-5 md:mb-8 "
              >
                {feedback.text}
              </p>

              <button
                ref={nextButtonRef}
                onClick={() => {
                  playClick();
                  onNextClick();
                }}
                className="w-full py-3 md:py-4 bg-white text-black font-black uppercase tracking-widest hover:bg-mist-300 transition-colors"
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
