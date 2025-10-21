
"use client";

import React from "react";
import ReactQueryProvider from "./ReactQueryProvider";
import { ThemeProvider } from "./ThemeProvider";
import { AuthProvider } from "./AuthProvider";
import { CartProvider } from "./CartProvider";
import { LoginProvider } from "./LoginProvider";
import { ToastProvider } from "@/components/ui";

interface AppProvidersProps {
  children: React.ReactNode;
}

const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <ReactQueryProvider>
      <ThemeProvider>
        <ToastProvider>
          <AuthProvider>
            <CartProvider>
              <LoginProvider>{children}</LoginProvider>
            </CartProvider>
          </AuthProvider>
        </ToastProvider>
      </ThemeProvider>
    </ReactQueryProvider>
  );
};

export { AppProviders };
