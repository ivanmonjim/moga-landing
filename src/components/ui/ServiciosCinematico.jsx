import { motion, useMotionTemplate, useTransform } from "framer-motion";
import { servicios } from "../../data/servicios";
import { buildServiceWhatsappUrl } from "../../data/whatsapp";
import { COLOR_THEMES } from "../../data/colorThemes";
import CircuitThumb from "./CircuitThumb";
import FadeInSection from "./FadeInSection";
import { SERVICIO_MOCKUPS } from "./ServicioMockups";
import { bandRange, useScrollStory } from "../../hooks/useScrollStory";
import { useBreakpoint } from "../../hooks/useCardCarousel";

const FEATURES_VISIBLE = 6;

function ServicioVisualBlock({ servicio, eager }) {
  const theme = COLOR_THEMES[servicio.color] ?? COLOR_THEMES.primary;
  const Mockup = SERVICIO_MOCKUPS[servicio.mockup];

  return (
    <div className="mx-auto flex w-full max-w-xs flex-col items-center gap-5 lg:max-w-sm">
      <div className="relative aspect-square w-full">
        <div
          className="pointer-events-none absolute -inset-10 -z-10 rounded-full blur-[90px]"
          style={{ backgroundColor: theme.glow }}
        />
        <CircuitThumb servicio={servicio} size="full" className="rounded-[32px]" eager={eager} />
      </div>
      {Mockup && <Mockup />}
    </div>
  );
}

function ServicioTextBlock({ servicio, index, total }) {
  const theme = COLOR_THEMES[servicio.color] ?? COLOR_THEMES.primary;
  const visibles = servicio.caracteristicas.slice(0, FEATURES_VISIBLE);
  const restantes = servicio.caracteristicas.length - visibles.length;

  return (
    <div className="flex flex-col gap-4">
      <span
        className="inline-flex w-fit items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold"
        style={{ borderColor: theme.ring, backgroundColor: theme.soft, color: theme.hex }}
      >
        {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </span>

      <h3 className="text-2xl font-extrabold text-text-primary sm:text-3xl">{servicio.titulo}</h3>
      <p className="text-sm leading-relaxed text-text-secondary sm:text-base">{servicio.descripcion}</p>

      <ul className="flex flex-col gap-2">
        {visibles.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-sm text-text-secondary">
            <svg className="mt-0.5 h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke={theme.hex} strokeWidth="2.5">
              <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {item}
          </li>
        ))}
        {restantes > 0 && (
          <li className="pl-6.5 text-xs font-medium text-text-muted">+{restantes} funciones más</li>
        )}
      </ul>

      <div className="mt-2 flex flex-wrap gap-3">
        <a
          href={`#precio-${servicio.id}`}
          className="inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-105"
          style={{ backgroundColor: theme.hex }}
        >
          {servicio.cta}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
        <a
          href={buildServiceWhatsappUrl(servicio)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-bg-card px-5 py-2.5 text-sm font-semibold text-text-primary transition-colors hover:border-white/30"
        >
          Solicitar información
        </a>
      </div>
    </div>
  );
}

function ServicioPanel({ servicio, index, total, scrollYProgress }) {
  const [start, inEnd, outStart, end] = bandRange(index, total);
  const localProgress = useTransform(scrollYProgress, [start, inEnd, outStart, end], [0, 1, 1, 0]);
  const scale = useTransform(localProgress, [0, 1], [0.94, 1]);
  const blurPx = useTransform(localProgress, [0, 1], [16, 0]);
  const filter = useMotionTemplate`blur(${blurPx}px)`;
  const imageX = useTransform(localProgress, [0, 1], [index % 2 === 0 ? 44 : -44, 0]);
  const clipInset = useTransform(localProgress, [0, 1], [100, 0]);
  const clipPath = useMotionTemplate`inset(${clipInset}% 0 0 0)`;
  const pointerEvents = useTransform(localProgress, (v) => (v > 0.5 ? "auto" : "none"));

  return (
    <motion.div
      style={{ opacity: localProgress, filter, pointerEvents }}
      className="absolute inset-0 flex items-center"
    >
      <motion.div
        style={{ scale }}
        className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-10 px-6 py-24 lg:grid-cols-2 lg:gap-16 lg:py-0"
      >
        <motion.div style={{ x: imageX }} className={index % 2 === 0 ? "lg:order-1" : "lg:order-2"}>
          <ServicioVisualBlock servicio={servicio} eager={index === 0} />
        </motion.div>

        <div className={`overflow-hidden ${index % 2 === 0 ? "lg:order-2" : "lg:order-1"}`}>
          <motion.div style={{ clipPath }}>
            <ServicioTextBlock servicio={servicio} index={index} total={total} />
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ProgressDot({ index, total, scrollYProgress }) {
  const [start, inEnd, outStart, end] = bandRange(index, total);
  const localProgress = useTransform(scrollYProgress, [start, inEnd, outStart, end], [0, 1, 1, 0]);
  const scale = useTransform(localProgress, [0, 1], [1, 1.6]);
  const opacity = useTransform(localProgress, [0, 1], [0.35, 1]);

  return <motion.span style={{ scale, opacity }} className="h-2 w-2 rounded-full bg-white" />;
}

function StaticServicioCard({ servicio, index, total }) {
  return (
    <div className="mx-auto grid w-full max-w-4xl grid-cols-1 items-center gap-8 rounded-[28px] border border-white/8 bg-bg-card p-6 sm:p-8">
      <ServicioVisualBlock servicio={servicio} eager={index === 0} />
      <ServicioTextBlock servicio={servicio} index={index} total={total} />
    </div>
  );
}

export default function ServiciosCinematico() {
  const bp = useBreakpoint();
  const { targetRef, scrollYProgress, prefersReducedMotion } = useScrollStory();
  const total = servicios.length;
  // El panel pineado usa "h-screen overflow-hidden" con una sola columna
  // hasta "lg" (donde recién entra lg:grid-cols-2 y el contenido se acorta
  // al quedar en dos columnas). En tablet ("sm") el apilado a una columna
  // es más alto que la pantalla y el overflow-hidden corta los botones.
  const useStatic = bp !== "lg" || prefersReducedMotion;

  if (useStatic) {
    return (
      <div className="flex flex-col gap-6 px-4 sm:px-6">
        {servicios.map((servicio, i) => (
          <FadeInSection key={servicio.id} blur scale delay={i * 70}>
            <StaticServicioCard servicio={servicio} index={i} total={total} />
          </FadeInSection>
        ))}
      </div>
    );
  }

  return (
    <div ref={targetRef} style={{ height: `${total * 100}vh` }} className="relative">
      <div className="sticky top-0 h-screen overflow-hidden">
        {servicios.map((servicio, i) => (
          <ServicioPanel
            key={servicio.id}
            servicio={servicio}
            index={i}
            total={total}
            scrollYProgress={scrollYProgress}
          />
        ))}

        <div className="pointer-events-none absolute inset-x-0 bottom-8 flex items-center justify-center gap-2.5">
          {servicios.map((servicio, i) => (
            <ProgressDot key={servicio.id} index={i} total={total} scrollYProgress={scrollYProgress} />
          ))}
        </div>
      </div>
    </div>
  );
}
