import { useEffect, useRef, useState } from "react";

export default function AccederDropdown({ items, className = "" }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-text-primary transition-colors hover:border-secondary/50"
      >
        Acceder
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 overflow-hidden rounded-xl border border-white/10 bg-bg-card shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
          {items.map((item) => (
            <a
              key={item.titulo}
              href={item.sistemaUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="block px-4 py-3 text-sm text-text-secondary transition-colors hover:bg-white/5 hover:text-text-primary"
            >
              {item.titulo}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
