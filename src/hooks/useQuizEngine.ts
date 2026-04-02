import { useState, useCallback, useMemo } from "react";
import { QuizItem } from "@/types/quiz";

export const useQuizEngine = (quizzes: QuizItem[]) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [waterLevel, setWaterLevel] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const currentQuiz = useMemo(
    () => quizzes[currentIndex],
    [currentIndex, quizzes],
  );

  const handleAnswer = useCallback(
    (isCorrect: boolean) => {
      if (isGameOver || isFinished || !currentQuiz) return;

      if (isCorrect) {
        setCorrectCount((prev) => prev + 1);
      } else {
        const nextWaterLevel = waterLevel + currentQuiz.penalty;
        if (nextWaterLevel >= 100) {
          setWaterLevel(100);
          setIsGameOver(true);
          return;
        }
        setWaterLevel(nextWaterLevel);
      }

      if (currentIndex < quizzes.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        setIsFinished(true);
      }
    },
    [
      currentIndex,
      waterLevel,
      isGameOver,
      isFinished,
      currentQuiz,
      quizzes.length,
    ],
  );

  const resetEngine = useCallback(() => {
    setCurrentIndex(0);
    setWaterLevel(0);
    setCorrectCount(0);
    setIsGameOver(false);
    setIsFinished(false);
  }, []);

  return {
    currentQuiz,
    currentIndex,
    waterLevel,
    correctCount,
    isGameOver,
    isFinished,
    handleAnswer,
    resetEngine,
    totalQuizzes: quizzes.length,
    score:
      quizzes.length > 0
        ? Math.round((correctCount / quizzes.length) * 100)
        : 0,
  };
};
