import { create } from "zustand";

interface IntroState {
  stage: "idle" | "zooming" | "finished";
  setStage: (stage: "idle" | "zooming" | "finished") => void;
}

export const useIntroStore = create<IntroState>((set) => ({
  stage: "idle",
  setStage: (stage) => set({ stage }),
}));
