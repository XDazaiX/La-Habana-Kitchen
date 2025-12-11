import { useEffect, useLayoutEffect, useState } from "react";
import { X, ArrowLeft, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { CartItem } from "./Cart";

interface CheckoutFormProps {
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
  items: CartItem[];
  onConfirm: (orderDetails: OrderDetails) => void;
}

export interface OrderDetails {
  name: string;
  phone: string;
  address: string;
  notes: string;
}

const DELIVERY_FEE = 500;

type Step = "form" | "payment" | "success";
type PaymentMethod = "efectivo" | "transfermovil" | null;

const initialForm: OrderDetails = {
  name: "",
  phone: "",
  address: "",
  notes: "",
};

export default function CheckoutForm({ isOpen, onClose, onBack, items, onConfirm }: CheckoutFormProps) {
  const [formData, setFormData] = useState<OrderDetails>(initialForm);
  const [step, setStep] = useState<Step>("form");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(null);
  const [orderNumber, setOrderNumber] = useState("");

  // Reset flujo cuando se abre de nuevo el checkout, para evitar saltar directamente a confirmado
  // useLayoutEffect evita parpadeo de la vista de éxito al reabrir
  useLayoutEffect(() => {
    if (isOpen) {
      setStep("form");
      setPaymentMethod(null);
      setOrderNumber("");
      setFormData(initialForm);
    }
  }, [isOpen]);

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const total = subtotal + DELIVERY_FEE;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newOrderNumber = `HAB-${Date.now().toString().slice(-6)}`;
    setOrderNumber(newOrderNumber);
    setStep("payment");
  };

  const handlePaymentConfirm = () => {
    if (!paymentMethod) return;
    setStep("success");
    onConfirm({ ...formData, notes: formData.notes });
  };

  const handleChange = (field: keyof OrderDetails) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/50 z-40" 
        onClick={onClose}
        data-testid="checkout-overlay"
      />
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-background z-50 flex flex-col shadow-xl">
        <div className="flex items-center gap-2 p-4 border-b">
          {step !== "success" && (
            <Button variant="ghost" size="icon" onClick={onBack} data-testid="button-back">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          )}
          <h2 className="font-serif font-semibold text-xl flex-1">
            {step === "success"
              ? "Pedido Confirmado"
              : step === "payment"
                ? "Método de Pago"
                : "Datos de Entrega"}
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose} data-testid="button-close-checkout">
            <X className="h-5 w-5" />
          </Button>
        </div>

        {step === "success" ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <CheckCircle className="h-20 w-20 text-green-500 mb-4" />
            <h3 className="font-serif text-2xl font-semibold mb-2">¡Gracias por tu orden!</h3>
            <p className="text-muted-foreground mb-4">
              Tu pedido #{orderNumber} ha sido recibido y está siendo preparado.
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              Recibirás tu comida en aproximadamente 45-60 minutos.
            </p>
            <Button onClick={onClose} data-testid="button-continue-shopping">
              Seguir Comprando
            </Button>
          </div>
        ) : step === "payment" ? (
          <div className="flex-1 p-4 space-y-4">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Selecciona cómo deseas pagar tu pedido.
              </p>
              <div className="grid grid-cols-1 gap-3">
                <Button
                  variant={paymentMethod === "efectivo" ? "default" : "outline"}
                  className="justify-start"
                  onClick={() => setPaymentMethod("efectivo")}
                  data-testid="payment-cash"
                >
                  Efectivo al entregar
                </Button>
                <div className="space-y-2 border rounded-md p-3">
                  <Button
                    variant={paymentMethod === "transfermovil" ? "default" : "outline"}
                    className="justify-start w-full"
                    onClick={() => setPaymentMethod("transfermovil")}
                    data-testid="payment-transfer"
                  >
                    Transfermóvil
                  </Button>
                  {paymentMethod === "transfermovil" && (
                    <div className="text-sm space-y-2">
                      <p className="font-semibold">Datos para la transferencia</p>
                      <div className="space-y-1">
                        <p>Tarjeta: 9227 9598 7522 3609</p>
                        <p>Celular: +53 56649997</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <Separator />
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total a pagar</span>
                <span className="font-semibold" data-testid="text-payment-total">
                  {total.toLocaleString()} CUP
                </span>
              </div>
              <Button
                className="w-full"
                size="lg"
                onClick={handlePaymentConfirm}
                disabled={!paymentMethod}
                data-testid="button-payment-confirm"
              >
                {paymentMethod === "transfermovil" ? "Verificar transferencia" : "Confirmar en efectivo"}
              </Button>
            </div>
          </div>
        ) : (
          <ScrollArea className="flex-1">
            <form onSubmit={handleSubmit} className="p-4 space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre completo</Label>
                  <Input
                    id="name"
                    placeholder="Juan Pérez"
                    value={formData.name}
                    onChange={handleChange("name")}
                    required
                    data-testid="input-name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="(305) 555-0123"
                    value={formData.phone}
                    onChange={handleChange("phone")}
                    required
                    data-testid="input-phone"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Dirección de entrega</Label>
                  <Textarea
                    id="address"
                    placeholder="Calle, número, apartamento, ciudad..."
                    value={formData.address}
                    onChange={handleChange("address")}
                    required
                    data-testid="input-address"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Notas adicionales (opcional)</Label>
                  <Input
                    id="notes"
                    placeholder="Sin cebolla, extra salsa, etc."
                    value={formData.notes}
                    onChange={handleChange("notes")}
                    data-testid="input-notes"
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <h4 className="font-semibold">Resumen del Pedido</h4>
                {items.map((item) => (
                  <div key={item.product.id} className="flex justify-between text-sm">
                    <span>
                      {item.quantity}x {item.product.name}
                    </span>
                    <span>{(item.product.price * item.quantity).toLocaleString()} CUP</span>
                  </div>
                ))}
                <Separator />
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{subtotal.toLocaleString()} CUP</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Envío</span>
                  <span>{DELIVERY_FEE.toLocaleString()} CUP</span>
                </div>
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span data-testid="text-checkout-total">{total.toLocaleString()} CUP</span>
                </div>
              </div>

              <Button type="submit" className="w-full" size="lg" data-testid="button-confirm-order">
                Confirmar Pedido
              </Button>
            </form>
          </ScrollArea>
        )}
      </div>
    </>
  );
}
