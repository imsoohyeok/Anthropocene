"use client";

import { useState, useEffect, useCallback, RefObject } from "react";

export const useScrollYear = (
  containerRef: RefObject<HTMLElement | null>,
  startYear: number,
  endYear: number,
) => {
  const [year, setYearState] = useState(startYear);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth < 768) return;
      if (!containerRef.current) return;

      const scrollY = window.scrollY;
      const maxScroll = containerRef.current.scrollHeight - window.innerHeight;

      if (maxScroll <= 0) return;

      const progress = Math.min(Math.max(scrollY / maxScroll, 0), 1);

      const calculatedYear = Math.round(
        startYear + (endYear - startYear) * progress,
      );
      setYearState((prev) => (prev !== calculatedYear ? calculatedYear : prev));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    // 초기 실행
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [startYear, endYear, containerRef]);

  const setYear = useCallback(
    (newYear: number) => {
      setYearState(newYear);

      if (window.innerWidth < 768) return;

      if (containerRef.current) {
        const progress = (newYear - startYear) / (endYear - startYear);
        const maxScroll =
          containerRef.current.scrollHeight - window.innerHeight;

        window.scrollTo({ top: progress * maxScroll, behavior: "auto" });
      }
    },
    [startYear, endYear, containerRef],
  );

  return { year, setYear };
};
