import Image from "next/image";
import Link from "next/link";
import { CONTACT_EMAIL, SITE_POSITIONING } from "@/data/site";
import { Container } from "@/components/ui/Container";

const footerLinkClass =
  "transition hover:text-[color:var(--foreground)] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-[var(--border)] py-14 sm:py-18">
      <Image
        src="/logo/png/renowa-logo-transparent-white.png"
        alt=""
        aria-hidden="true"
        width={665}
        height={294}
        className="theme-logo-dark pointer-events-none absolute bottom-[-3.5rem] left-1/2 z-0 w-[min(58rem,118vw)] max-w-none -translate-x-1/2 opacity-[0.07] sm:bottom-[-5rem] lg:w-[68rem]"
      />
      <Image
        src="/logo/png/renowa-logo-transparent-black.png"
        alt=""
        aria-hidden="true"
        width={665}
        height={294}
        className="theme-logo-light pointer-events-none absolute bottom-[-3.5rem] left-1/2 z-0 w-[min(58rem,118vw)] max-w-none -translate-x-1/2 opacity-[0.06] sm:bottom-[-5rem] lg:w-[68rem]"
      />
      <Container className="relative z-10 grid gap-14">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-start">
          <div className="space-y-5" aria-label="Renowa Labs">
            <div className="relative h-[57px] w-32 sm:h-16 sm:w-36" aria-hidden="true">
              <Image
                src="/logo/png/renowa-logo-transparent-white.png"
                alt=""
                fill
                sizes="144px"
                className="theme-logo-dark object-contain object-left"
              />
              <Image
                src="/logo/png/renowa-logo-transparent-black.png"
                alt=""
                fill
                sizes="144px"
                className="theme-logo-light object-contain object-left"
              />
            </div>
            <p className="max-w-md text-sm leading-6 text-[color:var(--muted-foreground)]">{SITE_POSITIONING}</p>
          </div>

          <nav className="grid grid-cols-2 gap-8 text-[12px] uppercase tracking-[0.16em] text-[color:var(--muted-foreground)] sm:grid-cols-3">
            <div className="grid gap-3">
              <p className="text-[color:var(--foreground)]">Explore</p>
              <Link href="/products" className={footerLinkClass}>
                Products
              </Link>
              <Link href="/about" className={footerLinkClass}>
                About
              </Link>
              <Link href="/contact" className={footerLinkClass}>
                Contact
              </Link>
            </div>
            <div className="grid gap-3">
              <p className="text-[color:var(--foreground)]">Products</p>
              <Link href="/products/signal-notes" className={footerLinkClass}>
                Signal Notes
              </Link>
              <Link href="/products/local-lens" className={footerLinkClass}>
                Local Lens
              </Link>
              <Link href="/products/task-frame" className={footerLinkClass}>
                Task Frame
              </Link>
            </div>
            <div className="grid gap-3">
              <p className="text-[color:var(--foreground)]">Social</p>
              <Link href="#" className={footerLinkClass}>
                LinkedIn
              </Link>
              <Link href="#" className={footerLinkClass}>
                X
              </Link>
            </div>
          </nav>
        </div>

        <div className="grid gap-5 border-t border-[var(--border)] pt-6 text-[12px] text-[color:var(--muted-foreground)] sm:grid-cols-[1fr_auto] sm:items-center">
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="inline-flex w-fit rounded-sm text-[color:var(--foreground)] underline decoration-[rgba(255,255,255,0.28)] underline-offset-4 transition hover:opacity-70 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
          >
            {CONTACT_EMAIL}
          </a>
          <div className="flex flex-wrap gap-x-5 gap-y-2 sm:justify-end">
            <p>{year} Renowa Labs. All rights reserved.</p>
            <Link
              href="#"
              className="underline underline-offset-4 transition hover:text-[color:var(--foreground)] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
