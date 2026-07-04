import Link from "next/link";
import { cn } from "@/lib/cn";

export function Wordmark({
  href = "/",
  className,
  markClassName,
  onClick,
}: {
  href?: string;
  className?: string;
  markClassName?: string;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-grid gap-1 rounded-sm text-[var(--foreground)] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]",
        className,
      )}
      aria-label="Renowa Labs home"
      onClick={onClick}
    >
      <span className="inline-flex items-center gap-2">
        <span className={cn("size-1.5 bg-[var(--foreground)]", markClassName)} aria-hidden="true" />
        <span className="text-[11px] font-semibold uppercase leading-none tracking-[0.42em]">Renowa</span>
      </span>
      <span className="pl-3.5 text-[10px] uppercase leading-none tracking-[0.38em] text-[var(--muted-foreground)]">
        Labs / product systems
      </span>
    </Link>
  );
}
