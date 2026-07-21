import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";

export function Wordmark({
  href = "/",
  className,
  size = "default",
  onClick,
}: {
  href?: string;
  className?: string;
  size?: "default" | "header";
  onClick?: () => void;
}) {
  const logoSize = size === "header" ? "w-32 sm:w-40" : "w-28 sm:w-32";

  return (
    <Link
      href={href}
      className={cn(
        "group inline-grid gap-1 rounded-sm text-[color:var(--foreground)] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]",
        className,
      )}
      aria-label="Renowa Labs home"
      onClick={onClick}
    >
      <Image
        src="/logo/horizontal/renowa-labs-horizontal-dark-exact.svg"
        alt=""
        width={1493}
        height={246}
        priority
        className={cn("theme-logo-dark h-auto", logoSize)}
      />
      <Image
        src="/logo/horizontal/renowa-labs-horizontal-light-exact.svg"
        alt=""
        width={1493}
        height={246}
        priority
        className={cn("theme-logo-light h-auto", logoSize)}
      />
    </Link>
  );
}
