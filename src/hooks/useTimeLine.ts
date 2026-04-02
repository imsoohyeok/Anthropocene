import { timelineData } from "@/data/timeline";

export const useTimeline = (currentYear: number) => {
  // 현재 연도가 속한 구간의 시작과 끝 데이터 찾기
  const nextIndex = timelineData.findIndex((d) => d.year > currentYear);
  const prevIndex = nextIndex === -1 ? timelineData.length - 1 : nextIndex - 1;
  const nextIndexSafe = nextIndex === -1 ? prevIndex : nextIndex;

  const start = timelineData[prevIndex];
  const end = timelineData[nextIndexSafe];

  // 두 데이터 사이의 진행 비율 계산 (0 ~ 1)
  const range = end.year - start.year;
  const progress = range === 0 ? 0 : (currentYear - start.year) / range;

  // 수치 보간 함수 (숫자만 보간)
  const interpolate = (s: number, e: number) => s + (e - s) * progress;

  // 현재 상태 반환
  return {
    label: start.label,
    description: start.description,
    metrics: {
      co2: interpolate(start.metrics.co2, end.metrics.co2),
      temp: interpolate(start.metrics.temp, end.metrics.temp),
      seaLevel: interpolate(start.metrics.seaLevel, end.metrics.seaLevel),
    },
    visuals: {
      hazardLevel: interpolate(
        start.visuals.hazardLevel,
        end.visuals.hazardLevel,
      ),
    },
  };
};
