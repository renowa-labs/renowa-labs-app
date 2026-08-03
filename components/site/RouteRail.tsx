"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { NAV_ITEMS } from "@/data/site";
import { products } from "@/data/products";
import { cn } from "@/lib/cn";

const routeItems = [{ href: "/", label: "Home" }, ...NAV_ITEMS] as const;

export function RouteRail() {
  const pathname = usePathname();
  const scope = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useGSAP(
    () => {
      const items = gsap.utils.toArray<HTMLElement>(".route-rail-item", scope.current);
      const stems = gsap.utils.toArray<HTMLElement>(".route-rail-stem", scope.current);
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduceMotion) {
        gsap.set(items, { opacity: open ? 1 : 0, x: 0 });
        gsap.set(stems, { opacity: open ? 1 : 0, scaleY: open ? 1 : 0 });
        return;
      }

      if (open) {
        gsap.fromTo(
          stems,
          { opacity: 0, scaleY: 0 },
          { opacity: 1, scaleY: 1, duration: 0.28, ease: "power2.out", stagger: 0.025 },
        );
        gsap.fromTo(
          items,
          { opacity: 0, x: -12 },
          { opacity: 1, x: 0, duration: 0.34, ease: "power2.out", stagger: 0.035 },
        );
      } else {
        gsap.to(items, { opacity: 0, x: -10, duration: 0.16, ease: "power2.in", stagger: { each: 0.018, from: "end" } });
        gsap.to(stems, { opacity: 0, scaleY: 0, duration: 0.2, ease: "power2.in", stagger: { each: 0.014, from: "end" } });
      }
    },
    { scope, dependencies: [open] },
  );

  const activeLabel =
    routeItems.find((item) => pathname === item.href || (item.href !== "/" && pathname.startsWith(`${item.href}/`)))
      ?.label ?? "Route";

  return (
    <div
      ref={scope}
      className="fixed left-4 top-20 z-50 sm:left-7 sm:top-1/2 sm:-translate-y-1/2"
      aria-label="Renowa navigation rail"
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls="renowa-route-rail"
        className="group flex min-h-11 items-center gap-3 rounded-full border border-[var(--border)] bg-[var(--control-bg)] px-3 text-[12px] uppercase tracking-[0.2em] text-[color:var(--foreground)] shadow-[0_14px_50px_rgba(0,0,0,0.2)] backdrop-blur-md transition duration-300 hover:-translate-y-0.5 hover:border-[rgba(127,127,127,0.38)] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
        onClick={() => setOpen((value) => !value)}
      >
        <span className="relative grid size-5 place-items-center rounded-full border border-[var(--border)]">
          <span
            className={cn(
              "absolute h-px w-2.5 bg-current transition duration-300",
              open ? "rotate-45" : "rotate-0",
            )}
          />
          <span
            className={cn(
              "absolute h-px w-2.5 bg-current transition duration-300",
              open ? "-rotate-45" : "rotate-90",
            )}
          />
        </span>
        <span>{open ? "Close" : "Routes"}</span>
        <span className="hidden max-w-20 truncate text-[10px] text-[color:var(--muted-foreground)] sm:inline">
          / {activeLabel}
        </span>
      </button>

      <nav
        id="renowa-route-rail"
        aria-hidden={!open}
        className={cn(
          "absolute left-0 top-14 w-[min(18rem,calc(100vw-2rem))] rounded-3xl border border-[var(--border)] bg-[var(--control-bg)] px-2 py-3 shadow-[0_20px_70px_rgba(0,0,0,0.18)] backdrop-blur-md transition sm:left-2 sm:w-[min(18rem,calc(100vw-4rem))] sm:rounded-none sm:border-0 sm:bg-transparent sm:p-0 sm:shadow-none sm:backdrop-blur-none",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <div className="grid gap-1">
          {routeItems.map((item, index) => {
            const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(`${item.href}/`));
            const isFirst = index === 0;
            const isLastMain = index === routeItems.length - 1;

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                onClick={() => setOpen(false)}
                tabIndex={open ? undefined : -1}
                className={cn(
                  "route-rail-item group grid min-h-11 grid-cols-[1rem_2.5rem_1fr] items-center gap-3 rounded-full border border-transparent px-3 text-[12px] uppercase tracking-[0.18em] opacity-0 transition duration-300 hover:translate-x-1 hover:border-[var(--border)] hover:bg-[var(--control-bg)] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]",
                  active
                    ? "border-[var(--border)] bg-[var(--control-bg)] text-[color:var(--foreground)]"
                    : "text-[color:var(--muted-foreground)]",
                )}
              >
                <span className="relative flex h-full items-center justify-center" aria-hidden="true">
                  <span
                    className={cn(
                      "route-rail-stem absolute left-1/2 w-px -translate-x-1/2 origin-center bg-[var(--border)] opacity-0",
                      isFirst && "bottom-0 top-1/2",
                      isLastMain && "bottom-1/2 top-0 sm:bottom-0",
                      !isFirst && !isLastMain && "inset-y-0",
                    )}
                  />
                  <span className="relative z-10 size-2 rounded-full border border-[var(--border)] bg-[var(--background)] transition group-hover:scale-125" />
                </span>
                <span className="text-[10px] tabular-nums text-[color:var(--muted-foreground)]">
                  {String(index).padStart(2, "0")}
                </span>
                <span>{item.label}</span>
              </Link>
            );
          })}
          {products.map((product, productIndex) => {
            const href = `/products/${product.slug}`;
            const active = pathname === href;
            const isLastProduct = productIndex === products.length - 1;

            return (
              <TrackedLink
                key={product.slug}
                href={href}
                eventName="product_click"
                eventParams={{ product_name: product.name, destination: href }}
                aria-current={active ? "page" : undefined}
                onClick={() => setOpen(false)}
                tabIndex={open ? undefined : -1}
                className={cn(
                  "route-rail-item group hidden min-h-10 grid-cols-[1rem_2.5rem_1fr] items-center gap-3 rounded-full border border-transparent px-3 text-[11px] uppercase tracking-[0.16em] opacity-0 transition duration-300 hover:translate-x-1 hover:border-[var(--border)] hover:bg-[var(--control-bg)] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)] sm:ml-6 sm:grid",
                  active
                    ? "border-[var(--border)] bg-[var(--control-bg)] text-[color:var(--foreground)]"
                    : "text-[color:var(--muted-foreground)]",
                )}
              >
                <span className="relative flex h-full items-center justify-center" aria-hidden="true">
                  <span
                    className={cn(
                      "route-rail-stem absolute left-1/2 w-px -translate-x-1/2 origin-center bg-[var(--border)] opacity-0",
                      isLastProduct ? "bottom-1/2 top-0" : "inset-y-0",
                    )}
                  />
                  <span className="relative z-10 size-1.5 rounded-full border border-[var(--border)] bg-[var(--background)] transition group-hover:scale-125" />
                </span>
                <span className="text-[10px]">{product.icon}</span>
                <span>{product.name}</span>
              </TrackedLink>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
