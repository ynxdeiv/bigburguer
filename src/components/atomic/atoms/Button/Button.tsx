
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { BaseButtonProps } from "@/types";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-95",
  {
    variants: {
      variant: {
        primary:
          "bg-brand-orange text-white hover:bg-brand-orange/90 focus-visible:ring-brand-orange border border-brand-orange shadow-sm hover:shadow-md",
        secondary:
          "bg-brand-dark text-white hover:bg-brand-dark/90 focus-visible:ring-brand-dark border border-brand-dark shadow-sm hover:shadow-md",
        outline:
          "bg-transparent text-brand-orange hover:bg-brand-orange hover:text-white focus-visible:ring-brand-orange border border-brand-orange",
        ghost:
          "bg-secondary text-brand-dark hover:bg-brand-orange hover:text-white focus-visible:ring-brand-orange border border-transparent",
        transparent:
          "bg-transparent text-foreground hover:bg-transparent focus-visible:ring-brand-orange border border-transparent",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 focus-visible:ring-destructive border border-destructive",
        success:
          "bg-green-600 text-white hover:bg-green-700 focus-visible:ring-green-600 border border-green-600",
      },
      size: {
        default: "h-10 px-6 py-2 text-base",
        sm: "h-8 px-4 text-sm",
        lg: "h-12 px-8 text-lg font-semibold",
        xl: "h-14 px-10 text-xl font-bold",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends BaseButtonProps,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        data-slot="button"
        className={cn(buttonVariants({ variant, size, className }))}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent" />
        )}
        {!loading && leftIcon && <span className="shrink-0">{leftIcon}</span>}
        {children && <span className="flex-1">{children}</span>}
        {!loading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
      </Comp>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
