import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { servicios } from "../../data/servicios";
import { buildServiceWhatsappUrl } from "../../data/whatsapp";
import { COLOR_THEMES } from "../../data/colorThemes";
import CircuitThumb from "./CircuitThumb";
import { CAROUSEL_EASE, getViewportWidth, resolve, useBreakpoint } from "../../hooks/useCardCarousel";

const CARD_WIDTH = {
  base: () => getViewportWidth() * 0.82,
  sm: 320,
  lg: 360,
};
const GAP = { base: 16, sm: 20, lg: 24 };
const SWIPE_THRESHOLD = 48;
const FEATURES_VISIBLE = 6;

function ArrowButton({ direction, onClick, disabled, label }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 bg-bg-card text-text-primary transition-colors hover:border-accent/50 hover:text-accent disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-white/15 disabled:hover:text-text-primary"
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

function PrecioCard({ servicio, width }) {
  const theme = COLOR_THEMES[servicio.color] ?? COLOR_THEMES.primary;
  const visibles = servicio.caracteristicas.slice(0, FEATURES_VISIBLE);
  const restantes = servicio.caracteristicas.length - visibles.length;

  return (
    <div
      id={`precio-${servicio.id}`}
      className="flex h-full shrink-0 scroll-mt-28 flex-col rounded-2xl border border-white/8 bg-bg-card p-7"
      style={{ width: `${width}px`, boxShadow: `0 0 0 1px ${theme.ring} inset` }}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-text-primary">{servicio.titulo}</h3>
          <div className="mt-2">
            {servicio.precio ? (
              <p className="text-3xl font-extrabold text-text-primary">
                {servicio.precio}
                <span className="ml-1 text-sm font-semibold text-text-muted">{servicio.precioSufijo}</span>
              </p>
            ) : (
              <p className="text-xl font-extrabold" style={{ color: theme.hex }}>
                {servicio.precioTexto}
              </p>
            )}
          </div>
        </div>
        <CircuitThumb servicio={servicio} size="sm" />
      </div>

      <ul className="mt-6 mb-8 flex-1 space-y-3">
        {visibles.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-sm text-text-secondary">
            <svg
              className="mt-0.5 h-4 w-4 shrink-0 text-cyan"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {item}
          </li>
        ))}
        {restantes > 0 && (
          <li className="pl-6.5 text-xs font-medium text-text-muted">+{restantes} funciones más</li>
        )}
      </ul>

      <a
        href={buildServiceWhatsappUrl(servicio)}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full px-6 py-3 text-center text-sm font-semibold text-white transition-transform hover:scale-105"
        style={{ backgroundColor: theme.hex, boxShadow: `0 0 25px ${theme.soft}` }}
      >
        Solicitar información
      </a>
    </div>
  );
}

export default function PreciosCarousel() {
  const total = servicios.length;
  const bp = useBreakpoint();
  const trackRef = useRef(null);
  const innerRef = useRef(null);
  const pointerStartX = useRef(null);
  const liveRegionId = useId();
  const [activeIndex, setActiveIndex] = useState(0);

  const cardWidth = resolve(CARD_WIDTH[bp]);
  const gap = resolve(GAP[bp]);

  const goTo = useCallback(
    (index) => {
      setActiveIndex(Math.max(0, Math.min(index, total - 1)));
    },
    [total]
  );
  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

  const applyTransform = useCallback(() => {
    const track = trackRef.current;
    const inner = innerRef.current;
    if (!track || !inner) return;

    const totalWidth = total * cardWidth + (total - 1) * gap;
    const maxShift = Math.max(0, totalWidth - track.clientWidth);
    const target = -Math.max(0, Math.min(activeIndex * (cardWidth + gap), maxShift));

    inner.style.transform = `translateX(${target}px)`;
  }, [activeIndex, cardWidth, gap, total]);

  // Transición manejada por CSS (transition-transform en el elemento), no por
  // animate() imperativo: en este proyecto la primera llamada a animate()
  // después de montar el carrusel no llegaba a aplicar el valor final.
  useLayoutEffect(() => {
    applyTransform();
  }, [applyTransform]);

  useEffect(() => {
    window.addEventListener("resize", applyTransform);
    return () => window.removeEventListener("resize", applyTransform);
  }, [applyTransform]);

  const handleMouseDown = (e) => {
    pointerStartX.current = e.clientX;
  };
  const handleMouseUp = (e) => {
    if (pointerStartX.current == null) return;
    const delta = e.clientX - pointerStartX.current;
    pointerStartX.current = null;
    if (delta > SWIPE_THRESHOLD) goPrev();
    else if (delta < -SWIPE_THRESHOLD) goNext();
  };
  const handleTouchStart = (e) => {
    pointerStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    if (pointerStartX.current == null) return;
    const delta = e.changedTouches[0].clientX - pointerStartX.current;
    pointerStartX.current = null;
    if (delta > SWIPE_THRESHOLD) goPrev();
    else if (delta < -SWIPE_THRESHOLD) goNext();
  };
  const handleKeyDown = (e) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      goNext();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      goPrev();
    }
  };

  return (
    <div>
      <div
        ref={trackRef}
        role="region"
        aria-roledescription="carousel"
        aria-label="Precios de MOGA"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="touch-pan-y select-none overflow-hidden px-6 pb-2 outline-none"
      >
        <div
          ref={innerRef}
          className="flex items-stretch will-change-transform"
          style={{
            gap: `${gap}px`,
            transitionProperty: "transform",
            transitionDuration: "550ms",
            transitionTimingFunction: `cubic-bezier(${CAROUSEL_EASE.join(",")})`,
          }}
        >
          {servicios.map((servicio) => (
            <PrecioCard key={servicio.id} servicio={servicio} width={cardWidth} />
          ))}
        </div>
      </div>

      <div className="mt-8 flex items-center justify-center gap-6">
        <ArrowButton
          direction="prev"
          label="Servicio anterior"
          disabled={activeIndex === 0}
          onClick={goPrev}
        />

        <div className="flex items-center gap-2" role="tablist" aria-label="Selecciona un servicio">
          {servicios.map((servicio, i) => (
            <button
              key={servicio.id}
              type="button"
              role="tab"
              aria-selected={i === activeIndex}
              aria-label={`Ver precio de ${servicio.titulo}`}
              aria-controls={`${liveRegionId}-panel`}
              onClick={() => goTo(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === activeIndex ? "w-7 bg-accent" : "w-2 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>

        <ArrowButton
          direction="next"
          label="Siguiente servicio"
          disabled={activeIndex === total - 1}
          onClick={goNext}
        />
      </div>

      <p id={`${liveRegionId}-panel`} className="sr-only" aria-live="polite">
        {`Mostrando precio ${activeIndex + 1} de ${total}: ${servicios[activeIndex].titulo}`}
      </p>
    </div>
  );
}
