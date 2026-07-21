"use client";

import { useSyncExternalStore } from "react";
import { cn } from "@/lib/cn";

type Theme = "dark" | "light";

const themeChangeEvent = "renowa-theme-change";

function isTheme(value: string | undefined | null): value is Theme {
  return value === "dark" || value === "light";
}

function readTheme(): Theme {
  if (typeof window === "undefined") return "dark";

  const current = document.documentElement.dataset.theme;
  if (isTheme(current)) return current;

  const stored = localStorage.getItem("renowa-theme");
  if (isTheme(stored)) return stored;

  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

function subscribeTheme(onStoreChange: () => void) {
  if (typeof window === "undefined") return () => {};

  const media = window.matchMedia("(prefers-color-scheme: light)");
  const onStorage = (event: StorageEvent) => {
    if (event.key === "renowa-theme") onStoreChange();
  };
  const onPreferenceChange = () => {
    if (!isTheme(localStorage.getItem("renowa-theme"))) {
      document.documentElement.dataset.theme = media.matches ? "light" : "dark";
      onStoreChange();
    }
  };

  window.addEventListener("storage", onStorage);
  window.addEventListener(themeChangeEvent, onStoreChange);
  media.addEventListener("change", onPreferenceChange);

  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(themeChangeEvent, onStoreChange);
    media.removeEventListener("change", onPreferenceChange);
  };
}

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem("renowa-theme", theme);
  window.dispatchEvent(new Event(themeChangeEvent));
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribeTheme, readTheme, () => "dark");
  const nextTheme = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      className="group inline-flex min-h-8 cursor-pointer items-center gap-3 rounded-sm text-[12px] uppercase tracking-[0.28em] text-[color:var(--muted-foreground)] transition hover:text-[color:var(--foreground)] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
      aria-label={`Switch to ${nextTheme} mode`}
      onClick={() => {
        applyTheme(nextTheme);
      }}
    >
      <span className="relative size-5 shrink-0 overflow-hidden rounded-full border border-current" aria-hidden="true">
        <span
          className={cn(
            "absolute inset-y-0 left-0 w-1/2 bg-current transition-transform duration-300",
            theme === "light" ? "translate-x-full" : "translate-x-0",
          )}
        />
      </span>
      <span>{nextTheme}</span>
    </button>
  );
}
