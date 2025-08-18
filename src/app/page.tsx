"use client";

import { useState } from "react";
import { useTranslation } from "@/hooks/useTranslations";
import { motion } from "framer-motion";
import { MagneticText } from "@/components/ui/MagneticText";
import GlassButton from "@/components/ui/Buttons";

export default function Home() {
  const [showParagraph, setShowParagraph] = useState(false);
  const { t } = useTranslation();

  return (
    <div className="relative min-h-screen flex items-start justify-center pt-60 overflow-hidden font-sans">
      <div className="relative z-10 text-center">
        <MagneticText
          text={t("welcome")}
          onComplete={() => setShowParagraph(true)}
        />

        <div className="mt-4 min-h-[1.5rem]">
          {showParagraph && (
            <motion.p
              className="text-lg text-gray-500 dark:text-gray-400 "
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.42, 0, 0.58, 1] }}
            >
              {t("subtitle")}
            </motion.p>
          )}
        </div>

        <div className="mt-4 flex flex-col sm:flex-row justify-center gap-4">
          <GlassButton href="/login" label={t("login")} />
          <GlassButton href="/register" label={t("register")} />
        </div>
      </div>
    </div>
  );
}
