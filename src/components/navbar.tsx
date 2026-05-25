"use client";

import { useEffect, useState } from "react";

type NavbarProps = {
  personName: string;
  isTypingFinished?: boolean;
};

const navItems = [
  { href: "#proyectos", label: "Proyectos" },
  { href: "#skills", label: "Servicios" },
  { href: "#contacto", label: "Contacto" },
];

export function Navbar({ personName, isTypingFinished = false }: NavbarProps) {
  const [hasScrolled, setHasScrolled] = useState<boolean>(false);
  const marcaCompacta =
    personName
      .split(" ")
      .filter(Boolean)
      .map((fragmento) => fragmento[0]?.toUpperCase())
      .join("")
      .slice(0, 3) || "MFR";

  useEffect(() => {
    const handleScroll = () => {
      // Si el usuario scrolea aunque sea un solo píxel (1px), marcamos hasScrolled como true
      if (window.scrollY > 1) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }
    };

    // Añadir el listener al scroll
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Chequeo inicial por si la página ya carga con scroll
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // La barra se muestra si el usuario ya scroleó aunque sea un mínimo (1px) O si terminó la máquina de escribir
  const shouldShowNavbar = hasScrolled || isTypingFinished;

  // Los estilos cromáticos de fondo y color cambian de transparente (overlay) a vidrio esmerilado (sticky) basados estrictamente en si el usuario ya movió la pantalla (hasScrolled)
  const navbarVisualStyleClass = hasScrolled ? "navbar--sticky" : "navbar--overlay";

  return (
    <header
      id="navbar"
      className={`navbar ${navbarVisualStyleClass} ${shouldShowNavbar ? "" : "opacity-0 pointer-events-none -translate-y-4"}`}
    >
      <nav className="navbar-inner" aria-label="Navegación principal">
        <p className={`navbar-brand ${hasScrolled ? "navbar-brand--compact" : ""}`} aria-label={personName}>
          <span className="navbar-brand-full">{personName}</span>
          <span className="navbar-brand-compact" aria-hidden={!hasScrolled}>
            {marcaCompacta}
          </span>
        </p>
        <ul className="navbar-links">
          {navItems.map((item) => (
            <li key={item.href}>
              <a href={item.href} className="nav-bracket-link">
                [ {item.label} ]
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
