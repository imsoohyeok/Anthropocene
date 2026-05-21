export type IntroStage =
  | "idle"
  | "zooming"
  | "finished"
  | "warp_in"
  | "return_warp";

export interface IntroState {
  stage: IntroStage;
  setStage: (stage: IntroStage) => void;
}
