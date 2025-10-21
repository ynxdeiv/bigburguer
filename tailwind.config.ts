/**
 * Configuração do Tailwind CSS refatorada
 * Configuração moderna com melhor performance e organização
 */

import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Cores personalizadas do projeto
        brand: {
          orange: "#FF6B35",
          yellow: "#FFD23F",
          cream: "#FFF8F0",
          dark: "#1A1A1A",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-nunito)", "system-ui", "sans-serif"],
        display: ["var(--font-lacquer)", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeInUp 0.4s cubic-bezier(0.4, 0, 0.2, 1) both",
        "fade-in-left": "fadeInLeft 0.4s cubic-bezier(0.4, 0, 0.2, 1) both",
        "fade-in-right": "fadeInRight 0.4s cubic-bezier(0.4, 0, 0.2, 1) both",
        "slide-in-right": "slideInRight 0.4s cubic-bezier(0.4, 0, 0.2, 1) both",
        "fade-out": "fadeOut 0.4s cubic-bezier(0.4, 0, 0.2, 1) both",
        "slide-out-right":
          "slideOutRight 0.4s cubic-bezier(0.4, 0, 0.2, 1) both",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "bounce-slow": "bounce 2s infinite",
      },
      keyframes: {
        fadeInUp: {
          "0%": {
            opacity: "0",
            transform: "translateY(30px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        fadeInLeft: {
          "0%": {
            opacity: "0",
            transform: "translateX(-30px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0)",
          },
        },
        fadeInRight: {
          "0%": {
            opacity: "0",
            transform: "translateX(30px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0)",
          },
        },
        slideInRight: {
          "0%": {
            opacity: "0",
            transform: "translateX(60px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0)",
          },
        },
        fadeOut: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        slideOutRight: {
          "0%": { opacity: "1", transform: "translateX(0)" },
          "100%": { opacity: "0", transform: "translateX(60px)" },
        },
      },
      spacing: {
        "18": "4.5rem",
        "88": "22rem",
        "128": "32rem",
      },
      screens: {
        xs: "475px",
      },
      backdropBlur: {
        xs: "2px",
      },
      boxShadow: {
        "inner-lg": "inset 0 2px 4px 0 rgba(0, 0, 0, 0.1)",
        glow: "0 0 20px rgba(255, 107, 53, 0.3)",
        "glow-lg": "0 0 30px rgba(255, 107, 53, 0.4)",
      },
      transitionDuration: {
        "400": "400ms",
        "600": "600ms",
        "800": "800ms",
        "1200": "1200ms",
      },
      transitionTimingFunction: {
        "bounce-in": "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    // Plugin personalizado para utilitários do projeto
    function ({ addUtilities, theme }: any) {
      const newUtilities = {
        ".text-balance": {
          "text-wrap": "balance",
        },
        ".scrollbar-hide": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        },
        ".scrollbar-thin": {
          "scrollbar-width": "thin",
          "&::-webkit-scrollbar": {
            width: "8px",
            height: "8px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: theme("colors.muted.DEFAULT"),
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: theme("colors.muted.foreground"),
            borderRadius: "9999px",
            "&:hover": {
              backgroundColor: theme("colors.muted.foreground"),
              opacity: "0.8",
            },
          },
        },
        ".glass": {
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
        },
        ".glass-dark": {
          background: "rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        },
      };
      addUtilities(newUtilities);
    },
  ],
};

export default config;
