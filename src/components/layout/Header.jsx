import { useEffect, useState } from "react";
import Logo from "../ui/Logo";
import AccederDropdown from "../ui/AccederDropdown";
import { navLinks } from "../../data/navLinks";
import { servicios } from "../../data/servicios";
import { WHATSAPP_URL } from "../../data/whatsapp";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-bg-main/90 backdrop-blur-md border-b border-white/5" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#top" className="shrink-0">
          <Logo />
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <AccederDropdown items={servicios} className="hidden md:block" />

        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden rounded-full bg-gradient-main px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_25px_rgba(139,61,255,0.35)] transition-transform hover:scale-105 md:inline-block"
        >
          Contactar
        </a>

        <button
          className="flex items-center justify-center rounded-md p-2 text-text-primary md:hidden"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuOpen}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {menuOpen ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-white/5 bg-bg-main px-6 pb-6 md:hidden">
          <nav className="flex flex-col gap-4 pt-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-base font-medium text-text-secondary hover:text-text-primary"
              >
                {link.label}
              </a>
            ))}

            <div className="mt-2 border-t border-white/5 pt-4">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-text-muted">
                Acceder
              </p>
              <div className="flex flex-col gap-3">
                {servicios.map((s) => (
                  <a
                    key={s.titulo}
                    href={s.sistemaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMenuOpen(false)}
                    className="text-base font-medium text-text-secondary hover:text-text-primary"
                  >
                    {s.titulo}
                  </a>
                ))}
              </div>
            </div>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="mt-2 rounded-full bg-gradient-main px-5 py-2.5 text-center text-sm font-semibold text-white"
            >
              Contactar
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
