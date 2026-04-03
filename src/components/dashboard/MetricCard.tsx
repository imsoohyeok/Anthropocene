import { MetricProps } from "@/types/MetricCard";

export default function MetricCard({ label, value, unit, trend }: MetricProps) {
  return (
    <div className="bg-zinc-900/50 border border-zinc-800 p-4 mb:p-6 rounded-2xl backdrop-blur-sm hover:border-zinc-700 transition-all">
      <h2 className="text-xs font-medium text-zinc-400 uppercase tracking-wider mb-2">
        {label}
      </h2>
      <div className="flex items-baseline gap-1">
        <span
          className={`text-2xl mb:text-4xl font-bold tabular-nums ${trend ? "text-red-500" : "text-zinc-100"}`}
        >
          {value}
        </span>
        <span className="text-sm text-zinc-500 font-medium">{unit}</span>
      </div>
    </div>
  );
}
