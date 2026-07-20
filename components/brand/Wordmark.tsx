import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";

export function Wordmark({
  href = "/",
  className,
  onClick,
}: {
  href?: string;
  className?: string;
  onClick?: () => void;
}) {
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
        className="theme-logo-dark h-auto w-28 sm:w-32"
      />
      <Image
        src="/logo/horizontal/renowa-labs-horizontal-light-exact.svg"
        alt=""
        width={1493}
        height={246}
        priority
        className="theme-logo-light h-auto w-28 sm:w-32"
      />
    </Link>
  );
}
