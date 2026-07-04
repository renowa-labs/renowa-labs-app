"use client";

import { useSyncExternalStore } from "react";

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

  return (
    <button
      type="button"
      className="cursor-pointer group inline-flex items-center gap-2 rounded-sm text-[11px] uppercase tracking-[0.28em] text-[color:var(--muted-foreground)] transition hover:text-[color:var(--foreground)] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      onClick={() => {
        const nextTheme = theme === "dark" ? "light" : "dark";
        applyTheme(nextTheme);
      }}
    >
      <span className="size-1.5 rounded-full border border-current transition group-hover:scale-125" aria-hidden="true" />
      <span>{theme}</span>
    </button>
  );
}
