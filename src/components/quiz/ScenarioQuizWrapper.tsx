"use client";

import QuizBoard from "@/components/quiz/QuizBoard";
import OverloadOverlay from "./OverloadOverlay";
import { scenarioQuizzes } from "@/data/QuizData";
import { useScenarioQuiz } from "@/hooks/useScenarioQuiz";

export default function ScenarioQuizWrapper() {
  const { isReady, overloadRate } = useScenarioQuiz(scenarioQuizzes);

  if (!isReady) return <div className="min-h-screen bg-black" />;

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <OverloadOverlay overloadRate={overloadRate} />
      <QuizBoard />
    </div>
  );
}
