import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useAnswerFeedbackTiming } from "./useAnswerFeedbackTiming";

type FeedbackArg = {
  isCorrect: boolean;
  penalty: number;
  text: string;
} | null;

const renderTiming = (initialFeedback: FeedbackArg = null) => {
  const playCorrect = vi.fn();
  const playWrong = vi.fn();

  const utils = renderHook(
    (props: { feedback: FeedbackArg }) =>
      useAnswerFeedbackTiming(props.feedback, playCorrect, playWrong),
    { initialProps: { feedback: initialFeedback } },
  );

  return { ...utils, playCorrect, playWrong };
};

describe("useAnswerFeedbackTiming", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("feedback이 없으면 플래시/모달이 모두 꺼진 상태를 유지한다", () => {
    const { result } = renderTiming(null);

    act(() => {
      vi.runAllTimers();
    });

    expect(result.current.isFlashing).toBe(false);
    expect(result.current.showFeedbackModal).toBe(false);
  });

  it("정답: 즉시 플래시 시작 → 400ms 뒤 플래시 종료 → 500ms 뒤 모달 오픈", () => {
    const { result, rerender, playCorrect, playWrong } = renderTiming(null);

    rerender({ feedback: { isCorrect: true, penalty: 0, text: "설명" } });

    act(() => {
      vi.advanceTimersByTime(0);
    });
    expect(result.current.isFlashing).toBe(true);
    expect(playCorrect).toHaveBeenCalledTimes(1);
    expect(playWrong).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(400);
    });
    expect(result.current.isFlashing).toBe(false);
    // 아직 500ms가 안 지났으니 모달은 안 뜸
    expect(result.current.showFeedbackModal).toBe(false);

    act(() => {
      vi.advanceTimersByTime(100); // 총 500ms 경과
    });
    expect(result.current.showFeedbackModal).toBe(true);
  });

  it("오답: 즉시 플래시 시작 → 600ms 뒤 플래시 종료 → 500ms 뒤 모달 오픈", () => {
    const { result, rerender, playCorrect, playWrong } = renderTiming(null);

    rerender({ feedback: { isCorrect: false, penalty: 25, text: "설명" } });

    act(() => {
      vi.advanceTimersByTime(0);
    });
    expect(result.current.isFlashing).toBe(true);
    expect(playWrong).toHaveBeenCalledTimes(1);
    expect(playCorrect).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(500);
    });
    expect(result.current.showFeedbackModal).toBe(true);
    // 오답 플래시는 600ms까지 유지되므로 아직 켜져있어야 함
    expect(result.current.isFlashing).toBe(true);

    act(() => {
      vi.advanceTimersByTime(100); // 총 600ms 경과
    });
    expect(result.current.isFlashing).toBe(false);
  });

  it("모달이 열린 뒤 feedback이 다시 null이 되면 즉시 닫힌다", () => {
    const { result, rerender } = renderTiming({
      isCorrect: true,
      penalty: 0,
      text: "설명",
    });

    act(() => {
      vi.advanceTimersByTime(500);
    });
    expect(result.current.showFeedbackModal).toBe(true);

    rerender({ feedback: null });

    act(() => {
      vi.advanceTimersByTime(0);
    });
    expect(result.current.showFeedbackModal).toBe(false);
    expect(result.current.isFlashing).toBe(false);
  });
});
