import { GameOverScreenProps } from "@/types/GameOverScreen";

export default function GameOverScreen({
  resetGame,
  onExit,
}: GameOverScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-red-950 text-white z-50 relative">
      <h1 className="text-7xl md:text-8xl font-black mb-4 text-red-500 tracking-tighter">
        GAME OVER
      </h1>
      <p className="text-xl text-zinc-300">
        해수면이 100% 차올라 인류가 위기에 처했습니다.
      </p>
      <div className="flex gap-4 mt-8">
        <button
          onClick={resetGame}
          className="px-6 py-3 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-colors font-bold"
        >
          다시 도전하기
        </button>
        <button
          onClick={onExit}
          className="px-6 py-3 bg-zinc-800 text-white hover:bg-zinc-700 transition-colors font-bold"
        >
          모드 선택으로
        </button>
      </div>
    </div>
  );
}
