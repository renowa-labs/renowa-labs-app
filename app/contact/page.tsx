import type { Metadata } from "next";
import { Footer } from "@/components/site/Footer";
import { ButtonLink, buttonClassName } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CONTACT_EMAIL } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Renowa Labs for ideas, partnerships, and product collaborations.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Renowa Labs",
    description: "Have an idea, partnership, or product collaboration? Contact Renowa Labs.",
    url: "/contact",
  },
};

export default function ContactPage() {
  return (
    <>
      <main className="page-shell">
        <Container className="pb-20">
          <section className="grid gap-10 lg:grid-cols-[0.95fr_1fr] lg:items-start">
            <div>
              <SectionHeader
                eyebrow="Contact"
                title="Let's build something intelligent."
                description="Have an idea, partnership, or product collaboration? Contact Renowa Labs."
              />
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a href={`mailto:${CONTACT_EMAIL}`} className={buttonClassName({ className: "w-full sm:w-auto" })}>
                  Email the lab
                </a>
                <ButtonLink href="/products" variant="secondary" className="w-full sm:w-auto">
                  Explore products
                </ButtonLink>
              </div>
              <p className="mt-5 text-sm text-[var(--muted-foreground)]">{CONTACT_EMAIL}</p>
            </div>

            <form className="rounded-[6px] border border-[var(--border)] bg-[rgba(255,255,255,0.018)] p-5 sm:p-6">
              <div className="grid gap-4">
                <label className="grid gap-2 text-sm font-medium text-[var(--foreground)]">
                  Name
                  <input
                    type="text"
                    name="name"
                    className="min-h-12 rounded-[4px] border border-[var(--border)] bg-[rgba(0,0,0,0.12)] px-4 text-[var(--foreground)] outline-none transition placeholder:text-[rgba(140,140,135,0.7)] focus:border-[rgba(255,255,255,0.38)]"
                    placeholder="Your name"
                  />
                </label>
                <label className="grid gap-2 text-sm font-medium text-[var(--foreground)]">
                  Email
                  <input
                    type="email"
                    name="email"
                    className="min-h-12 rounded-[4px] border border-[var(--border)] bg-[rgba(0,0,0,0.12)] px-4 text-[var(--foreground)] outline-none transition placeholder:text-[rgba(140,140,135,0.7)] focus:border-[rgba(255,255,255,0.38)]"
                    placeholder="you@example.com"
                  />
                </label>
                <label className="grid gap-2 text-sm font-medium text-[var(--foreground)]">
                  Message
                  <textarea
                    name="message"
                    rows={6}
                    className="resize-none rounded-[4px] border border-[var(--border)] bg-[rgba(0,0,0,0.12)] px-4 py-3 text-[var(--foreground)] outline-none transition placeholder:text-[rgba(140,140,135,0.7)] focus:border-[rgba(255,255,255,0.38)]"
                    placeholder="Tell us what you are thinking about."
                  />
                </label>
                <button
                  type="button"
                  className={buttonClassName({ variant: "secondary", className: "mt-2 w-full" })}
                  aria-label="Visual contact form placeholder"
                >
                  Form UI placeholder
                </button>
              </div>
            </form>
          </section>
        </Container>
      </main>
      <Footer />
    </>
  );
}
