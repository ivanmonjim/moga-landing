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
};

export default function ServicioCard({ icon, titulo, descripcion, href, delay = 0 }) {
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

        <a
          href={href}
          className="inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-primary transition-colors group-hover:text-cyan"
        >
          Saber más
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </FadeInSection>
  );
}
