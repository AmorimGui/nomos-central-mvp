/**
 * Procedural noise via SVG feTurbulence. Adds subtle paper-grain texture
 * over the landing's deep dark background. Rendered once at the layout
 * level; consumers don't need to instantiate it.
 */
export function NoiseOverlay() {
  return (
    <svg
      aria-hidden
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
    >
      <filter id="nomos-noise-filter">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.9"
          numOctaves="3"
          stitchTiles="stitch"
        />
      </filter>
      <rect width="100%" height="100%" filter="url(#nomos-noise-filter)" />
    </svg>
  );
}
