"use client";

import QuizBoard from "@/components/quiz/QuizBoard";
import OverloadOverlay from "./OverloadOverlay";
import { dummyQuizzes } from "@/data/QuizData";
import { useScenarioQuiz } from "@/hooks/useScenarioQuiz";

export default function ScenarioQuizWrapper() {
  const { isReady, overloadRate } = useScenarioQuiz(dummyQuizzes);

  if (!isReady) return <div className="min-h-screen bg-black" />;

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <OverloadOverlay overloadRate={overloadRate} />
      <QuizBoard />
    </div>
  );
}
