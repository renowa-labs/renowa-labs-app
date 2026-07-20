"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Wordmark } from "@/components/brand/Wordmark";
import { ThemeToggle } from "@/components/site/ThemeToggle";
import { CONTACT_EMAIL, NAV_ITEMS, SITE_POSITIONING } from "@/data/site";
import { products } from "@/data/products";
import { cn } from "@/lib/cn";

const menuItems = [{ href: "/", label: "Home" }, ...NAV_ITEMS] as const;

const socialItems = [
  { href: "#", label: "LinkedIn" },
  { href: "#", label: "Instagram" },
  { href: "#", label: "X" },
] as const;

export function Header() {
  const pathname = usePathname();
  const scope = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.toggleAttribute("data-menu-open", open);

    return () => {
      document.body.removeAttribute("data-menu-open");
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useGSAP(
    () => {
      const overlay = scope.current;
      const panel = overlay?.querySelector<HTMLElement>(".renowa-menu-panel");
      const reveals = gsap.utils.toArray<HTMLElement>(".renowa-menu-reveal", overlay);
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (!overlay || !panel) return;

      if (reduceMotion) {
        gsap.set(overlay, { autoAlpha: open ? 1 : 0, pointerEvents: open ? "auto" : "none" });
        gsap.set(panel, { xPercent: 0 });
        gsap.set(reveals, { opacity: open ? 1 : 0, clipPath: "inset(0% 0% 0% 0%)" });
        return;
      }

      if (open) {
        gsap.set(overlay, { pointerEvents: "auto" });
        gsap.set(reveals, { clipPath: "inset(100% 0% 0% 0%)" });
        gsap.fromTo(overlay, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.24, ease: "power2.out" });
        gsap.fromTo(panel, { xPercent: 104 }, { xPercent: 0, duration: 0.62, ease: "expo.out" });
        gsap.fromTo(
          reveals,
          { opacity: 0, clipPath: "inset(100% 0% 0% 0%)" },
          { opacity: 1, clipPath: "inset(0% 0% 0% 0%)", duration: 0.44, ease: "power3.out", stagger: 0.045, delay: 0.12 },
        );
      } else {
        gsap.to(reveals, {
          opacity: 0,
          clipPath: "inset(0% 0% 100% 0%)",
          duration: 0.16,
          ease: "power2.in",
          stagger: { each: 0.015, from: "end" },
        });
        gsap.to(panel, { xPercent: 104, duration: 0.36, ease: "power2.inOut" });
        gsap.to(overlay, {
          autoAlpha: 0,
          duration: 0.26,
          ease: "power2.inOut",
          delay: 0.08,
          onComplete: () => {
            gsap.set(overlay, { pointerEvents: "none" });
          },
        });
      }
    },
    { scope, dependencies: [open] },
  );

  return (
    <header className="fixed inset-x-0 top-0 z-40 bg-transparent">
      <div className="flex h-16 w-full items-start justify-between px-5 pt-4 sm:px-8">
        <Wordmark />
        <div className="flex items-center gap-5">
          <ThemeToggle />
          <button
            ref={menuButtonRef}
            type="button"
            aria-expanded={open}
            aria-controls="renowa-menu"
            className="group inline-flex min-h-8 cursor-pointer items-center gap-2 rounded-sm text-[11px] uppercase tracking-[0.28em] text-[color:var(--foreground)] transition hover:text-[color:var(--muted-foreground)] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="relative size-5" aria-hidden="true">
              <span
                className={cn(
                  "absolute left-0 top-[7px] h-px w-5 bg-current transition duration-300",
                  open ? "translate-y-[3px] rotate-45" : "",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 top-[13px] h-px w-5 bg-current transition duration-300",
                  open ? "-translate-y-[3px] -rotate-45" : "",
                )}
              />
            </span>
            <span>{open ? "Close" : "Menu"}</span>
          </button>
        </div>
      </div>

      <div
        ref={scope}
        id="renowa-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Renowa Labs navigation"
        aria-hidden={!open}
        className="pointer-events-none fixed inset-0 z-[-1] invisible opacity-0"
      >
        <button
          type="button"
          aria-label="Close navigation menu"
          tabIndex={open ? undefined : -1}
          className="absolute inset-0 cursor-default bg-[rgba(0,0,0,0.54)] backdrop-blur-sm transition"
          onClick={() => setOpen(false)}
        />

        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <Image
            src="/logo/horizontal/renowa-labs-horizontal-dark-exact.svg"
            alt=""
            aria-hidden="true"
            width={1493}
            height={246}
            priority
            className="theme-logo-dark absolute left-[-4vw] top-1/2 w-[min(68rem,94vw)] max-w-none -translate-y-1/2 opacity-[0.08] blur-[2px]"
          />
          <Image
            src="/logo/horizontal/renowa-labs-horizontal-light-exact.svg"
            alt=""
            aria-hidden="true"
            width={1493}
            height={246}
            priority
            className="theme-logo-light absolute left-[-4vw] top-1/2 w-[min(68rem,94vw)] max-w-none -translate-y-1/2 opacity-[0.08] blur-[2px]"
          />
          <div className="absolute left-[8vw] top-1/2 hidden max-w-sm -translate-y-1/2 text-[color:var(--foreground)] lg:block">
            <p className="renowa-menu-reveal text-[11px] uppercase tracking-[0.28em] text-[color:var(--muted-foreground)]">
              Renowa Labs
            </p>
            <p className="renowa-menu-reveal mt-4 text-4xl font-semibold leading-none">{SITE_POSITIONING}</p>
          </div>
        </div>

        <aside className="renowa-menu-panel absolute right-0 top-0 flex h-svh w-full max-w-[38rem] flex-col overflow-hidden border-l border-[var(--border)] bg-[var(--background)] shadow-[-28px_0_90px_rgba(0,0,0,0.34)] sm:w-[min(40rem,46vw)]">
          <div className="flex min-h-16 items-start justify-between border-b border-[var(--border)] px-5 pt-4 sm:px-8">
            <Wordmark onClick={() => setOpen(false)} />
          </div>

          <div className="renowa-menu-scroll grid flex-1 content-between overflow-y-auto overflow-x-hidden overscroll-contain">
            <div className="grid gap-10 px-5 py-10 sm:px-8 sm:py-12">
              <nav aria-label="Primary navigation" className="grid gap-1">
                <p className="renowa-menu-reveal mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[color:var(--muted-foreground)]">
                  Menu
                </p>
                {menuItems.map((item, index) => {
                  const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(`${item.href}/`));

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      tabIndex={open ? undefined : -1}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "renowa-menu-reveal group flex items-baseline gap-3 rounded-sm py-1 text-[clamp(2rem,6vw,3.9rem)] font-semibold leading-none tracking-normal focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]",
                        active ? "text-[color:var(--foreground)]" : "text-[color:var(--muted-foreground)] hover:text-[color:var(--foreground)]",
                      )}
                    >
                      <span className="text-[11px] font-normal tabular-nums text-[color:var(--muted-foreground)]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="relative block overflow-hidden leading-none">
                        <span className="block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full group-focus-visible:-translate-y-full">
                          {item.label}
                        </span>
                        <span
                          aria-hidden="true"
                          className="absolute left-0 top-full block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full group-focus-visible:-translate-y-full"
                        >
                          {item.label}
                        </span>
                      </span>
                    </Link>
                  );
                })}
              </nav>

              <section className="renowa-menu-reveal border-t border-[var(--border)] pt-6" aria-labelledby="menu-products">
                <p
                  id="menu-products"
                  className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-[color:var(--muted-foreground)]"
                >
                  Products
                </p>
                <div className="grid gap-3">
                  {products.map((product, index) => (
                    <Link
                      key={product.slug}
                      href={`/products/${product.slug}`}
                      tabIndex={open ? undefined : -1}
                      onClick={() => setOpen(false)}
                      className="group grid grid-cols-[2.5rem_1fr_auto] items-center gap-3 rounded-sm border-b border-[var(--border)] pb-3 text-sm transition hover:border-[color:var(--foreground)] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
                    >
                      <span className="text-[11px] tabular-nums text-[color:var(--muted-foreground)]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[color:var(--foreground)]">{product.name}</span>
                      <span className="text-[11px] uppercase tracking-[0.16em] text-[color:var(--muted-foreground)]">
                        {product.status}
                      </span>
                    </Link>
                  ))}
                </div>
              </section>
            </div>

            <div className="grid border-t border-[var(--border)] sm:grid-cols-2">
              <section className="renowa-menu-reveal border-b border-[var(--border)] px-5 py-7 sm:border-b-0 sm:border-r sm:px-8">
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[color:var(--muted-foreground)]">
                  Let&apos;s talk
                </p>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  tabIndex={open ? undefined : -1}
                  className="inline-flex rounded-sm text-xl font-semibold leading-tight underline decoration-[var(--border)] underline-offset-8 transition hover:text-[color:var(--muted-foreground)] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
                >
                  {CONTACT_EMAIL}
                </a>
              </section>

              <section className="renowa-menu-reveal px-5 py-7 sm:px-8">
                <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-[color:var(--muted-foreground)]">
                  Socials
                </p>
                <div className="flex flex-wrap gap-4 text-[12px] uppercase tracking-[0.16em] text-[color:var(--muted-foreground)]">
                  {socialItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      tabIndex={open ? undefined : -1}
                      onClick={() => setOpen(false)}
                      className="rounded-sm transition hover:text-[color:var(--foreground)] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </aside>
      </div>
    </header>
  );
}
