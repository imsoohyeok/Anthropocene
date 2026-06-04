import { QuizItem } from "./quiz";

export type GameMode = "main" | "scenario" | "random";

export interface GameState {
  mode: GameMode;
  quizzes: QuizItem[];
  currentIndex: number;
  overloadRate: number;
  score: number;
  isGameOver: boolean;
  isFinished: boolean;

  changeMode: (mode: GameMode) => void;
  startGame: (quizzes: QuizItem[], mode: GameMode) => void;
  submitAnswer: (isCorrect: boolean, penalty: number) => void;
  resetGame: () => void;
  exitToMenu: () => void;
}
