"use client";

import React from "react";
import { useCartCount, useCartItemsCount } from "@/hooks/useCart";

interface CartCounterProps {
  className?: string;
  showItemsCount?: boolean;
}

export function CartCounter({ className = "", showItemsCount = false }: CartCounterProps) {
  const totalItems = useCartCount();
  const itemsCount = useCartItemsCount();

  if (totalItems === 0) return null;

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="bg-brand-orange text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
        {totalItems > 99 ? "99+" : totalItems}
      </div>
      {showItemsCount && itemsCount > 1 && (
        <span className="text-xs text-muted-foreground">
          ({itemsCount} {itemsCount === 1 ? "item" : "itens"})
        </span>
      )}
    </div>
  );
}
