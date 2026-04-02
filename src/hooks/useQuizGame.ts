import { useState, useCallback, useMemo } from "react";
import { QuizItem } from "@/types/quiz";

export const useQuizGame = (quizzes: QuizItem[]) => {
  const [currentIndex, setCurrentIndex] = useState(0); // 현재 문제 번호
  const [waterLevel, setWaterLevel] = useState(0); // 해수면 높이 (0~100)
  const [correctCount, setCorrectCount] = useState(0); // 정답 개수
  const [isGameOver, setIsGameOver] = useState(false); // 게임 오버 여부
  const [isFinished, setIsFinished] = useState(false); // 모든 문제 완료 여부

  // 현재 진행 중인 퀴즈 데이터
  const currentQuiz = useMemo(
    () => quizzes[currentIndex],
    [currentIndex, quizzes],
  );

  // 정답 선택 처리 함수
  const handleAnswer = useCallback(
    (isCorrect: boolean) => {
      if (isGameOver || isFinished) return;

      if (isCorrect) {
        // 정답인 경우: 점수 올리고 다음 문제로
        setCorrectCount((prev) => prev + 1);
      } else {
        // 오답인 경우: 해수면 상승 및 게임 오버 체크
        const nextWaterLevel = waterLevel + currentQuiz.penalty;
        if (nextWaterLevel >= 100) {
          setWaterLevel(100);
          setIsGameOver(true);
          return; // 게임 종료
        }
        setWaterLevel(nextWaterLevel);
      }

      // 다음 문제로 넘어가기 (마지막 문제면 종료)
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

  // 게임 재시작 함수
  const resetGame = useCallback(() => {
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
    resetGame,
    totalQuizzes: quizzes.length,
    score: Math.round((correctCount / quizzes.length) * 100), // 현재까지의 정답률(%)
  };
};
