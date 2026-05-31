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
    top: "1%",
    left: "55%",
    width: "25vw",
    height: "10vw",
    cardPos: "left",
  },
  tv: {
    top: "35%",
    left: "52%",
    width: "28vw",
    height: "18vw",
    cardPos: "left",
  },
  lighting: {
    top: "1%",
    left: "55%",
    width: "25vw",
    height: "10vw",
    cardPos: "left",
  },
  clothes: {
    top: "15%",
    left: "55%",
    width: "30vw",
    height: "30vw",
    cardPos: "left",
  },
  washingMachine: {
    top: "40%",
    left: "32%",
    width: "25vw",
    height: "30vw",
    cardPos: "right",
  },
  food: {
    top: "50%",
    left: "30%",
    width: "25vw",
    height: "20vw",
    cardPos: "right",
  },
  fridge: {
    top: "30%",
    left: "80%",
    width: "15vw",
    height: "40vw",
    cardPos: "left",
  },
  boiler: {
    top: "25%",
    left: "20%",
    width: "10vw",
    height: "12vw",
    cardPos: "right",
  },
  tumbler: {
    top: "25%",
    left: "56%",
    width: "10vw",
    height: "14vw",
    cardPos: "left",
  },
  transportation: {
    top: "30%",
    left: "1%",
    width: "40vw",
    height: "35vw",
    cardPos: "right",
  },
};
