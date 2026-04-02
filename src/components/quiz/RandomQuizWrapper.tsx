"use client";

import QuizBoard from "@/components/quiz/QuizBoard";
import RisingSea from "./RisingSea";
import { WrapperProps } from "@/types/Wrapper";
import { useRandomQuiz } from "@/hooks/useRandomQuiz";

export default function RandomQuizWrapper({ onExit }: WrapperProps) {
  const ROUNDS = 10;
  const quizGameState = useRandomQuiz(ROUNDS);

  if (!quizGameState.isReady) return <div className="min-h-screen bg-black" />;

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <RisingSea waterLevel={quizGameState.waterLevel} />
      <QuizBoard {...quizGameState} onExit={onExit} totalQuizzes={ROUNDS} />
    </div>
  );
}
