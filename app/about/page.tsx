import type { Metadata } from "next";
import { Footer } from "@/components/site/Footer";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SITE_DESCRIPTION } from "@/data/site";
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

export default function AboutPage() {
  return (
    <>
      <main className="page-shell">
        <Container className="pb-20">
          <SectionHeader
            eyebrow="About"
            title="Products built in Azerbaijan, designed for wider markets."
            description={SITE_DESCRIPTION}
          />

          <section className="mt-12 grid gap-8 rounded-[6px] border border-[var(--border)] bg-[rgba(255,255,255,0.018)] p-6 sm:p-8 lg:grid-cols-[0.9fr_1fr]">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-[color:var(--muted-foreground)]">Azerbaijan</p>
              <h2 className="mt-4 text-2xl font-semibold text-[color:var(--foreground)]">Built locally, designed to travel.</h2>
            </div>
            <div>
              <p className="text-pretty text-sm leading-7 text-[color:var(--foreground)]">
                Renowa Labs works across artificial intelligence, mobile applications, recruitment technology, data platforms, and applied software. Product strategy, design, engineering, and experimentation are treated as one connected practice.
              </p>
              <p lang="az" className="mt-5 text-pretty text-sm leading-7 text-[color:var(--muted-foreground)]">
                Biz Renowa Labs olaraq yerli və beynəlxalq bazarlar üçün süni intellekt əsaslı proqram məhsulları hazırlayırıq.
              </p>
            </div>
          </section>

          <section className="mt-16 grid gap-8 lg:grid-cols-[0.7fr_1fr]" aria-labelledby="focus-heading">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-[color:var(--muted-foreground)]">Focus</p>
              <h2 id="focus-heading" className="mt-4 text-2xl font-semibold text-[color:var(--foreground)] sm:text-3xl">
                Where the lab works.
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
        </Container>
      </main>
      <Footer />
    </>
  );
}
