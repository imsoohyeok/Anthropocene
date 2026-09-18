"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedSectionProps {
  index: number;
  className?: string;
  children: ReactNode;
}

// 카테고리 섹션의 등장 애니메이션만 담당하는 얇은 클라이언트 컴포넌트.
// 나머지 정적 콘텐츠는 서버 컴포넌트(page.tsx)에 남겨 클라이언트 번들을 최소화한다.
export default function AnimatedSection({
  index,
  className,
  children,
}: AnimatedSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={className}
    >
      {children}
    </motion.section>
  );
}
