import "./globals.css";
import { Inter } from "next/font/google";
import { Providers } from "@/components/ui/Providers";
import Navbar from "@/components/ui/Navbar";
import { Spotlight } from "@/components/ui/Spotlight";
import { ThemeBackground } from "@/components/ui/ThemeBackground";
import { AuthProvider } from "@/context/AuthContext";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans overflow-hidden`}>
        <AuthProvider>
          <Providers>
            <ThemeBackground />
            <Navbar />
            <Spotlight />
            {children}
          </Providers>
        </AuthProvider>
      </body>
    </html>
  );
}
