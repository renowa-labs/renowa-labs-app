"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import type { Product } from "@/data/products";
import { AppStoreIcon } from "@/components/ui/AppStoreIcon";
import { buttonClassName } from "@/components/ui/Button";

export function ProductCard({ product }: { product: Product }) {
  const scope = useRef<HTMLElement>(null);

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
          {product.iconImage ? (
            <Image
              src={product.iconImage}
              alt={`${product.name} app icon`}
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
        <p className="mt-3 text-xs leading-6 text-[color:var(--muted-foreground)]">{product.shortDescription}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          <span className="rounded-sm border border-[var(--border)] px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-[color:var(--foreground)]">
            {product.category}
          </span>
          <span className="rounded-sm border border-[var(--border)] px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-[color:var(--muted-foreground)]">
            {product.status}
          </span>
        </div>
      </div>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
        <a
          href={product.appStoreUrl}
          className={buttonClassName({ variant: "secondary", className: "w-full sm:w-auto" })}
          aria-label={`Open ${product.name} on the App Store`}
        >
          <AppStoreIcon className="size-4 shrink-0" />
          App Store
        </a>
        <Link
          href={`/products/${product.slug}`}
          className="inline-flex min-h-10 items-center justify-center rounded-sm px-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-[color:var(--muted-foreground)] transition hover:text-[color:var(--foreground)] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)] sm:justify-start"
        >
          View product
        </Link>
      </div>
    </article>
  );
}
