"use client";

import AuthCard from "@/components/ui/AuthCard";
import AuthInput from "@/components/ui/AuthInput";
import GlassButton from "@/components/ui/Buttons";
import Link from "next/link";
import { useForm } from "@/hooks/useForm";
import { dictionary } from "@/locale/dictionary";
import { useLanguage } from "@/context/LanguageContext";

export default function ForgotPassword() {
  const { language } = useLanguage();
  const t = dictionary[language];

  const { values, handleChange, errors, loading, submitted, handleSubmit } =
    useForm({ email: "" });

  const submit = async () => {
    const fieldErrors: Record<string, string> = {};
    if (!values.email) fieldErrors.email = t.emailError;

    if (Object.keys(fieldErrors).length > 0) throw { fieldErrors };

    // simulación recuperación
    await new Promise((res) => setTimeout(res, 1000));
  };

  return (
    <AuthCard
      title={t.forgotPassword}
      showBackButton
      backLabel={t.back}
      footer={
        <p className="text-black/80 dark:text-white/80">
          {t.rememberPassword}{" "}
          <Link href="/login" className="underline">
            {t.login}
          </Link>
        </p>
      }
    >
      {submitted ? (
        <p className="text-center">{t.forgotPassword}</p>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(submit);
          }}
          className="flex flex-col gap-4"
        >
          <AuthInput
            type="email"
            placeholder={t.email}
            value={values.email}
            onChange={handleChange("email")}
            error={errors.email}
          />
          <GlassButton
            type="submit"
            label={loading ? t.loading : t.sendResetLink}
            className="w-full"
          />
        </form>
      )}
    </AuthCard>
  );
}
