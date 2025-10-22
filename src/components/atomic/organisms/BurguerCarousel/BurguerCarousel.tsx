"use client";

import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ProductCard } from "../../atoms/ProductCard";
import { CarouselControls } from "../../molecules/CarouselControls";
import { Product } from "@/types";

export interface BurguerCarouselProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  isLoading?: boolean;
  autoplayDelay?: number;
  className?: string;
}

export function BurguerCarousel({
  products,
  onAddToCart,
  isLoading = false,
  autoplayDelay = 4000,
  className = "",
}: BurguerCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      slidesToScroll: 1,
      skipSnaps: false,
      dragFree: false,
      breakpoints: {
        "(min-width: 768px)": { slidesToScroll: 1 },
        "(min-width: 1024px)": { slidesToScroll: 1 },
      },
    },
    [Autoplay({ delay: autoplayDelay, stopOnInteraction: false })]
  );

  const scrollPrev = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-2 border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-muted-foreground text-lg">
          Nenhum produto disponível no momento.
        </p>
      </div>
    );
  }

  return (
    <div className={`relative px-4 md:px-8 ${className}`}>
      {/* Controles de navegação - apenas em telas menores */}
      <div className="flex justify-end mb-6 md:hidden">
        <CarouselControls
          onPrevious={scrollPrev}
          onNext={scrollNext}
          disabled={isLoading}
        />
      </div>

      {/* Carousel */}
      <div className="embla overflow-hidden pb-8" ref={emblaRef}>
        <div className="embla__container flex gap-4 md:gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="embla__slide flex-[0_0_280px] min-w-0 md:flex-[0_0_300px] lg:flex-[0_0_320px]"
            >
              <div className="h-full">
                <ProductCard
                  product={product}
                  onAddToCart={onAddToCart}
                  isLoading={isLoading}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
