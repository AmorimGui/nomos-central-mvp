import { Outlet } from "react-router-dom";

export function LandingLayout() {
  return (
    <div className="theme-brand min-h-screen">
      <Outlet />
    </div>
  );
}
