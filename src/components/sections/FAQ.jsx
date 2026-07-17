import { useState } from "react";
import FadeInSection from "../ui/FadeInSection";
import SectionEyebrow from "../ui/SectionEyebrow";
import AccordionItem from "../ui/Accordion";
import { faqCategories } from "../../data/faq";
import { WHATSAPP_URL } from "../../data/whatsapp";

export default function FAQ() {
  const [activeCategoryId, setActiveCategoryId] = useState(faqCategories[0].id);
  const [openIndex, setOpenIndex] = useState(0);

  const activeCategory =
    faqCategories.find((cat) => cat.id === activeCategoryId) ?? faqCategories[0];

  const selectCategory = (id) => {
    setActiveCategoryId(id);
    setOpenIndex(0);
  };

  return (
    <section id="faq" className="relative bg-bg-soft py-24 md:py-32">
      <div className="pointer-events-none absolute inset-x-0 -top-24 h-24 bg-gradient-to-b from-transparent to-bg-soft" />

      <div className="mx-auto max-w-6xl px-6">
        <FadeInSection className="mx-auto mb-14 max-w-2xl text-center">
          <SectionEyebrow className="uppercase tracking-wider text-accent">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="12" cy="12" r="9" />
              <path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.9.45-1 .95-1 1.7" strokeLinecap="round" />
              <circle cx="12" cy="17" r="0.6" fill="currentColor" stroke="none" />
            </svg>
            Preguntas frecuentes
          </SectionEyebrow>
          <h2 className="text-3xl font-extrabold text-text-primary sm:text-4xl">
            Resolvemos <span className="text-gradient">tus dudas</span>
          </h2>
          <p className="mt-4 text-text-secondary">
            Encuentra respuestas sobre nuestros sistemas, implementación, soporte, seguridad y
            funcionamiento.
          </p>
        </FadeInSection>

        <div className="grid gap-10 lg:grid-cols-[260px_1fr] lg:gap-14">
          <FadeInSection delay={80}>
            <div className="hidden flex-col gap-2 lg:flex">
              {faqCategories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => selectCategory(cat.id)}
                  aria-pressed={cat.id === activeCategoryId}
                  className={`rounded-xl border px-4 py-3 text-left text-sm font-semibold transition-colors ${
                    cat.id === activeCategoryId
                      ? "border-accent/50 bg-accent/10 text-accent"
                      : "border-white/8 bg-bg-card text-text-secondary hover:border-white/20 hover:text-text-primary"
                  }`}
                >
                  {cat.label}
                </button>
              ))}

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex w-fit items-center gap-1.5 rounded-full border border-white/15 bg-bg-card px-5 py-2.5 text-sm font-semibold text-text-primary transition-colors hover:border-accent/50 hover:text-accent"
              >
                Hablar con un asesor
              </a>
            </div>

            {/* selector de categorías: tablet / móvil */}
            <div className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-1 lg:hidden">
              {faqCategories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => selectCategory(cat.id)}
                  aria-pressed={cat.id === activeCategoryId}
                  className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                    cat.id === activeCategoryId
                      ? "border-accent/50 bg-accent/10 text-accent"
                      : "border-white/10 bg-bg-card text-text-secondary hover:text-text-primary"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </FadeInSection>

          <FadeInSection delay={140}>
            <div className="flex flex-col gap-3">
              {activeCategory.questions.map((item, i) => (
                <AccordionItem
                  key={item.question}
                  question={item.question}
                  answer={item.answer}
                  isOpen={openIndex === i}
                  onToggle={() => setOpenIndex((current) => (current === i ? -1 : i))}
                />
              ))}
            </div>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex w-fit items-center gap-1.5 rounded-full border border-white/15 bg-bg-card px-5 py-2.5 text-sm font-semibold text-text-primary transition-colors hover:border-accent/50 hover:text-accent lg:hidden"
            >
              Hablar con un asesor
            </a>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
}
