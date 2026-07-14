import Logo from "../ui/Logo";
import { navLinks } from "../../data/navLinks";
import { socialLinks } from "../../data/social";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 bg-bg-sidebar">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-14 md:flex-row md:justify-between">
        <div className="max-w-sm">
          <Logo />
          <p className="mt-4 text-sm leading-relaxed text-text-secondary">
            Automatización de negocios con IA: llamadas, WhatsApp y gestión, todo en un solo lugar.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
          <div>
            <h3 className="mb-3 text-sm font-semibold text-text-primary">Navegación</h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-text-secondary hover:text-text-primary">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-text-primary">Redes</h3>
            <ul className="space-y-2">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-text-secondary hover:text-text-primary">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-text-primary">Contacto</h3>
            <ul className="space-y-2 text-sm text-text-secondary">
              {/* TODO: actualizar datos de contacto reales */}
              <li>correo@moga.com</li>
              <li>+52 000 000 0000</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5 px-6 py-6 text-center text-xs text-text-muted">
        © {year} Moga. Todos los derechos reservados.
      </div>
    </footer>
  );
}
