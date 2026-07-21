import { useRef } from "react";
import { useReducedMotion, useScroll } from "framer-motion";

/**
 * Base para secciones "pineadas" tipo storytelling: un contenedor alto con un
 * panel `sticky` interior, cuyo contenido se anima según el progreso de
 * scroll dentro de ese contenedor (no del documento completo).
 *
 * Cada panel individual debe calcular sus propios `useTransform` a partir de
 * `scrollYProgress` + `bandRange(i, total)` — los hooks de framer-motion no
 * deben invocarse dentro de un `.map()` en el componente contenedor, así que
 * el patrón correcto es un subcomponente por panel (ver ServiciosCinematico).
 *
 * Cuando el usuario prefiere menos movimiento, `prefersReducedMotion` queda
 * en `true` y quien consuma el hook debe renderizar contenido estático
 * apilado en vez de pinear/animar.
 */
export function useScrollStory() {
  const targetRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  return { targetRef, scrollYProgress, prefersReducedMotion };
}

/**
 * Rango de entrada de useTransform para el panel `i` de `total`, dejando una
 * fracción de la banda para la transición de entrada/salida (mask/blur/scale).
 * Devuelve [inicioEntrada, finEntrada, inicioSalida, finSalida].
 */
export function bandRange(i, total, transitionFraction = 0.16) {
  const step = 1 / total;
  const start = i * step;
  const end = (i + 1) * step;
  const inEnd = Math.min(end, start + step * transitionFraction);
  const outStart = Math.max(start, end - step * transitionFraction);
  return [start, inEnd, outStart, end];
}
