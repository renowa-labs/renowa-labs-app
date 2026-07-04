import { cn } from "@/lib/cn";

const nameRows = [
  { letters: ["r", "e", "n", "o", "w", "a"], columns: "grid-cols-6", offset: 0 },
  { letters: ["l", "a", "b", "s"], columns: "grid-cols-4", offset: 6 },
] as const;

export function RenowaGlyphMark({ className }: { className?: string }) {
  return (
    <div className={cn("w-full max-w-4xl", className)} aria-label="Renowa Labs">
      <div className="grid gap-2 sm:gap-3">
        {nameRows.map((row) => (
          <div key={row.letters.join("")} className={cn("glyph-row grid gap-1 sm:gap-2", row.columns)}>
            {row.letters.map((letter, index) => {
              const letterIndex = row.offset + index + 1;

              return (
                <span
                  key={`${letter}-${letterIndex}`}
                  data-letter={letter}
                  className="glyph-letter group/letter relative z-10 flex aspect-[1.05] items-center justify-center overflow-hidden border-y border-[var(--border)] text-4xl font-semibold leading-none text-[color:var(--foreground)] transition duration-300 hover:-translate-y-1 hover:border-[var(--foreground)] sm:text-6xl md:text-7xl lg:text-8xl"
                >
                  <span className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-[var(--foreground)] transition duration-500 group-hover/letter:scale-x-100" />
                  <span className="glyph-letter-core transition duration-300 group-hover/letter:scale-95">{letter}</span>
                  <span className="absolute bottom-1.5 right-2 text-[8px] font-medium text-[color:var(--muted-foreground)] sm:bottom-2 sm:text-[10px]">
                    {String(letterIndex).padStart(2, "0")}
                  </span>
                </span>
              );
            })}
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.32em] text-[color:var(--muted-foreground)]">
        <span>Product Systems</span>
        <span className="h-px w-10 bg-[var(--border)]" />
        <span>AZ / World</span>
      </div>
    </div>
  );
}
