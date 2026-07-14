import { useFadeInOnScroll } from "../../hooks/useFadeInOnScroll";

export default function FadeInSection({ children, className = "", delay = 0 }) {
  const { ref, isVisible } = useFadeInOnScroll();

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      } ${className}`}
      style={{ transitionDelay: isVisible ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}
