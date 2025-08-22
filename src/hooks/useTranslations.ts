// hooks/useTranslations.ts
import { useLanguage } from "@/context/LanguageContext";
import { dictionary } from "@/locale/dictionary";
import { Language } from "@/types"; // importaremos tu tipo de idioma

export function useTranslation() {
  const { language } = useLanguage();

  // casteo seguro para evitar error TS7053
  const t = dictionary[language as Language];

  return { t, language };
}
