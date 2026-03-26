import { YearControllerProps } from "@/types/YearController";

export default function YearController({ year, setYear }: YearControllerProps) {
  return (
    <div className="fixed bottom-0 left-0 w-full p-12 bg-linear-to-t from-black/80 to-transparent">
      <div className="max-w-xl mx-auto px-4">
        <div className="relative group">
          <div
            className="absolute -top-10 left-0 -translate-x-1/2 px-2 py-1 bg-zinc-800 rounded text-[10px] font-mono text-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ left: `${((year - 1850) / (2100 - 1850)) * 100}%` }}
          >
            {year}
          </div>

          <input
            type="range"
            min="1850"
            max="2100"
            step="1"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="w-full h-0.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-red-600 hover:accent-red-500 transition-all"
          />
        </div>

        <div className="flex justify-between mt-4 text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
          <div className="flex flex-col items-start gap-1">
            <span className="h-2 w-px bg-zinc-800"></span>
            <span>1850</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="h-2 w-px bg-zinc-800"></span>
            <span
              className={
                year > 2020 && year < 2030 ? "text-red-500 font-bold" : ""
              }
            >
              Present
            </span>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="h-2 w-px bg-zinc-800"></span>
            <span>2100</span>
          </div>
        </div>
      </div>
    </div>
  );
}
