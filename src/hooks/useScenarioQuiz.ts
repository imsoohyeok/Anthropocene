import { useState, useEffect, useCallback } from "react";
import { QuizItem } from "@/types/quiz";
import { useQuizEngine } from "./useQuizEngine";

const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const useScenarioQuiz = (initialQuizzes: QuizItem[]) => {
  const [quizzes, setQuizzes] = useState<QuizItem[]>([]);
  const [isReady, setIsReady] = useState(false);

  const engine = useQuizEngine(quizzes);

  useEffect(() => {
    const timer = setTimeout(() => {
      setQuizzes(shuffleArray(initialQuizzes));
      setIsReady(true);
    }, 0);
    return () => clearTimeout(timer);
  }, [initialQuizzes]);

  const resetGame = useCallback(() => {
    setQuizzes(shuffleArray(initialQuizzes));
    engine.resetEngine();
  }, [initialQuizzes, engine]);

  return {
    ...engine,
    isReady,
    resetGame,
  };
};
