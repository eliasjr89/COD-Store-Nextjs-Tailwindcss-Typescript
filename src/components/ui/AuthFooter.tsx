import { useTranslation } from "@/hooks/useTranslations";
import { AuthFooterProps } from "@/types";
import Link from "next/link";
import clsx from "clsx";

export default function AuthFooter({ type }: AuthFooterProps) {
  const { t } = useTranslation();

  const base = clsx(
    "text-black/80 dark:text-white/80 text-sm sm:text-base px-3 py-2 rounded-md backdrop-blur-lg",
    "bg-white/10 dark:bg-black/10 border border-white/20 dark:border-black/20 shadow-sm",
    "transition-colors duration-300 flex justify-center"
  );

  const link = "underline hover:opacity-80 transition-opacity duration-200";

  let content: React.ReactNode = null;

  switch (type) {
    case "login":
      content = (
        <>
          {t.noAccount}{" "}
          <Link href="/register" className={link}>
            {t.register}
          </Link>
        </>
      );
      break;
    case "register":
      content = (
        <>
          {t.alreadyAccount}{" "}
          <Link href="/login" className={link}>
            {t.login}
          </Link>
        </>
      );
      break;
    case "forgot":
      content = (
        <>
          {t.rememberPassword}{" "}
          <Link href="/login" className={link}>
            {t.login}
          </Link>
        </>
      );
      break;
  }

  return <p className={base}>{content}</p>;
}
