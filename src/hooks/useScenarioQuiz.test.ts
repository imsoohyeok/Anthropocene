import { describe, it, expect } from "vitest";
import { shuffleArray } from "./useScenarioQuiz";

describe("shuffleArray", () => {
  it("원본과 같은 길이의 배열을 반환한다", () => {
    const input = [1, 2, 3, 4, 5];

    expect(shuffleArray(input)).toHaveLength(input.length);
  });

  it("원본 배열의 원소를 그대로 유지한다 (순서만 바뀜, 추가/누락 없음)", () => {
    const input = [1, 2, 3, 4, 5, 6, 7, 8];

    const shuffled = shuffleArray(input);

    expect([...shuffled].sort()).toEqual([...input].sort());
  });

  it("원본 배열을 변경하지 않는다 (새 배열을 반환)", () => {
    const input = [1, 2, 3];
    const inputCopy = [...input];

    shuffleArray(input);

    expect(input).toEqual(inputCopy);
  });

  it("빈 배열이나 원소가 1개인 배열도 에러 없이 그대로 반환한다", () => {
    expect(shuffleArray([])).toEqual([]);
    expect(shuffleArray([42])).toEqual([42]);
  });
});
