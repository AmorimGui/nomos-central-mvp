import { Outlet } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import "./styles/landing.css";

export function LandingLayout() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="theme-brand min-h-screen">
        <Outlet />
      </div>
    </MotionConfig>
  );
}
