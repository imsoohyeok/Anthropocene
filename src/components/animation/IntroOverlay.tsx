"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useIntroStore } from "@/store/useIntroStore";

export default function IntroOverlay() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const { stage, setStage } = useIntroStore();

  useEffect(() => {
    if (stage === "idle") {
      const autoTimer = setTimeout(() => {
        setStage("zooming");
      }, 2000);

      return () => clearTimeout(autoTimer); // 클린업
    }

    if (stage === "zooming") {
      gsap.to(overlayRef.current, {
        scale: 0.5,
        opacity: 0,
        filter: "blur(40px)",
        duration: 3,
        ease: "expo.inOut",
        onComplete: () => {
          setStage("finished");
        },
      });
    }
  }, [stage, setStage]);

  if (stage === "finished") return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-100 bg-black pointer-events-none"
    >
      <Image
        src="/IntroImage.webp"
        alt="Daily life for environment"
        fill
        priority
        className="object-cover"
        quality={75}
      />
    </div>
  );
}
