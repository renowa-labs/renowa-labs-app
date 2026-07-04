import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/site/Footer";
import { ButtonLink, buttonClassName } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { getProduct, getRelatedProducts, products } from "@/data/products";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) {
    notFound();
  }

  return {
    title: product.name,
    description: product.shortDescription,
    alternates: {
      canonical: `/products/${product.slug}`,
    },
    openGraph: {
      title: `${product.name} by Renowa Labs`,
      description: product.shortDescription,
      url: `/products/${product.slug}`,
      images: [
        {
          url: product.screenshotPlaceholder,
          width: 720,
          height: 520,
          alt: `${product.name} product visual`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} by Renowa Labs`,
      description: product.shortDescription,
      images: [product.screenshotPlaceholder],
    },
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = getRelatedProducts(product.slug);

  return (
    <>
      <main className="page-shell">
        <Container className="pb-20">
          <Link
            href="/products"
            className="mb-8 inline-flex rounded-full text-sm font-medium text-[var(--muted-foreground)] transition hover:text-[var(--foreground)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
          >
            Back to products
          </Link>

          <section className="grid gap-10 lg:grid-cols-[1fr_0.86fr] lg:items-start">
            <div>
              <div className="flex flex-wrap gap-2">
                {[product.platform, product.status, product.category].map((item) => (
                  <span
                    key={item}
                    className="rounded-sm border border-[var(--border)] px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-[var(--muted-foreground)]"
                  >
                    {item}
                  </span>
                ))}
              </div>
              <h1 className="mt-6 text-balance text-3xl font-semibold leading-[1.06] text-[var(--foreground)] sm:text-5xl">
                {product.name}
              </h1>
              <p className="mt-5 max-w-2xl text-pretty text-sm leading-7 text-[var(--muted-foreground)]">
                {product.shortDescription}
              </p>
              <p className="mt-8 max-w-2xl text-sm leading-7 text-[var(--muted-foreground)]">
                {product.longDescription}
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href={product.appStoreUrl}
                  className={buttonClassName({ variant: "primary", className: "w-full sm:w-auto" })}
                >
                  Open App Store
                </a>
                <ButtonLink href="/contact" variant="secondary" className="w-full sm:w-auto">
                  Discuss a product
                </ButtonLink>
              </div>
            </div>

            <div className="rounded-[6px] border border-[var(--border)] bg-[rgba(255,255,255,0.018)] p-3">
              <Image
                src={product.screenshotPlaceholder}
                alt={`${product.name} interface placeholder`}
                width={720}
                height={520}
                className="aspect-[720/520] w-full rounded-[6px] object-cover"
              />
            </div>
          </section>

          <section className="mt-16 grid gap-8 lg:grid-cols-[0.7fr_1fr]">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-[var(--muted-foreground)]">Features</p>
              <h2 className="mt-4 text-3xl font-semibold text-[var(--foreground)]">Built around focused use.</h2>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {product.features.map((feature) => (
                <li
                  key={feature}
                  className="rounded-[6px] border border-[var(--border)] bg-[rgba(255,255,255,0.018)] p-4 text-xs leading-6 text-[var(--foreground)]"
                >
                  {feature}
                </li>
              ))}
            </ul>
          </section>

          {relatedProducts.length ? (
            <section className="mt-16 border-t border-[var(--border)] pt-10">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-[var(--muted-foreground)]">Related</p>
                  <h2 className="mt-3 text-2xl font-semibold text-[var(--foreground)]">More from the lab</h2>
                </div>
                <ButtonLink href="/products" variant="ghost">
                  View all products
                </ButtonLink>
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {relatedProducts.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/products/${related.slug}`}
                    className="rounded-[6px] border border-[var(--border)] bg-[rgba(255,255,255,0.018)] p-5 transition hover:border-[rgba(255,255,255,0.28)] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
                  >
                    <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--foreground)]">{related.name}</h3>
                    <p className="mt-2 text-xs leading-6 text-[var(--muted-foreground)]">
                      {related.shortDescription}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}
        </Container>
      </main>
      <Footer />
    </>
  );
}
