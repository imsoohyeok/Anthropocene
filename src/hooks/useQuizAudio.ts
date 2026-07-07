"use client";

import { useEffect } from "react";
import useSound from "use-sound";
import { GameMode } from "@/types/GameStore";

export function useQuizAudio(overloadRate: number, mode: GameMode) {
  const [playCorrect] = useSound("/sounds/forceField_002.ogg", {
    volume: 0.3,
  });
  const [playWrong] = useSound("/sounds/laserLarge_001.ogg", {
    volume: 0.3,
  });
  const [playClick] = useSound("/sounds/drop_003.ogg", {
    volume: 0.2,
  });

  const normalBgmPath =
    mode === "scenario"
      ? "/sounds/kulakovka-futuristic-283951.mp3" // 비슷한 선택지 모드
      : "/sounds/jonasblakewood-energetic-513175.mp3"; // 무작위 선택지 모드

  const [playNormal, { stop: stopNormal }] = useSound(normalBgmPath, {
    volume: 0.07,
    loop: true,
  });

  const [playDanger, { stop: stopDanger }] = useSound(
    "/sounds/kulakovka-hard-cyberpunk-281149.mp3",
    {
      volume: 0.07,
      loop: true,
    }
  );

  // 배경음악 자동 재생 및 언마운트 시 정리(Cleanup)
  const isDanger = overloadRate >= 70;

  useEffect(() => {
    if (isDanger) {
      // 70% 이상일 때: 일반 BGM을 끄고 위험 BGM을 켭니다.
      stopNormal();
      playDanger();
    } else {
      // 70% 미만일 때: 위험 BGM을 끄고 일반 BGM을 켭니다.
      stopDanger();
      playNormal();
    }

    // 컴포넌트 언마운트(게임오버, 클리어, 메뉴 이동) 시 모든 사운드 강제 정지
    return () => {
      stopNormal();
      stopDanger();
    };
  }, [isDanger, playNormal, stopNormal, playDanger, stopDanger]);

  return { playCorrect, playWrong, playClick };
}
