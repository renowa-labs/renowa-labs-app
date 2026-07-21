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
    "Original engineering articles from Renowa Labs about AI products, recruitment technology, data quality, mobile applications, and software engineering.",
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
            title="How the products are shaped."
            description="Original notes on product engineering, data quality, candidate experience, and building AI-powered software."
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
