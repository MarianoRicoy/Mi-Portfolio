"use client";

import { useEffect, useState } from "react";
import type { ProyectoPortfolio } from "@/types/portfolio";

type NavbarProps = {
  personName: string;
  proyectos: readonly ProyectoPortfolio[];
};

const navItems = [
  { href: "#sobre-mi", label: "Sobre mí" },
  { href: "#tecnologias", label: "Tecnologías" },
];

function scrollToCenter(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}

export function Navbar({ personName, proyectos }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Siempre arriba al cargar/recargar la página
  useEffect(() => {
    history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, []);

  const handleOpenProject = (proyecto: ProyectoPortfolio) => {
    setDropdownOpen(false);
    scrollToCenter("proyectos");
    // Pequeño delay para que el scroll ocurra antes de abrir el modal
    setTimeout(() => {
      window.dispatchEvent(
        new CustomEvent("openProject", { detail: proyecto.name })
      );
    }, 380);
  };

  return (
    <header id="navbar" className="navbar navbar--sticky">
      <nav className="navbar-inner" aria-label="Navegación principal">
        <p className="navbar-brand" aria-label={personName}>
          {personName}
        </p>

        <ul className="navbar-links">
          {/* Inicio — aparece solo al scrollear */}
          <li
            style={{
              opacity: scrolled ? 1 : 0,
              pointerEvents: scrolled ? "auto" : "none",
              maxWidth: scrolled ? "120px" : "0px",
              overflow: "hidden",
              transition: "opacity 300ms ease, max-width 300ms ease",
            }}
          >
            <a
              href="#"
              className="nav-bracket-link"
              aria-label="Volver al inicio"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              [ Inicio ]
            </a>
          </li>

          {/* Items normales */}
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="nav-bracket-link"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToCenter(item.href.replace("#", ""));
                }}
              >
                [ {item.label} ]
              </a>
            </li>
          ))}

          {/* Proyectos con dropdown */}
          <li
            className="nav-proyectos-wrapper"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <a
              href="#proyectos"
              className="nav-bracket-link"
              onClick={(e) => {
                e.preventDefault();
                scrollToCenter("proyectos");
              }}
            >
              [ Proyectos {dropdownOpen ? "▴" : "▾"} ]
            </a>

            <ul
              className={`nav-dropdown${dropdownOpen ? " nav-dropdown--visible" : ""}`}
              role="menu"
            >
              {proyectos.map((p) => (
                <li key={p.name} role="menuitem">
                  <button
                    className="nav-dropdown-item"
                    onClick={() => handleOpenProject(p)}
                  >
                    [ {p.name} ]
                  </button>
                </li>
              ))}
            </ul>
          </li>

          {/* Contacto */}
          <li>
            <a
              href="#contacto"
              className="nav-bracket-link"
              onClick={(e) => {
                e.preventDefault();
                scrollToCenter("contacto");
              }}
            >
              [ Contacto ]
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
