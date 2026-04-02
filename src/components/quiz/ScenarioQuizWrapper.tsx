"use client";

import QuizBoard from "@/components/quiz/QuizBoard";
import RisingSea from "./RisingSea";
import { WrapperProps } from "@/types/Wrapper";
import { dummyQuizzes } from "@/data/QuizData";
import { useScenarioQuiz } from "@/hooks/useScenarioQuiz";

export default function ScenarioQuizWrapper({ onExit }: WrapperProps) {
  const quizGameState = useScenarioQuiz(dummyQuizzes);

  if (!quizGameState.isReady) return <div className="min-h-screen bg-black" />;

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <RisingSea waterLevel={quizGameState.waterLevel} />
      <QuizBoard
        {...quizGameState}
        onExit={onExit}
        totalQuizzes={dummyQuizzes.length}
      />
    </div>
  );
}
