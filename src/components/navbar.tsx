"use client";

import { useEffect, useRef, useState } from "react";
import type { ProyectoPortfolio } from "@/types/portfolio";

type NavbarProps = {
  personName: string;
  proyectos: readonly ProyectoPortfolio[];
};

const navItems = [
  { href: "#sobre-mi", label: "Sobre mí", id: "sobre-mi" },
  { href: "#tecnologias", label: "Tecnologías", id: "tecnologias" },
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
  const [mobileProyectosOpen, setMobileProyectosOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [displayedName, setDisplayedName] = useState("");
  const [navLinksVisible, setNavLinksVisible] = useState(false);
  const openProjectTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const closeMenu = () => {
    setMenuOpen(false);
    setMobileProyectosOpen(false);
    setDropdownOpen(false);
  };

  const isMobileViewport = () =>
    typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < personName.length) {
        setDisplayedName(personName.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
        window.dispatchEvent(new CustomEvent("navbarTypingDone"));
      }
    }, 38);
    return () => clearInterval(timer);
  }, [personName]);

  const isTyping = displayedName.length < personName.length;

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    const handler = () => {
      timeoutId = setTimeout(() => setNavLinksVisible(true), 200);
    };
    window.addEventListener("heroContentDone", handler);
    return () => {
      window.removeEventListener("heroContentDone", handler);
      clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (openProjectTimeoutRef.current) {
        clearTimeout(openProjectTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const overflowAnterior = document.body.style.overflow;
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = overflowAnterior;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [menuOpen]);

  const handleOpenProject = (proyecto: ProyectoPortfolio) => {
    closeMenu();
    scrollToCenter("proyectos");
    if (openProjectTimeoutRef.current) {
      clearTimeout(openProjectTimeoutRef.current);
    }
    openProjectTimeoutRef.current = setTimeout(() => {
      window.dispatchEvent(
        new CustomEvent("openProject", { detail: proyecto.name }),
      );
      openProjectTimeoutRef.current = null;
    }, 380);
  };

  const handleNavTo = (id: string) => {
    closeMenu();
    scrollToCenter(id);
  };

  return (
    <header id="navbar" className="navbar navbar--sticky">
      <nav className="navbar-inner" aria-label="Navegación principal">
        <p className="navbar-brand" aria-label={personName}>
          {displayedName}
          {isTyping && <span className="navbar-brand-cursor" aria-hidden="true" />}
        </p>

        <button
          type="button"
          className={`navbar-menu-toggle${menuOpen ? " navbar-menu-toggle--open" : ""}`}
          aria-expanded={menuOpen}
          aria-controls="navbar-menu"
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="navbar-menu-toggle-bar" />
          <span className="navbar-menu-toggle-bar" />
          <span className="navbar-menu-toggle-bar" />
        </button>

        <div
          id="navbar-menu"
          className={`navbar-menu${menuOpen ? " navbar-menu--open" : ""}`}
        >
          <ul
            className="navbar-links"
            style={{
              opacity: navLinksVisible ? 1 : 0,
              pointerEvents: navLinksVisible ? "auto" : "none",
              transition: "opacity 500ms ease",
            }}
          >
            <li
              className="navbar-link-inicio"
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
                  closeMenu();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                [ Inicio ]
              </a>
            </li>

            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="nav-bracket-link"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavTo(item.id);
                  }}
                >
                  [ {item.label} ]
                </a>
              </li>
            ))}

            <li
              className="nav-proyectos-wrapper"
              onMouseEnter={() => {
                if (!isMobileViewport()) setDropdownOpen(true);
              }}
              onMouseLeave={() => {
                if (!isMobileViewport()) setDropdownOpen(false);
              }}
            >
              <a
                href="#proyectos"
                className="nav-bracket-link"
                onClick={(e) => {
                  e.preventDefault();
                  if (isMobileViewport()) {
                    setMobileProyectosOpen((open) => !open);
                    return;
                  }
                  handleNavTo("proyectos");
                }}
              >
                [ Proyectos {(dropdownOpen || mobileProyectosOpen) ? "▴" : "▾"} ]
              </a>

              <ul
                className={`nav-dropdown${
                  dropdownOpen || mobileProyectosOpen ? " nav-dropdown--visible" : ""
                }`}
                role="menu"
              >
                {proyectos.map((p) => (
                  <li key={p.name} role="menuitem">
                    <button
                      type="button"
                      className="nav-dropdown-item"
                      onClick={() => handleOpenProject(p)}
                    >
                      [ {p.name} ]
                    </button>
                  </li>
                ))}
              </ul>
            </li>

            <li>
              <a
                href="#contacto"
                className="nav-bracket-link"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavTo("contacto");
                }}
              >
                [ Contacto ]
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
