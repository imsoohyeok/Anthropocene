import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import { useTimeline } from "./useTimeLine";

describe("useTimeline", () => {
  it("정확히 데이터 포인트와 일치하는 연도는 해당 지점의 값을 그대로 반환한다", () => {
    const { result } = renderHook(() => useTimeline(2024));

    expect(result.current.label).toBe("인류세의 정점");
    expect(result.current.metrics.co2).toBe(4730);
    expect(result.current.metrics.temp).toBe(1.051);
    expect(result.current.metrics.seaLevel).toBe(61);
    expect(result.current.visuals.hazardLevel).toBe(0.8);
  });

  it("두 데이터 포인트 사이의 연도는 진행 비율만큼 선형 보간된다", () => {
    // 1850(co2 150) ~ 1950(co2 2380) 구간의 정확히 중간(1900)
    const { result } = renderHook(() => useTimeline(1900));

    expect(result.current.label).toBe("산업혁명의 태동"); // 구간 시작점의 label 사용
    expect(result.current.metrics.co2).toBeCloseTo(1265);
    expect(result.current.metrics.temp).toBeCloseTo(0.076);
    expect(result.current.metrics.seaLevel).toBeCloseTo(-137.5);
    expect(result.current.visuals.hazardLevel).toBeCloseTo(0.2);
  });

  it("가장 마지막 연도(2100)에서는 마지막 데이터 포인트 값을 그대로 반환한다", () => {
    const { result } = renderHook(() => useTimeline(2100));

    expect(result.current.label).toBe("선택의 기로");
    expect(result.current.metrics.co2).toBe(7500);
    expect(result.current.visuals.hazardLevel).toBe(1.0);
  });
});
