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
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_46%,var(--field-spot),transparent_28rem)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-[var(--grid-edge)]" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-[var(--grid-edge)]" />
      <div className="absolute inset-0 [background-image:linear-gradient(var(--grid-line)_1px,transparent_1px),linear-gradient(90deg,var(--grid-line)_1px,transparent_1px)] [background-size:48px_48px]" />
    </div>
  );
}
