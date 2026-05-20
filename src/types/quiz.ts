export type QuizOption = {
  text: string;
  isCorrect: boolean;
};

export type QuizItem = {
  id: number;
  question: string;
  options: {
    A: QuizOption;
    B: QuizOption;
  };
  explanation: string;
  penalty: number; // 틀렸을 때 올라갈 해수면 수치 (예: 20)
  theme: "kitchen" | "living" | "utility" | "entrance" | "restroom";
};

export interface HologramCardProps {
  quiz: QuizItem;
  onAnswer: (isCorrect: boolean, penalty: number) => void;
  themeColor?: string; // 테마별 포인트 컬러
}

// 테마 타입
export interface ThemeSetting {
  bg: string;
  color: string;
  glow: string;
}

export type ThemeConfig = Record<QuizItem["theme"], ThemeSetting>;

export interface QuizRoomProps {
  quiz: QuizItem;
  onAnswer: (isCorrect: boolean, penalty: number) => void;
}
