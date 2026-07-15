import FadeInSection from "../ui/FadeInSection";
import SectionEyebrow from "../ui/SectionEyebrow";
import { beneficios } from "../../data/beneficios";

function ChatMockup() {
  return (
    <div className="mt-6 space-y-2.5">
      <div className="ml-auto w-fit max-w-[80%] rounded-2xl rounded-tr-sm bg-white/10 px-3.5 py-2 text-xs text-text-secondary">
        ¿Tienen mesa para 4 hoy a las 8pm?
      </div>
      <div className="w-fit max-w-[85%] rounded-2xl rounded-tl-sm bg-gradient-main px-3.5 py-2 text-xs font-medium text-white">
        Sí, te la reservo. ¿A nombre de quién?
      </div>
    </div>
  );
}

function CanalesMockup() {
  const items = [
    { label: "Llamada entrante", estado: "Atendida" },
    { label: "Mensaje de WhatsApp", estado: "Respondido" },
    { label: "Cita agendada", estado: "Confirmada" },
  ];
  return (
    <div className="mt-6 space-y-2">
      {items.map((item) => (
        <div
          key={item.label}
          className="flex items-center justify-between rounded-xl border border-white/8 bg-bg-main/70 px-4 py-2.5 text-xs"
        >
          <span className="text-text-secondary">{item.label}</span>
          <span className="rounded-full bg-success/15 px-2.5 py-1 font-semibold text-success">
            {item.estado}
          </span>
        </div>
      ))}
    </div>
  );
}

function CanalToggleMockup() {
  return (
    <div className="mt-6">
      <p className="mb-2 text-xs text-text-muted">¿Por dónde te escriben?</p>
      <div className="flex flex-wrap gap-2">
        {["Llamada", "WhatsApp", "Web"].map((canal, i) => (
          <span
            key={canal}
            className={`rounded-full px-3.5 py-1.5 text-xs font-semibold ${
              i === 1 ? "bg-gradient-main text-white" : "border border-white/10 text-text-secondary"
            }`}
          >
            {canal}
          </span>
        ))}
      </div>
    </div>
  );
}

function AutomatizadoMockup() {
  return (
    <div className="mt-6 space-y-2.5">
      {["Confirmación enviada", "Recordatorio programado"].map((label) => (
        <div key={label} className="flex items-center gap-2.5 rounded-xl border border-white/8 bg-bg-main/70 px-3.5 py-2.5">
          <svg className="h-4 w-4 shrink-0 text-cyan" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-xs text-text-secondary">{label}</span>
          <span className="ml-auto rounded-full border border-white/10 px-2 py-0.5 text-[10px] text-text-muted">
            Automático
          </span>
        </div>
      ))}
    </div>
  );
}

const mockups = [ChatMockup, CanalesMockup, CanalToggleMockup, AutomatizadoMockup];
const spans = ["lg:col-span-2", "lg:col-span-3", "lg:col-span-2", "lg:col-span-3"];

export default function PorQueMoga() {
  return (
    <section id="beneficios" className="bg-bg-main py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <FadeInSection className="mx-auto mb-16 max-w-2xl text-center">
          <SectionEyebrow>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="12" cy="12" r="9" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            Beneficios
          </SectionEyebrow>
          <h2 className="text-3xl font-extrabold text-text-primary sm:text-4xl">
            Todo lo que necesitas para <span className="text-gradient">simplificar tu operación</span>
          </h2>
          <p className="mt-4 text-text-secondary">
            Descubre cómo la automatización con IA transforma la atención a tus clientes, todos los
            días.
          </p>
        </FadeInSection>

        <div className="grid gap-6 lg:grid-cols-5">
          {beneficios.map((b, i) => {
            const Mockup = mockups[i % mockups.length];
            return (
              <FadeInSection key={b.titulo} delay={i * 100} className={spans[i % spans.length]}>
                <div className="h-full rounded-2xl border border-white/8 bg-bg-card p-6 transition-colors hover:border-secondary/30 sm:p-7">
                  <h3 className="text-base font-bold text-text-primary">{b.titulo}</h3>
                  <p className="mt-1.5 text-sm text-text-secondary">{b.descripcion}</p>
                  <Mockup />
                </div>
              </FadeInSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
