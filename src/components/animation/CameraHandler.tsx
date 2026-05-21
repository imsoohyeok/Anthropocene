"use client";

import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { useIntroStore } from "@/store/useIntroStore";
import gsap from "gsap";

export default function CameraHandler() {
  const { camera } = useThree();
  const stage = useIntroStore((state) => state.stage);
  const setStage = useIntroStore((state) => state.setStage);

  useEffect(() => {
    // 처음 사이트 들어왔을 때 (줌아웃)
    if (stage === "zooming") {
      gsap.set(camera.position, { z: 2 });
      gsap.to(camera.position, {
        z: 7,
        duration: 3,
        ease: "expo.inOut",
      });
    }

    // 퀴즈로 빨려 들어갈 때 (줌인/워프)
    else if (stage === "warp_in") {
      gsap.to(camera.position, {
        z: 2.1,
        duration: 1.5,
        ease: "power2.in",
        onUpdate: () => {
          camera.lookAt(0, 0, 0);
        },
      });
    }

    // 퀴즈에서 메인으로 다시 돌아왔을 때 (원상태 복구)
    else if (stage === "return_warp") {
      gsap.set(camera.position, { z: 2.1 });

      gsap.to(camera.position, {
        z: 7,
        duration: 1.5,
        ease: "power2.out",
        onComplete: () => {
          setStage("finished");
        },
      });
    }
  }, [stage, camera, setStage]);

  return null;
}
