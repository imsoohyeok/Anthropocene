export interface TimelineData {
  year: number;
  label: string; // 연도별 핵심 키워드 (예: "대 가속기", "파리 협정")
  metrics: {
    co2: number; // 이산화탄소 농도 (ppm)
    temp: number; // 지표면 온도 상승폭 (1850-1900 평균 대비, °C)
    seaLevel: number; // 해수면 상승 정도 (1880년 대비, mm)
  };
  description: string; // 사용자에게 보여줄 짧은 설명
  visuals: {
    hazardLevel: number; // 0 (안전) ~ 1 (치명적) 사이의 수치 (UI/FX 제어용)
  };
}
