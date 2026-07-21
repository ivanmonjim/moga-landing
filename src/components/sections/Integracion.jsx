import { motion, useReducedMotion } from "framer-motion";
import FadeInSection from "../ui/FadeInSection";
import SectionEyebrow from "../ui/SectionEyebrow";
import CircuitThumb from "../ui/CircuitThumb";
import Logo from "../ui/Logo";
import { servicios } from "../../data/servicios";
import { COLOR_THEMES } from "../../data/colorThemes";

const RADIUS = 40;
const NODES = servicios.map((servicio, i) => {
  const angle = -90 + i * (360 / servicios.length);
  const rad = (angle * Math.PI) / 180;
  return {
    servicio,
    x: 50 + RADIUS * Math.cos(rad),
    y: 50 + RADIUS * Math.sin(rad),
  };
});

export default function Integracion() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="bg-bg-soft py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <FadeInSection className="mx-auto mb-16 max-w-2xl text-center">
          <SectionEyebrow>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="12" cy="12" r="2.5" />
              <circle cx="4" cy="6" r="1.8" />
              <circle cx="20" cy="6" r="1.8" />
              <circle cx="4" cy="18" r="1.8" />
              <circle cx="20" cy="18" r="1.8" />
              <path d="M12 9.5V6M14.2 10.8l4-3M9.8 10.8l-4-3M14.2 13.2l4 3M9.8 13.2l-4 3" strokeLinecap="round" />
            </svg>
            Ecosistema MOGA
          </SectionEyebrow>
          <h2 className="text-3xl font-extrabold text-text-primary sm:text-4xl">
            Todo tu negocio <span className="text-gradient">conectado con MOGA</span>
          </h2>
          <p className="mt-4 text-text-secondary">
            Cada sistema comparte un mismo panel, un mismo agente de IA y una misma fuente de
            información: tu negocio, siempre sincronizado.
          </p>
        </FadeInSection>

        <FadeInSection delay={100}>
          <div className="relative mx-auto aspect-square w-full max-w-xl">
            <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible">
              {NODES.map(({ servicio, x, y }) => {
                const theme = COLOR_THEMES[servicio.color] ?? COLOR_THEMES.primary;
                return (
                  <motion.line
                    key={servicio.id}
                    x1={x}
                    y1={y}
                    x2={50}
                    y2={50}
                    stroke={theme.hex}
                    strokeWidth="0.5"
                    strokeLinecap="round"
                    strokeOpacity="0.55"
                    initial={prefersReducedMotion ? undefined : { pathLength: 0, opacity: 0 }}
                    whileInView={prefersReducedMotion ? undefined : { pathLength: 1, opacity: 1 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                  />
                );
              })}
            </svg>

            <div className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-bg-card shadow-[0_0_50px_rgba(139,61,255,0.35)]">
              <Logo className="h-10" />
            </div>

            {NODES.map(({ servicio, x, y }) => {
              const theme = COLOR_THEMES[servicio.color] ?? COLOR_THEMES.primary;
              return (
                <div
                  key={servicio.id}
                  className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2"
                  style={{ left: `${x}%`, top: `${y}%` }}
                >
                  <CircuitThumb
                    servicio={servicio}
                    size="xs"
                    className="sm:h-16 sm:w-16"
                    style={{ boxShadow: `0 0 0 2px ${theme.ring}` }}
                  />
                  <span
                    className="hidden whitespace-nowrap rounded-full border px-2.5 py-1 text-[11px] font-semibold sm:inline-flex"
                    style={{ borderColor: theme.ring, backgroundColor: theme.soft, color: theme.hex }}
                  >
                    {servicio.titulo}
                  </span>
                  <span className="sr-only">{servicio.titulo}</span>
                </div>
              );
            })}
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}
