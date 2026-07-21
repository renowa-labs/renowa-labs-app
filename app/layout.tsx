import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/site/Header";
import { PageTransition } from "@/components/site/PageTransition";
import { ToastProvider } from "@/components/site/ToastProvider";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  COMPANY_KNOWS_ABOUT,
  CONTACT_EMAIL,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_POSITIONING,
  SITE_URL,
  LINKEDIN_URL,
} from "@/data/site";

const geistSans = localFont({
  variable: "--font-geist-sans",
  src: "../node_modules/next/dist/next-devtools/server/font/geist-latin.woff2",
  display: "swap",
});

const geistMono = localFont({
  variable: "--font-geist-mono",
  src: "../node_modules/next/dist/next-devtools/server/font/geist-mono-latin.woff2",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: {
    default: "Renowa Labs — AI-Powered Software Products",
    template: "%s | Renowa Labs",
  },
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_AZ",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "Renowa Labs — AI-Powered Software Products",
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/og/renowa-og.svg",
        width: 1200,
        height: 630,
        alt: "Renowa Labs — AI-powered software products",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Renowa Labs — AI-Powered Software Products",
    description: SITE_DESCRIPTION,
    images: ["/og/renowa-og.svg"],
  },
  category: "technology",
  icons: {
    icon: [
      {
        url: "/logo/compact/renowa-labs-favicon-light.png",
        sizes: "512x512",
        type: "image/png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/logo/compact/renowa-labs-favicon-dark.png",
        sizes: "512x512",
        type: "image/png",
        media: "(prefers-color-scheme: dark)",
      },
    ],
    shortcut: "/logo/compact/renowa-labs-favicon-dark.png",
    apple: [{ url: "/logo/compact/renowa-labs-favicon-light.png", sizes: "512x512", type: "image/png" }],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/logo/png/renowa-logo-light-bg.png`,
  email: CONTACT_EMAIL,
  description: SITE_DESCRIPTION,
  slogan: SITE_POSITIONING,
  knowsAbout: COMPANY_KNOWS_ABOUT,
  sameAs: [LINKEDIN_URL],
};

const themeScript = `
(() => {
  try {
    const stored = localStorage.getItem("renowa-theme");
    const theme = stored === "light" || stored === "dark"
      ? stored
      : window.matchMedia("(prefers-color-scheme: light)").matches
        ? "light"
        : "dark";
    document.documentElement.dataset.theme = theme;
  } catch {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="alternate" type="application/rss+xml" title="Renowa Labs Engineering" href="/rss.xml" />
      </head>
      <body className="min-h-full">
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <Header />
        <PageTransition>{children}</PageTransition>
        <ToastProvider />
        <JsonLd data={structuredData} />
      </body>
    </html>
  );
}
