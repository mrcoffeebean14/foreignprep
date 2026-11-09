"use client";

import { forwardRef } from "react";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "dark"
  | "light"
  | "link";
type Size = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  fullWidth?: boolean;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-brand-600 text-white shadow-lift hover:bg-brand-700 active:bg-brand-800",
  secondary:
    "bg-brand-50 text-brand-700 hover:bg-brand-100 border border-brand-200",
  outline:
    "border border-ink-300/40 bg-white text-ink hover:border-brand-400 hover:text-brand-700",
  ghost: "text-ink-500 hover:bg-surface-sunken hover:text-ink",
  dark: "bg-ink text-white hover:bg-ink-700",
  light: "bg-white text-ink shadow-lift hover:bg-surface-sunken",
  link: "text-brand-600 hover:text-brand-700 px-0 hover:underline underline-offset-4",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm gap-1.5",
  md: "h-11 px-5 text-sm gap-2",
  lg: "h-12 px-7 text-base gap-2.5",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      variant = "primary",
      size = "md",
      iconLeft,
      iconRight,
      fullWidth,
      className,
      children,
      type = "button",
      ...props
    },
    ref,
  ) {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          "focus-ring inline-flex items-center justify-center rounded-full font-semibold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50",
          variants[variant],
          sizes[size],
          fullWidth && "w-full",
          className,
        )}
        {...props}
      >
        {iconLeft}
        {children}
        {iconRight}
      </button>
    );
  },
);
