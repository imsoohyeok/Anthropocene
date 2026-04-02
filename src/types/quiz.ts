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
};
