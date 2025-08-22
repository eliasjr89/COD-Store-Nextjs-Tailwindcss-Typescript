"use client";

import AuthCard from "@/components/ui/AuthCard";
import AuthInput from "@/components/ui/AuthInput";
import GlassButton from "@/components/ui/Buttons";
import Link from "next/link";
import { useForm } from "@/hooks/useForm";
import { dictionary } from "@/locale/dictionary";
import { useLanguage } from "@/context/LanguageContext";

export default function Register() {
  const { language } = useLanguage();
  const t = dictionary[language];

  const { values, handleChange, errors, loading, submitted, handleSubmit } =
    useForm({ username: "", email: "", password: "", confirmPassword: "" });

  const submit = async () => {
    const fieldErrors: Record<string, string> = {};
    if (!values.username) fieldErrors.username = t.usernameError;
    if (!values.email) fieldErrors.email = t.emailError;
    if (!values.password) fieldErrors.password = t.passwordError;
    if (values.password !== values.confirmPassword)
      fieldErrors.confirmPassword = t.confirmPasswordError;

    if (Object.keys(fieldErrors).length > 0) throw { fieldErrors };

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    const data = await res.json();

    if (!res.ok) throw { fieldErrors: { general: data.error } };

    return data;
  };

  return (
    <AuthCard
      title={t.register}
      showBackButton
      backLabel={t.back}
      footer={
        <p className="text-black/80 dark:text-white/80">
          {t.alreadyAccount}{" "}
          <Link href="/login" className="underline">
            {t.login}
          </Link>
        </p>
      }
    >
      {submitted ? (
        <p className="text-center">{t.registerSuccess}</p>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(submit);
          }}
          className="flex flex-col gap-4"
        >
          <AuthInput
            placeholder={t.username}
            value={values.username}
            onChange={handleChange("username")}
            error={errors.username}
          />
          <AuthInput
            type="email"
            placeholder={t.email}
            value={values.email}
            onChange={handleChange("email")}
            error={errors.email}
          />
          <AuthInput
            type="password"
            placeholder={t.password}
            value={values.password}
            onChange={handleChange("password")}
            error={errors.password}
          />
          <AuthInput
            type="password"
            placeholder={t.confirmPassword}
            value={values.confirmPassword}
            onChange={handleChange("confirmPassword")}
            error={errors.confirmPassword}
          />
          <GlassButton
            type="submit"
            label={loading ? t.loading : t.register}
            className="w-full"
          />
        </form>
      )}
    </AuthCard>
  );
}
