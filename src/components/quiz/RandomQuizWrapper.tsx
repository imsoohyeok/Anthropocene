"use client";

import QuizBoard from "@/components/quiz/QuizBoard";
import RisingSea from "./RisingSea";
import { useRandomQuiz } from "@/hooks/useRandomQuiz";

export default function RandomQuizWrapper() {
  const ROUNDS = 10;

  const { isReady, waterLevel } = useRandomQuiz(ROUNDS);

  if (!isReady) return <div className="min-h-screen bg-black" />;

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <RisingSea waterLevel={waterLevel} />
      <QuizBoard />
    </div>
  );
}
