"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useGameStore } from "@/store/useGameStore";
import ScenarioQuizWrapper from "@/components/quiz/ScenarioQuizWrapper";
import RandomQuizWrapper from "@/components/quiz/RandomQuizWrapper";

export default function QuizPage() {
  const mode = useGameStore((state) => state.mode);
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const checkMode = setTimeout(() => {
      if (!mode || mode === "main") {
        router.replace("/");
      } else {
        setIsReady(true);
      }
    }, 500);

    return () => clearTimeout(checkMode);
  }, [mode, router]);

  return (
    <main className="relative w-full h-screen bg-black overflow-hidden">
      <AnimatePresence>
        {!isReady ? (
          <motion.div
            key="loading"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 z-1000 bg-white flex items-center justify-center"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-zinc-200 border-t-zinc-800 rounded-full animate-spin" />
              <p className="text-zinc-800 font-black tracking-widest text-xs uppercase animate-pulse">
                로딩 중...
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="quiz-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full h-full"
          >
            {mode === "scenario" ? (
              <ScenarioQuizWrapper />
            ) : (
              <RandomQuizWrapper />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
