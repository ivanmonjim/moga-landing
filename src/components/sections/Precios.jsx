import FadeInSection from "../ui/FadeInSection";
import SectionEyebrow from "../ui/SectionEyebrow";
import PreciosCarousel from "../ui/PreciosCarousel";
import { IMPLEMENTACION } from "../../data/precios";

export default function Precios() {
  return (
    <section id="precios" className="bg-bg-soft py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <FadeInSection className="mx-auto mb-16 max-w-2xl text-center">
          <SectionEyebrow>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Precios
          </SectionEyebrow>
          <h2 className="text-3xl font-extrabold text-text-primary sm:text-4xl">
            Planes a la <span className="text-gradient">medida de tu negocio</span>
          </h2>
          <p className="mt-4 text-text-secondary">
            Elige el servicio que necesita tu negocio. Cada uno incluye automatización con IA y
            panel administrativo propio.
          </p>
        </FadeInSection>
      </div>

      <FadeInSection delay={100} className="mx-auto max-w-6xl">
        <PreciosCarousel />
      </FadeInSection>

      <div className="mx-auto mt-14 max-w-6xl px-6">
        <FadeInSection delay={160}>
          <div className="flex flex-col items-center gap-4 rounded-2xl border border-white/8 bg-bg-card px-6 py-6 text-center sm:flex-row sm:justify-between sm:text-left">
            <div className="flex items-center gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-main text-white shadow-[0_0_20px_rgba(139,61,255,0.35)]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <circle cx="12" cy="12" r="3" />
                  <path
                    d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15 1.65 1.65 0 0 0 3.17 14H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9c.14.36.4.66.73.85.32.2.7.3 1.08.3H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <div>
                <p className="text-sm font-semibold text-text-primary">Implementación (pago único)</p>
                <p className="text-sm text-text-secondary">{IMPLEMENTACION.texto}</p>
              </div>
            </div>
            <p className="text-2xl font-extrabold text-text-primary">{IMPLEMENTACION.monto}</p>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}
