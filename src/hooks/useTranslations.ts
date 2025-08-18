// hooks/useTranslations.ts
import { useLanguage } from "@/context/LanguageContext";
import { dictionary } from "@/locale/dictionary";

export function useTranslation() {
  const { language } = useLanguage();

  const t = (key: keyof (typeof dictionary)["ES"]) => {
    return dictionary[language][key] || key;
  };

  return { t, language };
}
