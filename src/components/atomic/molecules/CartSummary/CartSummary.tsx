"use client";

import React from "react";
import { ShoppingCart } from "lucide-react";
import { useCartCount, useCartItemsCount } from "@/hooks/useCart";
import { useCartModal } from "@/providers/CartProvider";
import { Button } from "@/components/atomic";

interface CartSummaryProps {
  className?: string;
}

export function CartSummary({ className = "" }: CartSummaryProps) {
  const totalItems = useCartCount();
  const itemsCount = useCartItemsCount();
  const { openCart } = useCartModal();

  if (totalItems === 0) return null;

  return (
    <div className={`fixed bottom-6 right-6 z-50 ${className}`}>
      <Button
        onClick={openCart}
        className="bg-brand-orange hover:bg-brand-orange/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-full p-4"
        aria-label={`Ver carrinho com ${totalItems} itens`}
      >
        <div className="flex items-center gap-3">
          <ShoppingCart size={24} />
          <div className="text-left">
            <div className="font-semibold text-lg">
              {totalItems} {totalItems === 1 ? "item" : "itens"}
            </div>
            {itemsCount > 1 && (
              <div className="text-sm opacity-90">
                {itemsCount} {itemsCount === 1 ? "produto" : "produtos"}
              </div>
            )}
          </div>
        </div>
      </Button>
    </div>
  );
}
