import FadeInSection from "../ui/FadeInSection";
import SectionEyebrow from "../ui/SectionEyebrow";
import ServiciosCarousel from "../ui/ServiciosCarousel";

export default function Servicios() {
  return (
    <section id="servicios" className="bg-bg-main py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <FadeInSection className="mx-auto mb-16 max-w-2xl text-center">
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
            Descubre sistemas inteligentes que automatizan procesos, mejoran la operación y ayudan
            a las empresas a crecer.
          </p>
        </FadeInSection>
      </div>

      <FadeInSection delay={100} className="mx-auto max-w-6xl px-0 sm:px-6">
        <ServiciosCarousel />
      </FadeInSection>
    </section>
  );
}
