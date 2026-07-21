"use client";

import { useSyncExternalStore } from "react";
import { Toaster } from "sonner";

type Theme = "dark" | "light";

const themeChangeEvent = "renowa-theme-change";

function readTheme(): Theme {
  if (typeof window === "undefined") return "dark";
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

function subscribeTheme(onStoreChange: () => void) {
  window.addEventListener(themeChangeEvent, onStoreChange);
  return () => window.removeEventListener(themeChangeEvent, onStoreChange);
}

export function ToastProvider() {
  const theme = useSyncExternalStore<Theme>(subscribeTheme, readTheme, () => "dark");

  return (
    <Toaster
      className="renowa-toaster"
      closeButton
      duration={6000}
      gap={10}
      position="bottom-right"
      theme={theme}
      toastOptions={{
        classNames: {
          toast: "renowa-toast",
          title: "renowa-toast-title",
          description: "renowa-toast-description",
          closeButton: "renowa-toast-close",
          actionButton: "renowa-toast-action",
        },
      }}
    />
  );
}
