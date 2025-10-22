
import { X, ShoppingBag } from "lucide-react";
import { Button } from "../../atoms/Button";
import { CartItem } from "../../molecules/CartItem";
import { CartItem as CartItemType } from "@/types";

export interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItemType[];
  onQuantityChange: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  total: number;
  totalItems: number;
  onCheckout?: () => void;
  isLoading?: boolean;
  user?: any;
}

export function CartModal({
  isOpen,
  onClose,
  cart,
  onQuantityChange,
  onRemoveItem,
  total,
  totalItems,
  onCheckout,
  isLoading = false,
  user,
}: CartModalProps) {
  if (!isOpen) return null;

  const handleQuantityChange = (id: string, quantity: number) => {
    if (quantity === 0) {
      onRemoveItem(id);
    } else {
      onQuantityChange(id, quantity);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-md h-full bg-background shadow-xl overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-background border-b border-border p-4 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-6 h-6 text-foreground" />
              <h2 className="text-xl font-bold text-foreground">
                Seu Carrinho
              </h2>
              {totalItems > 0 && (
                <span className="bg-primary text-primary-foreground text-sm px-2 py-1 rounded-full">
                  {totalItems} {totalItems === 1 ? "item" : "itens"}
                </span>
              )}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              aria-label="Fechar carrinho"
              className="flex items-center justify-center bg-transparent text-foreground hover:bg-transparent hover:text-foreground focus:bg-transparent focus:text-foreground active:bg-transparent active:text-foreground"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {cart.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Seu carrinho está vazio
              </h3>
              <p className="text-muted-foreground">
                Adicione alguns itens deliciosos do nosso cardápio!
              </p>
            </div>
          ) : (
            <>
              {/* Lista de itens */}
              <div className="space-y-4">
                {cart.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onQuantityChange={handleQuantityChange}
                    onRemove={onRemoveItem}
                    disabled={isLoading}
                  />
                ))}
              </div>

              {/* Resumo e checkout */}
              <div className="sticky bottom-0 bg-background border-t border-border p-4 space-y-4 mt-6">
                <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-foreground">Subtotal:</span>
                    <span className="text-foreground">
                      R$ {total.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-foreground">Frete:</span>
                    <span
                      className={
                        total > 50 ? "text-green-600" : "text-foreground"
                      }
                    >
                      {total > 50 ? "Grátis" : "R$ 5,00"}
                    </span>
                  </div>

                  <div className="border-t border-border pt-2 mt-2">
                    <div className="flex justify-between font-bold text-foreground">
                      <span>Total:</span>
                      <span>
                        R$ {(total + (total > 50 ? 0 : 5)).toFixed(2)}
                      </span>
                    </div>
                    {total < 50 && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Frete grátis em pedidos acima de R$ 50,00
                      </p>
                    )}
                  </div>
                </div>

                <Button
                  onClick={onCheckout}
                  disabled={isLoading}
                  className="w-full"
                  size="lg"
                >
                  {isLoading
                    ? "Processando..."
                    : user
                      ? "Finalizar Pedido"
                      : "Fazer Login"}
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
