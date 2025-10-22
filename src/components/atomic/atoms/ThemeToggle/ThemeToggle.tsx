
"use client";

import React from "react";
import { Sun, Moon } from "lucide-react";
import { Button } from "../Button";
import { useTheme } from "next-themes";

export interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);


  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button
        variant="transparent"
        size="icon"
        className={className}
        aria-label="Alternar tema"
      >
        <Sun size={20} />
      </Button>
    );
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Button
      variant="transparent"
      size="icon"
      onClick={toggleTheme}
      className={className}
      aria-label={`Alternar para tema ${theme === "dark" ? "claro" : "escuro"}`}
    >
      {theme === "dark" ? (
        <Sun size={20} className="text-yellow-500" />
      ) : (
        <Moon size={20} className="text-slate-600" />
      )}
    </Button>
  );
}
