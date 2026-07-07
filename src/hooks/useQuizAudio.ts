"use client";

import { useEffect } from "react";
import useSound from "use-sound";
import { GameMode } from "@/types/GameStore";

export function useQuizAudio(
  overloadRate: number,
  mode: GameMode,
  isEnded: boolean
) {
  const [playCorrect] = useSound("/sounds/forceField_002.ogg", {
    volume: 0.2,
  });
  const [playWrong] = useSound("/sounds/laserLarge_001.ogg", {
    volume: 0.2,
  });
  const [playClick] = useSound("/sounds/drop_003.ogg", {
    volume: 0.1,
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
    // 🚨 1순위: 게임이 종료되었다면 모든 배경음악과 긴장감 사운드를 즉시 정지하고 탈출(return)
    if (isEnded) {
      stopNormal();
      stopDanger();
      return;
    }

    // 2순위: 게임 진행 중일 때의 모드별 음악 스위칭
    if (isDanger) {
      stopNormal(); // 일반 노래 끄고
      playDanger(); // 위험 노래 켜고
    } else {
      stopDanger();
      playNormal(); // 일반 노래 켜기
    }

    // 컴포넌트가 완전히 언마운트될 때의 최종 안전장치
    return () => {
      stopNormal();
      stopDanger();
    };
  }, [isEnded, isDanger, playNormal, playDanger, stopNormal, stopDanger]);

  return { playCorrect, playWrong, playClick };
}
