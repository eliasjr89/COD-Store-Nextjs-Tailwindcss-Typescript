import { useTranslation } from "@/hooks/useTranslations";
import { AuthFooterProps } from "@/types";
import Link from "next/link";

export default function AuthFooter({ type }: AuthFooterProps) {
  const { t } = useTranslation();

  const base = "text-black/80 dark:text-white/80 text-sm";
  const link = "underline hover:opacity-80";

  switch (type) {
    case "login":
      return (
        <p className={base}>
          {t.noAccount}{" "}
          <Link href="/register" className={link}>
            {t.register}
          </Link>
        </p>
      );
    case "register":
      return (
        <p className={base}>
          {t.alreadyAccount}{" "}
          <Link href="/login" className={link}>
            {t.login}
          </Link>
        </p>
      );
    case "forgot":
      return (
        <p className={base}>
          {t.rememberPassword}{" "}
          <Link href="/login" className={link}>
            {t.login}
          </Link>
        </p>
      );
  }
}
