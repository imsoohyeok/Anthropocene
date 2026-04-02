import { GameClearScreenProps } from "@/types/GameClearScreen";

export default function GameClearScreen({
  score,
  waterLevel,
  onExit,
}: GameClearScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-zinc-900 text-white z-50 relative">
      <h1 className="text-7xl md:text-8xl font-black mb-4 text-blue-500 tracking-tighter">
        SURVIVED
      </h1>
      <p className="text-xl text-zinc-300">
        정답률: <span className="font-bold text-blue-400">{score}%</span>
      </p>
      <p className="text-lg text-zinc-400 mt-2">
        최종 해수면 상승: {waterLevel}%
      </p>
      <button
        onClick={onExit}
        className="mt-10 px-10 py-4 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-500 transition-all shadow-lg hover:shadow-blue-500/50"
      >
        다른 모드 즐기기
      </button>
    </div>
  );
}
