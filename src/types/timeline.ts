export interface TimelineData {
  year: number;
  label: string; // 연도별 핵심 키워드 (예: "대 가속기", "파리 협정")
  metrics: {
    co2: number; // 이산화탄소 농도 (ppm)
    temp: number; // 지표면 온도 상승폭 (1850-1900 평균 대비, °C)
    seaLevel: number; // 해수면 상승 정도 (1880년 대비, mm)
    population?: number; // 세계 인구 (인류세의 주원인인 '인간의 수')
    extinctionRate?: number; // 생물 멸종 속도 (생태계 파괴의 지표)
    carbonBudget?: number; // 남은 탄소 예산 (1.5도 제한까지 남은 양)
  };
  description: string; // 사용자에게 보여줄 짧은 설명
  visuals: {
    hazardLevel: number; // 0 (안전) ~ 1 (치명적) 사이의 수치 (UI/FX 제어용)
    glacierTexture?: string; // 해당 연도 빙하 상태를 나타내는 텍스처 경로
    ambientSound?: string; // 연도별 분위기에 맞는 배경음
  };
}
