import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  /** "hero" yields more vertical breathing room above-the-fold. */
  size?: "default" | "hero";
  /** Optional element rendered behind content, spanning the full section (e.g. radial gradients). */
  backdrop?: ReactNode;
}

export function Section({
  children,
  className,
  id,
  size = "default",
  backdrop,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "w-full px-6 md:px-12 lg:px-24",
        size === "default" && "py-24 md:py-32 lg:py-40",
        size === "hero" && "pt-16 pb-24 md:pt-24 md:pb-32 lg:pt-32 lg:pb-40",
        backdrop && "relative isolate",
        className
      )}
    >
      {backdrop}
      <div className="mx-auto max-w-7xl">{children}</div>
    </section>
  );
}
