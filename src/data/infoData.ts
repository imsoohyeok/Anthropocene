export interface infoItem {
  id: number;
  category: "기후 데이터" | "퀴즈 정보 참고 데이터" | "음악 출처";
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
    infoName: "https://www.energy.or.kr",
    infoUrl: "https://www.energy.or.kr/",
  },
  {
    id: 5,
    category: "퀴즈 정보 참고 데이터",
    content: "한국전력공사",
    infoName: "https://home.kepco.co.kr",
    infoUrl: "https://home.kepco.co.kr/",
  },
  {
    id: 6,
    category: "퀴즈 정보 참고 데이터",
    content: "환경부 탄소중립 실천 포털",
    infoName: "https://www.gihoo.or.kr/zerolife",
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
    infoName: "https://drawdown.org",
    infoUrl: "https://drawdown.org/",
  },
  {
    id: 9,
    category: "퀴즈 정보 참고 데이터",
    content: "The Shift Project",
    infoName: "https://theshiftproject.org/en/home",
    infoUrl: "https://theshiftproject.org/en/home/",
  },
  {
    id: 10,
    category: "퀴즈 정보 참고 데이터",
    content: "IPCC",
    infoName: "https://www.ipcc.ch",
    infoUrl: "https://www.ipcc.ch/",
  },
  {
    id: 11,
    category: "퀴즈 정보 참고 데이터",
    content: "환경부",
    infoName: "https://www.me.go.kr",
    infoUrl: "https://www.me.go.kr/",
  },
  {
    id: 12,
    category: "음악 출처",
    content: "UI 마이크로 인터랙션 및 효과음",
    infoName: "https://kenney.nl",
    infoUrl: "https://kenney.nl/assets/category:Audio",
  },
  {
    id: 13,
    category: "음악 출처",
    content: "미니게임 비슷한 선택지 배경음악",
    infoName:
      "Pixabay Sound Effects (Royalty-Free) - jonasblakewood의 energetic",
    infoUrl:
      "https://pixabay.com/ko/users/jonasblakewood-48502311/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=513175",
  },
  {
    id: 14,
    category: "음악 출처",
    content: "미니게임 무작위 선택지 배경음악",
    infoName: "Pixabay Sound Effects (Royalty-Free) - Kulakovka의 Futuristic",
    infoUrl:
      "https://pixabay.com/ko/users/kulakovka-47183261/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=283951",
  },
  {
    id: 15,
    category: "음악 출처",
    content: "미니게임 긴장감 배경음악",
    infoName:
      "Pixabay Sound Effects (Royalty-Free) - Kulakovka의 Hard Cyberpunk",
    infoUrl:
      "https://pixabay.com/ko/users/kulakovka-47183261/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=281149",
  },
  {
    id: 16,
    category: "음악 출처",
    content: "미니게임 게임 클리어 효과음",
    infoName:
      "Pixabay Sound Effects (Royalty-Free) - freesound_community의 Success Fanfare Turmpets",
    infoUrl:
      "https://pixabay.com/ko/users/freesound_community-46691455/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=6185",
  },
  {
    id: 17,
    category: "음악 출처",
    content: "미니게임 게임 오버 효과음",
    infoName:
      "Pixabay Sound Effects (Royalty-Free) - Universfield의 Game Over Deep Male Voice Clip",
    infoUrl:
      "https://pixabay.com/ko/users/universfield-28281460/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=352695",
  },
];
