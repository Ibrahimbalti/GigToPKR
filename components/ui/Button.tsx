import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";

const variants: Record<Variant, string> = {
  primary: "cta-gradient text-white",
  secondary: "border border-line bg-white text-ink shadow-[var(--shadow)] hover:border-brand/30",
  ghost: "text-navy hover:bg-brand-50",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50";

type Props = {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  href?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
  ariaLabel?: string;
};

export function Button({
  children,
  variant = "primary",
  className,
  href,
  type = "button",
  onClick,
  disabled,
  ariaLabel,
}: Props) {
  const classes = cn(base, variants[variant], className);
  if (href) {
    return (
      <Link href={href} className={classes} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} className={classes} onClick={onClick} disabled={disabled} aria-label={ariaLabel}>
      {children}
    </button>
  );
}
