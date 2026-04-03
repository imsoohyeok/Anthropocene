"use client";

import { useState } from "react";
import ScenarioQuizWrapper from "@/components/quiz/ScenarioQuizWrapper";
import RandomQuizWrapper from "@/components/quiz/RandomQuizWrapper";
import Link from "next/link";

// 메인 모드 선택 페이지
export default function QuizPage() {
  // 모드 상태: null이면 선택 화면, 값이 있으면 해당 게임 화면 렌더링
  const [selectedMode, setSelectedMode] = useState<
    "scenario" | "random" | null
  >(null);

  const handleExitToMenu = () => setSelectedMode(null);

  if (selectedMode === "scenario")
    return <ScenarioQuizWrapper onExit={handleExitToMenu} />;

  if (selectedMode === "random")
    return <RandomQuizWrapper onExit={handleExitToMenu} />;

  // 모드 선택 화면 UI
  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen px-6 bg-black text-white overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-b from-black via-zinc-900 to-black opacity-50 pointer-events-none" />

      <div className="absolute top-6 w-full max-w-6xl flex justify-between items-center px-4 z-20">
        <Link
          href="/"
          className="text-zinc-500 hover:text-white transition-colors flex items-center gap-2 font-bold tracking-widest text-sm uppercase"
        >
          메인 페이지
        </Link>
      </div>

      <div className="relative z-10 flex flex-col items-center max-w-5xl w-full">
        <h1 className="text-4xl md:text-4xl font-black mb-4 tracking-tighter text-center">
          인류의 운명을 결정할 방식을 선택하십시오
        </h1>
        <p className="text-zinc-400 mb-16 text-center text-lg break-keep">
          비슷한 종류의 선택지와 무작위 선택지 중 선택하십시오
        </p>

        {/* 선택 카드 컨테이너 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-4xl">
          {/* 시나리오 모드 */}
          <button
            onClick={() => setSelectedMode("scenario")}
            className="group relative flex flex-col items-start p-10 md:p-12 bg-zinc-900 border border-zinc-800 rounded-3xl hover:bg-zinc-800 hover:border-blue-500/50 transition-all duration-500 text-left overflow-hidden"
          >
            <div className="absolute inset-0 bg-blue-500/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            <span className="relative text-blue-500 font-bold tracking-widest text-sm mb-4 uppercase">
              Mode 1
            </span>
            <h2 className="relative text-3xl font-bold mb-4 group-hover:text-blue-400 transition-colors">
              비슷한 선택지
            </h2>
            <p className="relative text-zinc-400 leading-relaxed break-keep group-hover:text-zinc-300 transition-colors">
              일상 속에서 마주하는 다양한 환경 문제 상황. 주어진 2가지 선택지
              중, 지구를 위해 당장 실천해야 할 최선의 행동을 찾아냅니다.
            </p>
          </button>

          {/* 무작위 대결 (직관 테스트) */}
          <button
            onClick={() => setSelectedMode("random")}
            className="group relative flex flex-col items-start p-10 md:p-12 bg-zinc-900 border border-zinc-800 rounded-3xl hover:bg-zinc-800 hover:border-red-500/50 transition-all duration-500 text-left overflow-hidden"
          >
            <div className="absolute inset-0 bg-red-500/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            <span className="relative text-red-500 font-bold tracking-widest text-sm mb-4 uppercase">
              Mode 2
            </span>
            <h2 className="relative text-3xl font-bold mb-4 group-hover:text-red-400 transition-colors">
              무작위 선택지
            </h2>
            <p className="relative text-zinc-400 leading-relaxed break-keep group-hover:text-zinc-300 transition-colors">
              무작위로 맞붙는 두 가지 친환경 행동. 데이터상으로 온실가스를 더
              많이 감축하는 행동을 골라내십시오.
            </p>
          </button>
        </div>
      </div>
    </main>
  );
}
