import FadeInSection from "../ui/FadeInSection";
import { confianza } from "../../data/confianza";

export default function Confianza() {
  return (
    <section className="border-y border-white/5 bg-bg-main py-10">
      <FadeInSection className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-2 divide-y divide-white/8 sm:grid-cols-4 sm:divide-y-0 sm:divide-x">
          {confianza.map((item) => (
            <div key={item.label} className="flex flex-col items-center gap-1 py-4 text-center sm:py-0">
              <span className="text-2xl font-extrabold text-gradient sm:text-3xl">{item.valor}</span>
              <span className="text-xs text-text-muted sm:text-sm">{item.label}</span>
            </div>
          ))}
        </div>
      </FadeInSection>
    </section>
  );
}
