import type { Metadata } from "next";
import { Footer } from "@/components/site/Footer";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TeamCard } from "@/components/team/TeamCard";
import { team } from "@/data/team";

export const metadata: Metadata = {
  title: "About",
  description: "The story and team behind Renowa Labs, a small AI-first technology studio .",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Renowa Labs",
    description: "A small technology studio  building AI-focused products.",
    url: "/about",
  },
};

export default function AboutPage() {
  return (
    <>
      <main className="page-shell">
        <Container className="pb-20">
          <SectionHeader
            eyebrow="About"
            title="Small team. Sharp products."
            description="Renowa Labs is a technology studio  building AI-focused products for both local and global markets. We believe small teams can create precise, useful, and globally competitive software when design, engineering, and experimentation work together."
          />

          <section className="mt-12 grid gap-6 rounded-[6px] border border-[var(--border)] bg-[rgba(255,255,255,0.018)] p-6 sm:p-8 lg:grid-cols-[0.9fr_1fr]">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-[color:var(--muted-foreground)]">Azerbaijan</p>
              <h2 className="mt-4 text-2xl font-semibold text-[color:var(--foreground)]">Built locally, designed to travel.</h2>
            </div>
            <p lang="az" className="text-pretty text-sm leading-7 text-[color:var(--foreground)]">
              Biz Renowa Labs olaraq yerli və qlobal bazar üçün texnoloji, əsasən Süni İntellekt ağırlıqlı həllər
              üzərində çalışırıq.
            </p>
          </section>

          <section className="mt-16">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-[color:var(--muted-foreground)]">Team</p>
                <h2 className="mt-4 text-2xl font-semibold text-[color:var(--foreground)] sm:text-3xl">
                  3 people. Multiple shipped products. One lab mindset.
                </h2>
              </div>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {team.map((member) => (
                <TeamCard key={member.name} member={member} />
              ))}
            </div>
          </section>
        </Container>
      </main>
      <Footer />
    </>
  );
}
