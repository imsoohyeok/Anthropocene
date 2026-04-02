import { QuizItem } from "@/types/quiz";

export interface QuizBoardProps {
  currentQuiz: QuizItem;
  currentIndex: number;
  waterLevel: number;
  isGameOver: boolean;
  isFinished: boolean;
  score: number;
  handleAnswer: (isCorrect: boolean) => void;
  totalQuizzes: number;
  onExit: () => void;
  resetGame: () => void;
}
