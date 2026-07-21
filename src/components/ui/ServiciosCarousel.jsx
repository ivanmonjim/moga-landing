import { AnimatePresence, motion } from "framer-motion";
import { servicios } from "../../data/servicios";
import { CAROUSEL_EASE, getViewportWidth, resolve, useBreakpoint, useCardCarousel } from "../../hooks/useCardCarousel";

const WIDTHS = {
  base: { active: () => getViewportWidth() * 0.82, side: 56 },
  sm: { active: 360, side: 92 },
  lg: { active: 460, side: 112 },
};
const HEIGHTS = {
  base: { active: 440, side: 400 },
  sm: { active: 480, side: 430 },
  lg: { active: 520, side: 470 },
};
const GAP = { base: 12, sm: 16, lg: 16 };

const COLOR_THEMES = {
  primary: { hex: "#0f6fff", glow: "rgba(15,111,255,0.55)", soft: "rgba(15,111,255,0.28)", ring: "rgba(15,111,255,0.45)" },
  secondary: { hex: "#8b3dff", glow: "rgba(139,61,255,0.55)", soft: "rgba(139,61,255,0.28)", ring: "rgba(139,61,255,0.45)" },
  cyan: { hex: "#00c8ff", glow: "rgba(0,200,255,0.55)", soft: "rgba(0,200,255,0.26)", ring: "rgba(0,200,255,0.45)" },
  accent: { hex: "#ffc531", glow: "rgba(255,197,49,0.55)", soft: "rgba(255,197,49,0.26)", ring: "rgba(255,197,49,0.45)" },
};

const cardBase =
  "group relative shrink-0 overflow-hidden rounded-[28px] border transition-[width,height,opacity] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70";

function ArrowButton({ direction, onClick, label }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 bg-bg-card text-text-primary transition-colors hover:border-accent/50 hover:text-accent"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
        {direction === "prev" ? (
          <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
        ) : (
          <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
        )}
      </svg>
    </button>
  );
}

function ServicioCardCarousel({ servicio, isActive, onSelect, index, bp, total }) {
  const width = resolve(isActive ? WIDTHS[bp].active : WIDTHS[bp].side);
  const height = isActive ? HEIGHTS[bp].active : HEIGHTS[bp].side;
  const theme = COLOR_THEMES[servicio.color] ?? COLOR_THEMES.primary;

  return (
    <div
      className={`${cardBase} ${
        isActive ? "border-white/10" : "cursor-pointer border-white/10 opacity-70 hover:opacity-90"
      }`}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        transitionDuration: "620ms",
        transitionTimingFunction: `cubic-bezier(${CAROUSEL_EASE.join(",")})`,
        background: `radial-gradient(120% 85% at 50% 12%, ${theme.soft} 0%, transparent 60%), linear-gradient(180deg, #0b1224 0%, #030712 100%)`,
        boxShadow: isActive ? `0 0 60px ${theme.soft}` : "none",
      }}
      onClick={!isActive ? onSelect : undefined}
      role={!isActive ? "button" : undefined}
      tabIndex={!isActive ? 0 : -1}
      aria-label={!isActive ? `Ver ${servicio.titulo}` : undefined}
      onKeyDown={
        !isActive
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSelect();
              }
            }
          : undefined
      }
    >
      <img
        src={servicio.imagen}
        alt={servicio.imagenAlt}
        loading={index === 0 ? "eager" : "lazy"}
        decoding="async"
        className="absolute inset-0 m-auto h-[72%] w-[72%] object-contain mix-blend-lighten"
        style={{ filter: `drop-shadow(0 0 36px ${theme.glow})` }}
      />

      {isActive && (
        <span
          className="absolute left-5 top-5 rounded-full border px-3 py-1 text-[11px] font-semibold tabular-nums text-text-primary/90 backdrop-blur-sm"
          style={{ borderColor: theme.ring, backgroundColor: "rgba(3,7,18,0.45)" }}
        >
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
      )}

      {isActive && (
        <AnimatePresence mode="popLayout">
          <motion.div
            key={servicio.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.45, ease: CAROUSEL_EASE }}
            className="absolute inset-x-3 bottom-3 flex flex-col gap-3 rounded-2xl border border-white/10 bg-bg-main/70 p-5 backdrop-blur-md sm:p-6"
          >
            <h3 className="text-xl font-extrabold text-text-primary sm:text-2xl">
              {servicio.titulo}
            </h3>
            <p className="text-sm leading-relaxed text-text-secondary line-clamp-2">
              {servicio.descripcion}
            </p>

            {servicio.caracteristicas.length > 0 && (
              <ul className="flex flex-wrap gap-2">
                {servicio.caracteristicas.slice(0, 3).map((item) => (
                  <li
                    key={item}
                    className="rounded-full border px-3 py-1 text-[11px] font-medium text-text-secondary"
                    style={{ borderColor: "rgba(255,255,255,0.12)", backgroundColor: "rgba(255,255,255,0.04)" }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}

            {servicio.cta ? (
              <a
                href="#contacto"
                className="mt-1 inline-flex w-fit items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-semibold text-bg-main transition-transform hover:scale-105"
                style={{ backgroundColor: theme.hex }}
              >
                {servicio.cta}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            ) : (
              <span
                className="mt-1 inline-flex w-fit items-center gap-1.5 rounded-full border px-5 py-2.5 text-sm font-semibold"
                style={{ borderColor: theme.ring, backgroundColor: theme.soft, color: theme.hex }}
              >
                Muy pronto
              </span>
            )}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}

export default function ServiciosCarousel() {
  const total = servicios.length;
  const bp = useBreakpoint();
  const {
    activeIndex,
    goTo,
    goNext,
    goPrev,
    markInteracted,
    trackRef,
    innerRef,
    liveRegionId,
    trackHandlers,
    containerHandlers,
  } = useCardCarousel({ total, widths: WIDTHS, gap: GAP });

  const activeServicio = servicios[activeIndex];

  return (
    <div {...containerHandlers}>
      <div
        ref={trackRef}
        role="region"
        aria-roledescription="carousel"
        aria-label="Soluciones MOGA"
        tabIndex={0}
        {...trackHandlers}
        className="touch-pan-y select-none overflow-hidden rounded-[28px] outline-none"
      >
        <div
          ref={innerRef}
          className="flex items-stretch will-change-transform"
          style={{ gap: `${resolve(GAP[bp])}px` }}
        >
          {servicios.map((servicio, i) => (
            <ServicioCardCarousel
              key={servicio.id}
              servicio={servicio}
              index={i}
              total={total}
              bp={bp}
              isActive={i === activeIndex}
              onSelect={() => {
                markInteracted();
                goTo(i);
              }}
            />
          ))}
        </div>
      </div>

      <div className="mt-8 flex items-center justify-center gap-6">
        <ArrowButton direction="prev" label="Servicio anterior" onClick={() => { markInteracted(); goPrev(); }} />

        <div className="flex items-center gap-2" role="tablist" aria-label="Selecciona un servicio">
          {servicios.map((servicio, i) => (
            <button
              key={servicio.id}
              type="button"
              role="tab"
              aria-selected={i === activeIndex}
              aria-label={`Ver ${servicio.titulo}`}
              aria-controls={`${liveRegionId}-panel`}
              onClick={() => {
                markInteracted();
                goTo(i);
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === activeIndex ? "w-7 bg-accent" : "w-2 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>

        <ArrowButton direction="next" label="Siguiente servicio" onClick={() => { markInteracted(); goNext(); }} />
      </div>

      <p id={`${liveRegionId}-panel`} className="sr-only" aria-live="polite">
        {`Mostrando ${activeIndex + 1} de ${total}: ${activeServicio.titulo}`}
      </p>
    </div>
  );
}
