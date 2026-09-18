import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useScrollYear } from "./useScrollYear";

const setWindowSize = ({
  innerWidth = 1280,
  innerHeight = 800,
}: { innerWidth?: number; innerHeight?: number } = {}) => {
  Object.defineProperty(window, "innerWidth", {
    value: innerWidth,
    writable: true,
    configurable: true,
  });
  Object.defineProperty(window, "innerHeight", {
    value: innerHeight,
    writable: true,
    configurable: true,
  });
};

const setScrollY = (value: number) => {
  Object.defineProperty(window, "scrollY", {
    value,
    writable: true,
    configurable: true,
  });
};

const makeContainerRef = (scrollHeight: number) => ({
  current: { scrollHeight } as HTMLElement,
});

describe("useScrollYear", () => {
  let scrollToSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    setWindowSize();
    setScrollY(0);
    scrollToSpy = vi.spyOn(window, "scrollTo").mockImplementation(() => {});
  });

  afterEach(() => {
    scrollToSpy.mockRestore();
  });

  it("초기값은 startYear다", () => {
    const containerRef = makeContainerRef(2000);
    const { result } = renderHook(() =>
      useScrollYear(containerRef, 1850, 2100),
    );

    expect(result.current.year).toBe(1850);
  });

  it("스크롤 진행률에 비례해 연도를 계산한다", () => {
    // innerHeight=800, scrollHeight=2000 → maxScroll = 1200, progress 0.5
    const containerRef = makeContainerRef(2000);
    const { result } = renderHook(() =>
      useScrollYear(containerRef, 1850, 2100),
    );

    setScrollY(600);
    act(() => {
      window.dispatchEvent(new Event("scroll"));
    });

    expect(result.current.year).toBe(1975); // 1850 + (2100-1850)*0.5
  });

  it("진행률이 1을 넘어가도 endYear로 clamp된다", () => {
    const containerRef = makeContainerRef(2000);
    const { result } = renderHook(() =>
      useScrollYear(containerRef, 1850, 2100),
    );

    setScrollY(999999);
    act(() => {
      window.dispatchEvent(new Event("scroll"));
    });

    expect(result.current.year).toBe(2100);
  });

  it("모바일 화면(innerWidth < 768)에서는 스크롤해도 연도가 바뀌지 않는다", () => {
    setWindowSize({ innerWidth: 375, innerHeight: 800 });
    const containerRef = makeContainerRef(2000);
    const { result } = renderHook(() =>
      useScrollYear(containerRef, 1850, 2100),
    );

    setScrollY(600);
    act(() => {
      window.dispatchEvent(new Event("scroll"));
    });

    expect(result.current.year).toBe(1850);
  });

  it("setYear 호출 시 연도가 즉시 바뀌고, 데스크톱에서는 해당 위치로 스크롤한다", () => {
    const containerRef = makeContainerRef(2000);
    const { result } = renderHook(() =>
      useScrollYear(containerRef, 1850, 2100),
    );

    act(() => {
      result.current.setYear(1975);
    });

    expect(result.current.year).toBe(1975);
    // progress 0.5 * maxScroll(1200) = 600
    expect(scrollToSpy).toHaveBeenCalledWith({ top: 600, behavior: "auto" });
  });

  it("모바일에서는 setYear가 연도는 바꾸지만 scrollTo는 호출하지 않는다", () => {
    setWindowSize({ innerWidth: 375, innerHeight: 800 });
    const containerRef = makeContainerRef(2000);
    const { result } = renderHook(() =>
      useScrollYear(containerRef, 1850, 2100),
    );

    act(() => {
      result.current.setYear(1975);
    });

    expect(result.current.year).toBe(1975);
    expect(scrollToSpy).not.toHaveBeenCalled();
  });
});
