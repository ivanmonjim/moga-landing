import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import HeroMockup from "../ui/HeroMockup";
import { useBreakpoint } from "../../hooks/useCardCarousel";

// Palabras gigantes de fondo: decorativas, recortadas y con parallax sutil
// ligado al scroll del hero. Puramente atmosféricas (pointer-events-none),
// no deben competir con el contenido real.
const BG_WORDS = [
  { text: "AUTOMATIZA", top: "6%", left: "-8%", size: "clamp(4rem,15vw,12rem)", speed: 50, rotate: -4 },
  { text: "MOGA", top: "14%", left: "56%", size: "clamp(5.5rem,19vw,15rem)", speed: -35, rotate: 2 },
  { text: "OPTIMIZA", top: "62%", left: "58%", size: "clamp(3.5rem,11vw,9rem)", speed: -55, rotate: 3 },
  { text: "CRECE", top: "82%", left: "2%", size: "clamp(3.5rem,12vw,10rem)", speed: 35, rotate: -2 },
];

function ParallaxWord({ word, progress }) {
  const y = useTransform(progress, [0, 1], [0, word.speed]);
  return (
    <motion.span
      aria-hidden="true"
      style={{ top: word.top, left: word.left, fontSize: word.size, y, rotate: word.rotate }}
      className="pointer-events-none absolute select-none whitespace-nowrap font-extrabold uppercase leading-none tracking-tighter text-white/[0.05]"
    >
      {word.text}
    </motion.span>
  );
}

export default function Hero() {
  const sectionRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const bp = useBreakpoint();
  // El pin (altura fija 130vh + sticky) asume que el contenido cabe en
  // ~100vh. En móvil y tablet (badge + título + párrafo + botones + mockup
  // apilados) el contenido real supera esa altura y, al forzar el alto del
  // contenedor, se desbordaba y quedaba superpuesto con la siguiente
  // sección. Solo se activa en "lg" (escritorio), donde sí hay margen.
  const simplify = prefersReducedMotion || bp !== "lg";

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const cardScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const cardOpacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 1, 0.5]);
  const cardY = useTransform(scrollYProgress, [0, 1], [0, -32]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 120, damping: 22 });
  const springY = useSpring(mouseY, { stiffness: 120, damping: 22 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-5, 5]);

  const handleMouseMove = (e) => {
    if (prefersReducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative"
      style={{ height: simplify ? "auto" : "130vh" }}
    >
      <div
        className={`relative flex min-h-screen flex-col justify-center overflow-hidden pt-40 pb-20 md:pt-48 md:pb-28 ${
          simplify ? "" : "sticky top-0"
        }`}
      >
        {/* fondo decorativo con degradados, al estilo del logo */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-56 left-1/2 h-[44rem] w-[60rem] -translate-x-1/2 rounded-full bg-secondary/30 blur-[140px]" />
          <div className="absolute -top-20 left-1/2 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-primary/25 blur-[110px]" />
          <div className="absolute top-1/3 -left-24 h-80 w-80 rounded-full bg-primary/15 blur-[100px]" />
          <div className="absolute -bottom-20 right-0 h-96 w-96 rounded-full bg-cyan/10 blur-[110px]" />
          <svg className="absolute inset-0 h-full w-full opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
                <path d="M 48 0 L 0 0 0 48" fill="none" stroke="white" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>

          {!prefersReducedMotion &&
            BG_WORDS.map((word) => <ParallaxWord key={word.text} word={word} progress={scrollYProgress} />)}
        </div>

        <motion.div
          style={simplify ? undefined : { scale: cardScale, opacity: cardOpacity, y: cardY }}
          className="mx-auto flex max-w-5xl flex-col items-center px-6 text-center"
        >
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

          <div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ perspective: 1400 }}
            className="w-full"
          >
            <motion.div
              style={prefersReducedMotion ? undefined : { rotateX, rotateY, transformStyle: "preserve-3d" }}
              className="relative"
            >
              <div className="pointer-events-none absolute inset-x-10 top-10 -z-10 h-24 rounded-full bg-secondary/20 blur-[90px]" />
              <HeroMockup />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
