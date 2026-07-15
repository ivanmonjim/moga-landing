import FadeInSection from "../ui/FadeInSection";
import SectionEyebrow from "../ui/SectionEyebrow";
import ServicioCard from "../ui/ServicioCard";
import { servicios } from "../../data/servicios";

export default function Servicios() {
  return (
    <section id="servicios" className="bg-bg-main py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <FadeInSection className="mx-auto mb-16 max-w-2xl text-center">
          <SectionEyebrow>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <rect x="3" y="3" width="7" height="7" rx="1.5" />
              <rect x="14" y="3" width="7" height="7" rx="1.5" />
              <rect x="3" y="14" width="7" height="7" rx="1.5" />
              <rect x="14" y="14" width="7" height="7" rx="1.5" />
            </svg>
            Servicios
          </SectionEyebrow>
          <h2 className="text-3xl font-extrabold text-text-primary sm:text-4xl">
            Nuestros <span className="text-gradient">servicios</span>
          </h2>
          <p className="mt-4 text-text-secondary">
            Dos soluciones listas para automatizar la operación de tu negocio con inteligencia
            artificial.
          </p>
        </FadeInSection>

        <div className="grid gap-8 md:grid-cols-2">
          {servicios.map((servicio, i) => (
            <ServicioCard key={servicio.titulo} {...servicio} delay={i * 120} />
          ))}
        </div>
      </div>
    </section>
  );
}
