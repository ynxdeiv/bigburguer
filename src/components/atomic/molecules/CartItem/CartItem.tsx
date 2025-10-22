
import { Trash2 } from "lucide-react";
import { Button } from "../../atoms/Button";
import { QuantitySelector } from "../QuantitySelector";
import { CartItem as CartItemType } from "@/types";

export interface CartItemProps {
  item: CartItemType;
  onQuantityChange: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
  disabled?: boolean;
}

export function CartItem({
  item,
  onQuantityChange,
  onRemove,
  disabled = false,
}: CartItemProps) {
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity <= 0) {
      onRemove(item.id);
    } else {
      onQuantityChange(item.id, newQuantity);
    }
  };

  const handleRemove = () => {
    onRemove(item.id);
  };

  const subtotal = item.price * item.quantity;

  return (
    <div className="flex gap-4 p-4 bg-card rounded-lg border border-border">
      {/* Imagem do produto */}
      <div className="shrink-0">
        <img
          src={item.image}
          alt={item.name}
          className="w-20 h-20 object-contain rounded-md"
        />
      </div>

      {/* Informações do produto */}
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-foreground line-clamp-2 mb-1">
          {item.name}
        </h3>

        <p className="text-lg font-bold text-primary">
          R$ {item.price.toFixed(2)}
        </p>

        <p className="text-sm text-muted-foreground">
          Subtotal: R$ {subtotal.toFixed(2)}
        </p>

        {/* Controles */}
        <div className="flex items-center justify-between mt-3">
          <QuantitySelector
            value={item.quantity}
            onIncrement={() => handleQuantityChange(item.quantity + 1)}
            onDecrement={() => handleQuantityChange(item.quantity - 1)}
            disabled={disabled}
            size="sm"
          />

          <Button
            variant="ghost"
            size="icon"
            onClick={handleRemove}
            disabled={disabled}
            className="p-2 bg-transparent text-foreground hover:bg-transparent hover:text-foreground focus:bg-transparent focus:text-foreground active:bg-transparent active:text-foreground"
            aria-label={`Remover ${item.name} do carrinho`}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
