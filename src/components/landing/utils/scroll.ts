/**
 * Smooth-scroll to an element by id, respecting prefers-reduced-motion.
 * Use for in-page anchor navigation across the landing.
 */
export function smoothScrollTo(id: string) {
  const target = document.getElementById(id);
  if (!target) return;

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  target.scrollIntoView({
    behavior: prefersReducedMotion ? "auto" : "smooth",
    block: "start",
  });
}
