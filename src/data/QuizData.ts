import { QuizItem } from "@/types/quiz";

// 임시 더미 데이터
export const dummyQuizzes: QuizItem[] = [
  {
    id: 1,
    question:
      "일상 속 탄소 배출을 줄이기 위해 지금 당장 실천할 수 있는 더 효과적인 방법은?",
    options: {
      A: { text: "사용하지 않는 전자기기 플러그 뽑기", isCorrect: false },
      B: {
        text: "육류 소비를 줄이고 채식 위주의 식단 늘리기",
        isCorrect: true,
      },
    },
    explanation:
      "채식 위주의 식단은 전자기기 대기전력 차단보다 개인 탄소 발자국을 줄이는 데 압도적으로 큰 영향을 미칩니다.",
    penalty: 30, // 틀리면 해수면 30% 상승 (치명적)
  },
  {
    id: 2,
    question:
      "가까운 거리를 이동할 때, 환경에 가장 나쁜 영향을 미치는 이동 수단은?",
    options: {
      A: { text: "혼자 타는 내연기관 자동차", isCorrect: true },
      B: { text: "배터리를 사용하는 전동 킥보드", isCorrect: false },
    },
    explanation:
      "내연기관 자동차는 1인당 탄소 배출량이 가장 높은 이동 수단입니다.",
    penalty: 20, // 틀리면 해수면 20% 상승
  },
];
