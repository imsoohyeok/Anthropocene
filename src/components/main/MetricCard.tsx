import { MetricProps } from "@/types/MetricCard";

export default function MetricCard({ label, value, unit, trend }: MetricProps) {
  return (
    <div className="bg-zinc-900/50 p-3 md:p-6 rounded-2xl backdrop-blur-sm transition-all">
      <h2 className="text-xs font-medium text-zinc-300 uppercase tracking-wider mb-1 md:mb-2">
        {label}
      </h2>
      <div className="flex items-baseline gap-1">
        <span
          className={`text-xl sm:text-2xl md:text-4xl font-bold tabular-nums ${trend ? "text-red-500" : "text-zinc-100"}`}
        >
          {value}
        </span>
        <span className="text-sm text-zinc-500 font-medium">{unit}</span>
      </div>
    </div>
  );
}
