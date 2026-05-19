import { Outlet } from "react-router-dom";
import "./styles/landing.css";

export function LandingLayout() {
  return (
    <div className="theme-brand min-h-screen">
      <Outlet />
    </div>
  );
}
