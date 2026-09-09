"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // 에러 모니터링 서비스 연동 전까지는 콘솔에 기록
    console.error(error);
  }, [error]);

  return (
    <main className="relative w-full h-screen bg-black flex flex-col items-center justify-center overflow-hidden px-6">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, rgba(153, 27, 27, 0.25) 0%, rgba(0, 0, 0, 1) 70%)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center">
        <h1 className="text-6xl md:text-7xl font-black text-red-600 tracking-tighter drop-shadow-[0_0_30px_rgba(220,38,38,0.6)]">
          시스템 오류
        </h1>
        <p className="mt-4 text-zinc-500 text-sm md:text-base tracking-wide">
          예기치 못한 문제가 발생했습니다. 다시 시도해주세요.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <button
            onClick={reset}
            className="px-8 py-3 bg-red-500 text-white font-bold rounded-full hover:bg-red-400 transition-all shadow-lg hover:shadow-red-500/50 text-base tracking-widest cursor-pointer"
          >
            다시 시도
          </button>
          <Link
            href="/"
            className="px-8 py-3 bg-transparent border border-zinc-700 text-zinc-400 font-bold rounded-full hover:border-zinc-400 hover:text-zinc-200 transition-colors text-base tracking-widest text-center"
          >
            홈으로
          </Link>
        </div>
      </div>
    </main>
  );
}
