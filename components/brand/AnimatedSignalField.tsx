import { cn } from "@/lib/cn";

export function AnimatedSignalField({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden bg-[var(--background)]",
        className,
      )}
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_46%,rgba(255,255,255,0.028),transparent_28rem)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-[rgba(255,255,255,0.08)]" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-[rgba(255,255,255,0.07)]" />
      <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(255,255,255,0.52)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.52)_1px,transparent_1px)] [background-size:48px_48px]" />
    </div>
  );
}
