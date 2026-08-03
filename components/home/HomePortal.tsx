"use client";

import Link from "next/link";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { products } from "@/data/products";
import { AnimatedSignalField } from "@/components/brand/AnimatedSignalField";
import { RenowaGlyphMark } from "@/components/brand/RenowaGlyphMark";

export function HomePortal() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(".home-reveal", { opacity: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        ".home-reveal",
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.07,
        },
      );
    },
    { scope },
  );

  return (
    <main
      ref={scope}
      className="relative flex min-h-svh overflow-hidden px-5 pb-20 pt-24 sm:px-8 lg:px-10"
    >
      <AnimatedSignalField />
      <div className="relative z-10 mx-auto flex min-h-0 w-full max-w-5xl flex-1 flex-col justify-center">
        <section className="mx-auto flex w-full flex-col items-center justify-center text-center">
          <p className="home-reveal mb-7 text-[11px] uppercase leading-none tracking-[0.34em] text-[color:var(--muted-foreground)]">
            [ PRODUCTS / AI / SOFTWARE / DIGITAL SERVICES ]
          </p>
          <RenowaGlyphMark className="home-reveal" />
          <h1 className="home-reveal mt-7 max-w-3xl text-balance text-base font-semibold leading-7 text-[color:var(--foreground)] sm:text-lg">
            We build products that make both humans&apos; and AIs&apos; lives easier.
          </h1>
          <p className="home-reveal mt-3 max-w-3xl text-pretty text-xs leading-6 text-[color:var(--muted-foreground)]">
            Renowa Labs designs and builds AI products, mobile applications, data platforms, and digital services for people and teams worldwide.
          </p>

          <div className="home-reveal mt-7 flex flex-wrap justify-center gap-x-7 gap-y-3">
            {products.map((product, index) => (
              <TrackedLink
                key={product.slug}
                href={`/products/${product.slug}`}
                eventName="product_click"
                eventParams={{ product_name: product.name, destination: `/products/${product.slug}` }}
                className="group inline-flex items-baseline gap-2 rounded-sm px-1 py-1 text-[12px] uppercase tracking-[0.22em] text-[color:var(--foreground)] transition duration-300 hover:-translate-y-0.5 hover:text-[color:var(--foreground)] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
              >
                <span className="text-[color:var(--muted-foreground)]">[{String(index + 1).padStart(2, "0")}]</span>
                <span className="text-[13px] font-bold tracking-[0.18em]">{product.name}</span>
                <span className="hidden text-[10px] lowercase tracking-[0.08em] text-[color:var(--muted-foreground)] sm:inline">
                  / {product.category}
                </span>
              </TrackedLink>
            ))}
          </div>
          <div className="home-reveal mt-7 flex flex-wrap justify-center gap-5 text-[12px] uppercase tracking-[0.2em] text-[color:var(--muted-foreground)]">
            <Link
              href="/products"
              className="transition hover:text-[color:var(--foreground)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
            >
              Products
            </Link>
            <Link
              href="/about"
              className="transition hover:text-[color:var(--foreground)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
            >
              About
            </Link>
            <TrackedLink
              href="/contact"
              eventName="contact_cta_click"
              eventParams={{ cta_text: "Contact", location: "home" }}
              className="transition hover:text-[color:var(--foreground)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
            >
              Contact
            </TrackedLink>
          </div>
        </section>
      </div>
    </main>
  );
}
