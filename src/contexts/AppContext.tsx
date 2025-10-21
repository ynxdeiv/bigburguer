
"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { useTheme } from "next-themes";
import { Theme, AppContextType } from "@/types";

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const { theme, setTheme, resolvedTheme } = useTheme();

  const handleSetTheme = (newTheme: Theme): void => {
    setTheme(newTheme);
  };

  const getCurrentTheme = (): Theme => {
    return (theme as Theme) || "system";
  };

  const isDarkMode = (): boolean => {
    return resolvedTheme === "dark";
  };

  const toggleTheme = (): void => {
    const currentTheme = getCurrentTheme();
    if (currentTheme === "light") {
      handleSetTheme("dark");
    } else if (currentTheme === "dark") {
      handleSetTheme("light");
    } else {

      handleSetTheme("light");
    }
  };

  const value: AppContextType = {
    theme: getCurrentTheme(),
    setTheme: handleSetTheme,
    toggleTheme,
    isDarkMode: isDarkMode(),
    resolvedTheme: resolvedTheme as Theme,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);

  if (context === undefined) {
    throw new Error("useAppContext deve ser usado dentro de um AppProvider");
  }

  return context;
};

export const useThemeManager = () => {
  const { theme, setTheme, toggleTheme, isDarkMode } = useAppContext();

  return {
    theme,
    setTheme,
    toggleTheme,
    isDarkMode,
  };
};
