import { describe, it, expect, beforeEach } from "vitest";
import { useGameStore } from "./useGameStore";
import { QuizItem } from "@/types/quiz";

const makeQuiz = (id: number): QuizItem => ({
  id,
  question: `질문 ${id}`,
  options: {
    A: { text: "선택지 A", isCorrect: true },
    B: { text: "선택지 B", isCorrect: false },
  },
  explanation: "설명",
  penalty: 25,
  theme: "kitchen",
});

// 각 테스트 전 스토어를 알려진 초기 상태로 리셋
beforeEach(() => {
  useGameStore.setState({
    mode: "main",
    quizzes: [],
    currentIndex: 0,
    overloadRate: 0,
    score: 0,
    isGameOver: false,
    isFinished: false,
  });
});

describe("useGameStore", () => {
  describe("startGame", () => {
    it("퀴즈 목록과 모드를 세팅하고 진행 상태를 초기화한다", () => {
      const quizzes = [makeQuiz(1), makeQuiz(2)];
      useGameStore.getState().startGame(quizzes, "random");

      const state = useGameStore.getState();
      expect(state.quizzes).toEqual(quizzes);
      expect(state.mode).toBe("random");
      expect(state.currentIndex).toBe(0);
      expect(state.overloadRate).toBe(0);
      expect(state.score).toBe(0);
      expect(state.isGameOver).toBe(false);
      expect(state.isFinished).toBe(false);
    });
  });

  describe("submitAnswer", () => {
    it("정답이면 score가 1 오르고 다음 문제로 넘어간다", () => {
      useGameStore.getState().startGame([makeQuiz(1), makeQuiz(2)], "random");

      useGameStore.getState().submitAnswer(true, 25);

      const state = useGameStore.getState();
      expect(state.score).toBe(1);
      expect(state.overloadRate).toBe(0);
      expect(state.currentIndex).toBe(1);
      expect(state.isGameOver).toBe(false);
      expect(state.isFinished).toBe(false);
    });

    it("오답이면 overloadRate가 penalty만큼 오르고 다음 문제로 넘어간다", () => {
      useGameStore
        .getState()
        .startGame([makeQuiz(1), makeQuiz(2), makeQuiz(3)], "random");

      useGameStore.getState().submitAnswer(false, 25);

      const state = useGameStore.getState();
      expect(state.score).toBe(0);
      expect(state.overloadRate).toBe(25);
      expect(state.currentIndex).toBe(1);
    });

    it("overloadRate가 100 이상이 되면 100으로 clamp되고 게임오버 처리된다", () => {
      useGameStore.getState().startGame([makeQuiz(1), makeQuiz(2)], "random");

      useGameStore.getState().submitAnswer(false, 70);
      useGameStore.getState().submitAnswer(false, 70);

      const state = useGameStore.getState();
      expect(state.overloadRate).toBe(100);
      expect(state.isGameOver).toBe(true);
      // 첫 오답(70) 시점엔 아직 게임오버가 아니라 currentIndex가 1로 넘어가고,
      // 두 번째 오답(70)에서 게임오버가 걸리며 그 이후로는 더 진행되지 않는다
      expect(state.currentIndex).toBe(1);
    });

    it("마지막 문제까지 정답을 맞히면 isFinished가 true가 된다", () => {
      useGameStore.getState().startGame([makeQuiz(1), makeQuiz(2)], "random");

      useGameStore.getState().submitAnswer(true, 25);
      useGameStore.getState().submitAnswer(true, 25);

      const state = useGameStore.getState();
      expect(state.score).toBe(2);
      expect(state.isFinished).toBe(true);
      expect(state.isGameOver).toBe(false);
      // 클리어 시에는 currentIndex가 마지막 인덱스에 머무른다
      expect(state.currentIndex).toBe(1);
    });
  });

  describe("resetGame", () => {
    it("퀴즈 목록은 유지한 채 진행 상태만 초기화한다", () => {
      const quizzes = [makeQuiz(1), makeQuiz(2)];
      useGameStore.getState().startGame(quizzes, "random");
      useGameStore.getState().submitAnswer(false, 30);

      useGameStore.getState().resetGame();

      const state = useGameStore.getState();
      expect(state.quizzes).toEqual(quizzes);
      expect(state.currentIndex).toBe(0);
      expect(state.overloadRate).toBe(0);
      expect(state.score).toBe(0);
      expect(state.isGameOver).toBe(false);
      expect(state.isFinished).toBe(false);
    });
  });

  describe("exitToMenu", () => {
    it("모드를 main으로 되돌리고 모든 상태를 비운다", () => {
      useGameStore.getState().startGame([makeQuiz(1)], "scenario");
      useGameStore.getState().submitAnswer(true, 25);

      useGameStore.getState().exitToMenu();

      const state = useGameStore.getState();
      expect(state.mode).toBe("main");
      expect(state.quizzes).toEqual([]);
      expect(state.currentIndex).toBe(0);
      expect(state.score).toBe(0);
    });
  });
});
