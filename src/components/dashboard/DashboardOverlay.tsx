import Link from "next/link";
import MetricCard from "./MetricCard";
import { DashboardOverlayProps } from "@/types/DashboardOverlay";

export default function DashboardOverlay({
  year,
  label,
  metrics,
  description,
}: DashboardOverlayProps) {
  const isEndGame = year >= 2090;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 pt-20 pb-40">
      {/* 헤더 섹션 */}
      <div className="text-center my-16 max-w-2xl">
        <h1 className="text-9xl font-black tracking-tighter mb-4 tabular-nums text-white drop-shadow-2xl">
          {year}
        </h1>
        <div className="inline-block px-4 py-1 border border-red-500/50 bg-red-500/10 rounded-full mb-6">
          <p className="text-sm font-bold text-red-500 uppercase tracking-[0.3em]">
            {label}
          </p>
        </div>
        <p className="text-lg text-zinc-400 leading-relaxed font-light">
          {description}
        </p>
      </div>

      {/* 메트릭 그리드 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl pointer-events-auto">
        <MetricCard
          label="이산화탄소 배출량"
          value={metrics.co2.toFixed(1)}
          unit="ppm"
          trend={metrics.co2 > 350}
        />
        <MetricCard
          label="지표면 온도 상승률"
          value={`${metrics.temp.toFixed(2)}`}
          unit="°C"
          trend={metrics.temp > 1.0}
        />
        <MetricCard
          label="해수면 상승률"
          value={`${metrics.seaLevel.toFixed(0)}`}
          unit="mm"
          trend={metrics.seaLevel > 50}
        />
      </div>
      {/* 페이지 전환 버튼 */}
      <div
        className={`mt-10 flex flex-col items-center justify-center w-full transition-all duration-1000 transform ${
          isEndGame
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-10 pointer-events-none"
        }`}
      >
        <Link
          href="/quiz"
          className="px-8 py-3 bg-red-600 text-white font-bold rounded-full hover:bg-red-500 transition-all shadow-lg hover:shadow-red-500/50 text-lg tracking-normal w-auto min-w-50 pointer-events-auto"
        >
          {/* 버튼 호버 시 빛나는 효과 애니메이션 */}
          <div className="absolute inset-0 w-full h-full bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
          <span className="relative tracking-widest">인류의 운명 결정하기</span>
        </Link>

        <p className="mt-6 text-zinc-400 text-sm tracking-widest animate-pulse text-center w-full">
          미래를 바꿀 마지막 기회입니다.
        </p>
      </div>
    </div>
  );
}
