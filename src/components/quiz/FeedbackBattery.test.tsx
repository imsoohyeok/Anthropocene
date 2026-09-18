import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import FeedbackBattery from "./FeedbackBattery";
import { QuizItem } from "@/types/quiz";

const makeQuiz = (): QuizItem => ({
  id: 1,
  question: "질문",
  options: {
    A: { text: "정답 옵션", isCorrect: true },
    B: { text: "오답 옵션", isCorrect: false },
  },
  explanation: "설명",
  penalty: 25,
  theme: "kitchen",
});

// 박스(카드) 전체를 감싸는 요소를 찾기 위한 헬퍼.
// 텍스트를 감싸는 내부 wrapper도 "relative" 클래스를 공유하므로,
// 바깥 박스에만 있는 backdrop-blur-md 클래스로 구분한다.
const getBoxByText = (text: string) =>
  screen.getByText(text).closest(".backdrop-blur-md");

describe("FeedbackBattery", () => {
  it("옵션이 2개 미만이면 아무것도 렌더링하지 않는다", () => {
    const quiz = makeQuiz();
    const oneOptionQuiz = {
      ...quiz,
      options: { A: quiz.options.A },
    } as unknown as QuizItem;

    const { container } = render(
      <FeedbackBattery quiz={oneOptionQuiz} isUserCorrect />,
    );

    expect(container).toBeEmptyDOMElement();
  });

  it("정답 옵션은 '에너지 절약', 오답 옵션은 penalty를 포함한 '환경 오염' 라벨을 보여준다", () => {
    const quiz = makeQuiz();
    render(<FeedbackBattery quiz={quiz} isUserCorrect />);

    expect(screen.getByText("에너지 절약")).toBeInTheDocument();
    expect(screen.getByText("환경 오염 (+25%)")).toBeInTheDocument();
  });

  it("사용자가 정답을 골랐으면 정답 박스에 '최적화' 스타일이 적용되고, 오답 박스는 비활성 스타일이다", () => {
    const quiz = makeQuiz();
    render(<FeedbackBattery quiz={quiz} isUserCorrect />);

    expect(getBoxByText("정답 옵션")?.className).toContain("border-cyan-400");
    expect(getBoxByText("오답 옵션")?.className).toContain("border-zinc-700");
  });

  it("사용자가 오답을 골랐으면 오답 박스에 '과부하' 스타일과 글리치 오버레이가 나타난다", () => {
    const quiz = makeQuiz();
    render(<FeedbackBattery quiz={quiz} isUserCorrect={false} />);

    const wrongBox = getBoxByText("오답 옵션");
    expect(wrongBox?.className).toContain("border-red-500");
    // 오답(과부하) 상태에서만 나타나는 글리치 스캔라인 오버레이
    expect(wrongBox?.querySelector(".mix-blend-overlay")).toBeInTheDocument();

    const correctBox = getBoxByText("정답 옵션");
    expect(correctBox?.className).toContain("border-zinc-700");
    expect(
      correctBox?.querySelector(".mix-blend-overlay"),
    ).not.toBeInTheDocument();
  });
});
