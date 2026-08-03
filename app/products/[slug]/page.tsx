import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { JsonLd } from "@/components/seo/JsonLd";
import { Footer } from "@/components/site/Footer";
import { AppStoreIcon } from "@/components/ui/AppStoreIcon";
import { ButtonLink, buttonClassName } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import type { Product } from "@/data/products";
import { SITE_NAME, SITE_URL } from "@/data/site";
import { getIndexableProducts, getProduct, getRelatedProducts } from "@/data/products";
import { getPublishedArticles } from "@/lib/engineering/content";
import { cn } from "@/lib/cn";
import { absoluteUrl, createPageMetadata } from "@/lib/seo";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getIndexableProducts().map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) {
    notFound();
  }

  const image = product.images[0];

  return createPageMetadata({
    title: product.seoTitle,
    description: product.seoDescription,
    path: `/products/${product.slug}`,
    image: image?.src,
    imageAlt: image?.alt,
    imageWidth: image?.width,
    imageHeight: image?.height,
    indexable: product.indexable,
  });
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = getRelatedProducts(product.slug);
  const launchLabel = product.launchLabel ?? "Open App Store";
  const launchStyle = { "--product-accent": product.accent } as CSSProperties;
  const detailLabels = product.cardTags
    ? [product.status, ...product.cardTags]
    : [...product.platforms, product.status, product.category];
  const relatedArticles = getPublishedArticles().filter((article) => product.relatedArticles.includes(article.slug));
  const productUrl = `${SITE_URL}/products/${product.slug}`;
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: product.name,
    description: product.fullDescription,
    url: productUrl,
    sameAs: product.domain,
    image: absoluteUrl(product.images[0]?.src ?? product.logo),
    applicationCategory: product.category,
    ...(product.slug === "save-more-dreams" ? { operatingSystem: "iOS" } : {}),
    creator: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    dateModified: product.updatedAt,
    featureList: product.features,
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Products", item: `${SITE_URL}/products` },
      { "@type": "ListItem", position: 3, name: product.name, item: productUrl },
    ],
  };

  return (
    <>
      <main className="page-shell">
        <Container className="pb-20">
          <Link
            href="/products"
            className="mb-8 inline-flex rounded-full text-sm font-medium text-[color:var(--muted-foreground)] transition hover:text-[color:var(--foreground)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
          >
            Back to products
          </Link>

          <section className="grid gap-10 lg:grid-cols-[1fr_0.86fr] lg:items-start">
            <div>
              <div className="flex flex-wrap gap-2">
                {detailLabels.map((item) => (
                  <span
                    key={item}
                    className="rounded-sm border border-[var(--border)] px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-[color:var(--muted-foreground)]"
                  >
                    {item}
                  </span>
                ))}
              </div>
              <h1 className="mt-6 text-balance text-3xl font-semibold leading-[1.06] text-[color:var(--foreground)] sm:text-5xl">
                {product.name}
              </h1>
              {product.tagline ? (
                <p className="mt-5 max-w-2xl text-pretty text-base font-semibold leading-7 text-[color:var(--foreground)]">
                  {product.tagline}
                </p>
              ) : null}
              <p className="mt-5 max-w-2xl text-pretty text-sm leading-7 text-[color:var(--muted-foreground)]">
                {product.shortDescription}
              </p>
              <p className="mt-8 max-w-2xl whitespace-pre-line text-sm leading-7 text-[color:var(--muted-foreground)]">
                {product.fullDescription}
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <TrackedLink
                  href={product.externalUrl}
                  eventName="outbound_product_click"
                  eventParams={{ product_name: product.name, destination: product.externalUrl }}
                  style={launchStyle}
                  className={buttonClassName({ variant: "primary", className: "product-launch-button w-full sm:w-auto" })}
                >
                  {product.launchIcon !== "none" ? <AppStoreIcon className="size-4 shrink-0" /> : null}
                  {launchLabel}
                </TrackedLink>
                <TrackedLink
                  href="/contact"
                  eventName="contact_cta_click"
                  eventParams={{ cta_text: "Discuss a product", location: "product_detail" }}
                  className={buttonClassName({ variant: "secondary", className: "w-full sm:w-auto" })}
                >
                  Discuss a product
                </TrackedLink>
              </div>
            </div>

            {product.logo ? (
              <div className="grid min-h-[24rem] place-items-center rounded-[6px] border border-[var(--border)] bg-[rgba(255,255,255,0.018)] p-8">
                <div className="grid gap-5 text-center">
                  <Image
                    src={product.logo}
                    alt={`${product.name} logo`}
                    width={168}
                    height={168}
                    priority
                    className="mx-auto size-36 rounded-[28px] object-cover shadow-[0_24px_80px_rgba(0,0,0,0.24)] sm:size-[10.5rem]"
                  />
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[color:var(--muted-foreground)]">
                      {product.launchIcon === "none" ? product.platforms.join(" / ") : "App Store"}
                    </p>
                    <p className="mt-2 text-sm font-semibold uppercase tracking-[0.16em] text-[color:var(--foreground)]">
                      {product.name}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-[6px] border border-[var(--border)] bg-[rgba(255,255,255,0.018)] p-3">
                <Image
                  src={product.images[0].src}
                  alt={product.images[0].alt}
                  width={product.images[0].width}
                  height={product.images[0].height}
                  className="aspect-[720/520] w-full rounded-[6px] object-cover"
                />
              </div>
            )}
          </section>

          {product.preview ? <ProductPreviewSection product={product} /> : null}

          <section className="mt-16 grid gap-8 lg:grid-cols-[0.7fr_1fr]">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-[color:var(--muted-foreground)]">Features</p>
              <h2 className="mt-4 text-3xl font-semibold text-[color:var(--foreground)]">
                {product.featureHeading ?? "Built around focused use."}
              </h2>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {product.features.map((feature) => (
                <li
                  key={feature}
                  className="rounded-[6px] border border-[var(--border)] bg-[rgba(255,255,255,0.018)] p-4 text-xs leading-6 text-[color:var(--foreground)]"
                >
                  {feature}
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-16 grid gap-4 md:grid-cols-3" aria-label={`${product.name} product context`}>
            {[
              ["Problem", product.problem],
              ["Solution", product.solution],
              ["Audience", product.audience.join("; ")],
            ].map(([label, value]) => (
              <div key={label} className="rounded-[6px] border border-[var(--border)] bg-[rgba(255,255,255,0.018)] p-5">
                <h2 className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[color:var(--muted-foreground)]">{label}</h2>
                <p className="mt-4 text-xs leading-6 text-[color:var(--foreground)]">{value}</p>
              </div>
            ))}
          </section>

          {relatedArticles.length ? (
            <section className="mt-16 border-t border-[var(--border)] pt-10" aria-labelledby="product-engineering-heading">
              <p className="text-[10px] uppercase tracking-[0.3em] text-[color:var(--muted-foreground)]">Engineering</p>
              <h2 id="product-engineering-heading" className="mt-3 text-2xl font-semibold text-[color:var(--foreground)]">
                How {product.name} is being built
              </h2>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {relatedArticles.map((article) => (
                  <Link
                    key={article.slug}
                    href={`/engineering/${article.slug}`}
                    className="rounded-[6px] border border-[var(--border)] p-5 transition hover:border-[rgba(255,255,255,0.28)]"
                  >
                    <h3 className="text-sm font-semibold leading-6 text-[color:var(--foreground)]">{article.title}</h3>
                    <p className="mt-2 text-xs leading-6 text-[color:var(--muted-foreground)]">{article.description}</p>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}

          {relatedProducts.length ? (
            <section className="mt-16 border-t border-[var(--border)] pt-10">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-[color:var(--muted-foreground)]">Related</p>
                  <h2 className="mt-3 text-2xl font-semibold text-[color:var(--foreground)]">More from the lab</h2>
                </div>
                <ButtonLink href="/products" variant="ghost">
                  View all products
                </ButtonLink>
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {relatedProducts.map((related) => (
                  <TrackedLink
                    key={related.slug}
                    href={`/products/${related.slug}`}
                    eventName="product_click"
                    eventParams={{ product_name: related.name, destination: `/products/${related.slug}` }}
                    className="rounded-[6px] border border-[var(--border)] bg-[rgba(255,255,255,0.018)] p-5 transition hover:border-[rgba(255,255,255,0.28)] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
                  >
                    <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--foreground)]">{related.name}</h3>
                    <p className="mt-2 text-xs leading-6 text-[color:var(--muted-foreground)]">
                      {related.shortDescription}
                    </p>
                  </TrackedLink>
                ))}
              </div>
            </section>
          ) : null}
        </Container>
      </main>
      <Footer />
      <JsonLd data={[productJsonLd, breadcrumbJsonLd]} />
    </>
  );
}

function ProductPreviewSection({ product }: { product: Product }) {
  const preview = product.preview;

  if (!preview) {
    return null;
  }

  const isMobileFrame = preview.frame === "mobile";

  return (
    <section className="mt-16 border-y border-[var(--border)] py-12">
      <div className="grid gap-10 lg:grid-cols-[0.72fr_1fr] lg:items-center">
        <div>
          <div className="flex items-center gap-4">
            <span className="h-px w-10" style={{ backgroundColor: product.accent }} />
            <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-[color:var(--muted-foreground)]">
              {preview.eyebrow}
            </p>
          </div>
          <h2 className="mt-5 max-w-xl text-3xl font-semibold leading-tight text-[color:var(--foreground)]">
            {preview.heading}
          </h2>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-[color:var(--muted-foreground)]">{preview.description}</p>

          <ol className="mt-8 grid gap-3">
            {preview.steps.map((step, index) => (
              <li
                key={step}
                className="grid grid-cols-[2.5rem_1fr] items-center border-t border-[var(--border)] pt-3 text-xs leading-6 text-[color:var(--foreground)]"
              >
                <span className="text-[10px] tabular-nums text-[color:var(--muted-foreground)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className={cn("w-full", isMobileFrame ? "flex justify-center lg:justify-end" : "")}>
          {isMobileFrame ? <MobilePreviewFrame product={product} /> : <WebPreviewFrame product={product} />}
          {preview.caption ? (
            <p className="mx-auto mt-4 max-w-xl text-center text-[11px] leading-5 text-[color:var(--muted-foreground)]">
              {preview.caption}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function MobilePreviewFrame({ product }: { product: Product }) {
  return (
    <div className="w-full max-w-[18rem] rounded-[2.25rem] border border-[var(--border)] bg-[rgba(255,255,255,0.04)] p-2 shadow-[0_26px_90px_rgba(0,0,0,0.24)]">
      <div className="relative aspect-[9/19.5] overflow-hidden rounded-[1.75rem] border border-[rgba(255,255,255,0.09)] bg-[var(--muted)]">
        <span className="absolute left-1/2 top-3 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-[rgba(0,0,0,0.42)]" />
        <PreviewMedia product={product} className="h-full w-full object-cover" />
      </div>
    </div>
  );
}

function WebPreviewFrame({ product }: { product: Product }) {
  return (
    <div className="overflow-hidden rounded-[6px] border border-[var(--border)] bg-[rgba(255,255,255,0.025)] shadow-[0_26px_90px_rgba(0,0,0,0.2)]">
      <div className="flex h-9 items-center gap-2 border-b border-[var(--border)] px-4">
        <span className="size-2 rounded-full bg-[rgba(255,255,255,0.28)]" />
        <span className="size-2 rounded-full bg-[rgba(255,255,255,0.18)]" />
        <span className="size-2 rounded-full bg-[rgba(255,255,255,0.12)]" />
      </div>
      <div className="aspect-[16/10] bg-[var(--muted)]">
        <PreviewMedia product={product} className="h-full w-full object-cover" />
      </div>
    </div>
  );
}

function PreviewMedia({ product, className }: { product: Product; className: string }) {
  const preview = product.preview;

  if (!preview) {
    return null;
  }

  if (preview.videoUrl) {
    return (
      <video
        src={preview.videoUrl}
        poster={preview.posterImage}
        controls
        playsInline
        preload="metadata"
        className={className}
        aria-label={`${product.name} video preview`}
      />
    );
  }

  return (
    <div className={cn("relative grid place-items-center overflow-hidden", className)}>
      {preview.posterImage ? (
        <Image
          src={preview.posterImage}
          alt=""
          fill
          sizes={preview.frame === "mobile" ? "18rem" : "(min-width: 1024px) 48rem, 100vw"}
          className="object-cover opacity-35"
        />
      ) : null}
      <div className="relative z-10 grid justify-items-center gap-4 px-6 text-center">
        <span className="grid size-14 place-items-center rounded-full border border-[var(--border)] bg-[rgba(255,255,255,0.07)]">
          <span className="ml-1 block size-0 border-y-[8px] border-l-[12px] border-y-transparent border-l-[var(--foreground)]" />
        </span>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[color:var(--muted-foreground)]">
            Preview reel
          </p>
          <p className="mt-2 text-sm font-semibold uppercase tracking-[0.16em] text-[color:var(--foreground)]">
            {product.name}
          </p>
        </div>
      </div>
    </div>
  );
}
