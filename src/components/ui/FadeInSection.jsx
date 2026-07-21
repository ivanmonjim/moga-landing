import { useFadeInOnScroll } from "../../hooks/useFadeInOnScroll";

// `blur`/`scale` amplían el reveal base (opacity + translateY) para las
// secciones que piden una entrada más pronunciada (Beneficios, paneles de
// servicio en móvil): desenfoque inicial + escala reducida además del
// desplazamiento vertical. Por defecto se mantiene el comportamiento previo.
export default function FadeInSection({
  children,
  className = "",
  delay = 0,
  blur = false,
  scale = false,
}) {
  const { ref, isVisible } = useFadeInOnScroll();

  const hiddenTransform = `translateY(24px)${scale ? " scale(0.94)" : ""}`;

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0) scale(1)" : hiddenTransform,
        filter: blur ? (isVisible ? "blur(0px)" : "blur(14px)") : undefined,
        transitionProperty: "opacity, transform, filter",
        transitionDelay: isVisible ? `${delay}ms` : "0ms",
      }}
    >
      {children}
    </div>
  );
}
