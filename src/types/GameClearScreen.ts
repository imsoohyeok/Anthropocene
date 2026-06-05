export interface GameClearScreenProps {
  correctCount: number;
  totalQuizzes: number;
  overloadRate: number;
  onExit: () => void;
}
