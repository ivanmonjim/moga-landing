import { useId } from "react";

export default function AccordionItem({ question, answer, isOpen, onToggle }) {
  const baseId = useId();
  const buttonId = `${baseId}-button`;
  const panelId = `${baseId}-panel`;

  return (
    <div
      className={`rounded-2xl border bg-bg-card transition-colors duration-300 ${
        isOpen ? "border-accent/40 shadow-[0_0_30px_rgba(255,197,49,0.08)]" : "border-white/8"
      }`}
    >
      <h3 className="m-0">
        <button
          id={buttonId}
          type="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold text-text-primary sm:px-6 sm:py-5 sm:text-base"
        >
          {question}
          <span
            aria-hidden="true"
            className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-base leading-none transition-all duration-300 ${
              isOpen
                ? "rotate-180 border-accent/50 text-accent"
                : "border-white/15 text-text-secondary"
            }`}
          >
            {isOpen ? "−" : "+"}
          </span>
        </button>
      </h3>

      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
        className="grid transition-[grid-template-rows] duration-[380ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
      >
        <div className="overflow-hidden">
          <p className="px-5 pb-5 text-sm leading-relaxed text-text-secondary sm:px-6 sm:pb-6">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}
