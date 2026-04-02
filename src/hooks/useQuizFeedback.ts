import { useState, useCallback } from "react";

export const useQuizFeedback = (
  explanation: string,
  handleAnswer: (isCorrect: boolean) => void,
) => {
  const [feedback, setFeedback] = useState<{
    isCorrect: boolean;
    text: string;
  } | null>(null);

  const onOptionClick = useCallback(
    (isCorrect: boolean) => {
      setFeedback({ isCorrect, text: explanation });
    },
    [explanation],
  );

  const onNextClick = useCallback(() => {
    if (feedback) {
      handleAnswer(feedback.isCorrect);
      setFeedback(null);
    }
  }, [feedback, handleAnswer]);

  return { feedback, onOptionClick, onNextClick };
};
