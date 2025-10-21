
"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface LoginContextType {
  isLoginOpen: boolean;
  openLogin: () => void;
  closeLogin: () => void;
  toggleLogin: () => void;
}

const LoginContext = createContext<LoginContextType | undefined>(undefined);

export function LoginProvider({ children }: { children: ReactNode }) {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const openLogin = () => setIsLoginOpen(true);
  const closeLogin = () => setIsLoginOpen(false);
  const toggleLogin = () => setIsLoginOpen((prev) => !prev);

  return (
    <LoginContext.Provider
      value={{
        isLoginOpen,
        openLogin,
        closeLogin,
        toggleLogin,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
}

export function useLogin() {
  const context = useContext(LoginContext);
  if (context === undefined) {
    throw new Error("useLogin must be used within a LoginProvider");
  }
  return context;
}
