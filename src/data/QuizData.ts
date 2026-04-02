import { QuizItem } from "@/types/quiz";

export const dummyQuizzes: QuizItem[] = [
  {
    id: 1,
    question:
      "일상 속 탄소 배출을 줄이기 위해 지금 당장 실천할 수 있는 가장 효과적인 방법은?",
    options: {
      A: { text: "사용하지 않는 전자기기 플러그 뽑기", isCorrect: false },
      B: { text: "육류 소비를 1회 줄이고 채식하기", isCorrect: true },
    },
    explanation:
      "소고기 1kg을 생산할 때 발생하는 탄소는 자동차로 약 100km를 달릴 때 배출되는 양과 맞먹습니다. 식단 변화는 가장 강력한 기후 행동입니다.",
    penalty: 25,
  },
  {
    id: 2,
    question:
      "디지털 기기 사용 중 데이터 센터의 전력 소비(디지털 탄소 발자국)를 가장 많이 줄이는 행동은?",
    options: {
      A: { text: "불필요한 이메일함 주기적으로 비우기", isCorrect: false },
      B: {
        text: "동영상 스트리밍 화질을 4K에서 1080p로 낮추기",
        isCorrect: true,
      },
    },
    explanation:
      "스트리밍은 전 세계 인터넷 트래픽의 60% 이상을 차지합니다. 화질을 한 단계만 낮춰도 데이터 센터의 막대한 에너지 소비를 줄일 수 있습니다.",
    penalty: 20,
  },
  {
    id: 3,
    question: "세탁기를 돌릴 때 에너지를 가장 크게 절약하는 방법은?",
    options: {
      A: { text: "세탁 온도를 40도에서 20도(냉수)로 낮추기", isCorrect: true },
      B: {
        text: "세탁 시간을 10분 줄이는 쾌속 모드 사용하기",
        isCorrect: false,
      },
    },
    explanation:
      "세탁기가 소비하는 에너지의 약 90%는 물을 데우는 데 사용됩니다. 냉수 세탁만으로도 엄청난 전력 소비를 막을 수 있습니다.",
    penalty: 15,
  },
  {
    id: 4,
    question:
      "패션 산업은 전 세계 탄소 배출량의 약 10%를 차지합니다. 가장 친환경적인 의류 소비는?",
    options: {
      A: {
        text: "친환경 소재(리사이클 플라스틱 등)로 만든 새 옷 구매하기",
        isCorrect: false,
      },
      B: { text: "지금 가지고 있는 옷을 최대한 오래 입기", isCorrect: true },
    },
    explanation:
      "새로운 제품을 생산하는 과정 자체가 막대한 자원과 에너지를 소모합니다. '사지 않고 오래 쓰는 것'이 최고의 친환경입니다.",
    penalty: 25,
  },
  {
    id: 5,
    question:
      "가까운 거리를 이동할 때, 1인당 탄소 배출량이 더 적은 이동 수단은?",
    options: {
      A: { text: "내연기관 버스 (여러 명 탑승)", isCorrect: true },
      B: { text: "전기 자동차 (혼자 탑승)", isCorrect: false },
    },
    explanation:
      "전기차가 주행 중 배출가스는 없지만, 생산 과정의 탄소와 전력 생산 방식을 고려하면 여러 명이 타는 대중교통의 1인당 효율이 훨씬 좋습니다.",
    penalty: 20,
  },
  {
    id: 6,
    question: "겨울철 난방 에너지를 절약하기 위한 가장 효율적인 조치는?",
    options: {
      A: { text: "보일러 온도를 1도 낮추고 내복 입기", isCorrect: true },
      B: { text: "창문에 에어캡(뽁뽁이)만 겹겹이 붙이기", isCorrect: false },
    },
    explanation:
      "실내 난방 온도를 1도만 낮춰도 난방 에너지의 약 7%를 절약할 수 있으며, 내복은 체감 온도를 3도 이상 높여줍니다.",
    penalty: 15,
  },
  {
    id: 7,
    question:
      "온실가스 배출을 줄이기 위해 폐기물 처리 과정에서 더 중요한 것은?",
    options: {
      A: { text: "플라스틱과 종이를 완벽하게 분리수거하기", isCorrect: false },
      B: { text: "먹을 만큼만 조리하여 음식물 쓰레기 없애기", isCorrect: true },
    },
    explanation:
      "음식물 쓰레기가 매립/소각되며 발생하는 메탄가스는 이산화탄소보다 온실효과가 20배 이상 강력합니다. 원천 감량이 훨씬 중요합니다.",
    penalty: 25,
  },
  {
    id: 8,
    question: "텀블러(다회용 컵) 사용이 종이컵보다 확실한 환경 보호가 되려면?",
    options: {
      A: {
        text: "스테인리스 텀블러를 최소 50회 이상 꾸준히 사용한다",
        isCorrect: true,
      },
      B: {
        text: "계절마다 예쁜 디자인의 새 텀블러로 교체하여 사용한다",
        isCorrect: false,
      },
    },
    explanation:
      "텀블러 생산에는 종이컵보다 훨씬 많은 자원이 들어갑니다. 하나의 텀블러를 수십, 수백 번 재사용해야 비로소 환경적 이익이 발생합니다.",
    penalty: 20,
  },
  {
    id: 9,
    question: "가정에서 전력 소비가 가장 큰 가전제품 사용 습관은?",
    options: {
      A: { text: "에어컨을 켰다 껐다 반복하며 온도 맞추기", isCorrect: true },
      B: {
        text: "냉장고 문을 하루에 10번 이상 자주 열고 닫기",
        isCorrect: false,
      },
    },
    explanation:
      "인버터 에어컨의 경우, 목표 온도에 도달할 때 가장 많은 전력을 씁니다. 적정 온도로 계속 켜두는 것이 껐다 켜는 것보다 전력 소모가 적습니다.",
    penalty: 15,
  },
  {
    id: 10,
    question:
      "다음 중 재생 에너지(Renewable Energy) 전환을 앞당기기 위한 개인의 가장 강력한 행동은?",
    options: {
      A: {
        text: "집 안의 모든 전구를 최고급 LED로 교체하기",
        isCorrect: false,
      },
      B: {
        text: "화석연료 기업에 투자하지 않는 친환경 은행/펀드 이용하기",
        isCorrect: true,
      },
    },
    explanation:
      "자본의 흐름을 바꾸는 것은 시스템 전체를 변화시킵니다. 금융 자산이 화석연료 개발에 쓰이지 않도록 막는 것이 막대한 탄소 감축 효과를 낳습니다.",
    penalty: 25,
  },
];
