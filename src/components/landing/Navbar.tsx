import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-brand-bg/70 border-b border-white/[0.04]">
      <div className="mx-auto max-w-7xl flex items-center justify-between h-16 px-6 md:px-12 lg:px-24">
        <Link to="/" className="flex items-center" aria-label="Nomos — voltar ao topo">
          <img
            src="/logo-nomos.jpg"
            alt="Nomos"
            className="h-8 w-auto mix-blend-screen select-none"
            draggable={false}
          />
        </Link>
        {/* Right side intentionally empty — theme toggle adiado para v2 */}
      </div>
    </header>
  );
}
