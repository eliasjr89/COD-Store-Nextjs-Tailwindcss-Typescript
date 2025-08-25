"use client";

import { useState } from "react";
import { useTranslation } from "@/hooks/useTranslations";
import { motion } from "framer-motion";
import { MagneticText } from "@/components/ui/MagneticText";
import GlassButton from "@/components/ui/Button";

export default function Home() {
  const [showButtons, setShowButtons] = useState(false);
  const { t } = useTranslation();

  return (
    <div className="relative min-h-screen flex items-start justify-center pt-60 overflow-hidden font-sans">
      <div className="relative z-10 text-center">
        <MagneticText
          text={t.welcome}
          onComplete={() => setShowButtons(true)}
        />
        {showButtons && (
          <motion.div
            className="mt-6 flex flex-row flex-wrap justify-center items-center gap-4 pt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.42, 0, 0.58, 1], delay: 0.2 }}
          >
            <GlassButton href="/login" label={t.login} />
            <GlassButton href="/register" label={t.register} />
          </motion.div>
        )}
      </div>
    </div>
  );
}
