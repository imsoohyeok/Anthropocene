import MetricCard from "./MetricCard";
import { DashboardOverlayProps } from "@/types/DashboardOverlay";

export default function DashboardOverlay({
  year,
  label,
  metrics,
  description,
}: DashboardOverlayProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 pt-20 pb-40">
      {/* 헤더 섹션 */}
      <div className="text-center mb-16 max-w-2xl">
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
          label="CO2 Concentration"
          value={metrics.co2.toFixed(1)}
          unit="ppm"
          trend={metrics.co2 > 350}
        />
        <MetricCard
          label="Global Temp Anomaly"
          value={`+${metrics.temp.toFixed(2)}`}
          unit="°C"
          trend={metrics.temp > 1.0}
        />
        <MetricCard
          label="Sea Level Rise"
          value={`+${metrics.seaLevel.toFixed(0)}`}
          unit="mm"
          trend={metrics.seaLevel > 150}
        />
      </div>
    </div>
  );
}
