import { useEffect } from "react";
import { useGameStore } from "@/store/useGameStore";
import { QuizItem } from "@/types/quiz";

const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const useScenarioQuiz = (initialQuizzes: QuizItem[]) => {
  const startGame = useGameStore((state) => state.startGame);
  const quizzes = useGameStore((state) => state.quizzes);
  const waterLevel = useGameStore((state) => state.waterLevel);

  useEffect(() => {
    const shuffledQuizzes = shuffleArray(initialQuizzes);
    startGame(shuffledQuizzes, "scenario");
  }, [startGame, initialQuizzes]);

  return {
    isReady: quizzes.length > 0,
    waterLevel,
  };
};
