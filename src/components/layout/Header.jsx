import { useEffect, useState } from "react";
import Logo from "../ui/Logo";
import { navLinks } from "../../data/navLinks";
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
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 transition-[padding] duration-300 sm:px-6">
      <div
        className={`flex w-full items-center justify-between rounded-full border transition-all duration-300 ${
          scrolled
            ? "mt-3 max-w-4xl gap-6 border-white/10 bg-bg-main/85 px-5 py-2.5 shadow-[0_15px_50px_rgba(0,0,0,0.45)] backdrop-blur-xl"
            : "mt-5 max-w-6xl gap-8 border-white/5 bg-bg-main/40 px-6 py-3.5 backdrop-blur-md"
        }`}
      >
        <a href="#top" className="shrink-0">
          <Logo className={`transition-all duration-300 ${scrolled ? "h-9" : "h-11"}`} />
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
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

        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden rounded-full bg-gradient-main px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_25px_rgba(139,61,255,0.35)] transition-transform hover:scale-105 lg:inline-block"
        >
          Contactar
        </a>

        <button
          className="flex items-center justify-center rounded-md p-2 text-text-primary lg:hidden"
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
        <div className="absolute inset-x-4 top-[4.75rem] max-w-6xl rounded-3xl border border-white/10 bg-bg-main/95 px-6 pb-6 shadow-[0_25px_70px_rgba(0,0,0,0.5)] backdrop-blur-xl sm:inset-x-6 lg:hidden">
          <nav className="flex flex-col gap-4 pt-5">
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
