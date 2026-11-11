import type { MetadataRoute } from "next";
import { getIndexableProducts } from "@/data/products";
import { SITE_UPDATED_AT, SITE_URL } from "@/data/site";
import { getPublishedArticles } from "@/lib/engineering/content";
import { absoluteUrl } from "@/lib/seo";

const lastModified = new Date(SITE_UPDATED_AT);

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/products", "/engineering", "/about", "/contact", "/privacy", "/privacy/ponderlet", "/support/ponderlet"].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: route.startsWith("/privacy") || route.startsWith("/support") ? new Date("2026-11-11") : lastModified,
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : route.startsWith("/privacy") || route.startsWith("/support") ? 0.3 : 0.8,
  }));

  const productRoutes = getIndexableProducts().map((product) => ({
    url: `${SITE_URL}/products/${product.slug}`,
    lastModified: new Date(product.updatedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
    images: product.images.map((image) => absoluteUrl(image.src)),
  }));

  const articleRoutes = getPublishedArticles().map((article) => ({
    url: `${SITE_URL}/engineering/${article.slug}`,
    lastModified: new Date(article.updatedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
    images: [absoluteUrl(article.coverImage)],
  }));

  return [...routes, ...productRoutes, ...articleRoutes];
}
