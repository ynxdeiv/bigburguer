
"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { LoginContextType } from "@/types";

const LoginContext = createContext<LoginContextType | undefined>(undefined);

interface LoginProviderProps {
  children: ReactNode;
}

export const LoginProvider: React.FC<LoginProviderProps> = ({ children }) => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const openLogin = (): void => {
    setIsLoginOpen(true);

    document.body.style.overflow = "hidden";
  };

  const closeLogin = (): void => {
    setIsLoginOpen(false);

    document.body.style.overflow = "unset";
  };

  const toggleLogin = (): void => {
    if (isLoginOpen) {
      closeLogin();
    } else {
      openLogin();
    }
  };

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isLoginOpen) {
        closeLogin();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isLoginOpen]);

  React.useEffect(() => {
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const value: LoginContextType = {
    isLoginOpen,
    openLogin,
    closeLogin,
    toggleLogin,
  };

  return (
    <LoginContext.Provider value={value}>{children}</LoginContext.Provider>
  );
};

export const useLogin = (): LoginContextType => {
  const context = useContext(LoginContext);

  if (context === undefined) {
    throw new Error("useLogin deve ser usado dentro de um LoginProvider");
  }

  return context;
};

export const useIsLoginOpen = (): boolean => {
  const { isLoginOpen } = useLogin();
  return isLoginOpen;
};
