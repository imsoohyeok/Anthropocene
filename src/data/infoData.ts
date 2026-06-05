export interface infoItem {
  id: number;
  category: "기후 데이터" | "퀴즈 정보" | "시각 에셋" | "사운드";
  content: string; // 나열할 정보 내용
  infoName: string; // 출처 이름
  infoUrl?: string; // (선택) 클릭 시 이동할 실제 URL
}

export const infoData: infoItem[] = [
  // --- 기후 데이터 (메인 타임라인) ---
  {
    id: 1,
    category: "기후 데이터",
    content: "연도별 이산화탄소 농도 (CO2)",
    infoName: "NOAA (미국 해양대기청)",
    infoUrl: "https://gml.noaa.gov/ccgg/trends/",
  },
  {
    id: 2,
    category: "기후 데이터",
    content: "글로벌 지표면 온도 상승률",
    infoName: "NASA (미국 항공우주국)",
    infoUrl: "https://climate.nasa.gov/vital-signs/global-temperature/",
  },
  {
    id: 3,
    category: "기후 데이터",
    content: "평균 해수면 상승률",
    infoName: "NASA (미국 항공우주국)",
    infoUrl: "https://climate.nasa.gov/vital-signs/sea-level/",
  },

  // --- 퀴즈 정보 (미니게임) ---
  {
    id: 4,
    category: "퀴즈 정보",
    content: "가전제품별 대기전력 및 에너지 소비 효율 정보",
    infoName: "한국에너지공단",
    infoUrl: "https://www.energy.or.kr/",
  },
  {
    id: 5,
    category: "퀴즈 정보",
    content: "생활 속 탄소중립 실천 수칙 50선",
    infoName: "환경부",
    infoUrl: "https://www.me.go.kr/",
  },

  // --- 시각 에셋 ---
  {
    id: 6,
    category: "시각 에셋",
    content: "메인 페이지 3D 기후 시뮬레이션 배경",
    infoName: "실제 구현 (Procedural Shader)",
  },
  {
    id: 7,
    category: "시각 에셋",
    content: "미니게임 퀴즈룸 배경 이미지 (거실, 숲 등)",
    infoName: "Midjourney AI (Generated & Edited)",
  },
  {
    id: 8,
    category: "시각 에셋",
    content: "게임 UI 아이콘 및 폰트 (Pretendard)",
    infoName: "외부 오픈소스 라이선스 준수",
  },

  // --- 사운드 ---
  {
    id: 9,
    category: "사운드",
    content: "메인 배경음악 및 피드백 효과음",
    infoName: "오디오 라이브러리 구독 서비스 이용",
  },
];
