export type IntroStage = "idle" | "zooming" | "finished" | "warp_in";

export interface IntroState {
  stage: IntroStage;
  setStage: (stage: IntroStage) => void;
}
