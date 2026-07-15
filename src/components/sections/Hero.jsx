import HeroMockup from "../ui/HeroMockup";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-40 pb-20 md:pt-48 md:pb-28">
      {/* fondo decorativo con degradados, al estilo del logo */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-56 left-1/2 h-[44rem] w-[60rem] -translate-x-1/2 rounded-full bg-secondary/30 blur-[140px]" />
        <div className="absolute -top-20 left-1/2 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-primary/25 blur-[110px]" />
        <div className="absolute top-1/3 -left-24 h-80 w-80 rounded-full bg-primary/15 blur-[100px]" />
        <div className="absolute -bottom-20 right-0 h-96 w-96 rounded-full bg-cyan/10 blur-[110px]" />
        <svg
          className="absolute inset-0 h-full w-full opacity-[0.06]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="mx-auto flex max-w-5xl flex-col items-center px-6 text-center">
        <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-bg-card px-4 py-1.5 text-xs font-medium text-text-secondary">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan shadow-[0_0_8px_2px_rgba(0,200,255,0.6)]" />
          Automatización con IA para tu negocio
        </span>

        <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-text-primary sm:text-5xl md:text-6xl">
          Atiende llamadas, WhatsApp y citas{" "}
          <span className="text-gradient">sin levantar un dedo</span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-text-secondary">
          Moga conecta inteligencia artificial con tu operación diaria: agenda citas, toma pedidos
          y responde a tus clientes 24/7, para que tu equipo se enfoque en lo importante.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <a
            href="#servicios"
            className="rounded-full bg-gradient-main px-8 py-3.5 text-sm font-semibold text-white shadow-[0_0_35px_rgba(139,61,255,0.4)] transition-transform hover:scale-105"
          >
            Conoce nuestros servicios
          </a>
          <a
            href="#contacto"
            className="rounded-full border border-white/15 bg-bg-card px-8 py-3.5 text-sm font-semibold text-text-primary transition-colors hover:border-white/30"
          >
            Hablar con un asesor
          </a>
        </div>
      </div>

      <HeroMockup />
    </section>
  );
}
