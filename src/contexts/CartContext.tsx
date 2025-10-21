
"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { CartContextType } from "@/types";

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const openCart = (): void => {
    setIsCartOpen(true);

    document.body.style.overflow = "hidden";
  };

  const closeCart = (): void => {
    setIsCartOpen(false);

    document.body.style.overflow = "unset";
  };

  const toggleCart = (): void => {
    if (isCartOpen) {
      closeCart();
    } else {
      openCart();
    }
  };

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isCartOpen) {
        closeCart();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isCartOpen]);

  React.useEffect(() => {
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const value: CartContextType = {
    isCartOpen,
    openCart,
    closeCart,
    toggleCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCartModal = (): CartContextType => {
  const context = useContext(CartContext);

  if (context === undefined) {
    throw new Error("useCartModal deve ser usado dentro de um CartProvider");
  }

  return context;
};

export const useIsCartOpen = (): boolean => {
  const { isCartOpen } = useCartModal();
  return isCartOpen;
};
