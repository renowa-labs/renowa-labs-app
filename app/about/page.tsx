import type { Metadata } from "next";
import { Footer } from "@/components/site/Footer";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { LINKEDIN_URL, SITE_DESCRIPTION } from "@/data/site";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "About",
  description: `${SITE_DESCRIPTION} Learn about the product areas that shape the lab's work.`,
  path: "/about",
});

const focusAreas = [
  "Artificial intelligence",
  "Mobile applications",
  "Recruitment technology",
  "Data platforms",
  "Applied software",
];

const team = [
  { name: "Mustafa Ahmadov", role: "CEO & Co-founder", href: "https://www.linkedin.com/in/mustafahmdov/" },
  { name: "Vugar Hasanov", role: "Tech Lead", href: "https://www.linkedin.com/in/vghasanov/" },
  { name: "Sadig Latifli", role: "Intern", href: "https://www.linkedin.com/in/sadig-latifli/" },
];

export default function AboutPage() {
  return (
    <>
      <main className="page-shell">
        <Container className="pb-20">
          <SectionHeader
            eyebrow="About"
            title="We build useful software products."
            description="Renowa Labs builds AI-powered software products for people and teams everywhere."
          />

          <section className="mt-12 grid gap-8 rounded-[6px] border border-[var(--border)] bg-[rgba(255,255,255,0.018)] p-6 sm:p-8 lg:grid-cols-[0.9fr_1fr]">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-[color:var(--muted-foreground)]">What we do</p>
              <h2 className="mt-4 text-2xl font-semibold text-[color:var(--foreground)]">From idea to product.</h2>
            </div>
            <div>
              <p className="text-pretty text-sm leading-7 text-[color:var(--foreground)]">
                We build AI tools, mobile apps, recruitment products, and data platforms. We help shape the idea, design the product, and build it.
              </p>
              <p className="mt-5 text-pretty text-sm leading-7 text-[color:var(--muted-foreground)]">
                We work with people and teams wherever they are.
              </p>
            </div>
          </section>

          <section className="mt-16 grid gap-8 lg:grid-cols-[0.7fr_1fr]" aria-labelledby="focus-heading">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-[color:var(--muted-foreground)]">Focus</p>
              <h2 id="focus-heading" className="mt-4 text-2xl font-semibold text-[color:var(--foreground)] sm:text-3xl">
                What we work on.
              </h2>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {focusAreas.map((area) => (
                <li
                  key={area}
                  className="rounded-[6px] border border-[var(--border)] bg-[rgba(255,255,255,0.018)] p-4 text-sm text-[color:var(--foreground)]"
                >
                  {area}
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-16 grid gap-8 border-t border-[var(--border)] pt-10 lg:grid-cols-[0.7fr_1fr]" aria-labelledby="team-heading">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-[color:var(--muted-foreground)]">People</p>
              <h2 id="team-heading" className="mt-4 text-2xl font-semibold text-[color:var(--foreground)] sm:text-3xl">
                The people behind Renowa Labs.
              </h2>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex rounded-sm text-sm text-[color:var(--muted-foreground)] underline underline-offset-4 transition hover:text-[color:var(--foreground)] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
              >
                Renowa Labs on LinkedIn
              </a>
            </div>
            <ul className="grid gap-3">
              {team.map((person) => (
                <li key={person.href}>
                  <a
                    href={person.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between gap-4 rounded-[6px] border border-[var(--border)] bg-[rgba(255,255,255,0.018)] p-4 transition hover:border-[color:var(--foreground)] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
                  >
                    <span className="text-sm font-medium text-[color:var(--foreground)]">{person.name}</span>
                    <span className="text-[11px] uppercase tracking-[0.16em] text-[color:var(--muted-foreground)]">{person.role}</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-16 rounded-[6px] border border-[var(--border)] bg-[rgba(255,255,255,0.018)] p-6 sm:flex sm:items-center sm:justify-between sm:gap-8 sm:p-8">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-[color:var(--muted-foreground)]">Work with us</p>
              <h2 className="mt-3 text-2xl font-semibold text-[color:var(--foreground)]">Need help building a product?</h2>
              <p className="mt-3 max-w-xl text-sm leading-7 text-[color:var(--muted-foreground)]">Tell us what you are working on.</p>
            </div>
            <ButtonLink href="/contact" className="mt-6 shrink-0 sm:mt-0">
              Work with us
            </ButtonLink>
          </section>
        </Container>
      </main>
      <Footer />
    </>
  );
}
