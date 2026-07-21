import type { Metadata } from "next";
import { Footer } from "@/components/site/Footer";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProductGrid } from "@/components/products/ProductGrid";
import { getIndexableProducts } from "@/data/products";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Products",
  description:
    "Explore real AI-powered software products from Renowa Labs across personal finance, cybersecurity, and recruitment technology.",
  path: "/products",
});

export default function ProductsPage() {
  const products = getIndexableProducts();

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
