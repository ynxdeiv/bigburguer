"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  Header,
  HeroSection,
  BurguerCarousel,
  ContactForm,
  Maps,
  CartModal,
  LoginModal,
} from "@/components/atomic";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import { useCartModal } from "@/providers/CartProvider";
import { useProducts } from "@/hooks/useProducts";
import { useContact } from "@/hooks/useContact";
import { useHeroData } from "@/hooks/usePrismic";
import { Product, ContactFormType } from "@/types";

function HomePageContent() {
  const { user, login, isLoggingIn, loginError, clearLoginError } = useAuth();
  const { cart, addToCart, removeFromCart, updateQuantity, total, totalItems } =
    useCart();
  const { isCartOpen, openCart, closeCart } = useCartModal();
  const { data: products, isLoading: productsLoading } = useProducts();
  const { submitContact, isSubmitting: contactSubmitting } = useContact();
  const { data: heroData, isLoading: isHeroLoading } = useHeroData();
  const searchParams = useSearchParams();

  const [isLoginOpen, setIsLoginOpen] = useState(false);

  useEffect(() => {
    if (searchParams.get("login") === "true") {
      setIsLoginOpen(true);
    }
  }, [searchParams]);

  const productSectionData = {
    title: "Nossos Burgers",
    subtitle:
      "Descubra nossa seleção de hambúrgueres artesanais feitos com ingredientes frescos e de qualidade",
  };

  const handleAddToCart = (product: Product) => {
    try {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      });
    } catch (error) {}
  };

  const handleLogin = async (credentials: {
    email: string;
    password: string;
  }) => {
    clearLoginError();
    try {
      await login(credentials);
      setIsLoginOpen(false);
    } catch (error) {}
  };

  const handleContactSubmit = async (data: ContactFormType) => {
    try {
      await submitContact(data);
    } catch (error) {}
  };

  const openLoginModal = () => setIsLoginOpen(true);
  const closeModals = () => {
    setIsLoginOpen(false);
    closeCart();
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        user={user}
        onLoginClick={openLoginModal}
        onCartClick={openCart}
        cartItemCount={totalItems}
      />

      <main className="space-y-16">
        <section className="relative flex items-center justify-center">
          <HeroSection
            title={heroData?.title || "O Sabor que Vira Vício"}
            subtitle={heroData?.subtitle || ""}
            description={heroData?.description || ""}
            image={
              typeof heroData?.image === "object"
                ? heroData.image?.url || ""
                : heroData?.image || ""
            }
            imageAlt={
              typeof heroData?.image === "object" ? heroData.image?.alt : ""
            }
            onOrderClick={openCart}
            showButtons={true}
          />
        </section>

        <section id="cardapio" className="container mx-auto px-4 py-8 md:py-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              {productSectionData.title}
            </h2>
            <p className="text-muted-foreground text-lg">
              {productSectionData.subtitle}
            </p>
          </div>
          <BurguerCarousel
            products={products || []}
            isLoading={productsLoading}
            onAddToCart={handleAddToCart}
          />
        </section>

        <section id="contato" className="container mx-auto px-4 py-8 md:py-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Entre em Contato
            </h2>
            <p className="text-muted-foreground">
              Tem alguma dúvida ou sugestão? Entre em contato conosco!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto items-start mb-8">
            <div className="space-y-6">
              <div className="relative max-w-md mx-auto">
                <Maps />
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  Envie sua mensagem
                </h3>
                <ContactForm
                  onSubmit={handleContactSubmit}
                  isLoading={contactSubmitting}
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <CartModal
        isOpen={isCartOpen}
        onClose={closeCart}
        cart={cart}
        onRemoveItem={(id: string) => removeFromCart({ id, returnStock: true })}
        onQuantityChange={(id: string, quantity: number) =>
          updateQuantity({ id, quantity })
        }
        total={total}
        totalItems={totalItems}
        user={user}
        onCheckout={() => {
          if (!user) {
            window.location.href = "/?login=true";
            return;
          }
          window.location.href = "/checkout";
        }}
      />

      <LoginModal
        isOpen={isLoginOpen}
        onClose={closeModals}
        onLogin={handleLogin}
        isLoading={isLoggingIn}
        error={loginError?.message}
      />
    </div>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <HomePageContent />
    </Suspense>
  );
}
