import type { Product } from "@/data/products";
import { ProductCard } from "@/components/products/ProductCard";

export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {products.map((product) => (
        <ProductCard key={product.slug} product={product} />
      ))}
    </div>
  );
}
