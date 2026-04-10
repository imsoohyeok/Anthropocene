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
  // 스토어에서 함수와 상태를 가져옵니다.
  const startGame = useGameStore((state) => state.startGame);
  const quizzes = useGameStore((state) => state.quizzes);
  const waterLevel = useGameStore((state) => state.waterLevel);

  // 훅이 실행될 때, 넘겨받은 원본 데이터를 섞어서 스토어에 세팅합니다.
  useEffect(() => {
    const shuffledQuizzes = shuffleArray(initialQuizzes);
    startGame(shuffledQuizzes, "scenario");
  }, [startGame, initialQuizzes]);

  return {
    isReady: quizzes.length > 0,
    waterLevel,
  };
};
