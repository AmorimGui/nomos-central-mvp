import { cn } from "@/lib/utils";

interface MMotifProps {
  className?: string;
}

/**
 * Stylized "M" from the Nomos wordmark, recreated as inline SVG so it
 * scales without pixelation and can inherit currentColor. Designed for
 * large decorative use behind sections at 3-5% opacity.
 */
export function MMotif({ className }: MMotifProps) {
  return (
    <svg
      viewBox="0 0 200 200"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
      className={cn("pointer-events-none select-none", className)}
    >
      <path
        d="M 30 180 L 70 30 L 100 130 L 130 30 L 170 180"
        stroke="currentColor"
        strokeWidth="18"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
