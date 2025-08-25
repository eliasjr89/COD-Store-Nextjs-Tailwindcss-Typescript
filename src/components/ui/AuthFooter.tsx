import { useTranslation } from "@/hooks/useTranslations";
import { AuthFooterProps } from "@/types";
import Link from "next/link";

export default function AuthFooter({ type }: AuthFooterProps) {
  const { t } = useTranslation();

  switch (type) {
    case "login":
      return (
        <p>
          {t.noAccount}{" "}
          <Link href="/register" className="underline hover:opacity-80">
            {t.register}
          </Link>
        </p>
      );
    case "register":
      return (
        <p>
          {t.alreadyAccount}{" "}
          <Link href="/login" className="underline hover:opacity-80">
            {t.login}
          </Link>
        </p>
      );
    case "forgot":
      return (
        <p>
          {t.rememberPassword}{" "}
          <Link href="/login" className="underline hover:opacity-80">
            {t.login}
          </Link>
        </p>
      );
  }
}
