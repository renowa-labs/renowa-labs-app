import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { ArticleBody } from "@/components/engineering/ArticleBody";
import { JsonLd } from "@/components/seo/JsonLd";
import { Footer } from "@/components/site/Footer";
import { ButtonLink, buttonClassName } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { CONTACT_EMAIL, SITE_NAME, SITE_URL } from "@/data/site";
import { getProduct } from "@/data/products";
import {
  formatArticleDate,
  getPublishedArticle,
  getPublishedArticles,
  getRelatedArticles,
} from "@/lib/engineering/content";
import { absoluteUrl, createPageMetadata } from "@/lib/seo";

type EngineeringArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getPublishedArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: EngineeringArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getPublishedArticle(slug);

  if (!article) notFound();

  return createPageMetadata({
    title: article.metaTitle ?? article.title,
    description: article.metaDescription ?? article.description,
    path: article.canonicalUrl,
    image: article.coverImage,
    imageAlt: `${article.title} — Renowa Labs Engineering`,
    type: "article",
    publishedTime: article.publishedAt,
    modifiedTime: article.updatedAt,
  });
}

export default async function EngineeringArticlePage({ params }: EngineeringArticlePageProps) {
  const { slug } = await params;
  const article = getPublishedArticle(slug);

  if (!article) notFound();

  const relatedProduct = article.relatedProduct ? getProduct(article.relatedProduct) : undefined;
  const relatedArticles = getRelatedArticles(article);
  const articleUrl = `${SITE_URL}/engineering/${article.slug}`;
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.metaDescription ?? article.description,
    image: absoluteUrl(article.coverImage),
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    mainEntityOfPage: articleUrl,
    articleSection: article.category,
    keywords: article.tags.join(", "),
    author: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      email: CONTACT_EMAIL,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo/png/renowa-logo-light-bg.png`,
      },
    },
    ...(relatedProduct
      ? {
          about: {
            "@type": "SoftwareApplication",
            name: relatedProduct.name,
            url: `${SITE_URL}/products/${relatedProduct.slug}`,
          },
        }
      : {}),
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Engineering", item: `${SITE_URL}/engineering` },
      { "@type": "ListItem", position: 3, name: article.title, item: articleUrl },
    ],
  };

  return (
    <>
      <main className="page-shell">
        <Container className="pb-20">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2 text-xs text-[color:var(--muted-foreground)]">
              <li><Link href="/">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/engineering">Engineering</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-[color:var(--foreground)]">{article.title}</li>
            </ol>
          </nav>

          <article className="mt-10">
            <header className="max-w-4xl">
              <p className="text-[10px] uppercase tracking-[0.28em] text-[color:var(--foreground)]">{article.category}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-sm border border-[var(--border)] px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-[color:var(--muted-foreground)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="mt-6 text-balance text-3xl font-semibold leading-tight text-[color:var(--foreground)] sm:text-5xl">
                {article.title}
              </h1>
              <p className="mt-5 max-w-3xl text-pretty text-base leading-7 text-[color:var(--muted-foreground)]">
                {article.description}
              </p>
              <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-xs text-[color:var(--muted-foreground)]">
                <span>{article.author}</span>
                <time dateTime={article.publishedAt}>{formatArticleDate(article.publishedAt)}</time>
                <span>{article.readingMinutes} min read</span>
              </div>
            </header>

            <div className="mt-10 overflow-hidden rounded-[6px] border border-[var(--border)] bg-[var(--muted)]">
              <Image
                src={article.coverImage}
                alt={`${article.title} cover image`}
                width={1200}
                height={630}
                priority
                sizes="(min-width: 1024px) 1024px, calc(100vw - 2.5rem)"
                className="aspect-[1200/630] w-full object-cover"
              />
            </div>

            <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_16rem] lg:items-start">
              <ArticleBody content={article.content} />
              <aside className="grid gap-6 lg:sticky lg:top-24">
                {relatedProduct ? (
                  <section className="rounded-[6px] border border-[var(--border)] bg-[rgba(255,255,255,0.018)] p-5">
                    <p className="text-[10px] uppercase tracking-[0.24em] text-[color:var(--muted-foreground)]">Related product</p>
                    <h2 className="mt-3 text-lg font-semibold text-[color:var(--foreground)]">{relatedProduct.name}</h2>
                    <p className="mt-3 text-xs leading-6 text-[color:var(--muted-foreground)]">{relatedProduct.shortDescription}</p>
                    <TrackedLink
                      href={`/products/${relatedProduct.slug}`}
                      eventName="product_click"
                      eventParams={{
                        product_name: relatedProduct.name,
                        destination: `/products/${relatedProduct.slug}`,
                      }}
                      className={buttonClassName({ variant: "secondary", className: "mt-5 w-full" })}
                    >
                      View product
                    </TrackedLink>
                  </section>
                ) : null}
                <ButtonLink href="/engineering" variant="ghost" className="w-full">
                  All engineering articles
                </ButtonLink>
              </aside>
            </div>
          </article>

          {relatedArticles.length ? (
            <section className="mt-16 border-t border-[var(--border)] pt-10" aria-labelledby="related-articles-heading">
              <p className="text-[10px] uppercase tracking-[0.3em] text-[color:var(--muted-foreground)]">Continue reading</p>
              <h2 id="related-articles-heading" className="mt-3 text-2xl font-semibold text-[color:var(--foreground)]">
                Related engineering articles
              </h2>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {relatedArticles.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/engineering/${related.slug}`}
                    className="rounded-[6px] border border-[var(--border)] p-5 transition hover:border-[rgba(255,255,255,0.28)]"
                  >
                    <h3 className="text-sm font-semibold leading-6 text-[color:var(--foreground)]">{related.title}</h3>
                    <p className="mt-2 text-xs leading-6 text-[color:var(--muted-foreground)]">{related.description}</p>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}
        </Container>
      </main>
      <Footer />
      <JsonLd data={[articleJsonLd, breadcrumbJsonLd]} />
    </>
  );
}
