"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FlashBangProps } from "@/types/NameError";

export default function FlashBangOverlay({
  isWarping,
  isReturning,
}: FlashBangProps) {
  return (
    <AnimatePresence>
      {/* 두 상태 중 하나라도 활성 상태라면 렌더링 */}
      {(isWarping || isReturning) && (
        <motion.div
          initial={{ opacity: isReturning ? 1 : 0 }}
          animate={{ opacity: isReturning ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0 z-9999 bg-white pointer-events-none"
        />
      )}
    </AnimatePresence>
  );
}
