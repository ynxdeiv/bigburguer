
import { BurguerCarousel } from "../../organisms/BurguerCarousel";
import { Product } from "@/types";

export interface ProductSectionProps {
  title: string;
  subtitle: string;
  products: Product[];
  onAddToCart: (product: Product) => void;
  isLoading?: boolean;
  autoplayDelay?: number;
  className?: string;
}

export function ProductSection({
  title,
  subtitle,
  products,
  onAddToCart,
  isLoading = false,
  autoplayDelay = 4000,
  className = "",
}: ProductSectionProps) {
  return (
    <section
      id="cardapio"
      className={`w-full py-12 md:py-16 bg-linear-to-b from-secondary/5 to-background scroll-mt-20 ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho da seção */}
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {title}
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Carousel de produtos */}
        <BurguerCarousel
          products={products}
          onAddToCart={onAddToCart}
          isLoading={isLoading}
          autoplayDelay={autoplayDelay}
        />
      </div>
    </section>
  );
}
