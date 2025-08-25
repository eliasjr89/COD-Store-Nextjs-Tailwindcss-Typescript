import { useLanguage } from "@/context/LanguageContext";
import { dictionary } from "@/locale/dictionary";
import { Language } from "@/types";

export function useTranslation() {
  const { language } = useLanguage();
  const t = dictionary[language as Language];

  return { t, language };
}
