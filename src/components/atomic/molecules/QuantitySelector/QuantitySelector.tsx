
import { Plus, Minus } from "lucide-react";
import { Button } from "../../atoms/Button";

export interface QuantitySelectorProps {
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
  min?: number;
  max?: number;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
}

export function QuantitySelector({
  value,
  onIncrement,
  onDecrement,
  min = 1,
  max = 99,
  disabled = false,
  size = "md",
}: QuantitySelectorProps) {
  const isMinDisabled = value <= min || disabled;
  const isMaxDisabled = value >= max || disabled;

  const sizeClasses = {
    sm: "w-6 h-6 text-xs",
    md: "w-8 h-8 text-sm",
    lg: "w-10 h-10 text-base",
  };

  const buttonSize = size === "sm" ? "sm" : size === "lg" ? "lg" : "default";

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size={buttonSize}
        onClick={onDecrement}
        disabled={isMinDisabled}
        className={`${sizeClasses[size]} p-0 bg-transparent text-foreground hover:bg-transparent hover:text-foreground focus:bg-transparent focus:text-foreground active:bg-transparent active:text-foreground`}
        aria-label="Diminuir quantidade"
      >
        <Minus className="w-3 h-3" />
      </Button>

      <span
        className={`font-medium text-foreground min-w-8 text-center ${sizeClasses[size]}`}
      >
        {value}
      </span>

      <Button
        variant="ghost"
        size={buttonSize}
        onClick={onIncrement}
        disabled={isMaxDisabled}
        className={`${sizeClasses[size]} p-0 bg-transparent text-foreground hover:bg-transparent hover:text-foreground focus:bg-transparent focus:text-foreground active:bg-transparent active:text-foreground`}
        aria-label="Aumentar quantidade"
      >
        <Plus className="w-3 h-3" />
      </Button>
    </div>
  );
}
