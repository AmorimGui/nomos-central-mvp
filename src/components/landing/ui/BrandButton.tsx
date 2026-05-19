import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

export interface BrandButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export const BrandButton = forwardRef<HTMLButtonElement, BrandButtonProps>(
  ({ variant = "primary", size = "md", className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-brand-bg",
          "disabled:opacity-50 disabled:pointer-events-none",

          variant === "primary" && [
            "bg-brand-accent text-brand-bg",
            "shadow-[0_0_40px_rgba(16,185,129,0.3),0_0_80px_rgba(16,185,129,0.1)]",
            "hover:shadow-[0_0_60px_rgba(16,185,129,0.45),0_0_120px_rgba(16,185,129,0.15)]",
            "hover:brightness-110",
          ],
          variant === "secondary" && [
            "border border-white/[0.08] text-brand-text-primary bg-transparent",
            "hover:border-white/[0.16] hover:bg-white/[0.04]",
          ],
          variant === "ghost" && [
            "text-brand-text-primary bg-transparent",
            "hover:bg-white/[0.04]",
          ],

          size === "sm" && "px-3 py-1.5 text-sm",
          size === "md" && "px-5 py-2.5 text-sm",
          size === "lg" && "px-6 py-3.5 text-base",

          className
        )}
        {...props}
      />
    );
  }
);
BrandButton.displayName = "BrandButton";
