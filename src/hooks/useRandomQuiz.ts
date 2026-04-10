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
  // 스토어에서 함수와 상태를 가져옵니다.
  const startGame = useGameStore((state) => state.startGame);
  const quizzes = useGameStore((state) => state.quizzes);
  const waterLevel = useGameStore((state) => state.waterLevel);

  // 훅이 실행될 때 한 번만 퀴즈를 생성하고 스토어에 세팅합니다.
  useEffect(() => {
    const newDynamicQuizzes = generateRandomQuizzes(totalRounds);
    startGame(newDynamicQuizzes, "random");
  }, [startGame, totalRounds]);

  // Wrapper 컴포넌트가 화면을 그릴 때 필요한 정보만 딱 추려서 반환합니다.
  return {
    isReady: quizzes.length > 0,
    waterLevel,
  };
};
