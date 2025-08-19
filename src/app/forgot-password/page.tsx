"use client";

import { useState } from "react";
import GlassButton from "@/components/ui/Buttons";
import { useLanguage } from "@/context/LanguageContext";
import { dictionary } from "@/locale/dictionary";
import Link from "next/link";
import ValidationModal from "@/components/ui/ValidationModal";

export default function ForgotPassword() {
  const { language } = useLanguage();
  const t = dictionary[language];

  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationErrors([]);

    const errors: string[] = [];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !emailRegex.test(email)) {
      errors.push(t.emailError);
    }

    if (errors.length > 0) {
      setValidationErrors(errors);
      return;
    }

    setSubmitted(true);
    // Aquí llamarías al backend para enviar el email
  };

  return (
    <div className="flex flex-col items-center justify-start pt-50 sm:pt-50 min-h-screen px-4 sm:px-6">
      <div className="w-full max-w-sm sm:max-w-md p-6 sm:p-8 rounded-xl bg-white/10 dark:bg-black/5 backdrop-blur-md border border-black/20 dark:border-white/20 shadow-lg relative z-10">
        <h1 className="text-2xl sm:text-3xl font-light mb-6 text-black dark:text-white text-center">
          {t.forgotPassword}
        </h1>

        {submitted ? (
          <p className="text-black/80 dark:text-white/80 text-center">
            {t.resetEmailSent}
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="email"
              placeholder={t.email}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-white/20 dark:bg-black/20 border border-black/20 dark:border-white/20 text-black dark:text-white placeholder-black/60 dark:placeholder-white/60 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-black/40 dark:focus:ring-white/40 transition"
            />
            <GlassButton
              label={t.sendResetLink}
              type="submit"
              className="w-full sm:w-auto"
            />
          </form>
        )}

        <div className="flex flex-col items-center mt-6 gap-2 text-sm text-center">
          <p className="text-black/80 dark:text-white/80">
            {t.rememberPassword}{" "}
            <Link href="/login" className="underline hover:opacity-80">
              {t.login}
            </Link>
          </p>
        </div>

        <div className="mt-6 flex justify-center w-full sm:w-auto">
          <GlassButton href="/" label={t.back} className="w-full sm:w-auto" />
        </div>
      </div>

      {/* Modal de validación */}
      {validationErrors.length > 0 && (
        <ValidationModal
          errors={validationErrors}
          onClose={() => setValidationErrors([])}
        />
      )}
    </div>
  );
}
