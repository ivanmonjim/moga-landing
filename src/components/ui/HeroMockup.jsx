const stats = [
  { label: "Llamadas atendidas", value: "48" },
  { label: "Mensajes respondidos", value: "96" },
  { label: "Tasa de respuesta", value: "99%" },
  { label: "Tiempo promedio", value: "8s" },
];

export default function HeroMockup() {
  return (
    <div className="relative mx-auto mt-16 max-w-5xl px-4 sm:px-6">
      <div className="absolute inset-x-10 -top-6 h-24 rounded-full bg-secondary/25 blur-[80px]" />

      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-bg-card/80 shadow-[0_30px_100px_rgba(0,0,0,0.55)] backdrop-blur">
        {/* barra superior tipo app */}
        <div className="flex items-center justify-between border-b border-white/8 bg-bg-sidebar/60 px-5 py-3">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-danger/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-warning/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-success/70" />
          </div>
          <div className="hidden items-center gap-1 rounded-full border border-white/10 bg-bg-main/60 p-1 text-xs font-medium text-text-secondary sm:flex">
            <span className="rounded-full bg-gradient-main px-3 py-1 text-white">Llamadas</span>
            <span className="px-3 py-1">WhatsApp</span>
            <span className="px-3 py-1">Citas</span>
          </div>
          <span className="rounded-full bg-gradient-main px-3.5 py-1.5 text-xs font-semibold text-white">
            + Nueva cita
          </span>
        </div>

        <div className="grid gap-4 p-4 sm:p-5 lg:grid-cols-[1.6fr_1fr]">
          {/* card principal: interacciones */}
          <div className="rounded-xl border border-white/8 bg-bg-main/70 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-text-muted">Interacciones este mes</p>
                <p className="mt-1 text-2xl font-extrabold text-text-primary sm:text-3xl">
                  1,284 <span className="text-sm font-semibold text-success">+18%</span>
                </p>
              </div>
              <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-text-secondary">
                Últimos 30 días
              </span>
            </div>

            <svg viewBox="0 0 320 90" className="mt-6 h-20 w-full" preserveAspectRatio="none">
              <defs>
                <linearGradient id="heroChart" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-secondary)" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="var(--color-secondary)" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M0 65 L40 55 L80 60 L120 35 L160 45 L200 20 L240 30 L280 12 L320 22 L320 90 L0 90 Z"
                fill="url(#heroChart)"
              />
              <path
                d="M0 65 L40 55 L80 60 L120 35 L160 45 L200 20 L240 30 L280 12 L320 22"
                fill="none"
                stroke="var(--color-secondary)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* card lateral: IA */}
          <div className="flex flex-col justify-between rounded-xl border border-secondary/30 bg-gradient-card p-5">
            <div>
              <span className="rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-semibold text-white">
                Moga IA
              </span>
              <p className="mt-3 text-sm font-semibold text-white">
                Todo tu negocio, atendido en automático.
              </p>
            </div>
            <div className="mt-6 flex flex-col gap-2">
              <span className="rounded-full bg-white px-4 py-2 text-center text-xs font-semibold text-bg-main">
                Ver reportes
              </span>
              <span className="rounded-full border border-white/25 px-4 py-2 text-center text-xs font-semibold text-white">
                Configurar IA
              </span>
            </div>
          </div>
        </div>

        {/* fila de estadisticas */}
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/8 bg-white/5 sm:grid-cols-4 mx-4 mb-4 sm:mx-5 sm:mb-5">
          {stats.map((s) => (
            <div key={s.label} className="bg-bg-main/80 px-4 py-4 text-center sm:text-left">
              <p className="text-lg font-extrabold text-text-primary">{s.value}</p>
              <p className="mt-0.5 text-[11px] text-text-muted">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
