import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";

const variants: Record<Variant, string> = {
  primary:
    "border-[var(--foreground)] bg-[var(--foreground)] text-[var(--background)] hover:bg-white",
  secondary:
    "border-[var(--border)] bg-transparent text-[var(--foreground)] hover:border-[rgba(255,255,255,0.32)] hover:bg-[rgba(255,255,255,0.035)]",
  ghost:
    "border-transparent bg-transparent text-[var(--muted-foreground)] hover:text-[var(--foreground)]",
};

const base =
  "inline-flex min-h-10 items-center justify-center gap-2 rounded-full border px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] transition focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]";

export function buttonClassName({
  variant = "primary",
  className,
}: {
  variant?: Variant;
  className?: string;
} = {}) {
  return cn(base, variants[variant], className);
}

export function Button({
  variant = "primary",
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return <button className={buttonClassName({ variant, className })} {...props} />;
}

export function ButtonLink({
  href,
  variant = "primary",
  className,
  children,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  variant?: Variant;
  children: ReactNode;
}) {
  return (
    <Link href={href} className={buttonClassName({ variant, className })} {...props}>
      {children}
    </Link>
  );
}
