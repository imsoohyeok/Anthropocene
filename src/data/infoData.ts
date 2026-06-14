export interface infoItem {
  id: number;
  category: "기후 데이터" | "퀴즈 정보 참고 데이터";
  content: string; // 나열할 정보 내용
  infoName: string; // 출처 이름
  infoUrl?: string; // 클릭 시 이동할 실제 URL
}

export const infoData: infoItem[] = [
  // --- 기후 데이터 (메인 타임라인) ---
  {
    id: 1,
    category: "기후 데이터",
    content: "연도별 이산화탄소 농도 (CO2)",
    infoName: "Our World In Data",
    infoUrl: "https://ourworldindata.org/co2-and-greenhouse-gas-emissions",
  },
  {
    id: 2,
    category: "기후 데이터",
    content: "글로벌 지표면 온도 상승률",
    infoName: "Our World In Data (GAS OR WARMING -> Warming impact)",
    infoUrl: "https://ourworldindata.org/co2-and-greenhouse-gas-emissions",
  },
  {
    id: 3,
    category: "기후 데이터",
    content: "평균 해수면 상승률",
    infoName: "Our World In Data",
    infoUrl: "https://ourworldindata.org/grapher/sea-level",
  },

  // --- 퀴즈 정보 참고 데이터 (미니게임) ---
  {
    id: 4,
    category: "퀴즈 정보 참고 데이터",
    content: "한국에너지공단",
    infoName: "https://www.energy.or.kr/",
    infoUrl: "https://www.energy.or.kr/",
  },
  {
    id: 5,
    category: "퀴즈 정보 참고 데이터",
    content: "한국전력공사",
    infoName: "https://home.kepco.co.kr/",
    infoUrl: "https://home.kepco.co.kr/",
  },
  {
    id: 6,
    category: "퀴즈 정보 참고 데이터",
    content: "환경부 탄소중립 실천 포털",
    infoName: "https://www.gihoo.or.kr/zerolife/",
    infoUrl: "https://www.gihoo.or.kr/zerolife/",
  },
  {
    id: 7,
    category: "퀴즈 정보 참고 데이터",
    content: "Our World in Data",
    infoName: "https://ourworldindata.org/environmental-impacts-of-food",
    infoUrl: "https://ourworldindata.org/environmental-impacts-of-food",
  },
  {
    id: 8,
    category: "퀴즈 정보 참고 데이터",
    content: "Project Drawdown",
    infoName: "https://drawdown.org/",
    infoUrl: "https://drawdown.org/",
  },
  {
    id: 9,
    category: "퀴즈 정보 참고 데이터",
    content: "The Shift Project",
    infoName: "https://theshiftproject.org/en/home/",
    infoUrl: "https://theshiftproject.org/en/home/",
  },
  {
    id: 10,
    category: "퀴즈 정보 참고 데이터",
    content: "IPCC",
    infoName: "https://www.ipcc.ch/",
    infoUrl: "https://www.ipcc.ch/",
  },
  {
    id: 11,
    category: "퀴즈 정보 참고 데이터",
    content: "환경부",
    infoName: "https://www.me.go.kr/",
    infoUrl: "https://www.me.go.kr/",
  },
];
