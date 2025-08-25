import { InputHTMLAttributes, ReactNode } from "react";

export type Language = "ES" | "EN";

export type FieldErrors<T> = Partial<Record<keyof T | "general", string>>;
export interface Dictionary {
  ES: Record<string, string>;
  EN: Record<string, string>;
}
export interface SpotlightProps {
  gradientFirst?: string;
  gradientSecond?: string;
  gradientThird?: string;
  translateY?: number | string;
  width?: number | string;
  height?: number | string;
  smallWidth?: number | string;
  duration?: number;
  xOffset?: number | string;
}
export interface MagneticTextProps {
  text: string;
  onComplete?: () => void;
}
export interface GlassButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string | React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "link";
}
export interface AuthInputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}
export interface AuthFooterProps {
  type: "login" | "register" | "forgot";
}

export interface AuthCardProps {
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  showBackButton?: boolean;
  backLabel?: string;
  backHref?: string;
}

export interface TokenPayload {
  id: string;
  email: string;
}

export interface StatusModalProps {
  message: string;
  delay?: number;
}

export interface DashboardLayoutProps {
  children: ReactNode;
}
export interface SpinnerProps {
  size?: number; // Tamaño del spinner en px
  color?: string; // Color del spinner
}
