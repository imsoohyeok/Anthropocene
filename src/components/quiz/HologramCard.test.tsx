import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import HologramCard from "./HologramCard";
import { QuizItem } from "@/types/quiz";

// 실제 오디오 재생은 jsdom에서 의미가 없으므로 목(mock) 처리
vi.mock("use-sound", () => ({
  default: () => [vi.fn()],
}));

const makeQuiz = (question: string): QuizItem => ({
  id: 1,
  question,
  options: {
    A: { text: "선택지 A", isCorrect: true },
    B: { text: "선택지 B", isCorrect: false },
  },
  explanation: "설명",
  penalty: 25,
  theme: "kitchen",
});

describe("HologramCard", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("질문이 나타난 직후(300ms 이내)에는 선택지를 클릭해도 무시된다", () => {
    const onAnswer = vi.fn();
    render(<HologramCard quiz={makeQuiz("질문 1")} onAnswer={onAnswer} />);

    fireEvent.click(screen.getByText("선택지 A"));

    expect(onAnswer).not.toHaveBeenCalled();
  });

  it("300ms가 지난 뒤 클릭하면 정답 여부와 penalty를 담아 onAnswer를 호출한다", () => {
    const onAnswer = vi.fn();
    render(<HologramCard quiz={makeQuiz("질문 1")} onAnswer={onAnswer} />);

    act(() => {
      vi.advanceTimersByTime(300);
    });

    fireEvent.click(screen.getByText("선택지 A"));

    expect(onAnswer).toHaveBeenCalledTimes(1);
    expect(onAnswer).toHaveBeenCalledWith(true, 25);
  });

  it("한 번 선택한 뒤에는 다른 선택지를 눌러도 다시 호출되지 않는다", () => {
    const onAnswer = vi.fn();
    render(<HologramCard quiz={makeQuiz("질문 1")} onAnswer={onAnswer} />);

    act(() => {
      vi.advanceTimersByTime(300);
    });

    fireEvent.click(screen.getByText("선택지 A"));
    fireEvent.click(screen.getByText("선택지 B"));

    expect(onAnswer).toHaveBeenCalledTimes(1);
  });

  it("다음 질문으로 전환된 직후에도 다시 300ms 동안은 클릭이 막힌다 (광클 버그 회귀 테스트)", () => {
    const onAnswer = vi.fn();
    const { rerender } = render(
      <HologramCard quiz={makeQuiz("질문 1")} onAnswer={onAnswer} />,
    );

    act(() => {
      vi.advanceTimersByTime(300);
    });

    rerender(<HologramCard quiz={makeQuiz("질문 2")} onAnswer={onAnswer} />);

    // 전환 직후: 아직 300ms가 안 지났으므로 클릭 무시
    fireEvent.click(screen.getByText("선택지 A"));
    expect(onAnswer).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(300);
    });

    fireEvent.click(screen.getByText("선택지 A"));
    expect(onAnswer).toHaveBeenCalledTimes(1);
    expect(onAnswer).toHaveBeenCalledWith(true, 25);
  });
});
