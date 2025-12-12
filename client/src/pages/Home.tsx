import { useState, useMemo, useRef, useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import Cart, { type CartItem } from "@/components/Cart";
import CheckoutForm, { type OrderDetails } from "@/components/CheckoutForm";
import Footer from "@/components/Footer";
import { products, categoryLabels } from "@/data/products";
import type { Product } from "@/components/ProductCard";
import { fetchInsights } from "@/lib/mockApi";

type View = "cart" | "checkout" | null;
const SHOW_INSIGHTS = false; // cambiar a true para ver métricas internas

export default function Home() {
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [currentView, setCurrentView] = useState<View>(null);
  const [activeCategory, setActiveCategory] = useState<string>("");
  const catalogRef = useRef<HTMLDivElement>(null);

  const [topSellerIds, setTopSellerIds] = useState<string[]>([]);
  const [weeklyForecast, setWeeklyForecast] = useState<number[]>([]);
  const [ticketPromedio, setTicketPromedio] = useState<number>(0);
  const [loadingInsights, setLoadingInsights] = useState<boolean>(true);
  const [insightsError, setInsightsError] = useState<string | null>(null);

  // Simulación de consumo de API para métricas
  useEffect(() => {
    setLoadingInsights(true);
    fetchInsights()
      .then((data) => {
        setTopSellerIds(data.topSellerIds);
        setWeeklyForecast(data.weeklyForecast);
        setTicketPromedio(data.ticketPromedio);
        setInsightsError(null);
      })
      .catch(() => {
        setInsightsError("No se pudieron cargar las métricas");
      })
      .finally(() => setLoadingInsights(false));
  }, []);

  const topSellers = products.filter((p) => topSellerIds.includes(p.id));
  const forecastMax = weeklyForecast.length > 0 ? Math.max(...weeklyForecast) : 0;

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

        <div className="max-w-7xl mx-auto px-4 py-10 space-y-8">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="md:col-span-2 rounded-xl border p-6 bg-gradient-to-r from-amber-50 to-orange-50">
              <p className="text-sm uppercase text-amber-700 font-semibold mb-1">Oferta</p>
              <h3 className="font-serif text-2xl font-semibold mb-2">
                Combo Habana: el favorito de la semana
              </h3>
              <p className="text-muted-foreground mb-4">
                Lleva un plato principal + acompañante + bebida con 12% de ahorro. Ideal para compartir o darte un gusto completo.
              </p>
              <button
                onClick={handleOrderClick}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground"
              >
                Ordenar el combo
              </button>
            </div>

            <div className="rounded-xl border p-6 bg-background">
              <p className="text-sm uppercase text-primary font-semibold mb-2">Top ventas hoy</p>
              {loadingInsights ? (
                <p className="text-sm text-muted-foreground">Cargando...</p>
              ) : insightsError ? (
                <p className="text-sm text-red-600">{insightsError}</p>
              ) : (
                <>
                  <ul className="space-y-2 text-sm">
                    {topSellers.map((p, idx) => (
                      <li key={p.id} className="flex items-center justify-between">
                        <span className="font-medium">
                          #{idx + 1} {p.name}
                        </span>
                        <span className="text-muted-foreground">{p.price.toLocaleString()} CUP</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs text-muted-foreground mt-3">
                    Basado en rotación histórica y recomendaciones destacadas.
                  </p>
                </>
              )}
            </div>
          </div>

          {SHOW_INSIGHTS && (
            <div className="grid gap-4 md:grid-cols-3">
              <div className="md:col-span-2 rounded-xl border p-6">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-sm uppercase text-muted-foreground">Predicción semanal</p>
                    <h4 className="font-semibold text-lg">Pedidos estimados</h4>
                  </div>
                  <span className="text-sm text-muted-foreground">Estimación interna</span>
                </div>
                {loadingInsights ? (
                  <p className="text-sm text-muted-foreground">Cargando...</p>
                ) : insightsError ? (
                  <p className="text-sm text-red-600">{insightsError}</p>
                ) : (
                  <div className="grid grid-cols-7 gap-2 items-end">
                    {weeklyForecast.map((value, idx) => (
                      <div key={idx} className="flex flex-col items-center gap-1">
                        <div
                          className="w-full rounded-md bg-primary/80"
                          style={{ height: `${forecastMax ? (value / forecastMax) * 100 : 0}%`, minHeight: "28px" }}
                        />
                        <span className="text-[11px] text-muted-foreground">{value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="rounded-xl border p-6 space-y-3">
                <p className="text-sm uppercase text-muted-foreground">Ticket promedio</p>
                {loadingInsights ? (
                  <p className="text-sm text-muted-foreground">Cargando...</p>
                ) : insightsError ? (
                  <p className="text-sm text-red-600">{insightsError}</p>
                ) : (
                  <>
                    <h4 className="font-semibold text-2xl">{ticketPromedio.toLocaleString()} CUP</h4>
                    <p className="text-sm text-muted-foreground">
                      Mejora tu pedido con un postre o bebida sugerida al finalizar tu compra.
                    </p>
                    <div className="rounded-lg bg-muted p-3 text-sm">
                      - Sugerimos postres/bebidas al cerrar el carrito<br />
                      - Combos destacados siempre visibles<br />
                      - Entrega rápida para pedidos confirmados
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>

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
              {cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0).toLocaleString()} CUP
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
