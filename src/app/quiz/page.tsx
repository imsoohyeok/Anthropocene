"use client";

import QuizBoard from "@/components/quiz/QuizBoard";
import RisingSea from "@/components/quiz/RisingSea";
import { dummyQuizzes } from "@/data/QuizData";
import { useScenarioQuiz } from "@/hooks/useScenarioQuiz";

export default function Home() {
  const quizGameState = useScenarioQuiz(dummyQuizzes);

  if (!quizGameState.isReady) {
    return <main className="min-h-screen bg-black" />;
  }

  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">
      <RisingSea waterLevel={quizGameState.waterLevel} />
      <QuizBoard {...quizGameState} />
    </main>
  );
}
