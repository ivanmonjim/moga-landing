import FadeInSection from "../ui/FadeInSection";
import SectionEyebrow from "../ui/SectionEyebrow";
import PreciosCarousel from "../ui/PreciosCarousel";

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
            Elige el paquete que mejor se adapte a tu volumen de clientes. Todos incluyen
            automatización con IA.
          </p>
        </FadeInSection>
      </div>

      <FadeInSection delay={100} className="mx-auto max-w-6xl">
        <PreciosCarousel />
      </FadeInSection>
    </section>
  );
}
