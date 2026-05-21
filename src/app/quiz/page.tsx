"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useGameStore } from "@/store/useGameStore";
import ScenarioQuizWrapper from "@/components/quiz/ScenarioQuizWrapper";
import RandomQuizWrapper from "@/components/quiz/RandomQuizWrapper";

export default function QuizPage() {
  const mode = useGameStore((state) => state.mode);
  const router = useRouter();

  useEffect(() => {
    if (!mode) {
      router.replace("/");
    }
  }, [mode, router]);

  if (!mode) return null;

  return (
    <main className="relative w-full h-screen bg-black overflow-hidden">
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
        className="absolute inset-0 z-999 bg-white pointer-events-none"
      />

      {mode === "scenario" ? <ScenarioQuizWrapper /> : <RandomQuizWrapper />}
    </main>
  );
}
