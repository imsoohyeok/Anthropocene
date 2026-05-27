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
  ac: { top: "10%", left: "70%", width: "25vw", height: "15vw" },
  tv: { top: "40%", left: "20%", width: "20vw", height: "20vw" },
  lighting: { top: "5%", left: "45%", width: "15vw", height: "15vw" },
  clothes: { top: "50%", left: "85%", width: "15vw", height: "25vw" },
  washingMachine: { top: "70%", left: "75%", width: "20vw", height: "25vw" },
  food: { top: "65%", left: "45%", width: "12vw", height: "10vw" },
  fridge: { top: "30%", left: "80%", width: "15vw", height: "40vw" },
  boiler: { top: "20%", left: "5%", width: "12vw", height: "25vw" },
  tumbler: { top: "60%", left: "35%", width: "8vw", height: "12vw" },
  transportation: { top: "75%", left: "15%", width: "30vw", height: "20vw" },
};
