"use client";

import { useEffect, useRef, useState } from "react";

type NavbarProps = {
  personName: string;
};

const navItems = [
  { href: "#sobre-mi", label: "Sobre mí" },
  { href: "#proyectos", label: "Proyectos" },
  { href: "#skills", label: "Servicios" },
  { href: "#contacto", label: "Contacto" },
];

export function Navbar({ personName }: NavbarProps) {
  const [isAfterHero, setIsAfterHero] = useState<boolean>(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const introCoverRef = useRef<HTMLElement | null>(null);
  const marcaCompacta =
    personName
      .split(" ")
      .filter(Boolean)
      .map((fragmento) => fragmento[0]?.toUpperCase())
      .join("")
      .slice(0, 3) || "MFR";

  useEffect(() => {
    introCoverRef.current = document.getElementById("intro-cover");
    const introCover = introCoverRef.current;
    const navbar = document.getElementById("navbar");

    if (!introCover) {
      setIsAfterHero(true);
      return;
    }

    const navbarHeight = navbar?.offsetHeight ?? 0;

    observerRef.current = new IntersectionObserver(
      ([entry]: IntersectionObserverEntry[]) => {
        setIsAfterHero(!entry.isIntersecting);
      },
      {
        threshold: 0,
        rootMargin: `-${navbarHeight}px 0px 0px 0px`,
      }
    );

    observerRef.current.observe(introCover);

    return () => {
      observerRef.current?.disconnect();
      observerRef.current = null;
    };
  }, []);

  return (
    <header
      id="navbar"
      className={`navbar ${isAfterHero ? "navbar--sticky" : "navbar--overlay"}`}
    >
      <nav className="navbar-inner" aria-label="Navegación principal">
        <p className={`navbar-brand ${isAfterHero ? "navbar-brand--compact" : ""}`} aria-label={personName}>
          <span className="navbar-brand-full">{personName}</span>
          <span className="navbar-brand-compact" aria-hidden={!isAfterHero}>
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
