import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { useQuizAudio } from "./useQuizAudio";

// 실제 오디오 재생 대신, src별로 안정적인(re-render에도 같은 참조를 유지하는)
// play/stop mock 함수를 반환하도록 use-sound를 목(mock) 처리한다.
const { soundMocks } = vi.hoisted(() => ({
  soundMocks: new Map<string, { play: () => void; stop: () => void }>(),
}));

vi.mock("use-sound", () => ({
  default: (src: string) => {
    if (!soundMocks.has(src)) {
      soundMocks.set(src, { play: vi.fn(), stop: vi.fn() });
    }
    const entry = soundMocks.get(src)!;
    return [entry.play, { stop: entry.stop }];
  },
}));

const NORMAL_BGM = {
  scenario: "/sounds/kulakovka-futuristic-283951.mp3",
  random: "/sounds/jonasblakewood-energetic-513175.mp3",
};
const DANGER_BGM = "/sounds/kulakovka-hard-cyberpunk-281149.mp3";

describe("useQuizAudio", () => {
  beforeEach(() => {
    soundMocks.clear();
  });

  it("위험 상태(70% 미만)가 아니면 일반 배경음악을 재생하고 위험 음악은 꺼둔다", () => {
    renderHook(() => useQuizAudio(0, "random", false));

    expect(soundMocks.get(NORMAL_BGM.random)?.play).toHaveBeenCalled();
    expect(soundMocks.get(DANGER_BGM)?.stop).toHaveBeenCalled();
  });

  it("overloadRate가 70 이상이면 위험 배경음악으로 전환한다", () => {
    renderHook(() => useQuizAudio(70, "random", false));

    expect(soundMocks.get(DANGER_BGM)?.play).toHaveBeenCalled();
    expect(soundMocks.get(NORMAL_BGM.random)?.stop).toHaveBeenCalled();
  });

  it("게임이 종료되면 위험 음악을 재생하지 않고 모든 배경음악을 정지한다", () => {
    renderHook(() => useQuizAudio(80, "random", true));

    expect(soundMocks.get(NORMAL_BGM.random)?.stop).toHaveBeenCalled();
    expect(soundMocks.get(DANGER_BGM)?.stop).toHaveBeenCalled();
    expect(soundMocks.get(DANGER_BGM)?.play).not.toHaveBeenCalled();
  });

  it("mode가 scenario면 시나리오 모드 전용 배경음악 경로를 재생한다", () => {
    renderHook(() => useQuizAudio(0, "scenario", false));

    expect(soundMocks.get(NORMAL_BGM.scenario)?.play).toHaveBeenCalled();
  });

  it("overloadRate가 70 미만에서 이상으로 바뀌면 일반 음악을 멈추고 위험 음악으로 전환한다", () => {
    const { rerender } = renderHook(
      ({ overloadRate }: { overloadRate: number }) =>
        useQuizAudio(overloadRate, "random", false),
      { initialProps: { overloadRate: 0 } },
    );

    expect(soundMocks.get(NORMAL_BGM.random)?.play).toHaveBeenCalledTimes(1);
    expect(soundMocks.get(DANGER_BGM)?.play).not.toHaveBeenCalled();

    rerender({ overloadRate: 75 });

    expect(soundMocks.get(NORMAL_BGM.random)?.stop).toHaveBeenCalled();
    expect(soundMocks.get(DANGER_BGM)?.play).toHaveBeenCalled();
  });
});
