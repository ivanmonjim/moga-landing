// Temas visuales por servicio, construidos únicamente con los tokens de
// marca ya definidos en src/index.css (--color-primary/secondary/cyan/accent).
// `duo` reutiliza el mismo degradado que ya existe en `.bg-gradient-card`.
export const COLOR_THEMES = {
  primary: {
    hex: "#0f6fff",
    glow: "rgba(15,111,255,0.55)",
    soft: "rgba(15,111,255,0.28)",
    ring: "rgba(15,111,255,0.45)",
  },
  secondary: {
    hex: "#8b3dff",
    glow: "rgba(139,61,255,0.55)",
    soft: "rgba(139,61,255,0.28)",
    ring: "rgba(139,61,255,0.45)",
  },
  cyan: {
    hex: "#00c8ff",
    glow: "rgba(0,200,255,0.55)",
    soft: "rgba(0,200,255,0.26)",
    ring: "rgba(0,200,255,0.45)",
  },
  accent: {
    hex: "#ffc531",
    glow: "rgba(255,197,49,0.55)",
    soft: "rgba(255,197,49,0.26)",
    ring: "rgba(255,197,49,0.45)",
  },
  duo: {
    hex: "#8b3dff",
    glow: "rgba(139,61,255,0.5)",
    soft: "rgba(15,111,255,0.22)",
    ring: "rgba(139,61,255,0.4)",
    gradient: "linear-gradient(135deg, #004cff 0%, #2e1065 55%, #8b3dff 100%)",
  },
};
