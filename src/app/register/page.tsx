"use client";

import AuthCard from "@/components/ui/AuthCard";
import AuthInput from "@/components/ui/AuthInput";
import GlassButton from "@/components/ui/Button";
import Link from "next/link";
import { useForm } from "@/hooks/useForm";
import { dictionary } from "@/locale/dictionary";
import { useLanguage } from "@/context/LanguageContext";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import Spinner from "@/components/ui/Spinner";
import FormMessage from "@/components/ui/FormMessage";
import { useAuth } from "@/context/AuthContext";

export default function Register() {
  const { language } = useLanguage();
  const t = dictionary[language];
  const { setLoggedIn } = useAuth();
  const router = useRouter();

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

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();
      if (!res.ok)
        throw new Error(data.error || "Error al registrar el usuario");
      setLoggedIn(true);
      router.push("/dashboard");
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Ocurrió un error inesperado";
      throw { fieldErrors: { general: message } };
    }
  };

  return (
    <AuthCard
      title={submitted ? "" : t.register}
      showBackButton={!submitted}
      backLabel={t.back}
      footer={
        !submitted && (
          <p className="text-black/80 dark:text-white/80">
            {t.alreadyAccount}{" "}
            <Link href="/login" className="underline">
              {t.login}
            </Link>
          </p>
        )
      }
    >
      <AnimatePresence mode="wait" initial={false}>
        {submitted ? (
          <motion.div
            key="successMessage"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <FormMessage>{t.registerSuccess}</FormMessage>
          </motion.div>
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
            {errors.general && (
              <FormMessage type="error">{errors.general}</FormMessage>
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
                  label={t.register}
                  className="w-full"
                />
              )}
            </AnimatePresence>
          </form>
        )}
      </AnimatePresence>
    </AuthCard>
  );
}
