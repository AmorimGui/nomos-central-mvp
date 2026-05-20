import { Outlet } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import { NoiseOverlay } from "./ui/NoiseOverlay";
import "./styles/landing.css";

export function LandingLayout() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="theme-brand min-h-screen relative overflow-hidden">
        {/* Procedural noise — subtle paper grain over the whole landing */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay"
        >
          <NoiseOverlay />
        </div>

        {/* Content stays above the noise layer */}
        <div className="relative z-10">
          <Outlet />
        </div>
      </div>
    </MotionConfig>
  );
}
