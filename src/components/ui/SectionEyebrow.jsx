export default function SectionEyebrow({ icon, children }) {
  return (
    <span className="mb-4 inline-flex w-fit items-center gap-1.5 rounded-full border border-white/10 bg-bg-card px-3.5 py-1.5 text-xs font-semibold text-secondary">
      {icon}
      {children}
    </span>
  );
}
