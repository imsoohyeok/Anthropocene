import { useEffect, useRef, useState } from "react";

type Feedback = {
  isCorrect: boolean;
  penalty: number;
  text: string;
} | null;

/**
 * 정답/오답 선택 이후의 연출(색상 플래시 → 피드백 모달)과, 모달이 열릴 때
 * "다음 문제" 버튼으로 포커스를 이동시키는 타이밍을 담당하는 훅.
 * QuizBoard에서 렌더링 로직과 분리해 가독성을 높이기 위해 분리했다.
 */
export function useAnswerFeedbackTiming(
  feedback: Feedback,
  playCorrect: () => void,
  playWrong: () => void,
) {
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [isFlashing, setIsFlashing] = useState(false);
  const nextButtonRef = useRef<HTMLButtonElement>(null);

  // 피드백 모달이 열리면 포커스를 모달 안(다음 문제 버튼)으로 이동
  useEffect(() => {
    if (showFeedbackModal) {
      nextButtonRef.current?.focus();
    }
  }, [showFeedbackModal]);

  useEffect(() => {
    let modalTimer: NodeJS.Timeout;
    let flashEndTimer: NodeJS.Timeout;
    let flashStartTimer: NodeJS.Timeout;

    if (feedback) {
      if (!feedback.isCorrect) {
        // 오답: 붉은색 플래시 (0.5초 대기 후 모달)
        flashStartTimer = setTimeout(() => {
          setIsFlashing(true);
          playWrong();
        }, 0);

        flashEndTimer = setTimeout(() => setIsFlashing(false), 600);
        modalTimer = setTimeout(() => setShowFeedbackModal(true), 500);
      } else {
        // 정답: 파란색 플래시 (대기 없이 모달 즉시)
        flashStartTimer = setTimeout(() => {
          setIsFlashing(true);
          playCorrect();
        }, 0);

        flashEndTimer = setTimeout(() => setIsFlashing(false), 400);
        modalTimer = setTimeout(() => setShowFeedbackModal(true), 500);
      }
    } else {
      // 다음 문제 초기화
      modalTimer = setTimeout(() => setShowFeedbackModal(false), 0);
      flashStartTimer = setTimeout(() => setIsFlashing(false), 0);
    }

    return () => {
      clearTimeout(modalTimer);
      clearTimeout(flashEndTimer);
      clearTimeout(flashStartTimer);
    };
  }, [feedback, playCorrect, playWrong]);

  return { showFeedbackModal, isFlashing, nextButtonRef };
}
