import FadeInSection from "../ui/FadeInSection";
import { beneficios } from "../../data/beneficios";

export default function PorQueMoga() {
  return (
    <section className="bg-bg-main py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <FadeInSection className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold text-text-primary sm:text-4xl">
            ¿Por qué <span className="text-gradient">Moga</span>?
          </h2>
        </FadeInSection>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {beneficios.map((b, i) => (
            <FadeInSection key={b.titulo} delay={i * 100}>
              <div className="h-full rounded-2xl border border-white/8 bg-bg-card p-6 text-center transition-colors hover:border-secondary/30">
                <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-main text-sm font-bold text-white">
                  {i + 1}
                </div>
                <h3 className="mb-2 text-base font-bold text-text-primary">{b.titulo}</h3>
                <p className="text-sm text-text-secondary">{b.descripcion}</p>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
}
