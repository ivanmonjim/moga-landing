import FadeInSection from "./FadeInSection";

export default function PrecioCard({ nombre, precio, caracteristicas, cta, destacado, delay = 0 }) {
  return (
    <FadeInSection delay={delay} className="h-full">
      <div
        className={`flex h-full flex-col rounded-2xl p-8 ${
          destacado
            ? "bg-gradient-card border border-secondary/40 shadow-[0_0_50px_rgba(139,61,255,0.25)]"
            : "border border-white/8 bg-bg-card"
        }`}
      >
        {destacado && (
          <span className="mb-4 w-fit rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white">
            Más popular
          </span>
        )}

        <h3 className="text-lg font-bold text-text-primary">{nombre}</h3>
        <p className="mt-2 mb-6 text-3xl font-extrabold text-text-primary">
          {precio /* TODO: actualizar precio real */}
        </p>

        <ul className="mb-8 flex-1 space-y-3">
          {caracteristicas.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-sm text-text-secondary">
              <svg
                className="mt-0.5 h-4 w-4 shrink-0 text-cyan"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {item}
            </li>
          ))}
        </ul>

        <a
          href="#contacto"
          className={`rounded-full px-6 py-3 text-center text-sm font-semibold transition-transform hover:scale-105 ${
            destacado
              ? "bg-white text-bg-main"
              : "bg-gradient-main text-white shadow-[0_0_25px_rgba(139,61,255,0.3)]"
          }`}
        >
          {cta}
        </a>
      </div>
    </FadeInSection>
  );
}
