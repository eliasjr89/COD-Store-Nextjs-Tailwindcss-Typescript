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
              className="text-xl font-medium text-gray-700 dark:text-gray-200"
              style={{ textShadow: "0 1px 3px rgba(0,0,0,0.3)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.42, 0, 0.58, 1] }}
            >
              {t("subtitle")}
            </motion.p>
          )}
        </div>

        {/* Aquí reemplazamos el div de botones por motion.div */}
        <motion.div
          className="mt-4 flex flex-col sm:flex-row justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: showParagraph ? 1 : 0,
            y: showParagraph ? 0 : 20,
          }}
          transition={{ duration: 0.6, ease: [0.42, 0, 0.58, 1], delay: 0.2 }}
        >
          <GlassButton href="/login" label={t("login")} />
          <GlassButton href="/register" label={t("register")} />
        </motion.div>
      </div>
    </div>
  );
}
