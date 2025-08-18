import Link from "next/link";

interface GlassButtonProps {
  href: string;
  label: string;
  className?: string;
}

export default function GlassButton({ href, label }: GlassButtonProps) {
  return (
    <Link
      href={href}
      className="
        px-8 py-2 rounded-md font-light transition duration-300 ease-linear text-center
        bg-white/20 dark:bg-black/20 backdrop-blur-md
        border border-black/20 dark:border-white/20
        shadow-[0_4px_14px_0_rgba(0,0,0,0.15)] dark:shadow-[0_4px_14px_0_rgba(255,255,255,0.15)]
        hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_6px_20px_rgba(255,255,255,0.15)]
        
        /* Hover en modo claro: fondo negro translúcido y texto blanco */
        hover:bg-black/30 hover:text-white
        hover:border-black/30
        
        /* Hover en modo oscuro: fondo blanco translúcido y texto negro */
        dark:hover:bg-white/30 dark:hover:text-black
        dark:hover:border-white/30
        
        text-black dark:text-white
      "
    >
      {label}
    </Link>
  );
}
