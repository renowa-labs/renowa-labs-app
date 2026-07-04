import type { Metadata } from "next";
import { Footer } from "@/components/site/Footer";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProductGrid } from "@/components/products/ProductGrid";
import { products } from "@/data/products";

export const metadata: Metadata = {
  title: "Products",
  description: "Products from Renowa Labs, a small AI-first software lab .",
  alternates: {
    canonical: "/products",
  },
  openGraph: {
    title: "Products from Renowa Labs",
    description: "Focused software products from a small AI-first lab.",
    url: "/products",
  },
};

export default function ProductsPage() {
  return (
    <>
      <main className="page-shell">
        <Container className="pb-20">
          <SectionHeader
            eyebrow="Products"
            title="Products from the lab."
            description="We design, build, and ship focused software products, from mobile apps to AI-powered tools."
          />
          <div className="mt-12">
            <ProductGrid products={products} />
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
