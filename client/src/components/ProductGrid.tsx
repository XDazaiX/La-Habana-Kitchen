import ProductCard, { type Product } from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  title: string;
  quantities: Record<string, number>;
  onAdd: (productId: string) => void;
  onRemove: (productId: string) => void;
}

export default function ProductGrid({ products, title, quantities, onAdd, onRemove }: ProductGridProps) {
  if (products.length === 0) return null;

  return (
    <section className="py-8" data-testid={`section-${title.toLowerCase().replace(/\s/g, '-')}`}>
      <h2 className="font-serif text-2xl md:text-3xl font-semibold mb-6">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            quantity={quantities[product.id] || 0}
            onAdd={() => onAdd(product.id)}
            onRemove={() => onRemove(product.id)}
          />
        ))}
      </div>
    </section>
  );
}
