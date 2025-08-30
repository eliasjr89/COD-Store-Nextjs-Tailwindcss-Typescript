import "./globals.css";
import { Inter } from "next/font/google";
import { Spotlight } from "@/components/ui/Spotlight";
import { ThemeBackground } from "@/components/ui/ThemeBackground";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/ui/nabvar/Navbar";

import { ThemeProvider } from "next-themes";
import { LanguageProvider } from "@/context/LanguageContext";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans overflow-hidden`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <LanguageProvider>
            <AuthProvider>
              <ThemeBackground />
              <Navbar />
              <Spotlight />
              {children}
            </AuthProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
