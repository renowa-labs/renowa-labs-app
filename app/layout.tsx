import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/site/Header";
import { PageTransition } from "@/components/site/PageTransition";
import { RouteRail } from "@/components/site/RouteRail";
import { CONTACT_EMAIL, SITE_DESCRIPTION, SITE_NAME, SITE_POSITIONING, SITE_URL } from "@/data/site";

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
    default: "Renowa Labs - AI-first products from Azerbaijan",
    template: "%s | Renowa Labs",
  },
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "Renowa Labs - AI-first products from Azerbaijan",
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/og/renowa-og.svg",
        width: 1200,
        height: 630,
        alt: "Renowa Labs - AI-first products from Azerbaijan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Renowa Labs - AI-first products from Azerbaijan",
    description: SITE_DESCRIPTION,
    images: ["/og/renowa-og.svg"],
  },
  icons: {
    icon: "/brand/renowa-symbol.svg",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  email: CONTACT_EMAIL,
  description: SITE_DESCRIPTION,
  slogan: SITE_POSITIONING,
  address: {
    "@type": "PostalAddress",
    addressCountry: "AZ",
  },
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
      <body className="min-h-full">
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <Header />
        <PageTransition>{children}</PageTransition>
        <RouteRail />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
