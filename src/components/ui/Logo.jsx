export default function Logo({ className = "h-12" }) {
  return (
    <img
      src="/moga-logo.png"
      alt="Moga"
      className={`w-auto object-contain ${className}`}
    />
  );
}
