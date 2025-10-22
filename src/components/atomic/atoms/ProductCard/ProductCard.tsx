
import { Button } from "../Button";
import { Product } from "@/types";

export interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  isLoading?: boolean;
  className?: string;
}

export function ProductCard({
  product,
  onAddToCart,
  isLoading = false,
  className = "",
}: ProductCardProps) {
  const isOutOfStock = product.available <= 0;

  return (
    <div
      className={`bg-card rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-4 md:p-6 border border-border h-full flex flex-col ${isOutOfStock ? "opacity-70" : ""} ${className}`}
    >
      {/* Imagem do produto */}
      <div className="shrink-0 mb-3 md:mb-5">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-32 md:h-40 object-contain rounded-xl"
        />
      </div>

      {/* Conteúdo do card */}
      <div className="grow flex flex-col">
        <h3 className="text-sm md:text-lg font-bold text-foreground mb-2 md:mb-3 line-clamp-2">
          {product.name}
        </h3>

        <p className="text-muted-foreground text-xs md:text-base mb-4 md:mb-6 leading-relaxed line-clamp-3 grow">
          {product.description}
        </p>

        {/* Preço e botão */}
        <div className="flex justify-between items-center mt-auto pt-3 md:pt-4 border-t border-border">
          <p className="text-base md:text-xl font-bold text-primary whitespace-nowrap">
            R$ {product.price.toFixed(2)}
          </p>

          <Button
            onClick={() => onAddToCart(product)}
            disabled={isOutOfStock || isLoading}
            size="sm"
            className="min-w-[80px] md:min-w-[100px] whitespace-nowrap"
          >
            {isLoading ? "..." : isOutOfStock ? "Esgotado" : "Adicionar"}
          </Button>
        </div>
      </div>
    </div>
  );
}
