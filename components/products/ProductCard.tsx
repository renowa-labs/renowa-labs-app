"use client";

import Image from "next/image";
import { type CSSProperties, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import type { Product } from "@/data/products";
import { AppStoreIcon } from "@/components/ui/AppStoreIcon";
import { buttonClassName } from "@/components/ui/Button";

export function ProductCard({ product }: { product: Product }) {
  const scope = useRef<HTMLElement>(null);
  const launchLabel = product.launchLabel ?? "App Store";
  const launchStyle = { "--product-accent": product.accent } as CSSProperties;
  const categoryLabels = product.cardTags ?? [product.category];

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(scope.current, { opacity: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        scope.current,
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          ease: "power3.out",
        },
      );
    },
    { scope },
  );

  return (
    <article
      ref={scope}
      className="group flex h-full flex-col rounded-[6px] border border-[var(--border)] bg-[rgba(255,255,255,0.018)] p-5 transition duration-300 hover:border-[rgba(255,255,255,0.28)] hover:bg-[rgba(255,255,255,0.03)]"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="grid size-12 shrink-0 place-items-center rounded-[4px] border border-[var(--border)] bg-[rgba(255,255,255,0.035)] text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--foreground)]">
          {product.logo ? (
            <Image
              src={product.logo}
              alt={`${product.name} logo`}
              width={48}
              height={48}
              className="size-full rounded-[4px] object-cover"
            />
          ) : (
            product.icon
          )}
        </div>
        <div className="rounded-sm border border-[var(--border)] px-2.5 py-1 text-[10px] text-[color:var(--muted-foreground)]">
          {product.year}
        </div>
      </div>
      <div className="mt-6 flex-1">
        <h2 className="text-lg font-semibold uppercase tracking-[0.16em] text-[color:var(--foreground)]">{product.name}</h2>
        {product.tagline ? (
          <p className="mt-3 text-xs font-semibold leading-6 text-[color:var(--foreground)]">{product.tagline}</p>
        ) : null}
        <p className="mt-3 text-xs leading-6 text-[color:var(--muted-foreground)]">{product.shortDescription}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {categoryLabels.map((label) => (
            <span
              key={label}
              className="rounded-sm border border-[var(--border)] px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-[color:var(--foreground)]"
            >
              {label}
            </span>
          ))}
          <span className="rounded-sm border border-[var(--border)] px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-[color:var(--muted-foreground)]">
            {product.status}
          </span>
        </div>
      </div>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
        <TrackedLink
          href={product.externalUrl}
          eventName="outbound_product_click"
          eventParams={{ product_name: product.name, destination: product.externalUrl }}
          style={launchStyle}
          className={buttonClassName({ variant: "secondary", className: "product-launch-button w-full sm:w-auto" })}
          aria-label={`Open ${product.name} ${launchLabel}`}
        >
          {product.launchIcon !== "none" ? <AppStoreIcon className="size-4 shrink-0" /> : null}
          {launchLabel}
        </TrackedLink>
        <TrackedLink
          href={`/products/${product.slug}`}
          eventName="product_click"
          eventParams={{ product_name: product.name, destination: `/products/${product.slug}` }}
          className="inline-flex min-h-10 items-center justify-center rounded-sm px-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-[color:var(--muted-foreground)] transition hover:text-[color:var(--foreground)] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)] sm:justify-start"
        >
          View product
        </TrackedLink>
      </div>
    </article>
  );
}
