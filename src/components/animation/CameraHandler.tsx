"use client";

import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { useIntroStore } from "@/store/useIntroStore";
import gsap from "gsap";

export default function CameraHandler() {
  const { camera } = useThree();
  const stage = useIntroStore((state) => state.stage);

  useEffect(() => {
    if (stage === "zooming") {
      gsap.set(camera.position, { z: 2 });

      // 이어서 애니메이션 진행
      gsap.to(camera.position, {
        z: 7,
        duration: 3,
        ease: "expo.inOut",
      });
    }
  }, [stage, camera]);

  return null;
}
