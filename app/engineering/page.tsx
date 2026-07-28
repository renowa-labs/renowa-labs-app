import type { Metadata } from "next";
import { ArticleCard } from "@/components/engineering/ArticleCard";
import { Footer } from "@/components/site/Footer";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getPublishedArticles } from "@/lib/engineering/content";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Engineering",
  description:
    "Practical Renowa Labs guides for founders and product teams covering AI products, SaaS operations, security, payments, cloud infrastructure, and software engineering.",
  path: "/engineering",
});

export default function EngineeringPage() {
  const articles = getPublishedArticles();

  return (
    <>
      <main className="page-shell">
        <Container className="pb-20">
          <SectionHeader
            eyebrow="Engineering"
            title="Field guides for building and operating software."
            description="Original, researched guidance on AI products, startup operations, security, payments, infrastructure, and the systems behind dependable digital products."
          />

          <section className="mt-12 grid gap-4 md:grid-cols-2" aria-label="Published engineering articles">
            {articles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </section>
        </Container>
      </main>
      <Footer />
    </>
  );
}
