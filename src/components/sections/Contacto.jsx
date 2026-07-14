import { useState } from "react";
import FadeInSection from "../ui/FadeInSection";

const initialForm = { nombre: "", correo: "", mensaje: "" };

export default function Contacto() {
  const [form, setForm] = useState(initialForm);
  const [enviado, setEnviado] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: conectar a un endpoint real (correo, CRM, etc.) — por ahora solo confirma en pantalla
    setEnviado(true);
    setForm(initialForm);
  };

  return (
    <section id="contacto" className="bg-bg-soft py-24 md:py-32">
      <div className="mx-auto grid max-w-6xl gap-14 px-6 lg:grid-cols-2">
        <FadeInSection>
          <h2 className="text-3xl font-extrabold text-text-primary sm:text-4xl">
            Hablemos de tu <span className="text-gradient">negocio</span>
          </h2>
          <p className="mt-4 max-w-md text-text-secondary">
            Cuéntanos qué necesitas automatizar y te contactamos para armar el plan ideal.
          </p>

          <div className="mt-10 space-y-4 text-sm text-text-secondary">
            {/* TODO: actualizar con los datos de contacto reales */}
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-bg-card text-primary">
                ✉
              </span>
              correo@moga.com
            </div>
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-bg-card text-primary">
                ☎
              </span>
              +52 000 000 0000
            </div>
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
                ¡Gracias! Te contactaremos pronto.
              </p>
            )}
          </form>
        </FadeInSection>
      </div>
    </section>
  );
}
