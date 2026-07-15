import FadeInSection from "./FadeInSection";

const icons = {
  calendar: (
    <path
      d="M8 2v4M16 2v4M3 9h18M5 5h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  restaurant: (
    <path
      d="M6 2v8m0 0a2 2 0 1 0 0 4m0-4a2 2 0 1 1 0 4m0-4v10m12-14v20M12 2v20"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  faceId: (
    <>
      <path
        d="M4 8V6a2 2 0 0 1 2-2h2M16 4h2a2 2 0 0 1 2 2v2M20 16v2a2 2 0 0 1-2 2h-2M8 20H6a2 2 0 0 1-2-2v-2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 10v1M15 10v1M9 15c.75.667 1.75 1 3 1s2.25-.333 3-1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
};

export default function ServicioCard({ icon, titulo, descripcion, href, sistemaUrl, delay = 0 }) {
  return (
    <FadeInSection delay={delay} className="h-full">
      <div className="group flex h-full flex-col rounded-2xl border border-white/8 bg-bg-card p-8 transition-all duration-300 hover:border-secondary/40 hover:shadow-[0_0_40px_rgba(139,61,255,0.15)]">
        <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-main text-white shadow-[0_0_20px_rgba(139,61,255,0.35)]">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            {icons[icon]}
          </svg>
        </div>

        <h3 className="mb-3 text-xl font-bold text-text-primary">{titulo}</h3>
        <p className="mb-8 flex-1 text-sm leading-relaxed text-text-secondary">{descripcion}</p>

        <div className="flex flex-wrap items-center gap-4">
          <a
            href={href}
            className="inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-primary transition-colors group-hover:text-cyan"
          >
            Saber más
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>

          <a
            href={sistemaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-1.5 rounded-full border border-white/15 px-4 py-2 text-xs font-semibold text-text-primary transition-colors hover:border-secondary/50"
          >
            Entrar al sistema
          </a>
        </div>
      </div>
    </FadeInSection>
  );
}
