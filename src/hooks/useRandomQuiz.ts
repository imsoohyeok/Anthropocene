import { useEffect } from "react";
import { useGameStore } from "@/store/useGameStore";
import { QuizItem } from "@/types/quiz";
import { actionPool } from "@/data/actionData";

const generateRandomQuizzes = (roundCount: number = 10): QuizItem[] => {
  const generatedQuizzes: QuizItem[] = [];

  for (let i = 0; i < roundCount; i++) {
    const shuffledPool = [...actionPool].sort(() => 0.5 - Math.random());
    const actionA = shuffledPool[0];
    const actionB = shuffledPool[1];

    const aIsWinner = actionA.impactScore >= actionB.impactScore;
    const winner = aIsWinner ? actionA : actionB;

    generatedQuizzes.push({
      id: i,
      question: "다음 중 에너지 절약에 더 큰 도움이 되는 행동은?",
      options: {
        A: { text: actionA.actionText, isCorrect: aIsWinner },
        B: { text: actionB.actionText, isCorrect: !aIsWinner },
      },
      explanation: `정답: ${winner.actionText}\n설명: ${winner.explanation}`,
      penalty: 25,
      theme: "city",
    });
  }

  return generatedQuizzes;
};

export const useRandomQuiz = (totalRounds: number = 10) => {
  const startGame = useGameStore((state) => state.startGame);
  const quizzes = useGameStore((state) => state.quizzes);
  const overloadRate = useGameStore((state) => state.overloadRate);

  useEffect(() => {
    const newDynamicQuizzes = generateRandomQuizzes(totalRounds);
    startGame(newDynamicQuizzes, "random");
  }, [startGame, totalRounds]);

  return {
    isReady: quizzes.length > 0,
    overloadRate,
  };
};
