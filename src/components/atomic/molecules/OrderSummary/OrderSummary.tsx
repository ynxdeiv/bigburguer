
import { CartItem } from "@/types";
import { PaymentMethodType } from "../../molecules/PaymentMethodSelector";

export interface OrderSummaryProps {
  cart: CartItem[];
  total: number;
  selectedMethod: PaymentMethodType | null;
  className?: string;
}

export function OrderSummary({
  cart,
  total,
  selectedMethod,
  className = "",
}: OrderSummaryProps) {
  const deliveryFee = total > 50 ? 0 : 5.0;
  const discount = selectedMethod === "pix" ? total * 0.05 : 0;
  const finalTotal = total + deliveryFee - discount;

  return (
    <div
      className={`bg-card rounded-lg border border-border p-6 sticky top-6 ${className}`}
    >
      <h2 className="text-xl font-bold mb-6">Resumo do Pedido</h2>

      <div className="space-y-4 mb-6">
        {cart.map((item) => (
          <div key={item.id} className="flex gap-3">
            <img
              src={item.image}
              alt={item.name}
              className="w-12 h-12 object-cover rounded-lg"
            />
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-sm line-clamp-2">{item.name}</h3>
              <p className="text-muted-foreground text-sm">
                {item.quantity} x R$ {item.price.toFixed(2)}
              </p>
            </div>
            <div className="text-right">
              <p className="font-semibold">
                R$ {(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-2 border-t border-border pt-4">
        <div className="flex justify-between text-sm">
          <span>Subtotal:</span>
          <span>R$ {total.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span>Frete:</span>
          <span className={deliveryFee === 0 ? "text-green-600" : ""}>
            {deliveryFee === 0 ? "Grátis" : `R$ ${deliveryFee.toFixed(2)}`}
          </span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-sm text-green-600">
            <span>Desconto PIX:</span>
            <span>- R$ {discount.toFixed(2)}</span>
          </div>
        )}

        <div className="flex justify-between font-bold text-lg border-t border-border pt-2">
          <span>Total:</span>
          <span>R$ {finalTotal.toFixed(2)}</span>
        </div>

        {total < 50 && (
          <p className="text-xs text-muted-foreground text-center mt-2">
            Frete grátis para pedidos acima de R$ 50,00
          </p>
        )}
      </div>
    </div>
  );
}
