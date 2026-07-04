import { Wordmark } from "@/components/brand/Wordmark";
import { ThemeToggle } from "@/components/site/ThemeToggle";

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 bg-transparent">
      <div className="flex h-16 w-full items-start justify-between px-5 pt-4 sm:px-8">
        <Wordmark />
        <div className="flex items-center gap-5">
          <ThemeToggle />
          <span className="hidden text-[10px] uppercase tracking-[0.34em] text-[var(--muted-foreground)] sm:inline">
            en / az
          </span>
        </div>
      </div>
    </header>
  );
}
