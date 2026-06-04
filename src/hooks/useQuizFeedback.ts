import { useState, useCallback } from "react";

export const useQuizFeedback = (
  explanation: string,
  handleAnswer: (isCorrect: boolean, penalty: number) => void,
) => {
  const [feedback, setFeedback] = useState<{
    isCorrect: boolean;
    penalty: number;
    text: string;
  } | null>(null);

  const onOptionClick = useCallback(
    (isCorrect: boolean, penalty: number) => {
      setFeedback({ isCorrect, penalty, text: explanation });
    },
    [explanation],
  );

  const onNextClick = useCallback(() => {
    if (feedback) {
      handleAnswer(feedback.isCorrect, feedback.penalty);
      setFeedback(null);
    }
  }, [feedback, handleAnswer]);

  return { feedback, onOptionClick, onNextClick };
};
