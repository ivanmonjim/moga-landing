import { motion, useReducedMotion } from "framer-motion";

// Mini representaciones visuales por servicio: mismo lenguaje ya usado en
// PorQueMoga.jsx (ChatMockup/CanalesMockup/AutomatizadoMockup) y en
// HeroMockup.jsx — filas y tarjetas con los tokens de marca, no capturas de
// pantalla presentadas como reales.

function PosMockup() {
  const items = [
    { label: "Café americano x2", precio: "$70" },
    { label: "Pan dulce x3", precio: "$54" },
    { label: "Agua mineral", precio: "$25" },
  ];
  return (
    <div className="rounded-xl border border-white/8 bg-bg-main/70 p-4">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-text-muted">Comanda #482</p>
      <div className="space-y-2">
        {items.map((item) => (
          <div key={item.label} className="flex items-center justify-between text-xs text-text-secondary">
            <span>{item.label}</span>
            <span className="font-semibold text-text-primary">{item.precio}</span>
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between border-t border-white/8 pt-3">
        <span className="text-sm font-bold text-text-primary">Total</span>
        <span className="text-sm font-extrabold text-primary">$149</span>
      </div>
      <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-success/15 px-2.5 py-1 text-[11px] font-semibold text-success">
        Pago recibido · Caja cerrada
      </span>
    </div>
  );
}

function FichajeMockup() {
  const prefersReducedMotion = useReducedMotion();
  return (
    <div className="rounded-xl border border-white/8 bg-bg-main/70 p-4">
      <div className="relative mx-auto h-28 w-24 overflow-hidden rounded-lg border-2 border-cyan/50 bg-bg-sidebar">
        <svg viewBox="0 0 40 48" className="h-full w-full opacity-70">
          <path
            d="M20 10a7 7 0 0 1 7 7v3a7 7 0 0 1-14 0v-3a7 7 0 0 1 7-7Z"
            fill="none"
            stroke="var(--color-cyan)"
            strokeWidth="1.4"
          />
          <path d="M9 42c1-6 6-10 11-10s10 4 11 10" fill="none" stroke="var(--color-cyan)" strokeWidth="1.4" />
        </svg>
        {!prefersReducedMotion && (
          <motion.div
            className="absolute inset-x-0 h-0.5 bg-cyan shadow-[0_0_10px_2px_rgba(0,200,255,0.8)]"
            animate={{ top: ["6%", "92%", "6%"] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
        <span className="absolute inset-x-0 top-1 text-center text-[9px] font-semibold uppercase tracking-wide text-cyan">
          Escaneando
        </span>
      </div>
      <div className="mt-3 flex items-center justify-between rounded-lg border border-white/8 bg-bg-card px-3 py-2">
        <span className="text-xs text-text-secondary">Entrada registrada</span>
        <span className="text-xs font-bold text-text-primary">08:02 am</span>
      </div>
    </div>
  );
}

function CitasMockup() {
  return (
    <div className="rounded-xl border border-white/8 bg-bg-main/70 p-4">
      <div className="space-y-2">
        <div className="ml-auto w-fit max-w-[80%] rounded-2xl rounded-tr-sm bg-white/10 px-3 py-1.5 text-xs text-text-secondary">
          ¿Tienen disponibilidad hoy a las 5pm?
        </div>
        <div className="w-fit max-w-[85%] rounded-2xl rounded-tl-sm bg-gradient-main px-3 py-1.5 text-xs font-medium text-white">
          Sí, tengo un espacio a las 5:00 pm. ¿Te lo agendo?
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between rounded-lg border border-secondary/30 bg-secondary/10 px-3 py-2">
        <span className="text-xs font-semibold text-text-primary">Hoy · 5:00 pm</span>
        <span className="rounded-full bg-success/15 px-2 py-0.5 text-[10px] font-semibold text-success">
          Confirmada
        </span>
      </div>
    </div>
  );
}

function DeliveryMockup() {
  const estados = ["Recibido", "En preparación", "En camino", "Entregado"];
  const activo = 2;
  return (
    <div className="rounded-xl border border-white/8 bg-bg-main/70 p-4">
      <div className="flex items-center justify-between text-xs text-text-secondary">
        <span>Pedido #1042</span>
        <span className="font-semibold text-text-primary">$238</span>
      </div>
      <div className="mt-3 flex items-center gap-1">
        {estados.map((estado, i) => (
          <div key={estado} className="flex flex-1 flex-col items-center gap-1.5">
            <span
              className={`h-2 w-full rounded-full ${i <= activo ? "bg-accent" : "bg-white/10"}`}
            />
            <span className={`text-center text-[9px] leading-tight ${i === activo ? "font-semibold text-accent" : "text-text-muted"}`}>
              {estado}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function EcommerceMockup() {
  const productos = ["Playera", "Sudadera", "Gorra"];
  return (
    <div className="rounded-xl border border-white/8 bg-bg-main/70 p-4">
      <div className="grid grid-cols-3 gap-2">
        {productos.map((p) => (
          <div key={p} className="rounded-lg border border-white/8 bg-bg-card p-2 text-center">
            <div className="mx-auto mb-1.5 h-8 w-8 rounded-md bg-gradient-card" />
            <span className="text-[9px] text-text-secondary">{p}</span>
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between rounded-lg border border-white/8 bg-bg-card px-3 py-2">
        <span className="text-xs text-text-secondary">Carrito</span>
        <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-bold text-white">3</span>
      </div>
    </div>
  );
}

function ConversacionesMockup() {
  const mensajes = [
    { from: "cliente", texto: "¿Cuánto cuesta el servicio básico?" },
    { from: "ia", texto: "Desde $799 MXN/mes. ¿Te gustaría agendar una llamada?" },
    { from: "cliente", texto: "Sí, por favor" },
  ];
  return (
    <div className="space-y-2">
      {mensajes.map((m, i) => (
        <div
          key={i}
          className={`w-fit max-w-[85%] rounded-2xl px-3 py-1.5 text-xs ${
            m.from === "ia"
              ? "rounded-tl-sm bg-gradient-main font-medium text-white"
              : "ml-auto rounded-tr-sm bg-white/10 text-text-secondary"
          }`}
        >
          {m.texto}
        </div>
      ))}
      <span className="mt-1 inline-flex items-center gap-1.5 rounded-full border border-white/10 px-2.5 py-1 text-[10px] text-text-muted">
        <span className="h-1.5 w-1.5 rounded-full bg-cyan shadow-[0_0_6px_2px_rgba(0,200,255,0.6)]" />
        IA activa
      </span>
    </div>
  );
}

function EstadisticasMockup() {
  return (
    <div>
      <svg viewBox="0 0 220 70" className="h-16 w-full" preserveAspectRatio="none">
        <path
          d="M0 50 L30 40 L60 45 L90 25 L120 32 L150 15 L180 22 L220 8"
          fill="none"
          stroke="var(--color-primary)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <div className="mt-3 grid grid-cols-2 gap-2">
        {[
          { label: "Ventas hoy", value: "$4,280" },
          { label: "Tickets", value: "37" },
        ].map((s) => (
          <div key={s.label} className="rounded-lg border border-white/8 bg-bg-card px-3 py-2">
            <p className="text-sm font-extrabold text-text-primary">{s.value}</p>
            <p className="text-[10px] text-text-muted">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function AdministracionMockup() {
  const filas = [
    { label: "Usuarios activos", on: true },
    { label: "Notificaciones", on: true },
    { label: "Respaldo automático", on: false },
  ];
  return (
    <div className="space-y-2">
      {filas.map((f) => (
        <div
          key={f.label}
          className="flex items-center justify-between rounded-lg border border-white/8 bg-bg-card px-3 py-2 text-xs text-text-secondary"
        >
          {f.label}
          <span
            className={`flex h-4 w-8 items-center rounded-full p-0.5 ${f.on ? "justify-end bg-cyan" : "justify-start bg-white/15"}`}
          >
            <span className="h-3 w-3 rounded-full bg-white" />
          </span>
        </div>
      ))}
    </div>
  );
}

export const SERVICIO_MOCKUPS = {
  pos: PosMockup,
  fichaje: FichajeMockup,
  citas: CitasMockup,
  delivery: DeliveryMockup,
  ecommerce: EcommerceMockup,
};

export const GALERIA_MOCKUPS = {
  conversaciones: ConversacionesMockup,
  estadisticas: EstadisticasMockup,
  administracion: AdministracionMockup,
};
