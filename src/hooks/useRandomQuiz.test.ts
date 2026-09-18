import { describe, it, expect } from "vitest";
import { generateRandomQuizzes } from "./useRandomQuiz";

describe("generateRandomQuizzes", () => {
  it("기본값으로 호출하면 10개의 퀴즈를 생성한다", () => {
    const quizzes = generateRandomQuizzes();

    expect(quizzes).toHaveLength(10);
  });

  it("roundCount만큼 퀴즈를 생성하고, id는 0부터 순차적으로 매겨진다", () => {
    const quizzes = generateRandomQuizzes(5);

    expect(quizzes).toHaveLength(5);
    expect(quizzes.map((q) => q.id)).toEqual([0, 1, 2, 3, 4]);
  });

  it("각 퀴즈는 A/B 중 정확히 하나만 정답이고, impactScore가 더 높은 쪽이 정답이다", () => {
    const quizzes = generateRandomQuizzes(20);

    for (const quiz of quizzes) {
      const { A, B } = quiz.options;

      // 정확히 하나만 정답
      expect(A.isCorrect).toBe(!B.isCorrect);

      // 정답 쪽 설명이 explanation에 포함되어 있는지 (winner 텍스트 확인)
      const winnerText = A.isCorrect ? A.text : B.text;
      expect(quiz.explanation).toContain(`정답: ${winnerText}`);
    }
  });

  it("고정된 필드값(테마, 패널티, 질문 문구)이 항상 동일하다", () => {
    const quizzes = generateRandomQuizzes(3);

    for (const quiz of quizzes) {
      expect(quiz.theme).toBe("city");
      expect(quiz.penalty).toBe(25);
      expect(quiz.question).toBe(
        "다음 중 에너지 절약에 더 큰 도움이 되는 행동은?",
      );
    }
  });
});
