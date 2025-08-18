"use client";

import { useState } from "react";
import GlassButton from "@/components/ui/Buttons";
import { useLanguage } from "@/context/LanguageContext";
import { dictionary } from "@/locale/dictionary";
import Link from "next/link";

export default function ForgotPassword() {
  const { language } = useLanguage();
  const t = dictionary[language];

  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="flex flex-col items-center justify-start pt-50 min-h-screen px-4">
      <div className="w-full max-w-sm p-6 rounded-xl bg-white/10 dark:bg-black/10 backdrop-blur-md border border-black/20 dark:border-white/20 shadow-lg relative z-10">
        <h1 className="text-2xl font-light mb-6 text-black dark:text-white text-center">
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
              required
              className="px-4 py-2 rounded-md bg-white/20 dark:bg-black/20 border border-black/20 dark:border-white/20 text-black dark:text-white placeholder-black/60 dark:placeholder-white/60 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-black/40 dark:focus:ring-white/40 transition"
            />
            {/* Botón de enviar email */}
            <button
              type="submit"
              className="
                px-8 py-2 rounded-md font-light transition duration-300 ease-linear text-center
                bg-white/20 dark:bg-black/20 backdrop-blur-md
                border border-black/20 dark:border-white/20
                shadow-[0_4px_14px_0_rgba(0,0,0,0.15)] dark:shadow-[0_4px_14px_0_rgba(255,255,255,0.15)]
                hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_6px_20px_rgba(255,255,255,0.15)]
                hover:bg-black/30 hover:text-white hover:border-black/30
                dark:hover:bg-white/30 dark:hover:text-black dark:hover:border-white/30
                text-black dark:text-white
              "
            >
              {t.sendResetLink}
            </button>
          </form>
        )}

        <div className="flex flex-col items-center mt-6 gap-2 text-sm">
          <p className="text-black/80 dark:text-white/80">
            {t.rememberPassword}{" "}
            <Link href="/login" className="underline hover:opacity-80">
              {t.login}
            </Link>
          </p>
        </div>

        <div className="mt-6 flex justify-center">
          {/* Botón Volver */}
          <GlassButton href="/" label={t.back} />
        </div>
      </div>
    </div>
  );
}
