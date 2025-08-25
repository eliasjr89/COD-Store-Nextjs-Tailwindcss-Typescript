"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { StatusModalProps } from "@/types";

export default function StatusModal({
  message,
  delay = 500,
}: StatusModalProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 flex items-center justify-center z-50"
        >
          <div className="bg-white/30 dark:bg-black/30 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-black/10 dark:border-white/20 text-center max-w-xs mx-auto">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              {message}
            </h2>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
