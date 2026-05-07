"use client";

import QuizBoard from "@/components/quiz/QuizBoard";
import RisingSea from "./RisingSea";
import { dummyQuizzes } from "@/data/QuizData";
import { useScenarioQuiz } from "@/hooks/useScenarioQuiz";

export default function ScenarioQuizWrapper() {
  const { isReady, waterLevel } = useScenarioQuiz(dummyQuizzes);

  if (!isReady) return <div className="min-h-screen bg-black" />;

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <RisingSea waterLevel={waterLevel} />
      <QuizBoard />
    </div>
  );
}
