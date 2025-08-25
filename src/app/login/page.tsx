"use client";

import AuthCard from "@/components/ui/AuthCard";
import AuthInput from "@/components/ui/AuthInput";
import GlassButton from "@/components/ui/Button";
import Link from "next/link";
import { useForm } from "@/hooks/useForm";
import { dictionary } from "@/locale/dictionary";
import { useLanguage } from "@/context/LanguageContext";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Login() {
  const { language } = useLanguage();
  const t = dictionary[language];
  const { setToken } = useAuth();
  const router = useRouter();

  const { values, handleChange, errors, loading, submitted, handleSubmit } =
    useForm({ email: "", password: "" });

  const submit = async () => {
    const fieldErrors: Record<string, string> = {};
    if (!values.email) fieldErrors.email = t.emailError;
    if (!values.password) fieldErrors.password = t.passwordError;

    if (Object.keys(fieldErrors).length > 0) throw { fieldErrors };

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Error al iniciar sesión");

      localStorage.setItem("token", data.data.token);
      setToken(data.data.token);
      router.push("/dashboard");
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Ocurrió un error inesperado";
      throw { fieldErrors: { general: message } };
    }
  };

  return (
    <AuthCard
      title={t.login}
      showBackButton
      backLabel={t.back}
      footer={
        <>
          <p className="text-black/80 dark:text-white/80">
            {t.noAccount}{" "}
            <Link href="/register" className="underline">
              {t.register}
            </Link>
          </p>
          <Link
            href="/forgot-password"
            className="text-black/80 dark:text-white/80 underline"
          >
            {t.forgotPassword}
          </Link>
        </>
      }
    >
      {submitted ? (
        <p className="text-center">{t.loginSuccess}</p>
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
          <AuthInput
            type="password"
            placeholder={t.password}
            value={values.password}
            onChange={handleChange("password")}
            error={errors.password}
          />
          {errors.general && (
            <p className="text-red-500 text-sm text-center">{errors.general}</p>
          )}
          <GlassButton
            type="submit"
            label={loading ? t.loading : t.login}
            className="w-full"
          />
        </form>
      )}
    </AuthCard>
  );
}
