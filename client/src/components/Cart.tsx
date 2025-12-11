import { X, Plus, Minus, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import type { Product } from "./ProductCard";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onCheckout: () => void;
}

const DELIVERY_FEE = 3.99;

export default function Cart({ isOpen, onClose, items, onUpdateQuantity, onCheckout }: CartProps) {
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const total = subtotal > 0 ? subtotal + DELIVERY_FEE : 0;

  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/50 z-40" 
        onClick={onClose}
        data-testid="cart-overlay"
      />
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-background z-50 flex flex-col shadow-xl">
        <div className="flex items-center justify-between gap-4 p-4 border-b">
          <h2 className="font-serif font-semibold text-xl">Tu Carrito</h2>
          <Button variant="ghost" size="icon" onClick={onClose} data-testid="button-close-cart">
            <X className="h-5 w-5" />
          </Button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
            <p className="text-muted-foreground" data-testid="text-empty-cart">
              Tu carrito está vacío
            </p>
            <Button variant="outline" className="mt-4" onClick={onClose}>
              Seguir comprando
            </Button>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-3" data-testid={`cart-item-${item.product.id}`}>
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium truncate">{item.product.name}</h4>
                      <p className="text-muted-foreground text-sm">
                        ${item.product.price.toFixed(2)}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-7 w-7"
                          onClick={() => onUpdateQuantity(item.product.id, -1)}
                          data-testid={`button-cart-remove-${item.product.id}`}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-6 text-center text-sm">{item.quantity}</span>
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-7 w-7"
                          onClick={() => onUpdateQuantity(item.product.id, 1)}
                          data-testid={`button-cart-add-${item.product.id}`}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-medium">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="p-4 border-t space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span data-testid="text-subtotal">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Envío a domicilio</span>
                <span data-testid="text-delivery">${DELIVERY_FEE.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span data-testid="text-total">${total.toFixed(2)}</span>
              </div>
              <Button className="w-full" size="lg" onClick={onCheckout} data-testid="button-checkout">
                Proceder al Pago
              </Button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
