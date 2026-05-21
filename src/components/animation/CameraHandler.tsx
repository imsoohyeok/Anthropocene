"use client";

import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { useIntroStore } from "@/store/useIntroStore";
import gsap from "gsap";

export default function CameraHandler() {
  const { camera } = useThree();
  const stage = useIntroStore((state) => state.stage);

  useEffect(() => {
    // 1. 초기 진입 애니메이션 (줌아웃)
    if (stage === "zooming") {
      gsap.set(camera.position, { z: 2 });
      gsap.to(camera.position, {
        z: 7,
        duration: 3,
        ease: "expo.inOut",
      });
    }

    // 2. 퀴즈 페이지 진입 애니메이션 (줌인/워프)
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
  }, [stage, camera]);

  return null;
}
