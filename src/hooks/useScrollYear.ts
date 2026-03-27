import { useState, useEffect, useCallback, RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const useScrollYear = (
  containerRef: RefObject<HTMLElement | null>,
  startYear: number,
  endYear: number,
) => {
  const [year, setYearState] = useState(startYear);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          const calculatedYear = Math.round(
            startYear + (endYear - startYear) * self.progress,
          );
          setYearState((prev) =>
            prev !== calculatedYear ? calculatedYear : prev,
          );
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [startYear, endYear, containerRef]);

  const setYear = useCallback(
    (newYear: number) => {
      setYearState(newYear);
      if (containerRef.current) {
        const progress = (newYear - startYear) / (endYear - startYear);
        const scrollHeight =
          containerRef.current.scrollHeight - window.innerHeight;
        window.scrollTo({ top: progress * scrollHeight, behavior: "auto" });
      }
    },
    [startYear, endYear, containerRef],
  );

  return { year, setYear };
};
