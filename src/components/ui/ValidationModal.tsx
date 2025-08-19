"use client";

import { useLanguage } from "@/context/LanguageContext";
import { dictionary } from "@/locale/dictionary";
import GlassButton from "@/components/ui/Buttons";

interface ValidationModalProps {
  errors: string[];
  onClose: () => void;
}

export default function ValidationModal({
  errors,
  onClose,
}: ValidationModalProps) {
  const { language } = useLanguage();
  const t = dictionary[language];

  if (errors.length === 0) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white/10 dark:bg-black/10 backdrop-blur-md border border-black/20 dark:border-white/20 p-6 rounded-xl shadow-lg max-w-sm w-full">
        <h2 className="text-lg font-bold mb-4 text-white">
          {t.validationErrorsTitle || "Errores de validación"}
        </h2>
        <ul className="list-disc list-inside text-red-500 mb-4">
          {errors.map((err, i) => (
            <li key={i}>{err}</li>
          ))}
        </ul>
        <GlassButton label={t.close} onClick={onClose} className="w-full " />
      </div>
    </div>
  );
}
