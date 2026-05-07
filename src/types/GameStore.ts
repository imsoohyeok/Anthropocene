import { QuizItem } from "./quiz";

export type GameMode = "main" | "scenario" | "random";

export interface GameState {
  mode: GameMode;
  quizzes: QuizItem[];
  currentIndex: number;
  waterLevel: number;
  score: number;
  isGameOver: boolean;
  isFinished: boolean;

  changeMode: (mode: GameMode) => void;
  startGame: (quizzes: QuizItem[], mode: GameMode) => void;
  submitAnswer: (isCorrect: boolean) => void;
  resetGame: () => void;
  exitToMenu: () => void;
}
