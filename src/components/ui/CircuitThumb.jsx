import { COLOR_THEMES } from "../../data/colorThemes";

const SIZE_CLASSES = {
  xs: "h-7 w-7",
  sm: "h-16 w-16",
  md: "h-24 w-24",
  full: "h-full w-full",
};

// Miniatura reutilizable de la imagen de Circuit para un servicio: fondo con
// el tema de color del servicio, imagen en mix-blend-lighten para que el
// fondo negro del render desaparezca. Cuando el servicio aún no tiene una
// imagen real (`imagenPendiente`), muestra un chip explícito en vez de un
// placeholder genérico.
export default function CircuitThumb({ servicio, size = "md", className = "", eager = false, style }) {
  const theme = COLOR_THEMES[servicio.color] ?? COLOR_THEMES.primary;
  const sizeClass = SIZE_CLASSES[size] ?? SIZE_CLASSES.md;

  return (
    <div
      className={`relative shrink-0 overflow-hidden rounded-2xl ${sizeClass} ${className}`}
      style={{
        background: theme.gradient
          ? theme.gradient
          : `radial-gradient(120% 100% at 50% 18%, ${theme.soft} 0%, transparent 65%), #08101f`,
        ...style,
      }}
    >
      {servicio.imagenPendiente ? (
        <div className="flex h-full w-full flex-col items-center justify-center gap-1.5 rounded-2xl border border-dashed border-white/15 p-2 text-center">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="text-white/40"
          >
            <rect x="3" y="3" width="18" height="18" rx="4" />
            <path d="M8 13l2.5-3 2 2.5L16 9l3 5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-[9px] font-medium leading-tight text-white/40">
            Imagen de Circuit
            <br />
            próximamente
          </span>
        </div>
      ) : (
        <img
          src={servicio.imagen}
          alt={servicio.imagenAlt}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          className="absolute inset-0 m-auto h-[80%] w-[80%] object-contain mix-blend-lighten"
          style={{ filter: `drop-shadow(0 0 20px ${theme.glow})` }}
        />
      )}
    </div>
  );
}
