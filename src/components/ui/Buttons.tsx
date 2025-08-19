import Link from "next/link";

interface GlassButtonProps {
  href?: string; // Opcional, si es un enlace
  type?: "button" | "submit" | "reset"; // Opcional, si es un botón de formulario
  label: string;
  className?: string;
  onClick?: () => void; // 👈 añadimos onClick
}

export default function GlassButton({
  href,
  type,
  label,
  className = "",
  onClick,
}: GlassButtonProps) {
  const baseClasses = `
    px-6 sm:px-8 py-2 sm:py-2.5 rounded-md font-light transition duration-300 ease-linear text-center
    bg-white/20 dark:bg-black/20 backdrop-blur-md
    border border-black/20 dark:border-white/20
    shadow-[0_4px_14px_0_rgba(0,0,0,0.15)] dark:shadow-[0_4px_14px_0_rgba(255,255,255,0.15)]
    hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_6px_20px_rgba(255,255,255,0.15)]
    hover:bg-black/30 hover:text-white hover:border-black/30
    dark:hover:bg-white/30 dark:hover:text-black dark:hover:border-white/30
    text-black dark:text-white
    w-full sm:w-auto
    ${className}
  `;

  if (href) {
    return (
      <Link href={href} className={baseClasses}>
        {label}
      </Link>
    );
  }

  return (
    <button type={type || "button"} onClick={onClick} className={baseClasses}>
      {label}
    </button>
  );
}
