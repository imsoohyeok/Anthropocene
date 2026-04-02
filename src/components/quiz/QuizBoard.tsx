"use client";

import { useState } from "react";
import Link from "next/link";
import { QuizBoardProps } from "@/types/QuizBoard";

export default function QuizBoard({
  currentQuiz,
  currentIndex,
  waterLevel,
  isGameOver,
  isFinished,
  score,
  handleAnswer,
  totalQuizzes,
  onExit,
  resetGame,
}: QuizBoardProps) {
  const [feedback, setFeedback] = useState<{
    isCorrect: boolean;
    text: string;
  } | null>(null);

  const onOptionClick = (isCorrect: boolean) => {
    setFeedback({
      isCorrect,
      text: currentQuiz.explanation,
    });
  };

  const onNextClick = () => {
    if (feedback) {
      handleAnswer(feedback.isCorrect);
      setFeedback(null);
    }
  };

  // 게임 오버 화면 (다시 도전 & 모드 선택 버튼 추가)
  if (isGameOver) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-screen bg-red-950 text-white z-50 relative">
        <h1 className="text-7xl md:text-8xl font-black mb-4 text-red-500 tracking-tighter">
          GAME OVER
        </h1>
        <p className="text-xl text-zinc-300">
          해수면이 100% 차올라 인류가 위기에 처했습니다.
        </p>
        <div className="flex gap-4 mt-8">
          <button
            onClick={resetGame}
            className="px-6 py-3 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-colors font-bold"
          >
            다시 도전하기
          </button>
          <button
            onClick={onExit}
            className="px-6 py-3 bg-zinc-800 text-white hover:bg-zinc-700 transition-colors font-bold"
          >
            모드 선택으로
          </button>
        </div>
      </div>
    );
  }

  // 게임 완료 화면 (다른 모드 즐기기 버튼 추가)
  if (isFinished) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-screen bg-zinc-900 text-white z-50 relative">
        <h1 className="text-7xl md:text-8xl font-black mb-4 text-blue-500 tracking-tighter">
          SURVIVED
        </h1>
        <p className="text-xl text-zinc-300">
          정답률: <span className="font-bold text-blue-400">{score}%</span>
        </p>
        <p className="text-lg text-zinc-400 mt-2">
          최종 해수면 상승: {waterLevel}%
        </p>
        <button
          onClick={onExit}
          className="mt-10 px-10 py-4 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-500 transition-all shadow-lg hover:shadow-blue-500/50"
        >
          다른 모드 즐기기
        </button>
      </div>
    );
  }

  // 퀴즈 진행 화면
  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center px-6 z-10 text-white">
      {/* 상단 네비게이션 바 (Home / Exit) */}
      <div className="absolute top-6 w-full max-w-6xl flex justify-between items-center px-4 z-20">
        <Link
          href="/"
          className="text-zinc-500 hover:text-white transition-colors flex items-center gap-2 font-bold tracking-widest text-sm uppercase"
        >
          메인 페이지
        </Link>
        <button
          onClick={onExit}
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
            <span className="text-zinc-600 text-xl">/ {totalQuizzes}</span>
          </span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-red-500/80 text-sm font-bold tracking-widest uppercase mb-1">
            Sea Level
          </span>
          <span className="text-3xl font-bold text-red-500">{waterLevel}%</span>
        </div>
      </div>

      {/* 중앙 질문 영역 */}
      <div className="max-w-3xl text-center mb-16 mt-10">
        <h2 className="text-2xl md:text-4xl font-bold leading-tight text-zinc-100 break-keep">
          {currentQuiz.question}
        </h2>
      </div>

      {/* 2지선다 버튼 영역 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
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
      </div>

      {/* 피드백 팝업 (오버레이) */}
      {feedback && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div
            className={`max-w-xl w-full p-8 rounded-2xl border ${feedback.isCorrect ? "bg-blue-950/50 border-blue-500" : "bg-red-950/50 border-red-500"} flex flex-col items-center text-center shadow-2xl transform transition-all`}
          >
            <h3
              className={`text-4xl font-black mb-4 ${feedback.isCorrect ? "text-blue-400" : "text-red-500"}`}
            >
              {feedback.isCorrect ? "정답입니다!" : "오답입니다!"}
            </h3>
            <p className="text-lg text-zinc-200 mb-8 break-keep leading-relaxed whitespace-pre-wrap text-left w-full">
              {feedback.text}
            </p>
            <button
              onClick={onNextClick}
              className={`px-8 py-3 rounded-lg font-bold text-lg transition-colors ${feedback.isCorrect ? "bg-blue-600 hover:bg-blue-500 text-white" : "bg-red-600 hover:bg-red-500 text-white"}`}
            >
              다음 문제로
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
