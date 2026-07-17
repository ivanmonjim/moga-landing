import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { animate, useReducedMotion } from "framer-motion";

export const CAROUSEL_EASE = [0.22, 1, 0.36, 1];
const SWIPE_THRESHOLD = 48;

// document.documentElement.clientWidth refleja el ancho real usado por los
// media queries de CSS; window.innerWidth puede diferir (zoom, DPR, algunos
// entornos de emulación), lo que desalinea este cálculo con lo que Tailwind
// resolvería para las clases responsivas.
export function getViewportWidth() {
  if (typeof document === "undefined") return 0;
  return document.documentElement.clientWidth;
}

function getBreakpoint() {
  const w = getViewportWidth();
  if (w >= 1024) return "lg";
  if (w >= 640) return "sm";
  return "base";
}

export function resolve(value) {
  return typeof value === "function" ? value() : value;
}

/**
 * Breakpoint reactivo ('base' | 'sm' | 'lg') para calcular tamaños de tarjeta
 * por JS en vez de depender de clases responsivas de Tailwind con valores
 * arbitrarios combinadas con transiciones, que en este proyecto no se
 * generaban de forma fiable (la tarjeta activa terminaba con el ancho de
 * una lateral y viceversa).
 */
export function useBreakpoint() {
  const [bp, setBp] = useState(getBreakpoint());
  useEffect(() => {
    const onResize = () => setBp(getBreakpoint());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return bp;
}

/**
 * Carrusel de tarjetas: una activa (expandida) + laterales comprimidas.
 * El centrado se aplica con `transform: translateX` sobre una pista interna
 * (no con scrollLeft, que el navegador limita a [0, ancho de desbordamiento]
 * y por lo tanto no puede centrar nada cuando el contenido cabe completo en
 * el contenedor, como ocurre en pantallas anchas).
 * Los anchos se calculan a partir de los valores conocidos por breakpoint
 * (no leyendo offsetWidth del DOM, que durante la transición CSS aún
 * refleja el tamaño previo y produce un centrado incorrecto).
 * La animación en curso se controla con una ref propia en vez de con el
 * cleanup de useLayoutEffect, que en modo desarrollo puede dispararse antes
 * de tiempo y cortar la transición a mitad de camino.
 */
export function useCardCarousel({ total, widths, gap, autoplayMs = 6000 }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isInteracting, setIsInteracting] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const pointerStartX = useRef(null);
  const liveRegionId = useId();
  const trackRef = useRef(null);
  const innerRef = useRef(null);
  const hasMounted = useRef(false);
  const activeAnimation = useRef(null);

  const goTo = useCallback(
    (index) => {
      setActiveIndex(((index % total) + total) % total);
    },
    [total]
  );

  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

  useEffect(() => {
    if (prefersReducedMotion || isInteracting) return undefined;
    const id = setInterval(() => {
      setActiveIndex((i) => (i + 1) % total);
    }, autoplayMs);
    return () => clearInterval(id);
  }, [isInteracting, prefersReducedMotion, total, autoplayMs]);

  const getCurrentTranslateX = () => {
    const inner = innerRef.current;
    if (!inner) return 0;
    const matrix = new DOMMatrixReadOnly(getComputedStyle(inner).transform);
    return matrix.m41;
  };

  const recenter = useCallback(
    (animated) => {
      const track = trackRef.current;
      const inner = innerRef.current;
      if (!track || !inner) return;

      const bp = getBreakpoint();
      const { active, side } = widths[bp];
      const gapPx = resolve(gap[bp]);
      const activePx = resolve(active);
      const sidePx = resolve(side);

      const offsetLeft = activeIndex * (sidePx + gapPx);
      const target = -(offsetLeft + activePx / 2 - track.clientWidth / 2);

      activeAnimation.current?.stop();
      activeAnimation.current = null;

      if (!animated) {
        hasMounted.current = true;
        inner.style.transform = `translateX(${target}px)`;
        return;
      }

      const from = getCurrentTranslateX();
      activeAnimation.current = animate(from, target, {
        duration: 0.62,
        ease: CAROUSEL_EASE,
        onUpdate: (value) => {
          inner.style.transform = `translateX(${value}px)`;
        },
        onComplete: () => {
          activeAnimation.current = null;
        },
      });
    },
    [activeIndex, total, widths, gap]
  );

  useLayoutEffect(() => {
    recenter(hasMounted.current && !prefersReducedMotion);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex, prefersReducedMotion]);

  useEffect(() => {
    const onResize = () => recenter(false);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [recenter]);

  const markInteracted = () => setIsInteracting(true);

  const handlePointerDown = (e) => {
    pointerStartX.current = e.clientX;
  };
  const handlePointerUp = (e) => {
    if (pointerStartX.current == null) return;
    const delta = e.clientX - pointerStartX.current;
    pointerStartX.current = null;
    markInteracted();
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
    markInteracted();
    if (delta > SWIPE_THRESHOLD) goPrev();
    else if (delta < -SWIPE_THRESHOLD) goNext();
  };
  const handleKeyDown = (e) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      markInteracted();
      goNext();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      markInteracted();
      goPrev();
    }
  };

  return {
    activeIndex,
    goTo,
    goNext,
    goPrev,
    markInteracted,
    trackRef,
    innerRef,
    liveRegionId,
    trackHandlers: {
      onKeyDown: handleKeyDown,
      onPointerDown: handlePointerDown,
      onPointerUp: handlePointerUp,
      onTouchStart: handleTouchStart,
      onTouchEnd: handleTouchEnd,
    },
    containerHandlers: {
      onMouseEnter: markInteracted,
      onMouseLeave: () => setIsInteracting(false),
      onFocus: markInteracted,
    },
  };
}
