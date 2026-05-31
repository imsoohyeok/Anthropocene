export interface ModeSelectMenuProps {
  isWarping: boolean;
  onClose: () => void;
  onSelectMode: (mode: "scenario" | "random") => void;
}
