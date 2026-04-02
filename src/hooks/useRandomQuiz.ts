import { useState, useEffect, useCallback } from "react";
import { QuizItem } from "@/types/quiz";
import { actionPool } from "@/data/actionData";
import { useQuizEngine } from "./useQuizEngine"; // 💡 공통 게임 엔진 불러오기

// 거대한 데이터 풀에서 무작위로 2개를 뽑아 퀴즈 형태로 가공하는 함수
const generateRandomQuizzes = (roundCount: number = 10): QuizItem[] => {
  const generatedQuizzes: QuizItem[] = [];

  for (let i = 0; i < roundCount; i++) {
    const shuffledPool = [...actionPool].sort(() => 0.5 - Math.random());
    const actionA = shuffledPool[0];
    const actionB = shuffledPool[1];

    const aIsWinner = actionA.impactScore >= actionB.impactScore;
    const winner = aIsWinner ? actionA : actionB;
    const loser = aIsWinner ? actionB : actionA;

    generatedQuizzes.push({
      id: i,
      question: "다음 중 온실가스 감축에 더 큰 도움이 되는 행동은?",
      options: {
        A: { text: actionA.actionText, isCorrect: aIsWinner },
        B: { text: actionB.actionText, isCorrect: !aIsWinner },
      },
      explanation: `정답: ${winner.actionText}\n\n${winner.explanation}\n\n• ${winner.actionText}\n: ${winner.impactScore}점\n• ${loser.actionText}\n: ${loser.impactScore}점`,
      penalty: 25,
    });
  }

  return generatedQuizzes;
};

export const useRandomQuiz = (totalRounds: number = 10) => {
  const [quizzes, setQuizzes] = useState<QuizItem[]>([]);
  const [isReady, setIsReady] = useState(false);

  const engine = useQuizEngine(quizzes);

  useEffect(() => {
    const timer = setTimeout(() => {
      setQuizzes(generateRandomQuizzes(totalRounds));
      setIsReady(true);
    }, 0);
    return () => clearTimeout(timer);
  }, [totalRounds]);

  const resetGame = useCallback(() => {
    setQuizzes(generateRandomQuizzes(totalRounds));
    engine.resetEngine();
  }, [totalRounds, engine]);

  return {
    ...engine,
    isReady,
    resetGame,
  };
};
