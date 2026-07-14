import FadeInSection from "../ui/FadeInSection";
import PrecioCard from "../ui/PrecioCard";
import { planes } from "../../data/precios";

export default function Precios() {
  return (
    <section id="precios" className="bg-bg-soft py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <FadeInSection className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold text-text-primary sm:text-4xl">
            Planes a la <span className="text-gradient">medida de tu negocio</span>
          </h2>
          <p className="mt-4 text-text-secondary">
            Elige el paquete que mejor se adapte a tu volumen de clientes. Todos incluyen
            automatización con IA.
          </p>
        </FadeInSection>

        <div className="grid gap-8 md:grid-cols-3">
          {planes.map((plan, i) => (
            <PrecioCard key={plan.nombre} {...plan} delay={i * 120} />
          ))}
        </div>
      </div>
    </section>
  );
}
