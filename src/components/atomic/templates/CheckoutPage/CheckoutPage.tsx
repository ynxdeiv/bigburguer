/**
 * Componente CheckoutPage - Template
 * Página completa de checkout com todos os componentes
 */

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  PaymentMethodSelector,
  PaymentMethodType,
} from "../../molecules/PaymentMethodSelector";
import { OrderSummary } from "../../molecules/OrderSummary";
import { PaymentForm } from "../../organisms/PaymentForm";
import { LoginModal } from "../../organisms/LoginModal";
import { CartItem } from "@/types";

export interface CheckoutPageProps {
  user: any;
  cart: CartItem[];
  total: number;
  onLogin: (credentials: { email: string; password: string }) => Promise<void>;
  onCreateOrder: (orderData: any) => void;
  onClearCart: () => void;
  isLoading?: boolean;
  loginError?: string;
}

export function CheckoutPage({
  user,
  cart,
  total,
  onLogin,
  onCreateOrder,
  onClearCart,
  isLoading = false,
  loginError,
}: CheckoutPageProps) {
  const router = useRouter();
  const [selectedMethod, setSelectedMethod] =
    useState<PaymentMethodType | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<
    "initial" | "processing" | "paid" | "failed"
  >("initial");
  const [orderId, setOrderId] = useState<string>("");
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  useEffect(() => {
    if (!user) {
      setIsLoginOpen(true);
    }
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg mb-4">Redirecionando para login...</p>
        </div>

        <LoginModal
          isOpen={isLoginOpen}
          onClose={() => setIsLoginOpen(false)}
          onLogin={onLogin}
          isLoading={isLoading}
          error={loginError}
        />
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Carrinho vazio</h1>
          <button
            onClick={() => router.push("/")}
            className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90"
          >
            Voltar para o cardápio
          </button>
        </div>
      </div>
    );
  }

  const handlePaymentSuccess = async () => {
    const newOrderId = `ORDER-${Date.now()}`;
    onCreateOrder({
      items: cart,
      total,
      paymentMethod: selectedMethod || "unknown",
      status: "completed",
    });
    onClearCart();
    setPaymentStatus("paid");
    setOrderId(newOrderId);
    setTimeout(() => router.push("/"), 2000);
  };

  const handlePaymentFailure = () => {
    setPaymentStatus("failed");
  };

  return (
    <div className="min-h-screen bg-background py-4 md:py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">
          Finalizar Pedido
        </h1>

        <div className="space-y-6">
          {/* Resumo do pedido - em cima */}
          <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Resumo do Pedido
            </h2>
            <OrderSummary
              cart={cart}
              total={total}
              selectedMethod={selectedMethod}
            />
          </div>

          {/* Formulário de pagamento */}
          <div className="space-y-4 md:space-y-6">
            {paymentStatus === "initial" && (
              <PaymentMethodSelector
                selectedMethod={selectedMethod}
                onSelectMethod={setSelectedMethod}
              />
            )}

            {selectedMethod && paymentStatus === "initial" && (
              <PaymentForm
                method={selectedMethod}
                amount={total}
                onSuccess={handlePaymentSuccess}
                onFailure={handlePaymentFailure}
                onStatusChange={setPaymentStatus}
              />
            )}

            {paymentStatus !== "initial" && (
              <div className="bg-card rounded-lg border border-border p-4 md:p-6 text-center">
                {paymentStatus === "processing" && (
                  <div>
                    <div className="animate-spin rounded-full h-10 w-10 md:h-12 md:w-12 border-2 border-primary border-t-transparent mx-auto mb-4"></div>
                    <h2 className="text-lg md:text-xl font-bold mb-2">
                      Processando pagamento...
                    </h2>
                    <p className="text-sm md:text-base text-muted-foreground">
                      Aguarde enquanto processamos seu pagamento.
                    </p>
                  </div>
                )}

                {paymentStatus === "paid" && (
                  <div>
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg
                        className="w-6 h-6 md:w-8 md:h-8 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <h2 className="text-lg md:text-xl font-bold mb-2 text-green-600">
                      Pagamento Aprovado!
                    </h2>
                    <p className="text-sm md:text-base text-muted-foreground mb-4">
                      Seu pedido #{orderId} foi confirmado com sucesso.
                    </p>
                    <p className="text-xs md:text-sm text-muted-foreground">
                      Redirecionando para a página inicial...
                    </p>
                  </div>
                )}

                {paymentStatus === "failed" && (
                  <div>
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg
                        className="w-6 h-6 md:w-8 md:h-8 text-red-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </div>
                    <h2 className="text-lg md:text-xl font-bold mb-2 text-red-600">
                      Pagamento Falhou
                    </h2>
                    <p className="text-sm md:text-base text-muted-foreground mb-4">
                      Não foi possível processar seu pagamento. Tente novamente.
                    </p>
                    <button
                      onClick={() => setPaymentStatus("initial")}
                      className="bg-primary text-white px-4 py-2 md:px-6 md:py-3 rounded-lg hover:bg-primary/90 text-sm md:text-base"
                    >
                      Tentar Novamente
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
