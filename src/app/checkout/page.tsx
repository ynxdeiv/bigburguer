"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { CheckoutPage } from "@/components/atomic";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import { useCreateOrder } from "@/hooks/useOrders";

export default function Checkout() {
  const { user, login, isAuthenticated, isValidatingToken, clearLoginError } =
    useAuth();
  const { cart, total } = useCart();
  const { mutate: createOrderMutation } = useCreateOrder();
  const router = useRouter();

  useEffect(() => {
    if (!isValidatingToken && !isAuthenticated) {
      router.push("/?login=true");
    }
  }, [isAuthenticated, isValidatingToken, router]);

  if (isValidatingToken) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-orange mx-auto mb-4"></div>
          <p className="text-muted-foreground">Verificando autenticação...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const handleLogin = async (credentials: {
    email: string;
    password: string;
  }) => {
    clearLoginError();
    try {
      await login(credentials);
    } catch (error) {
      throw error;
    }
  };

  const handleCreateOrder = async (orderData: any) => {
    try {
      createOrderMutation(orderData);
    } catch (error) {
      console.error("Erro ao criar pedido:", error);
      throw error;
    }
  };

  const handleClearCart = () => {
    ("Limpar carrinho");
  };

  return (
    <CheckoutPage
      user={user}
      cart={cart}
      total={total}
      onLogin={handleLogin}
      onCreateOrder={handleCreateOrder}
      onClearCart={handleClearCart}
      isLoading={false}
      loginError={undefined}
    />
  );
}
