"use client";

import { motion } from "framer-motion";
import { ModeSelectMenuProps } from "@/types/ModeSelectMenu";

export default function ModeSelectMenu({
  isWarping,
  onClose,
  onSelectMode,
}: ModeSelectMenuProps) {
  return (
    <motion.div
      key="mode_select"
      initial={{ opacity: 0, scale: 1.05 }}
      animate={{
        opacity: 1,
        scale: 1,
        filter: isWarping ? "blur(10px)" : "blur(0px)",
        transform: isWarping ? "scale(1.1)" : "scale(1)",
      }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm pointer-events-auto px-6"
    >
      <button
        onClick={onClose}
        disabled={isWarping}
        className="absolute top-8 left-8 text-zinc-400 hover:text-white transition-colors font-bold tracking-[0.2em] text-xs uppercase"
      >
        타임라인
      </button>

      <div className="flex flex-col items-center w-full max-w-5xl">
        <h1 className="text-2xl md:text-4xl font-black mb-4 tracking-widest text-center text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
          모드 선택
        </h1>
        <p className="text-zinc-300 mb-12 text-center text-sm md:text-base tracking-wider">
          두 가지 선택지 중 골라서 플레이
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
          {/* Mode 1 */}
          <button
            onClick={() => onSelectMode("scenario")}
            disabled={isWarping}
            className="group relative flex flex-col items-start p-10 bg-white/5 backdrop-blur-xl border border-cyan-500/30 rounded-3xl hover:bg-cyan-950/30 hover:border-cyan-400 transition-all duration-500 text-left overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_30px_rgba(6,182,212,0.1)] hover:shadow-[0_0_50px_rgba(6,182,212,0.3)]"
          >
            <span className="relative text-cyan-400 font-black tracking-[0.3em] text-xs mb-4 uppercase drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]">
              Mode 1
            </span>
            <h2 className="relative text-3xl font-black mb-4 text-white group-hover:text-cyan-300 transition-colors">
              비슷한 선택지
            </h2>
            <p className="relative text-zinc-400 leading-relaxed break-keep group-hover:text-zinc-200 transition-colors">
              비슷한 종류의 에너지 절약 방식이 선택지로 주어집니다.
            </p>
          </button>

          {/* Mode 2 */}
          <button
            onClick={() => onSelectMode("random")}
            disabled={isWarping}
            className="group relative flex flex-col items-start p-10 bg-white/5 backdrop-blur-xl border border-red-500/30 rounded-3xl hover:bg-red-950/30 hover:border-red-400 transition-all duration-500 text-left overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_30px_rgba(239,68,68,0.1)] hover:shadow-[0_0_50px_rgba(239,68,68,0.3)]"
          >
            <span className="relative text-red-500 font-black tracking-[0.3em] text-xs mb-4 uppercase drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]">
              Mode 2
            </span>
            <h2 className="relative text-3xl font-black mb-4 text-white group-hover:text-red-300 transition-colors">
              무작위 선택지
            </h2>
            <p className="relative text-zinc-400 leading-relaxed break-keep group-hover:text-zinc-200 transition-colors">
              에너지 절약 방식이 종류에 상관없이 무작위로 주어집니다.
            </p>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
