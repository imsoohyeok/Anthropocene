import { useState, useCallback, useRef } from "react";

export const useQuizFeedback = (
  explanation: string,
  handleAnswer: (isCorrect: boolean, penalty: number) => void,
) => {
  const [feedback, setFeedback] = useState<{
    isCorrect: boolean;
    penalty: number;
    text: string;
  } | null>(null);

  // "다음 문제" 버튼이 AnimatePresence로 닫히는 동안(exit 애니메이션 중)에도
  // 잠깐 클릭 가능한 상태로 남아있어, 같은 feedback으로 onNextClick이
  // 중복 호출될 수 있다. ref로 "이미 처리된 답변인지"를 동기적으로 잠가서
  // 광클해도 한 번만 처리되도록 방지한다.
  const hasHandledRef = useRef(false);

  const onOptionClick = useCallback(
    (isCorrect: boolean, penalty: number) => {
      hasHandledRef.current = false;
      setFeedback({ isCorrect, penalty, text: explanation });
    },
    [explanation],
  );

  const onNextClick = useCallback(() => {
    if (feedback && !hasHandledRef.current) {
      hasHandledRef.current = true;
      handleAnswer(feedback.isCorrect, feedback.penalty);
      setFeedback(null);
    }
  }, [feedback, handleAnswer]);

  return { feedback, onOptionClick, onNextClick };
};
