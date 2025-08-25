"use client";

import AuthCard from "@/components/ui/AuthCard";
import AuthInput from "@/components/ui/AuthInput";
import GlassButton from "@/components/ui/Button";
import Link from "next/link";
import { useForm } from "@/hooks/useForm";
import { dictionary } from "@/locale/dictionary";
import { useLanguage } from "@/context/LanguageContext";
import { AnimatePresence, motion } from "framer-motion";
import Spinner from "@/components/ui/Spinner";

export default function ForgotPassword() {
  const { language } = useLanguage();
  const t = dictionary[language];

  const { values, handleChange, errors, loading, submitted, handleSubmit } =
    useForm({ email: "" });

  const submit = async () => {
    const fieldErrors: Record<string, string> = {};
    if (!values.email) fieldErrors.email = t.emailError;

    if (Object.keys(fieldErrors).length > 0) throw { fieldErrors };

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: values.email }),
      });

      const data = await res.json();

      if (!res.ok)
        throw { fieldErrors: { general: data.error || "Error desconocido" } };
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Ocurrió un error inesperado";
      throw { fieldErrors: { general: message } };
    }
  };

  return (
    <AuthCard
      title={submitted ? "" : t.forgotPassword} // Oculta el título cuando se envía
      showBackButton={!submitted} // Oculta el botón de volver cuando se envía
      backLabel={t.back}
      footer={
        !submitted && ( // Oculta el footer cuando se envía
          <p className="text-black/80 dark:text-white/80">
            {t.rememberPassword}{" "}
            <Link href="/login" className="underline">
              {t.login}
            </Link>
          </p>
        )
      }
    >
      {submitted ? (
        <p className="text-center text-black/80 dark:text-white/80 text-xl -mt-4">
          {t.resetEmailSent}
        </p>
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
          {errors.general && (
            <p className="text-red-500 text-sm text-center">{errors.general}</p>
          )}
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="spinner"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex justify-center py-2"
              >
                <Spinner size={24} />
              </motion.div>
            ) : (
              <GlassButton
                key="submit"
                type="submit"
                label={t.sendResetLink}
                className="w-full"
              />
            )}
          </AnimatePresence>
        </form>
      )}
    </AuthCard>
  );
}
