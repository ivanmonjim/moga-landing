import { useLayoutEffect, useRef, useState } from "react";
import { motion, useTransform } from "framer-motion";
import FadeInSection from "../ui/FadeInSection";
import SectionEyebrow from "../ui/SectionEyebrow";
import CircuitThumb from "../ui/CircuitThumb";
import { servicios } from "../../data/servicios";
import { COLOR_THEMES } from "../../data/colorThemes";
import { SERVICIO_MOCKUPS, GALERIA_MOCKUPS } from "../ui/ServicioMockups";
import { useScrollStory } from "../../hooks/useScrollStory";
import { useBreakpoint } from "../../hooks/useCardCarousel";

const byId = (id) => servicios.find((s) => s.id === id);

const WINDOWS = [
  { title: "MOGA Citas", theme: "secondary", servicio: byId("citas"), Content: SERVICIO_MOCKUPS.citas },
  { title: "Conversaciones con IA", theme: "secondary", Content: GALERIA_MOCKUPS.conversaciones },
  { title: "MOGA Delivery", theme: "accent", servicio: byId("delivery"), Content: SERVICIO_MOCKUPS.delivery },
  { title: "Reconocimiento facial", theme: "cyan", servicio: byId("fichaje"), Content: SERVICIO_MOCKUPS.fichaje },
  { title: "MOGA POS", theme: "primary", servicio: byId("pos"), Content: SERVICIO_MOCKUPS.pos },
  { title: "Estadísticas", theme: "primary", Content: GALERIA_MOCKUPS.estadisticas },
  { title: "Administración", theme: "cyan", Content: GALERIA_MOCKUPS.administracion },
];

function GaleriaWindow({ title, theme, servicio, Content }) {
  const themeColors = COLOR_THEMES[theme] ?? COLOR_THEMES.primary;

  return (
    <div className="relative w-[260px] shrink-0 snap-center overflow-visible sm:w-[300px]">
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-bg-card shadow-[0_25px_70px_rgba(0,0,0,0.45)]">
        <div className="flex items-center justify-between border-b border-white/8 bg-bg-sidebar/60 px-4 py-2.5">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-danger/70" />
            <span className="h-2 w-2 rounded-full bg-warning/70" />
            <span className="h-2 w-2 rounded-full bg-success/70" />
          </div>
          {servicio && <CircuitThumb servicio={servicio} size="xs" />}
        </div>

        <div className="min-h-[140px] p-4">
          <Content />
        </div>

        <div className="border-t border-white/8 px-4 py-2.5">
          <span className="text-xs font-semibold" style={{ color: themeColors.hex }}>
            {title}
          </span>
        </div>
      </div>

      <div
        className="pointer-events-none absolute inset-x-8 -bottom-4 h-8 rounded-full opacity-30 blur-xl"
        style={{ backgroundColor: themeColors.glow }}
      />
    </div>
  );
}

function GaleriaDesktop() {
  const { targetRef, scrollYProgress } = useScrollStory();
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const [maxShift, setMaxShift] = useState(0);

  useLayoutEffect(() => {
    const measure = () => {
      if (!trackRef.current || !viewportRef.current) return;
      setMaxShift(Math.max(0, trackRef.current.scrollWidth - viewportRef.current.clientWidth));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const x = useTransform(scrollYProgress, [0, 1], [0, -maxShift]);

  return (
    <div ref={targetRef} style={{ height: "260vh" }} className="relative">
      <div ref={viewportRef} className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div ref={trackRef} style={{ x }} className="flex gap-6 pl-6 sm:gap-8 sm:pl-[max(1.5rem,calc((100vw-72rem)/2))]">
          {WINDOWS.map((w) => (
            <GaleriaWindow key={w.title} {...w} />
          ))}
          <div className="w-6 shrink-0 sm:w-1" />
        </motion.div>
      </div>
    </div>
  );
}

function GaleriaMovil() {
  return (
    <div className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-2">
      {WINDOWS.map((w) => (
        <GaleriaWindow key={w.title} {...w} />
      ))}
    </div>
  );
}

export default function GaleriaSistemas() {
  const bp = useBreakpoint();
  const isMobile = bp === "base";

  return (
    <section className="bg-bg-main py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <FadeInSection className="mx-auto mb-14 max-w-2xl text-center">
          <SectionEyebrow>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <rect x="3" y="4" width="18" height="13" rx="2" />
              <path d="M8 21h8M12 17v4" strokeLinecap="round" />
            </svg>
            Galería de sistemas
          </SectionEyebrow>
          <h2 className="text-3xl font-extrabold text-text-primary sm:text-4xl">
            Un vistazo <span className="text-gradient">a cada sistema</span>
          </h2>
          <p className="mt-4 text-text-secondary">
            Interfaces reales del panel administrativo, la IA conversacional y el control de cada
            operación.
          </p>
        </FadeInSection>
      </div>

      {isMobile ? (
        <GaleriaMovil />
      ) : (
        <FadeInSection delay={100}>
          <GaleriaDesktop />
        </FadeInSection>
      )}
    </section>
  );
}
