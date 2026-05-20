import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlowEffectProps {
  children: ReactNode;
  className?: string;
  /** Strength of the glow halo behind children. */
  intensity?: "subtle" | "medium" | "strong";
}

export function GlowEffect({ children, className, intensity = "medium" }: GlowEffectProps) {
  return (
    <div className={cn("relative", className)}>
      <div
        aria-hidden
        className={cn(
          "absolute inset-0 -z-10 blur-3xl rounded-full bg-brand-accent",
          intensity === "subtle" && "opacity-10",
          intensity === "medium" && "opacity-20",
          intensity === "strong" && "opacity-30",
        )}
      />
      {children}
    </div>
  );
}
