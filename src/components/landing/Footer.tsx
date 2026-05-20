import type { MouseEvent } from "react";
import { Link } from "react-router-dom";
import { smoothScrollTo } from "./utils/scroll";

const navLinks = [
  { href: "#funcionalidades", label: "Funcionalidades" },
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#para-quem", label: "Para quem é" },
];

export function Footer() {
  const handleAnchorClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    smoothScrollTo(href.replace("#", ""));
  };

  return (
    <footer className="border-t border-white/[0.08] py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-24 flex flex-col gap-8 md:flex-row md:items-start md:justify-between md:gap-12">
        {/* Left: logo + tagline */}
        <Link
          to="/"
          className="flex flex-col items-start gap-2"
          aria-label="Nomos — voltar ao topo"
        >
          <img
            src="/logo-nomos.jpg"
            alt="Nomos"
            className="h-8 w-auto mix-blend-screen select-none"
            draggable={false}
          />
          <span className="text-sm text-brand-text-secondary">Estude com clareza.</span>
        </Link>

        {/* Right: nav + copyright stacked */}
        <div className="flex flex-col gap-6 md:items-end">
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleAnchorClick(e, link.href)}
                className="text-sm text-brand-text-secondary hover:text-brand-text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <span className="caption text-brand-text-tertiary">© 2026 Nomos</span>
        </div>
      </div>
    </footer>
  );
}
