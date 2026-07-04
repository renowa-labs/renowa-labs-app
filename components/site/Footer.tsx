import Link from "next/link";
import { CONTACT_EMAIL, SITE_POSITIONING } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { Wordmark } from "@/components/brand/Wordmark";

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] py-10">
      <Container className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-4">
          <Wordmark />
          <p className="max-w-md text-sm leading-6 text-[var(--muted-foreground)]">{SITE_POSITIONING}</p>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="inline-flex rounded-sm text-xs text-[var(--foreground)] underline decoration-[rgba(255,255,255,0.28)] underline-offset-4 transition hover:text-white focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
          >
            {CONTACT_EMAIL}
          </a>
        </div>
        <div className="flex flex-col gap-3 text-xs text-[var(--muted-foreground)] sm:items-end">
          <div className="flex gap-4">
            <Link
              href="#"
              className="transition hover:text-[var(--foreground)] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
            >
              LinkedIn
            </Link>
            <Link
              href="#"
              className="transition hover:text-[var(--foreground)] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
            >
              X
            </Link>
          </div>
          <p>{new Date().getFullYear()} Renowa Labs. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
}
