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
  theme: "kitchen" | "living" | "utility" | "entrance" | "restroom" | "city";
  highlightObject?: HighlightObjectType;
};

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

export interface HologramCardProps {
  quiz: QuizItem;
  onAnswer: (isCorrect: boolean, penalty: number) => void;
  themeColor?: string; // 테마별 포인트 컬러
}

// 특정 사물의 위치와 빛의 크기를 정의하는 타입
export type SpotlightTarget =
  | "ac" // 에어컨
  | "tv" // 티비
  | "lighting" // 조명
  | "clothes" // 옷
  | "washingMachine" // 세탁기
  | "food" // 음식
  | "fridge" // 냉장고
  | "boiler" // 보일러
  | "tumbler" // 텀블러
  | "transportation"; // 이동수단

export type HighlightObjectType = SpotlightTarget | null;

export interface CoordValue {
  top: string;
  left: string;
  width: string;
  height: string;
}
