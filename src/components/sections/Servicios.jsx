import FadeInSection from "../ui/FadeInSection";
import SectionEyebrow from "../ui/SectionEyebrow";
import ServiciosCinematico from "../ui/ServiciosCinematico";

export default function Servicios() {
  return (
    <section id="servicios" className="relative bg-bg-main">
      <div className="mx-auto max-w-6xl px-6 pt-24 md:pt-32">
        <FadeInSection className="mx-auto mb-4 max-w-2xl text-center">
          <SectionEyebrow className="uppercase tracking-wider text-accent">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <rect x="3" y="3" width="7" height="7" rx="1.5" />
              <rect x="14" y="3" width="7" height="7" rx="1.5" />
              <rect x="3" y="14" width="7" height="7" rx="1.5" />
              <rect x="14" y="14" width="7" height="7" rx="1.5" />
            </svg>
            Soluciones MOGA
          </SectionEyebrow>
          <h2 className="text-3xl font-extrabold text-text-primary sm:text-4xl">
            Tecnología diseñada para <span className="text-gradient">transformar tu negocio</span>
          </h2>
          <p className="mt-4 text-text-secondary">
            Cinco sistemas inteligentes que automatizan procesos, mejoran la operación y ayudan a
            las empresas a crecer. Sigue bajando para descubrir cada uno.
          </p>
        </FadeInSection>
      </div>

      <div className="pb-24 md:pb-32">
        <ServiciosCinematico />
      </div>
    </section>
  );
}
