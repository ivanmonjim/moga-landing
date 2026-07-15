import FadeInSection from "../ui/FadeInSection";
import SectionEyebrow from "../ui/SectionEyebrow";
import { proceso } from "../../data/proceso";

const icons = {
  chat: (
    <path
      d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  settings: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path
        d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15 1.65 1.65 0 0 0 3.17 14H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9c.14.36.4.66.73.85.32.2.7.3 1.08.3H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
  phone: (
    <path
      d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.36 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.34 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  chart: (
    <path
      d="M3 3v18h18M8 17V10m5 7V6m5 11v-4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
};

export default function ComoFunciona() {
  return (
    <section id="como-funciona" className="bg-bg-soft py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <FadeInSection className="mx-auto mb-16 max-w-2xl text-center">
          <SectionEyebrow>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M4 6h16M4 12h10M4 18h6" strokeLinecap="round" />
            </svg>
            Proceso
          </SectionEyebrow>
          <h2 className="text-3xl font-extrabold text-text-primary sm:text-4xl">
            Cómo empezar con la <span className="text-gradient">automatización de Moga</span>
          </h2>
          <p className="mt-4 text-text-secondary">
            En cuatro pasos tu negocio queda atendido por IA, sin curva técnica ni instalaciones
            complicadas.
          </p>
        </FadeInSection>

        <div className="grid gap-6 sm:grid-cols-2">
          {proceso.map((p, i) => (
            <FadeInSection key={p.titulo} delay={i * 100} className="h-full">
              <div className="relative h-full rounded-2xl border border-white/8 bg-bg-card p-7 transition-colors hover:border-secondary/30">
                <span className="absolute right-6 top-7 rounded-full border border-white/10 px-3 py-1 text-[11px] font-semibold text-text-muted">
                  {p.paso}
                </span>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-main text-white shadow-[0_0_20px_rgba(139,61,255,0.35)]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    {icons[p.icon]}
                  </svg>
                </div>

                <h3 className="mt-5 text-lg font-bold text-text-primary">{p.titulo}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">{p.descripcion}</p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {p.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 px-3 py-1 text-xs font-medium text-text-secondary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
}
