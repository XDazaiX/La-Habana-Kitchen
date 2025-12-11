import { useState, useMemo, useRef } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import Cart, { type CartItem } from "@/components/Cart";
import CheckoutForm, { type OrderDetails } from "@/components/CheckoutForm";
import Footer from "@/components/Footer";
import { products, categoryLabels } from "@/data/products";
import type { Product } from "@/components/ProductCard";

type View = "cart" | "checkout" | null;

export default function Home() {
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [currentView, setCurrentView] = useState<View>(null);
  const [activeCategory, setActiveCategory] = useState<string>("");
  const catalogRef = useRef<HTMLDivElement>(null);

  const handleAdd = (productId: string) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1,
    }));
  };

  const handleRemove = (productId: string) => {
    setQuantities((prev) => {
      const newQty = (prev[productId] || 0) - 1;
      if (newQty <= 0) {
        const { [productId]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [productId]: newQty };
    });
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    if (delta > 0) {
      handleAdd(productId);
    } else {
      handleRemove(productId);
    }
  };

  const cartItems: CartItem[] = useMemo(() => {
    return Object.entries(quantities)
      .filter(([_, qty]) => qty > 0)
      .map(([productId, quantity]) => ({
        product: products.find((p) => p.id === productId) as Product,
        quantity,
      }))
      .filter((item) => item.product);
  }, [quantities]);

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    if (category && catalogRef.current) {
      catalogRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleOrderClick = () => {
    if (catalogRef.current) {
      catalogRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleCheckout = () => {
    setCurrentView("checkout");
  };

  const handleConfirmOrder = (details: OrderDetails) => {
    console.log("Order confirmed:", details, cartItems);
    // todo: remove mock functionality - send to API
  };

  const handleClosePanel = () => {
    setCurrentView(null);
    if (currentView === "checkout") {
      setQuantities({});
    }
  };

  // Group products by category
  const productsByCategory = useMemo(() => {
    const filtered = activeCategory
      ? products.filter((p) => p.category === activeCategory)
      : products;

    const grouped: Record<string, Product[]> = {};
    filtered.forEach((product) => {
      if (!grouped[product.category]) {
        grouped[product.category] = [];
      }
      grouped[product.category].push(product);
    });
    return grouped;
  }, [activeCategory]);

  const categoryOrder = ["principales", "acompanantes", "postres", "bebidas"];

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        cartItemCount={cartItemCount}
        onCartClick={() => setCurrentView("cart")}
        onCategoryClick={handleCategoryClick}
      />

      <main className="flex-1">
        <Hero onOrderClick={handleOrderClick} />

        <div ref={catalogRef} className="max-w-7xl mx-auto px-4">
          {categoryOrder.map((category) => {
            const categoryProducts = productsByCategory[category];
            if (!categoryProducts?.length) return null;
            return (
              <ProductGrid
                key={category}
                title={categoryLabels[category]}
                products={categoryProducts}
                quantities={quantities}
                onAdd={handleAdd}
                onRemove={handleRemove}
              />
            );
          })}
        </div>
      </main>

      <Footer />

      <Cart
        isOpen={currentView === "cart"}
        onClose={() => setCurrentView(null)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onCheckout={handleCheckout}
      />

      <CheckoutForm
        isOpen={currentView === "checkout"}
        onClose={handleClosePanel}
        onBack={() => setCurrentView("cart")}
        items={cartItems}
        onConfirm={handleConfirmOrder}
      />

      {cartItemCount > 0 && currentView === null && (
        <div className="fixed bottom-4 left-4 right-4 md:hidden z-30">
          <button
            onClick={() => setCurrentView("cart")}
            className="w-full bg-primary text-primary-foreground py-3 px-4 rounded-md font-medium flex items-center justify-between"
            data-testid="button-mobile-cart"
          >
            <span>Ver Carrito ({cartItemCount})</span>
            <span>
              ${cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0).toFixed(2)}
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
