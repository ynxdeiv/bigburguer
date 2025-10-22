import type { Metadata } from "next";
import React from "react";
import { Nunito, Lacquer } from "next/font/google";
import { AppProviders } from "@/providers/AppProviders";
import { Footer } from "@/components/atomic/organisms/Footer";
import { Header } from "@/components/atomic/organisms/Header";
import "@/app/globals.css";

const lacquer = Lacquer({
  variable: "--font-lacquer",
  subsets: ["latin"],
  weight: "400",
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "BIGBURGUER",
    template: "%s | BIGBURGUER",
  },
  description:
    "A melhor hamburgueria da cidade. Sabores únicos e ingredientes frescos.",
  keywords: ["hamburgueria", "lanches", "delivery", "comida", "burger"],
  authors: [{ name: "BigBurger Team" }],
  creator: "BigBurger",
  publisher: "BigBurger",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  ),
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    title: "BIGBURGUER",
    description:
      "A melhor hamburgueria da cidade. Sabores únicos e ingredientes frescos.",
    siteName: "BIGBURGUER",
  },
  twitter: {
    card: "summary_large_image",
    title: "BIGBURGUER",
    description:
      "A melhor hamburgueria da cidade. Sabores únicos e ingredientes frescos.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="pt-BR" className={`${nunito.variable} ${lacquer.variable}`} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#FF6B35" />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <AppProviders>
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 pt-16">{children}</main>
            <Footer />
          </div>
        </AppProviders>
      </body>
    </html>
  );
};

export default RootLayout;
