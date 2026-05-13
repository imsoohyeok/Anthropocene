export interface IntroState {
  stage: "idle" | "zooming" | "finished";
  setStage: (stage: "idle" | "zooming" | "finished") => void;
}
