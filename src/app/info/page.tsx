// src/app/info/page.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { infoData, infoItem } from "@/data/infoData";

export default function InfoPage() {
  const groupedInfo = infoData.reduce(
    (acc, item) => {
      (acc[item.category] = acc[item.category] || []).push(item);
      return acc;
    },
    {} as Record<infoItem["category"], infoItem[]>,
  );

  return (
    <main className="min-h-screen bg-black text-zinc-300 p-8 md:p-16 relative overflow-hidden">
      {/* 상단 HUD 레이어 */}
      <div className="relative z-10 max-w-7xl mx-auto mb-10 md:mb-16 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tighter uppercase">
            데이터 정보 및 출처
          </h1>
        </div>

        {/* 메인으로 돌아가기 버튼 */}
        <Link
          href="/"
          className="group flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-full hover:border-zinc-600 transition-colors"
        >
          <span className="whitespace-nowrap text-sm font-bold text-zinc-400 group-hover:text-white transition-colors">
            메인 대시보드로 돌아가기
          </span>
          <span className="text-zinc-600 transition-transform group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>

      {/* 메인 콘텐츠 레이어 */}
      <div className="relative z-10 max-w-7xl mx-auto space-y-12">
        {Object.entries(groupedInfo).map(([category, items], groupIndex) => (
          <motion.section
            key={category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: groupIndex * 0.1 }}
            className="space-y-6"
          >
            {/* 카테고리 헤더 */}
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-black text-zinc-100 tracking-tight shrink-0">
                {category}
              </h2>
              <div className="w-full h-px bg-zinc-800" />
            </div>

            {/* 출처 그리드 배드리드 배치 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col gap-1 pb-4 border-b border-zinc-900"
                >
                  <p className="text-zinc-100 font-medium">{item.content}</p>
                  <div className="flex items-center gap-2 text-sm text-zinc-500">
                    <span>-</span>
                    {item.infoUrl ? (
                      <a
                        href={item.infoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-red-500 hover:text-red-400 hover:underline transition-colors"
                      >
                        {item.infoName}
                      </a>
                    ) : (
                      <span>{item.infoName}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        ))}
      </div>

      {/* 하단 푸터 */}
      <footer className="relative z-10 max-w-7xl mx-auto mt-24 pt-8 border-t border-zinc-900 text-center">
        <p className="text-xs text-zinc-700 tracking-widest uppercase">
          Climate Watch Project © 2024 | All assets belong to their respective
          owners.
        </p>
      </footer>
    </main>
  );
}
