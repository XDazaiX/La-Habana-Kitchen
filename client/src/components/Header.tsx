import { ShoppingCart, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
  onCategoryClick: (category: string) => void;
}

const categories = [
  { id: "principales", label: "Platos Principales" },
  { id: "acompanantes", label: "Acompañantes" },
  { id: "postres", label: "Postres" },
  { id: "bebidas", label: "Bebidas" },
];

export default function Header({ cartItemCount, onCartClick, onCategoryClick }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background border-b">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            <h1 
              className="font-serif text-xl md:text-2xl font-bold text-primary cursor-pointer"
              onClick={() => onCategoryClick("")}
              data-testid="link-home"
            >
              La Habana Kitchen
            </h1>
          </div>

          <nav className="hidden md:flex items-center gap-1 flex-wrap">
            {categories.map((cat) => (
              <Button
                key={cat.id}
                variant="ghost"
                size="sm"
                onClick={() => onCategoryClick(cat.id)}
                data-testid={`link-category-${cat.id}`}
              >
                {cat.label}
              </Button>
            ))}
          </nav>

          <Button
            variant="outline"
            size="icon"
            onClick={onCartClick}
            className="relative"
            data-testid="button-cart"
          >
            <ShoppingCart className="h-5 w-5" />
            {cartItemCount > 0 && (
              <Badge 
                className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                data-testid="badge-cart-count"
              >
                {cartItemCount}
              </Badge>
            )}
          </Button>
        </div>

        {mobileMenuOpen && (
          <nav className="md:hidden pt-3 pb-1 flex flex-col gap-1">
            {categories.map((cat) => (
              <Button
                key={cat.id}
                variant="ghost"
                className="justify-start"
                onClick={() => {
                  onCategoryClick(cat.id);
                  setMobileMenuOpen(false);
                }}
                data-testid={`link-mobile-category-${cat.id}`}
              >
                {cat.label}
              </Button>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
