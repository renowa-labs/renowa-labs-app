import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function SectionHeader({
  eyebrow,
  title,
  description,
  className,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div className={cn("max-w-3xl", className)}>
      {eyebrow ? (
        <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.34em] text-[var(--muted-foreground)]">
          {eyebrow}
        </p>
      ) : null}
      <h1 className="text-balance text-3xl font-semibold leading-[1.08] text-[var(--foreground)] sm:text-4xl md:text-5xl">
        {title}
      </h1>
      {description ? (
        <p className="mt-5 max-w-2xl text-pretty text-sm leading-7 text-[var(--muted-foreground)]">
          {description}
        </p>
      ) : null}
      {children}
    </div>
  );
}
