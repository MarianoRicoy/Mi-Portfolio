"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { ProyectoPortfolio } from "@/types/portfolio";
import {
  prefersReducedMotion,
  useIsomorphicLayoutEffect,
} from "@/hooks/use-prefers-reduced-motion";

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
    el.scrollIntoView({
      behavior: prefersReducedMotion() ? "auto" : "smooth",
      block: "center",
    });
  }
}

export function Navbar({ personName, proyectos }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownFocus, setDropdownFocus] = useState(false);
  const [mobileProyectosOpen, setMobileProyectosOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [displayedName, setDisplayedName] = useState("");
  const [navLinksVisible, setNavLinksVisible] = useState(false);
  const openProjectTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const proyectosTriggerRef = useRef<HTMLAnchorElement>(null);
  const ignoreProyectosFocusRef = useRef(false);
  const proyectosVisibles = dropdownOpen || dropdownFocus || mobileProyectosOpen;

  const closeMenu = () => {
    setMenuOpen(false);
    setMobileProyectosOpen(false);
    setDropdownOpen(false);
    setDropdownFocus(false);
  };

  const cerrarProyectos = () => {
    setDropdownOpen(false);
    setDropdownFocus(false);
    setMobileProyectosOpen(false);
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

  const showStaticNav = useCallback(() => {
    setDisplayedName(personName);
    setNavLinksVisible(true);
  }, [personName]);

  useIsomorphicLayoutEffect(() => {
    if (!prefersReducedMotion()) return;
    showStaticNav();
  }, [personName]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      if (media.matches) showStaticNav();
    };
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, [showStaticNav]);

  useEffect(() => {
    if (prefersReducedMotion()) {
      showStaticNav();
      return;
    }

    let index = 0;
    const timer = setInterval(() => {
      if (prefersReducedMotion()) {
        clearInterval(timer);
        showStaticNav();
        return;
      }
      if (index < personName.length) {
        setDisplayedName(personName.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
        window.dispatchEvent(new CustomEvent("navbarTypingDone"));
      }
    }, 38);
    return () => clearInterval(timer);
  }, [personName, showStaticNav]);

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
    }, prefersReducedMotion() ? 0 : 380);
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
                  window.scrollTo({
                    top: 0,
                    behavior: prefersReducedMotion() ? "auto" : "smooth",
                  });
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
              onFocus={(event) => {
                if (ignoreProyectosFocusRef.current) {
                  ignoreProyectosFocusRef.current = false;
                  return;
                }
                const target = event.target;
                if (!(target instanceof Element) || !target.matches(":focus-visible")) return;
                setDropdownFocus(true);
              }}
              onBlur={(event) => {
                const next = event.relatedTarget;
                if (next instanceof Node && event.currentTarget.contains(next)) return;
                setDropdownFocus(false);
              }}
              onKeyDown={(event) => {
                if (event.key !== "Escape" || !proyectosVisibles) return;
                event.preventDefault();
                event.stopPropagation();
                cerrarProyectos();
                if (document.activeElement !== proyectosTriggerRef.current) {
                  ignoreProyectosFocusRef.current = true;
                  proyectosTriggerRef.current?.focus();
                }
              }}
            >
              <a
                ref={proyectosTriggerRef}
                href="#proyectos"
                className="nav-bracket-link"
                aria-expanded={proyectosVisibles}
                aria-controls="nav-proyectos-opciones"
                onClick={(e) => {
                  e.preventDefault();
                  if (isMobileViewport()) {
                    const next = !proyectosVisibles;
                    setMobileProyectosOpen(next);
                    setDropdownFocus(next);
                    return;
                  }
                  handleNavTo("proyectos");
                }}
              >
                [ Proyectos {proyectosVisibles ? "▴" : "▾"} ]
              </a>

              <ul
                id="nav-proyectos-opciones"
                className={`nav-dropdown${proyectosVisibles ? " nav-dropdown--visible" : ""}`}
                aria-hidden={proyectosVisibles ? undefined : true}
              >
                {proyectos.map((p) => (
                  <li key={p.name}>
                    <button
                      type="button"
                      className="nav-dropdown-item"
                      tabIndex={proyectosVisibles ? 0 : -1}
                      onClick={() => handleOpenProject(p)}
                      onKeyDown={(event) => {
                        if (event.key !== "Enter" && event.key !== " ") return;
                        event.preventDefault();
                        handleOpenProject(p);
                      }}
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
