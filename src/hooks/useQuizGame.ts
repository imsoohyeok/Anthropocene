import { useState, useCallback, useMemo, useEffect } from "react";
import { QuizItem } from "@/types/quiz";

// 피셔-예이츠(Fisher-Yates) 셔플 알고리즘
const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const useQuizGame = (initialQuizzes: QuizItem[]) => {
  const [quizzes, setQuizzes] = useState(() => shuffleArray(initialQuizzes));

  const [isReady, setIsReady] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [waterLevel, setWaterLevel] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setQuizzes(shuffleArray(initialQuizzes));
      setIsReady(true);
    }, 0);

    return () => clearTimeout(timer);
  }, [initialQuizzes]);

  const currentQuiz = useMemo(
    () => quizzes[currentIndex],
    [currentIndex, quizzes],
  );

  const handleAnswer = useCallback(
    (isCorrect: boolean) => {
      if (isGameOver || isFinished) return;

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

  // 게임을 다시 시작할 때 호출하는 함수
  const resetGame = useCallback(() => {
    setQuizzes(shuffleArray(initialQuizzes));
    setCurrentIndex(0);
    setWaterLevel(0);
    setCorrectCount(0);
    setIsGameOver(false);
    setIsFinished(false);
  }, [initialQuizzes]);

  return {
    isReady,
    currentQuiz,
    currentIndex,
    waterLevel,
    correctCount,
    isGameOver,
    isFinished,
    handleAnswer,
    resetGame,
    totalQuizzes: quizzes.length,
    score: Math.round((correctCount / quizzes.length) * 100) || 0,
  };
};
