import type { MetadataRoute } from "next";
import { products } from "@/data/products";
import { SITE_URL } from "@/data/site";

const lastModified = new Date("2026-07-04");

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/products", "/about", "/contact"].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  const productRoutes = products.map((product) => ({
    url: `${SITE_URL}/products/${product.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...routes, ...productRoutes];
}
