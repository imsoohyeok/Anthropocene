import { describe, it, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useQuizFeedback } from "./useQuizFeedback";

describe("useQuizFeedback", () => {
  it("초기 상태에서는 feedback이 null이다", () => {
    const handleAnswer = vi.fn();
    const { result } = renderHook(() =>
      useQuizFeedback("설명 텍스트", handleAnswer),
    );

    expect(result.current.feedback).toBeNull();
  });

  it("옵션을 클릭하면 정답 여부/penalty/설명이 담긴 feedback이 세팅된다", () => {
    const handleAnswer = vi.fn();
    const { result } = renderHook(() =>
      useQuizFeedback("설명 텍스트", handleAnswer),
    );

    act(() => {
      result.current.onOptionClick(true, 25);
    });

    expect(result.current.feedback).toEqual({
      isCorrect: true,
      penalty: 25,
      text: "설명 텍스트",
    });
    // 옵션 클릭 시점에는 아직 상위로 정답 여부를 알리지 않는다 (다음 문제 버튼을 눌러야 알림)
    expect(handleAnswer).not.toHaveBeenCalled();
  });

  it("다음 문제 버튼을 누르면 handleAnswer가 호출되고 feedback이 초기화된다", () => {
    const handleAnswer = vi.fn();
    const { result } = renderHook(() =>
      useQuizFeedback("설명 텍스트", handleAnswer),
    );

    act(() => {
      result.current.onOptionClick(false, 30);
    });
    act(() => {
      result.current.onNextClick();
    });

    expect(handleAnswer).toHaveBeenCalledTimes(1);
    expect(handleAnswer).toHaveBeenCalledWith(false, 30);
    expect(result.current.feedback).toBeNull();
  });

  it("feedback이 없는 상태에서 onNextClick을 눌러도 아무 일도 일어나지 않는다", () => {
    const handleAnswer = vi.fn();
    const { result } = renderHook(() =>
      useQuizFeedback("설명 텍스트", handleAnswer),
    );

    act(() => {
      result.current.onNextClick();
    });

    expect(handleAnswer).not.toHaveBeenCalled();
    expect(result.current.feedback).toBeNull();
  });
});
