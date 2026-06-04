import { create } from "zustand";
import { GameState } from "@/types/GameStore";

export const useGameStore = create<GameState>((set, get) => ({
  // --- 초기 상태 (Initial State) ---
  mode: "main", // 처음 시작은 무조건 메인 화면
  quizzes: [],
  currentIndex: 0,
  overloadRate: 0,
  score: 0,
  isGameOver: false,
  isFinished: false,

  // --- 액션 (Actions) ---

  // 모드 변경 (메인 <-> 퀴즈선택)
  changeMode: (mode) => set({ mode }),

  // 게임 시작 (퀴즈 데이터를 받아오고 모든 상태 초기화)
  startGame: (quizzes, mode) =>
    set({
      mode,
      quizzes,
      currentIndex: 0,
      overloadRate: 0,
      score: 0,
      isGameOver: false,
      isFinished: false,
    }),

  // 정답 제출 로직 (핵심 비즈니스 로직)
  submitAnswer: (isCorrect) => {
    const state = get();

    let newoverloadRate = state.overloadRate;
    let newScore = state.score;

    // 정답이면 점수 증가, 오답이면 해수면 10% 상승 (기획에 따라 수치 조절 가능)
    if (isCorrect) {
      newScore += 1;
    } else {
      newoverloadRate += 10;
    }

    // 게임 종료 및 클리어 조건 판별
    const isGameOver = newoverloadRate >= 100;
    const isFinished =
      !isGameOver && state.currentIndex + 1 >= state.quizzes.length;

    // 변경된 상태를 스토어에 덮어씌웁니다 (set)
    set({
      overloadRate: newoverloadRate,
      score: newScore,
      isGameOver,
      isFinished,

      // 게임이 안 끝났으면 다음 문제로, 끝났으면 현재 인덱스 유지
      currentIndex:
        isGameOver || isFinished ? state.currentIndex : state.currentIndex + 1,
    });
  },

  // 다시 도전 (퀴즈 배열은 그대로 두고 수치만 초기화)
  resetGame: () =>
    set({
      currentIndex: 0,
      overloadRate: 0,
      score: 0,
      isGameOver: false,
      isFinished: false,
    }),

  // 메뉴로 나가기 (모든 것을 텅 비우고 메인으로)
  exitToMenu: () =>
    set({
      mode: "main",
      quizzes: [],
      currentIndex: 0,
      overloadRate: 0,
      score: 0,
      isGameOver: false,
      isFinished: false,
    }),
}));
