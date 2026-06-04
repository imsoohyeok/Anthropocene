"use client";

import QuizBoard from "@/components/quiz/QuizBoard";
import RisingSea from "./OverloadOverlay";
import { useRandomQuiz } from "@/hooks/useRandomQuiz";

export default function RandomQuizWrapper() {
  const ROUNDS = 10;

  const { isReady, overloadRate } = useRandomQuiz(ROUNDS);

  if (!isReady) return <div className="min-h-screen bg-black" />;

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <RisingSea overloadRate={overloadRate} />
      <QuizBoard />
    </div>
  );
}
