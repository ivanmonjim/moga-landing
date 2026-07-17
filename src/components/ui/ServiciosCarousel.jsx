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

function ServicioCardCarousel({ servicio, isActive, onSelect, index, bp }) {
  const width = resolve(isActive ? WIDTHS[bp].active : WIDTHS[bp].side);
  const height = isActive ? HEIGHTS[bp].active : HEIGHTS[bp].side;

  return (
    <div
      className={`${cardBase} ${
        isActive
          ? "border-accent/40 shadow-[0_0_50px_rgba(255,197,49,0.16)]"
          : "cursor-pointer border-white/10 opacity-70 hover:opacity-90"
      }`}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        transitionDuration: "620ms",
        transitionTimingFunction: `cubic-bezier(${CAROUSEL_EASE.join(",")})`,
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
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div
        className={`absolute inset-0 ${
          isActive
            ? "bg-gradient-to-b from-bg-main/10 via-bg-main/55 to-bg-main/95"
            : "bg-bg-main/55"
        }`}
      />

      {isActive && (
        <AnimatePresence mode="popLayout">
          <motion.div
            key={servicio.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.45, ease: CAROUSEL_EASE }}
            className="absolute inset-x-0 bottom-0 flex flex-col gap-4 p-6 sm:p-7"
          >
            <h3 className="text-xl font-extrabold text-text-primary sm:text-2xl">
              {servicio.titulo}
            </h3>
            <p className="text-sm leading-relaxed text-text-secondary line-clamp-3">
              {servicio.descripcion}
            </p>

            {servicio.caracteristicas.length > 0 && (
              <ul className="flex flex-wrap gap-2">
                {servicio.caracteristicas.slice(0, 4).map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-white/15 bg-bg-main/40 px-3 py-1 text-[11px] font-medium text-text-secondary backdrop-blur-sm"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}

            {servicio.cta ? (
              <a
                href="#contacto"
                className="mt-1 inline-flex w-fit items-center gap-1.5 rounded-full bg-gradient-yellow px-5 py-2.5 text-sm font-semibold text-bg-main transition-transform hover:scale-105"
              >
                {servicio.cta}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            ) : (
              <span className="mt-1 inline-flex w-fit items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-5 py-2.5 text-sm font-semibold text-accent">
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
