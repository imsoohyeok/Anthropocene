import { SpotlightTarget, CoordValue } from "@/types/quiz";

// 배경 테마
export const THEME_CONFIG = {
  kitchen: {
    bg: "/quiz/quiz_bg_kitchen.webp",
    color: "#00f2ff",
    glow: "rgba(0, 242, 255, 0.1)",
  },
  living: {
    bg: "/quiz/quiz_bg_living.webp",
    color: "#ffaa00",
    glow: "rgba(255, 170, 0, 0.1)",
  },
  utility: {
    bg: "/quiz/quiz_bg_utility.webp",
    color: "#aaff00",
    glow: "rgba(170, 255, 0, 0.1)",
  },
  entrance: {
    bg: "/quiz/quiz_bg_entrance.webp",
    color: "#ffffff",
    glow: "rgba(255, 255, 255, 0.1)",
  },
  restroom: {
    bg: "/quiz/quiz_bg_restroom.webp",
    color: "#ff00aa",
    glow: "rgba(255, 0, 170, 0.1)",
  },
  city: {
    bg: "/quiz/quiz_bg_city.webp",
    color: "#ffffff",
    glow: "rgba(255, 255, 255, 0.1)",
  },
};

// 퀴즈에 따른 배경 강조
export const SPOTLIGHT_COORDS: Record<SpotlightTarget, CoordValue> = {
  ac: {
    top: "8%",
    left: "55%",
    width: "25%",
    height: "18%",
    cardPos: "left",
  },
  tv: {
    top: "35%",
    left: "52%",
    width: "30%",
    height: "35%",
    cardPos: "left",
  },
  lighting: {
    top: "8%",
    left: "55%",
    width: "25%",
    height: "18%",
    cardPos: "left",
  },
  clothes: {
    top: "20%",
    left: "55%",
    width: "30%",
    height: "45%",
    cardPos: "left",
  },
  washingMachine: {
    top: "43%",
    left: "32%",
    width: "25%",
    height: "50%",
    cardPos: "right",
  },
  food: {
    top: "50%",
    left: "27%",
    width: "30%",
    height: "35%",
    cardPos: "right",
  },
  fridge: {
    top: "30%",
    left: "80%",
    width: "15%",
    height: "40%",
    cardPos: "left",
  },
  boiler: {
    top: "30%",
    left: "20%",
    width: "10%",
    height: "20%",
    cardPos: "right",
  },
  tumbler: {
    top: "28%",
    left: "57%",
    width: "9%",
    height: "24%",
    cardPos: "left",
  },
  transportation: {
    top: "35%",
    left: "1%",
    width: "40%",
    height: "60%",
    cardPos: "right",
  },
};
