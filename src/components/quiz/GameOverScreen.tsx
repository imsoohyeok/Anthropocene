"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import useSound from "use-sound";
import { GameOverScreenProps } from "@/types/GameOverScreen";

export default function GameOverScreen({
  resetGame,
  onExit,
}: GameOverScreenProps) {
  const [playGameOver] = useSound(
    "/sounds/universfield-game-over-deep-male-voice-clip-352695.mp3",
    { volume: 0.3 },
  );

  // 버튼은 opacity:0으로 시작해 delay 1.2s 뒤에야 나타나는데, 그 전에도 클릭은 가능한
  // 상태라 이전 화면에서 이어진 광클이 안 보이는 버튼을 눌러버릴 수 있다.
  // 버튼이 실제로 보이기 시작하는 시점까지는 클릭을 막아둔다.
  const [canInteract, setCanInteract] = useState(false);

  useEffect(() => {
    playGameOver();
  }, [playGameOver]);

  useEffect(() => {
    const timer = setTimeout(() => setCanInteract(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      className="relative w-full h-screen bg-black flex flex-col items-center justify-center overflow-hidden z-50"
    >
      {/* 절망적인 붉은 엠비언스 배경 */}
      <motion.div
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 3, ease: "easeOut" }}
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, rgba(153, 27, 27, 0.4) 0%, rgba(0, 0, 0, 1) 70%)",
        }}
      />

      {/* 메인 콘텐츠 */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        <motion.div
          initial={{ y: -50, opacity: 0, filter: "blur(10px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
        >
          <h1 className="text-7xl md:text-9xl font-black text-red-600 tracking-tighter uppercase mb-4 drop-shadow-[0_0_30px_rgba(220,38,38,0.8)]">
            GAME OVER
          </h1>
          <p className="text-xl md:text-2xl text-red-400/80 tracking-widest mb-12 font-medium">
            당신은 환경 오염의 주범이 되었습니다.
          </p>
        </motion.div>

        {/* 버튼 그룹 (순차적 등장) */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 1.2, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-6 w-full max-w-md"
        >
          <button
            onClick={resetGame}
            disabled={!canInteract}
            className="flex-1 py-4 px-8 bg-red-600/10 border border-red-600/50 text-red-500 font-bold tracking-widest uppercase hover:bg-red-600 hover:text-white transition-all duration-300 shadow-[0_0_20px_rgba(220,38,38,0.2)] hover:shadow-[0_0_30px_rgba(220,38,38,0.6)] disabled:pointer-events-none"
          >
            다시 도전하기
          </button>
          <button
            onClick={onExit}
            disabled={!canInteract}
            className="flex-1 py-4 px-8 bg-transparent border border-zinc-700 text-zinc-500 font-bold tracking-widest uppercase hover:border-zinc-400 hover:text-zinc-300 transition-colors duration-300 disabled:pointer-events-none"
          >
            모드 선택으로
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
