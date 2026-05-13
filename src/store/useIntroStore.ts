import { create } from "zustand";
import { IntroState } from "@/types/IntroState";

export const useIntroStore = create<IntroState>((set) => ({
  stage: "idle",
  setStage: (stage) => set({ stage }),
}));
