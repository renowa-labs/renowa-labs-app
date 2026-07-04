import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";

const variants: Record<Variant, string> = {
  primary: "button-primary",
  secondary: "button-secondary",
  ghost: "button-ghost",
};

const base =
  "inline-flex min-h-10 items-center justify-center gap-2 rounded-full border px-5 py-2 text-[12px] font-semibold uppercase tracking-[0.16em] transition focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]";

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
