"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useGameStore } from "@/store/useGameStore";
import { useIntroStore } from "@/store/useIntroStore";
import ScenarioQuizWrapper from "@/components/quiz/ScenarioQuizWrapper";
import RandomQuizWrapper from "@/components/quiz/RandomQuizWrapper";
import ModeSelectMenu from "@/components/main/ModeSelectMenu";

export default function QuizPage() {
  const mode = useGameStore((state) => state.mode);
  const changeMode = useGameStore((state) => state.changeMode);
  const router = useRouter();

  const [isReady, setIsReady] = useState(false);
  const [isWarping, setIsWarping] = useState(false);

  const [isReturning, setIsReturning] = useState(false);
  const setStage = useIntroStore((state) => state.setStage);

  useEffect(() => {
    if (!mode) {
      router.replace("/");
      return;
    }

    const timer = setTimeout(() => {
      setIsReady(true);
    }, 400);

    return () => clearTimeout(timer);
  }, [mode, router]);

  // 퀴즈 내부에서 모드를 변경할 때의 핸들러
  const handleInGameModeSelect = (selectedMode: "scenario" | "random") => {
    setIsWarping(true);

    setTimeout(() => {
      changeMode(selectedMode);
      setIsWarping(false);
    }, 500);
  };

  // 타임라인으로 돌아가는 핸들러
  const handleReturnToTimeline = () => {
    setIsReturning(true);
    setStage("return_warp");

    setTimeout(() => {
      useGameStore.setState({ mode: undefined });
    }, 100);

    setTimeout(() => {
      router.push("/");
    }, 1200);
  };

  return (
    <main className="relative w-full h-screen bg-black overflow-hidden">
      <AnimatePresence>
        {isReturning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 z-9999 bg-white pointer-events-none"
          />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {!isReady ? (
          <motion.div
            key="loading"
            className="absolute inset-0 z-1000 bg-white flex items-center justify-center"
          ></motion.div>
        ) : (
          <motion.div key="quiz-content" className="w-full h-full">
            {mode === "scenario" && <ScenarioQuizWrapper />}
            {mode === "random" && <RandomQuizWrapper />}

            <AnimatePresence>
              {mode === "main" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-1000 bg-black/80 backdrop-blur-md flex items-center justify-center"
                >
                  <ModeSelectMenu
                    isWarping={isWarping}
                    onClose={handleReturnToTimeline}
                    onSelectMode={handleInGameModeSelect}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
