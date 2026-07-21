import { useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import FadeInSection from "../ui/FadeInSection";
import SectionEyebrow from "../ui/SectionEyebrow";
import Logo from "../ui/Logo";
import { CONTACT_EMAIL, CONTACT_PHONE_DISPLAY, CONTACT_PHONE_TEL } from "../../data/contacto";
import { socialLinks } from "../../data/social";
import { WHATSAPP_URL } from "../../data/whatsapp";
import { InstagramIcon, TikTokIcon } from "../ui/SocialIcons";
import { useBreakpoint } from "../../hooks/useCardCarousel";

const socialIcons = { Instagram: InstagramIcon, TikTok: TikTokIcon };

const initialForm = { nombre: "", correo: "", mensaje: "" };

// Bloque de cierre cinematográfico: Circuit centrado, logo, mensaje comercial
// y accesos a WhatsApp/redes. Al hacer scroll hacia el formulario (que se
// mantiene intacto debajo), el panel se reduce y se desvanece hasta
// integrarse con el fondo.
function CierreCinema() {
  const ref = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const bp = useBreakpoint();
  // Mismo criterio que en Hero: el pin (130vh + sticky) asume contenido de
  // ~100vh; en móvil y tablet el bloque puede ser más alto y se desbordaba
  // sobre el formulario. Solo se activa en "lg" (escritorio).
  const simplify = prefersReducedMotion || bp !== "lg";
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 0.75, 1], [1, 1, 0]);

  return (
    <div ref={ref} className="relative" style={{ height: simplify ? "auto" : "130vh" }}>
      <div
        className={`flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-24 text-center ${
          simplify ? "" : "sticky top-0"
        }`}
      >
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-secondary/20 blur-[130px]" />
          <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[100px]" />
        </div>

        <motion.div
          style={simplify ? undefined : { scale, opacity }}
          className="flex flex-col items-center gap-6"
        >
          <div className="relative">
            <div className="pointer-events-none absolute -inset-10 -z-10 rounded-full bg-primary/25 blur-[80px]" />
            <Logo className="h-14 sm:h-16" />
          </div>

          <h2 className="max-w-xl text-3xl font-extrabold text-text-primary sm:text-4xl">
            ¿Listo para que tu negocio <span className="text-gradient">se atienda solo?</span>
          </h2>
          <p className="max-w-md text-text-secondary">
            Escríbenos por WhatsApp y te ayudamos a elegir el sistema ideal para tu operación.
          </p>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-main px-8 py-3.5 text-sm font-semibold text-white shadow-[0_0_35px_rgba(139,61,255,0.4)] transition-transform hover:scale-105"
          >
            Hablar por WhatsApp
          </a>

          <div className="mt-2 flex items-center gap-4">
            {socialLinks.map((social) => {
              const Icon = socialIcons[social.label];
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-bg-card text-text-secondary transition-colors hover:border-secondary/40 hover:text-text-primary"
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function Contacto() {
  const [form, setForm] = useState(initialForm);
  const [enviado, setEnviado] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const asunto = encodeURIComponent(`Nuevo contacto desde la web — ${form.nombre}`);
    const cuerpo = encodeURIComponent(
      `Nombre: ${form.nombre}\nCorreo: ${form.correo}\n\nMensaje:\n${form.mensaje}`
    );
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${asunto}&body=${cuerpo}`;
    setEnviado(true);
    setForm(initialForm);
  };

  return (
    <section id="contacto" className="bg-bg-soft">
      <CierreCinema />

      <div className="mx-auto grid max-w-6xl gap-14 px-6 pb-24 md:pb-32 lg:grid-cols-2">
        <FadeInSection>
          <SectionEyebrow>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M4 4h16v16H4z" strokeLinecap="round" strokeLinejoin="round" />
              <path d="m4 6 8 7 8-7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Contacto
          </SectionEyebrow>
          <h2 className="text-3xl font-extrabold text-text-primary sm:text-4xl">
            Hablemos de tu <span className="text-gradient">negocio</span>
          </h2>
          <p className="mt-4 max-w-md text-text-secondary">
            Cuéntanos qué necesitas automatizar y te contactamos para armar el plan ideal.
          </p>

          <div className="mt-10 space-y-4 text-sm text-text-secondary">
            <a href={`mailto:${CONTACT_EMAIL}`} className="flex items-center gap-3 hover:text-text-primary">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-bg-card text-primary">
                ✉
              </span>
              {CONTACT_EMAIL}
            </a>
            <a
              href={`tel:${CONTACT_PHONE_TEL}`}
              className="flex items-center gap-3 hover:text-text-primary"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-bg-card text-primary">
                ☎
              </span>
              {CONTACT_PHONE_DISPLAY}
            </a>

            {socialLinks.map((social) => {
              const Icon = socialIcons[social.label];
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:text-text-primary"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-bg-card text-primary">
                    <Icon className="h-4 w-4" />
                  </span>
                  {social.label} <span className="text-text-muted">{social.handle}</span>
                </a>
              );
            })}
          </div>
        </FadeInSection>

        <FadeInSection delay={100}>
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-white/8 bg-bg-card p-8"
          >
            <div className="mb-5">
              <label htmlFor="nombre" className="mb-1.5 block text-sm font-medium text-text-secondary">
                Nombre
              </label>
              <input
                id="nombre"
                name="nombre"
                type="text"
                required
                value={form.nombre}
                onChange={handleChange}
                className="w-full rounded-lg border border-white/10 bg-bg-main px-4 py-2.5 text-sm text-text-primary outline-none transition-colors focus:border-secondary"
                placeholder="Tu nombre"
              />
            </div>

            <div className="mb-5">
              <label htmlFor="correo" className="mb-1.5 block text-sm font-medium text-text-secondary">
                Correo
              </label>
              <input
                id="correo"
                name="correo"
                type="email"
                required
                value={form.correo}
                onChange={handleChange}
                className="w-full rounded-lg border border-white/10 bg-bg-main px-4 py-2.5 text-sm text-text-primary outline-none transition-colors focus:border-secondary"
                placeholder="tucorreo@ejemplo.com"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="mensaje" className="mb-1.5 block text-sm font-medium text-text-secondary">
                Mensaje
              </label>
              <textarea
                id="mensaje"
                name="mensaje"
                required
                rows={4}
                value={form.mensaje}
                onChange={handleChange}
                className="w-full resize-none rounded-lg border border-white/10 bg-bg-main px-4 py-2.5 text-sm text-text-primary outline-none transition-colors focus:border-secondary"
                placeholder="Cuéntanos qué necesitas"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-full bg-gradient-main px-6 py-3 text-sm font-semibold text-white shadow-[0_0_25px_rgba(139,61,255,0.3)] transition-transform hover:scale-105"
            >
              Enviar mensaje
            </button>

            {enviado && (
              <p className="mt-4 text-center text-sm text-success">
                Se abrirá tu cliente de correo para enviar el mensaje a {CONTACT_EMAIL}.
              </p>
            )}
          </form>
        </FadeInSection>
      </div>
    </section>
  );
}
