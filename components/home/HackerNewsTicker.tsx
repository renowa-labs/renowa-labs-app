"use client";

import { useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";

type HackerNewsItem = {
  title: string;
  url: string;
  publishedAt: string | null;
};

type HackerNewsResponse = {
  items?: HackerNewsItem[];
};

const FALLBACK_ITEMS: HackerNewsItem[] = [
  {
    title: "AI products, startup systems, developer tools, and frontier software",
    url: "https://news.ycombinator.com/rss",
    publishedAt: null,
  },
];

export function HackerNewsTicker() {
  const [items, setItems] = useState<HackerNewsItem[]>(FALLBACK_ITEMS);

  useEffect(() => {
    const controller = new AbortController();

    async function loadHeadlines() {
      try {
        const response = await fetch("/api/hacker-news", {
          signal: controller.signal,
        });

        if (!response.ok) {
          return;
        }

        const data = (await response.json()) as HackerNewsResponse;
        const headlines = data.items?.filter((item) => item.title && item.url).slice(0, 12);

        if (headlines?.length) {
          setItems(headlines);
        }
      } catch (error) {
        void error;
      }
    }

    loadHeadlines();

    return () => {
      controller.abort();
    };
  }, []);

  const tickerItems = useMemo(() => [...items, ...items], [items]);
  const duration = `${Math.max(24, items.length * 5)}s`;

  return (
    <aside
      aria-label="Hacker News headlines"
      className="home-reveal absolute inset-x-0 bottom-0 z-20 px-5 pb-4 sm:px-8 lg:px-10"
    >
      <div className="mx-auto flex max-w-6xl items-center gap-4 border-y border-[color:var(--border)] bg-[color:var(--control-bg)]/80 py-2.5 text-[10px] uppercase leading-none tracking-[0.18em] text-[color:var(--muted-foreground)] shadow-[0_16px_50px_rgba(0,0,0,0.16)] backdrop-blur-md">
        <a
          href="https://news.ycombinator.com/rss"
          className="shrink-0 px-3 text-[color:var(--foreground)] transition hover:text-[color:var(--muted-foreground)] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
          rel="noreferrer"
          target="_blank"
        >
          HN Feed
        </a>
        <div
          className="ticker-mask min-w-0 flex-1 overflow-hidden"
          style={{ "--ticker-duration": duration } as CSSProperties}
        >
          <div className="ticker-track flex w-max items-center gap-8">
            {tickerItems.map((item, index) => (
              <a
                key={`${item.url}-${index}`}
                href={item.url}
                className="inline-flex max-w-[82vw] shrink-0 items-center gap-3 whitespace-nowrap transition hover:text-[color:var(--foreground)] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)] sm:max-w-none"
                rel="noreferrer"
                target="_blank"
              >
                <span className="h-1 w-1 rounded-full bg-[color:var(--foreground)] opacity-70" aria-hidden="true" />
                <span>{item.title}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
