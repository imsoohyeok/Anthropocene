import { TimelineData } from "@/types/timeline";

export const timelineData: TimelineData[] = [
  {
    year: 1850,
    label: "산업혁명의 태동",
    metrics: { co2: 150, temp: 0, seaLevel: 0 },
    description:
      "화석 연료의 사용이 시작되었지만, 지구의 시스템은 아직 평온을 유지하고 있었습니다.",
    visuals: { hazardLevel: 0.1 },
  },
  {
    year: 1950,
    label: "대 가속기 (Great Acceleration)",
    metrics: { co2: 2380, temp: 0.152, seaLevel: 90 },
    description:
      "제2차 세계대전 이후 생산과 소비가 폭발하며 지구의 지표들이 급격히 요동치기 시작합니다.",
    visuals: { hazardLevel: 0.3 },
  },
  {
    year: 2024,
    label: "인류세의 정점",
    metrics: { co2: 4730, temp: 1.051, seaLevel: 150 },
    description:
      "우리는 이제 미지의 영역에 들어섰습니다. 해수면은 빠르게 상승하며 해안 도시들을 위협합니다.",
    visuals: { hazardLevel: 0.8 },
  },
  {
    year: 2100,
    label: "선택의 기로 (시나리오)",
    metrics: { co2: 7500, temp: 2.5, seaLevel: 500 },
    description:
      "지금의 추세가 이어진다면, 우리가 알던 해안선은 지도에서 영원히 사라질 것입니다.",
    visuals: { hazardLevel: 1.0 },
  },
];
