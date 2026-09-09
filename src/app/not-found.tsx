import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative w-full h-screen bg-black flex flex-col items-center justify-center overflow-hidden px-6">
      {/* 붉은 엠비언스 배경 (다른 결과 화면들과 톤을 맞춤) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, rgba(153, 27, 27, 0.25) 0%, rgba(0, 0, 0, 1) 70%)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center">
        <h1 className="text-8xl md:text-9xl font-black text-red-600 tracking-tighter drop-shadow-[0_0_30px_rgba(220,38,38,0.6)]">
          404
        </h1>
        <p className="mt-4 text-xl md:text-2xl text-zinc-200 font-medium tracking-tight">
          궤도를 이탈했습니다
        </p>
        <p className="mt-2 text-zinc-500 text-sm md:text-base tracking-wide">
          요청하신 페이지가 존재하지 않거나 이동되었습니다.
        </p>

        <Link
          href="/"
          className="mt-10 inline-block px-8 py-3 bg-red-500 text-white font-bold rounded-full hover:bg-red-400 transition-all shadow-lg hover:shadow-red-500/50 text-base tracking-widest"
        >
          지구로 귀환하기
        </Link>
      </div>
    </main>
  );
}
