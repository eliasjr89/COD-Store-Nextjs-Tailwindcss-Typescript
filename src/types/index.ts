export type Language = "ES" | "EN";
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
  label: string;
  href?: string;
  variant?: "primary" | "secondary" | "link";
}

import { InputHTMLAttributes } from "react";
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
