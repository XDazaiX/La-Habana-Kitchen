import { Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

interface ProductCardProps {
  product: Product;
  quantity: number;
  onAdd: () => void;
  onRemove: () => void;
}

export default function ProductCard({ product, quantity, onAdd, onRemove }: ProductCardProps) {
  return (
    <Card className="overflow-hidden hover-elevate" data-testid={`card-product-${product.id}`}>
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          data-testid={`img-product-${product.id}`}
        />
      </div>
      <CardContent className="p-4">
        <h3 className="font-serif font-semibold text-lg" data-testid={`text-product-name-${product.id}`}>
          {product.name}
        </h3>
        <p className="text-muted-foreground text-sm mt-1 line-clamp-2" data-testid={`text-product-desc-${product.id}`}>
          {product.description}
        </p>
        <div className="flex items-center justify-between gap-2 mt-4">
          <span className="font-semibold text-lg" data-testid={`text-product-price-${product.id}`}>
            {product.price.toLocaleString()} CUP
          </span>
          {quantity === 0 ? (
            <Button onClick={onAdd} data-testid={`button-add-${product.id}`}>
              <Plus className="h-4 w-4 mr-1" />
              Agregar
            </Button>
          ) : (
            <div className="flex items-center gap-2">
              <Button size="icon" variant="outline" onClick={onRemove} data-testid={`button-remove-${product.id}`}>
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-8 text-center font-medium" data-testid={`text-quantity-${product.id}`}>
                {quantity}
              </span>
              <Button size="icon" variant="outline" onClick={onAdd} data-testid={`button-add-more-${product.id}`}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
