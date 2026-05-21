"use client";

import { motion, AnimatePresence } from "framer-motion";

export default function FlashbangOverlay({
  isWarping,
}: {
  isWarping: boolean;
}) {
  return (
    <AnimatePresence>
      {isWarping && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeIn" }}
          className="absolute inset-0 z-[999] bg-white pointer-events-none"
        />
      )}
    </AnimatePresence>
  );
}
