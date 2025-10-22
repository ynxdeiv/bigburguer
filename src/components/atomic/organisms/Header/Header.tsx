"use client";

import React from "react";
import Link from "next/link";
import { Hamburger, ShoppingCart, User, LogOut, Menu } from "lucide-react";
import { Button } from "../../atoms/Button";
import { ThemeToggle } from "../../atoms/ThemeToggle";
import { CartCounter } from "../../atoms/CartCounter";
import { useCartModal } from "@/providers/CartProvider";
import { useAuth } from "@/providers/AuthProvider";
import { useCartCount } from "@/hooks/useCart";

export interface HeaderProps {
  user?: any;
  onLoginClick?: () => void;
  cartItemCount?: number;
  onCartClick?: () => void;
  className?: string;
}

export function Header({
  user: propUser,
  onLoginClick,
  cartItemCount,
  onCartClick,
  className = "",
}: HeaderProps) {
  const { isCartOpen, openCart } = useCartModal();
  const authContext = useAuth();
  const user = propUser || authContext?.user;
  const logout = authContext?.logout;
  const cartCount = useCartCount();
  const displayCartCount =
    cartItemCount !== undefined ? cartItemCount : cartCount;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const handleCartClick = () => {
    if (onCartClick) {
      onCartClick();
    } else if (!isCartOpen) {
      openCart();
    }
  };

  const handleLoginClick = () => {
    if (user) {
      logout?.();
    } else if (onLoginClick) {
      onLoginClick();
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    setIsMobileMenuOpen(false);
  };

  const menuItems = [
    { label: "Início", id: "hero" },
    { label: "Cardápio", id: "cardapio" },
    { label: "Contato", id: "contato" },
  ];

  return (
    <header
      className={`w-full bg-background/95 backdrop-blur-md py-3 border-b border-border shadow-sm fixed top-0 left-0 right-0 z-50 ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="flex items-center gap-3 hover:opacity-80 transition-all duration-300 group"
            >
              <div className="p-2 bg-brand-orange rounded-full transition-all duration-300 group-hover:scale-105">
                <Hamburger className="text-white" size={24} />
              </div>
              <h1 className="text-2xl font-bold text-foreground font-display">
                BIG B<span className="text-brand-orange">U</span>RGUER
              </h1>
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-foreground hover:text-brand-orange transition-colors duration-200 font-medium"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <Button
              variant="transparent"
              size="icon"
              onClick={handleCartClick}
              className="relative"
              aria-label={`Carrinho de compras${cartCount > 0 ? ` com ${cartCount} itens` : ""}`}
            >
              <ShoppingCart size={20} />
              <CartCounter className="absolute -top-1 -right-1" />
            </Button>

            <ThemeToggle />

            {user ? (
              <>
                <span className="hidden sm:block text-sm text-muted-foreground">
                  Olá, {user.name}
                </span>
                <Button
                  variant="transparent"
                  size="icon"
                  onClick={handleLoginClick}
                  aria-label="Sair"
                >
                  <LogOut size={20} />
                </Button>
              </>
            ) : (
              <Button
                variant="transparent"
                size="icon"
                onClick={handleLoginClick}
                aria-label="Entrar"
              >
                <User size={20} />
              </Button>
            )}

            <Button
              variant="transparent"
              size="icon"
              onClick={toggleMobileMenu}
              className="md:hidden"
              aria-label="Menu mobile"
            >
              <Menu size={20} />
            </Button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border">
            <nav className="flex flex-col gap-4 pt-4">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-left text-foreground hover:text-brand-orange transition-colors duration-200 font-medium py-2"
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
